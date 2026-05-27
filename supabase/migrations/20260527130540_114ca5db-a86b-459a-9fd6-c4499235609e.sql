
-- 1. Enable RLS + superadmin-only policies on credit_reminder_rules
ALTER TABLE public.credit_reminder_rules ENABLE ROW LEVEL SECURITY;

CREATE POLICY "crr_select" ON public.credit_reminder_rules
  FOR SELECT TO authenticated USING (public.is_superadmin(auth.uid()));
CREATE POLICY "crr_insert" ON public.credit_reminder_rules
  FOR INSERT TO authenticated WITH CHECK (public.is_superadmin(auth.uid()));
CREATE POLICY "crr_update" ON public.credit_reminder_rules
  FOR UPDATE TO authenticated USING (public.is_superadmin(auth.uid())) WITH CHECK (public.is_superadmin(auth.uid()));
CREATE POLICY "crr_delete" ON public.credit_reminder_rules
  FOR DELETE TO authenticated USING (public.is_superadmin(auth.uid()));

-- 2. Replace vehicle_maintenance policy that uses legacy profiles.role with authoritative is_superadmin()
DROP POLICY IF EXISTS "superadmin_all_maintenance" ON public.vehicle_maintenance;
CREATE POLICY "superadmin_all_maintenance" ON public.vehicle_maintenance
  FOR ALL TO authenticated
  USING (public.is_superadmin(auth.uid()))
  WITH CHECK (public.is_superadmin(auth.uid()));

-- 3. Hide manager_phone / manager_email from anonymous visitors via column-level revocation
REVOKE SELECT (manager_phone, manager_email) ON public.cars FROM anon;
