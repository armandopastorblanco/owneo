
-- 1) app_settings: hide sensitive keys from public reads
DROP POLICY IF EXISTS app_settings_select_all ON public.app_settings;

CREATE POLICY app_settings_select_public_safe
ON public.app_settings
FOR SELECT
TO anon, authenticated
USING (
  key NOT IN ('beta_gate_password')
  OR public.is_superadmin(auth.uid())
);

-- 2) admin_push_subscriptions: lock to superadmins only
DROP POLICY IF EXISTS "Admin only" ON public.admin_push_subscriptions;

CREATE POLICY admin_push_subs_select
ON public.admin_push_subscriptions
FOR SELECT
TO authenticated
USING (public.is_superadmin(auth.uid()));

CREATE POLICY admin_push_subs_insert
ON public.admin_push_subscriptions
FOR INSERT
TO authenticated
WITH CHECK (public.is_superadmin(auth.uid()));

CREATE POLICY admin_push_subs_update
ON public.admin_push_subscriptions
FOR UPDATE
TO authenticated
USING (public.is_superadmin(auth.uid()))
WITH CHECK (public.is_superadmin(auth.uid()));

CREATE POLICY admin_push_subs_delete
ON public.admin_push_subscriptions
FOR DELETE
TO authenticated
USING (public.is_superadmin(auth.uid()));

-- 3) reservations: prevent users from tampering with critical fields
CREATE OR REPLACE FUNCTION public.enforce_user_reservation_update()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  IF public.is_superadmin(auth.uid()) THEN
    RETURN NEW;
  END IF;

  -- Owners may only cancel; everything else must remain unchanged
  IF NEW.user_id IS DISTINCT FROM OLD.user_id
     OR NEW.car_id IS DISTINCT FROM OLD.car_id
     OR NEW.participation_id IS DISTINCT FROM OLD.participation_id
     OR NEW.start_date IS DISTINCT FROM OLD.start_date
     OR NEW.end_date IS DISTINCT FROM OLD.end_date
     OR NEW.credits_used IS DISTINCT FROM OLD.credits_used
     OR NEW.standard_credits_used IS DISTINCT FROM OLD.standard_credits_used
     OR NEW.premium_credits_used IS DISTINCT FROM OLD.premium_credits_used
     OR NEW.reservation_type IS DISTINCT FROM OLD.reservation_type
     OR NEW.is_peak_period IS DISTINCT FROM OLD.is_peak_period
     OR NEW.credit_multiplier IS DISTINCT FROM OLD.credit_multiplier
     OR NEW.rejected_by IS DISTINCT FROM OLD.rejected_by
     OR NEW.rejected_at IS DISTINCT FROM OLD.rejected_at
     OR NEW.rejection_reason IS DISTINCT FROM OLD.rejection_reason
  THEN
    RAISE EXCEPTION 'Users cannot modify protected reservation fields';
  END IF;

  IF NEW.status IS DISTINCT FROM OLD.status THEN
    IF NEW.status <> 'cancelled' THEN
      RAISE EXCEPTION 'Users can only cancel their reservations';
    END IF;
    IF OLD.status NOT IN ('pending', 'confirmed') THEN
      RAISE EXCEPTION 'Reservation cannot be cancelled from its current state';
    END IF;
  END IF;

  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS enforce_user_reservation_update_trg ON public.reservations;
CREATE TRIGGER enforce_user_reservation_update_trg
BEFORE UPDATE ON public.reservations
FOR EACH ROW
EXECUTE FUNCTION public.enforce_user_reservation_update();
