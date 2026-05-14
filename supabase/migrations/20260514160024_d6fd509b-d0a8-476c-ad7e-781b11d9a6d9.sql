
-- 1. Prevent role escalation via profiles.role
CREATE OR REPLACE FUNCTION public.prevent_profile_role_change()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  IF NEW.role IS DISTINCT FROM OLD.role AND NOT public.is_superadmin(auth.uid()) THEN
    RAISE EXCEPTION 'Only superadmins can change profile role';
  END IF;
  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS prevent_profile_role_change_trg ON public.profiles;
CREATE TRIGGER prevent_profile_role_change_trg
BEFORE UPDATE ON public.profiles
FOR EACH ROW EXECUTE FUNCTION public.prevent_profile_role_change();

-- 2. Prevent users from self-approving KYC documents
CREATE OR REPLACE FUNCTION public.prevent_user_doc_review_change()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  IF public.is_superadmin(auth.uid()) THEN
    RETURN NEW;
  END IF;
  IF NEW.status IS DISTINCT FROM OLD.status
     OR NEW.reviewed_by IS DISTINCT FROM OLD.reviewed_by
     OR NEW.reviewed_at IS DISTINCT FROM OLD.reviewed_at THEN
    RAISE EXCEPTION 'Only admins can change document review fields';
  END IF;
  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS prevent_user_doc_review_change_trg ON public.participant_documents;
CREATE TRIGGER prevent_user_doc_review_change_trg
BEFORE UPDATE ON public.participant_documents
FOR EACH ROW EXECUTE FUNCTION public.prevent_user_doc_review_change();

-- Also force defaults on insert for non-admins
CREATE OR REPLACE FUNCTION public.enforce_user_doc_insert_defaults()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  IF NOT public.is_superadmin(auth.uid()) THEN
    NEW.status := 'pending';
    NEW.reviewed_by := NULL;
    NEW.reviewed_at := NULL;
  END IF;
  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS enforce_user_doc_insert_defaults_trg ON public.participant_documents;
CREATE TRIGGER enforce_user_doc_insert_defaults_trg
BEFORE INSERT ON public.participant_documents
FOR EACH ROW EXECUTE FUNCTION public.enforce_user_doc_insert_defaults();

-- 3. Force participation_requests inserts to be pending
DROP POLICY IF EXISTS part_req_insert ON public.participation_requests;
CREATE POLICY part_req_insert ON public.participation_requests
FOR INSERT TO authenticated
WITH CHECK (
  user_id = auth.uid()
  AND (status IS NULL OR status = 'pending')
  AND (payment_status IS NULL OR payment_status = 'pending')
);

-- 4. Lock down images bucket: admin-only writes; restrict listing
DROP POLICY IF EXISTS "Authenticated users can upload images" ON storage.objects;
DROP POLICY IF EXISTS "Public image access" ON storage.objects;

CREATE POLICY "Superadmins can upload images" ON storage.objects
FOR INSERT TO authenticated
WITH CHECK (bucket_id = 'images' AND public.is_superadmin(auth.uid()));

-- Files in public bucket are still served via /storage/v1/object/public/ without RLS,
-- but listing/SELECT through the API is restricted to admins.
CREATE POLICY "Admins can list images" ON storage.objects
FOR SELECT TO authenticated
USING (bucket_id = 'images' AND public.is_superadmin(auth.uid()));

-- 5. Hide cars.admin_notes from non-admins (column-level privilege)
REVOKE SELECT (admin_notes) ON public.cars FROM anon, authenticated;

-- 6. Votes: only owner (or admin) can read
DROP POLICY IF EXISTS votes_select ON public.votes;
CREATE POLICY votes_select ON public.votes
FOR SELECT TO authenticated
USING (user_id = auth.uid() OR public.is_superadmin(auth.uid()));

-- 7. Extra cost types/categories: admin-only read
DROP POLICY IF EXISTS extra_cost_types_select ON public.extra_cost_types;
CREATE POLICY extra_cost_types_select ON public.extra_cost_types
FOR SELECT TO authenticated
USING (public.is_superadmin(auth.uid()));

DROP POLICY IF EXISTS ecc_select ON public.extra_cost_categories;
CREATE POLICY ecc_select ON public.extra_cost_categories
FOR SELECT TO authenticated
USING (public.is_superadmin(auth.uid()));

-- 8. Add admin-only DELETE policy on participations
DROP POLICY IF EXISTS participations_delete ON public.participations;
CREATE POLICY participations_delete ON public.participations
FOR DELETE TO authenticated
USING (public.is_superadmin(auth.uid()));

-- 9. Set search_path on handle_reservation_credits
CREATE OR REPLACE FUNCTION public.handle_reservation_credits()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $function$
DECLARE
  v_dias INTEGER;
  v_vp_id UUID;
  v_credits_remaining INTEGER;
  v_credits_used_this_year INTEGER;
BEGIN
  IF TG_OP = 'INSERT' AND NEW.status IN ('pending', 'confirmed') THEN
    v_dias := (NEW.end_date::date - NEW.start_date::date) + 1;
    NEW.credits_used := v_dias;

    SELECT id, credits_remaining, credits_used_this_year
    INTO v_vp_id, v_credits_remaining, v_credits_used_this_year
    FROM validated_participations
    WHERE user_id = NEW.user_id AND car_id = NEW.car_id
    ORDER BY participation_number ASC
    LIMIT 1;

    IF v_vp_id IS NOT NULL THEN
      UPDATE validated_participations
      SET credits_remaining = GREATEST(0, v_credits_remaining - v_dias),
          credits_used_this_year = v_credits_used_this_year + v_dias
      WHERE id = v_vp_id;
    END IF;
  END IF;

  IF TG_OP = 'UPDATE'
    AND OLD.status IN ('pending', 'confirmed')
    AND NEW.status IN ('cancelled', 'rejected')
  THEN
    v_dias := COALESCE(NEW.credits_used, OLD.credits_used, 0);
    IF v_dias > 0 THEN
      SELECT id, credits_remaining, credits_used_this_year
      INTO v_vp_id, v_credits_remaining, v_credits_used_this_year
      FROM validated_participations
      WHERE user_id = NEW.user_id AND car_id = NEW.car_id
      ORDER BY participation_number ASC
      LIMIT 1;

      IF v_vp_id IS NOT NULL THEN
        UPDATE validated_participations
        SET credits_remaining = v_credits_remaining + v_dias,
            credits_used_this_year = GREATEST(0, v_credits_used_this_year - v_dias)
        WHERE id = v_vp_id;
      END IF;
    END IF;
  END IF;

  RETURN NEW;
END;
$function$;
