-- 1. KYC documents: users cannot self-approve on INSERT
DROP POLICY IF EXISTS kyc_insert ON public.kyc_documents;
CREATE POLICY kyc_insert ON public.kyc_documents
  FOR INSERT TO authenticated
  WITH CHECK (
    is_superadmin(auth.uid())
    OR (
      user_id = auth.uid()
      AND (status IS NULL OR status = 'pending')
      AND reviewed_by IS NULL
      AND reviewed_at IS NULL
    )
  );

-- 2. Participant documents: same restriction at policy level
DROP POLICY IF EXISTS user_insert_own_documents ON public.participant_documents;
CREATE POLICY user_insert_own_documents ON public.participant_documents
  FOR INSERT TO authenticated
  WITH CHECK (
    auth.uid() = user_id
    AND status = 'pending'
    AND reviewed_by IS NULL
    AND reviewed_at IS NULL
  );

-- 3. Profiles: no role escalation on INSERT
DROP POLICY IF EXISTS profiles_insert ON public.profiles;
CREATE POLICY profiles_insert ON public.profiles
  FOR INSERT TO authenticated
  WITH CHECK (
    is_superadmin(auth.uid())
    OR (id = auth.uid() AND role = 'user')
  );

CREATE OR REPLACE FUNCTION public.prevent_profile_role_insert()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public'
AS $$
BEGIN
  IF auth.uid() IS NOT NULL
     AND NOT public.is_superadmin(auth.uid())
     AND NEW.role IS DISTINCT FROM 'user' THEN
    NEW.role := 'user';
  END IF;
  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS trg_prevent_profile_role_insert ON public.profiles;
CREATE TRIGGER trg_prevent_profile_role_insert
  BEFORE INSERT ON public.profiles
  FOR EACH ROW EXECUTE FUNCTION public.prevent_profile_role_insert();

-- 4. Reservations: restrict owner updates to safe end states
DROP POLICY IF EXISTS reservations_update_own ON public.reservations;
CREATE POLICY reservations_update_own ON public.reservations
  FOR UPDATE TO authenticated
  USING (user_id = auth.uid())
  WITH CHECK (
    user_id = auth.uid()
    AND status IN ('pending', 'confirmed', 'cancelled')
  );
