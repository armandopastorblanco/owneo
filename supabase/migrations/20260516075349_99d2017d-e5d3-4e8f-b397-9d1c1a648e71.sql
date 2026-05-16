
-- 1. Prevent role escalation on profiles
DROP POLICY IF EXISTS profiles_update ON public.profiles;
CREATE POLICY profiles_update ON public.profiles
  FOR UPDATE TO authenticated
  USING ((id = auth.uid()) OR public.is_superadmin(auth.uid()))
  WITH CHECK (
    public.is_superadmin(auth.uid())
    OR (id = auth.uid() AND role = (SELECT role FROM public.profiles WHERE id = auth.uid()))
  );

-- Defense-in-depth trigger (function already exists)
DROP TRIGGER IF EXISTS trg_prevent_profile_role_change ON public.profiles;
CREATE TRIGGER trg_prevent_profile_role_change
  BEFORE UPDATE ON public.profiles
  FOR EACH ROW EXECUTE FUNCTION public.prevent_profile_role_change();

-- 2. Restrict participations insert to status='pending'
DROP POLICY IF EXISTS participations_insert ON public.participations;
CREATE POLICY participations_insert ON public.participations
  FOR INSERT TO authenticated
  WITH CHECK (
    user_id = auth.uid()
    AND status = 'pending'::participation_status
  );

-- 3. Move admin_notes out of public cars table
CREATE TABLE IF NOT EXISTS public.car_admin_notes (
  car_id uuid PRIMARY KEY REFERENCES public.cars(id) ON DELETE CASCADE,
  notes text,
  updated_at timestamptz NOT NULL DEFAULT now(),
  updated_by uuid
);

INSERT INTO public.car_admin_notes (car_id, notes)
SELECT id, admin_notes FROM public.cars WHERE admin_notes IS NOT NULL
ON CONFLICT (car_id) DO NOTHING;

ALTER TABLE public.cars DROP COLUMN IF EXISTS admin_notes;

ALTER TABLE public.car_admin_notes ENABLE ROW LEVEL SECURITY;

CREATE POLICY car_admin_notes_select ON public.car_admin_notes
  FOR SELECT TO authenticated
  USING (public.is_superadmin(auth.uid()));
CREATE POLICY car_admin_notes_insert ON public.car_admin_notes
  FOR INSERT TO authenticated
  WITH CHECK (public.is_superadmin(auth.uid()));
CREATE POLICY car_admin_notes_update ON public.car_admin_notes
  FOR UPDATE TO authenticated
  USING (public.is_superadmin(auth.uid()))
  WITH CHECK (public.is_superadmin(auth.uid()));
CREATE POLICY car_admin_notes_delete ON public.car_admin_notes
  FOR DELETE TO authenticated
  USING (public.is_superadmin(auth.uid()));

-- 4. Public read on images bucket (explicit)
DROP POLICY IF EXISTS "Public can view images bucket" ON storage.objects;
CREATE POLICY "Public can view images bucket" ON storage.objects
  FOR SELECT TO anon, authenticated
  USING (bucket_id = 'images');

-- 5. Allow authenticated users to read calendar blocks for availability display
DROP POLICY IF EXISTS calendar_blocks_select_auth ON public.calendar_blocks;
CREATE POLICY calendar_blocks_select_auth ON public.calendar_blocks
  FOR SELECT TO authenticated
  USING (true);

-- 6. Replace legacy profiles.role='superadmin' policies with user_roles-based checks
DROP POLICY IF EXISTS superadmin_all_calendar_blocks ON public.calendar_blocks;
CREATE POLICY superadmin_all_calendar_blocks ON public.calendar_blocks
  FOR ALL TO authenticated
  USING (public.is_superadmin(auth.uid()))
  WITH CHECK (public.is_superadmin(auth.uid()));

DROP POLICY IF EXISTS superadmin_all_document_types ON public.document_types;
CREATE POLICY superadmin_all_document_types ON public.document_types
  FOR ALL TO authenticated
  USING (public.is_superadmin(auth.uid()))
  WITH CHECK (public.is_superadmin(auth.uid()));

DROP POLICY IF EXISTS superadmin_all_vehicle_document_types ON public.vehicle_document_types;
CREATE POLICY superadmin_all_vehicle_document_types ON public.vehicle_document_types
  FOR ALL TO authenticated
  USING (public.is_superadmin(auth.uid()))
  WITH CHECK (public.is_superadmin(auth.uid()));

DROP POLICY IF EXISTS superadmin_all_vehicle_documents ON public.vehicle_documents;
CREATE POLICY superadmin_all_vehicle_documents ON public.vehicle_documents
  FOR ALL TO authenticated
  USING (public.is_superadmin(auth.uid()))
  WITH CHECK (public.is_superadmin(auth.uid()));

DROP POLICY IF EXISTS superadmin_all_inspections ON public.vehicle_inspections;
CREATE POLICY superadmin_all_inspections ON public.vehicle_inspections
  FOR ALL TO authenticated
  USING (public.is_superadmin(auth.uid()))
  WITH CHECK (public.is_superadmin(auth.uid()));
