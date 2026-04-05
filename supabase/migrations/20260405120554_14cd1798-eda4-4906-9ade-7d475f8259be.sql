
-- Helper functions
CREATE OR REPLACE FUNCTION public.is_superadmin(_user_id UUID DEFAULT auth.uid())
RETURNS BOOLEAN
LANGUAGE sql STABLE SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.user_roles
    WHERE user_id = _user_id AND role = 'superadmin'
  );
$$;

CREATE OR REPLACE FUNCTION public.is_city_manager(_user_id UUID DEFAULT auth.uid())
RETURNS BOOLEAN
LANGUAGE sql STABLE SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.user_roles
    WHERE user_id = _user_id AND role IN ('superadmin', 'city_manager')
  );
$$;

CREATE OR REPLACE FUNCTION public.get_user_city_id(_user_id UUID DEFAULT auth.uid())
RETURNS UUID
LANGUAGE sql STABLE SECURITY DEFINER
SET search_path = public
AS $$
  SELECT city_id FROM public.profiles WHERE id = _user_id;
$$;

-- =============================================
-- DROP ALL EXISTING POLICIES
-- =============================================
DO $$ 
DECLARE
  _tbl TEXT;
  _pol RECORD;
BEGIN
  FOR _tbl IN SELECT unnest(ARRAY[
    'profiles','cars','locations','kyc_documents','participation_requests',
    'validated_participations','contracts','reservations','vehicle_inspections',
    'bank_reconciliation','votes','audit_logs','contacts','content_sections',
    'featured_cars','hero_slides','participations','user_roles'
  ]) LOOP
    FOR _pol IN 
      SELECT policyname FROM pg_policies WHERE schemaname = 'public' AND tablename = _tbl
    LOOP
      EXECUTE format('DROP POLICY IF EXISTS %I ON public.%I', _pol.policyname, _tbl);
    END LOOP;
  END LOOP;
END $$;

-- =============================================
-- PROFILES
-- =============================================
CREATE POLICY "profiles_select" ON public.profiles FOR SELECT
  TO authenticated USING (id = auth.uid() OR is_superadmin(auth.uid()));
CREATE POLICY "profiles_insert" ON public.profiles FOR INSERT
  TO authenticated WITH CHECK (id = auth.uid());
CREATE POLICY "profiles_update" ON public.profiles FOR UPDATE
  TO authenticated USING (id = auth.uid() OR is_superadmin(auth.uid()));

-- =============================================
-- CARS (public read, superadmin write)
-- =============================================
CREATE POLICY "cars_select" ON public.cars FOR SELECT
  TO anon, authenticated USING (is_active = true OR is_superadmin(auth.uid()));
CREATE POLICY "cars_insert" ON public.cars FOR INSERT
  TO authenticated WITH CHECK (is_superadmin(auth.uid()));
CREATE POLICY "cars_update" ON public.cars FOR UPDATE
  TO authenticated USING (is_superadmin(auth.uid()));
CREATE POLICY "cars_delete" ON public.cars FOR DELETE
  TO authenticated USING (is_superadmin(auth.uid()));

-- =============================================
-- LOCATIONS (public read, superadmin write)
-- =============================================
CREATE POLICY "locations_select" ON public.locations FOR SELECT
  TO anon, authenticated USING (is_active = true OR is_superadmin(auth.uid()));
CREATE POLICY "locations_insert" ON public.locations FOR INSERT
  TO authenticated WITH CHECK (is_superadmin(auth.uid()));
CREATE POLICY "locations_update" ON public.locations FOR UPDATE
  TO authenticated USING (is_superadmin(auth.uid()));
CREATE POLICY "locations_delete" ON public.locations FOR DELETE
  TO authenticated USING (is_superadmin(auth.uid()));

-- =============================================
-- KYC_DOCUMENTS
-- =============================================
CREATE POLICY "kyc_select" ON public.kyc_documents FOR SELECT
  TO authenticated USING (user_id = auth.uid() OR is_superadmin(auth.uid()));
CREATE POLICY "kyc_insert" ON public.kyc_documents FOR INSERT
  TO authenticated WITH CHECK (user_id = auth.uid());
CREATE POLICY "kyc_update" ON public.kyc_documents FOR UPDATE
  TO authenticated USING (is_superadmin(auth.uid()));
CREATE POLICY "kyc_delete" ON public.kyc_documents FOR DELETE
  TO authenticated USING (is_superadmin(auth.uid()));

-- =============================================
-- PARTICIPATION_REQUESTS
-- =============================================
CREATE POLICY "part_req_select" ON public.participation_requests FOR SELECT
  TO authenticated USING (user_id = auth.uid() OR is_superadmin(auth.uid()));
CREATE POLICY "part_req_insert" ON public.participation_requests FOR INSERT
  TO authenticated WITH CHECK (user_id = auth.uid());
CREATE POLICY "part_req_update" ON public.participation_requests FOR UPDATE
  TO authenticated USING (is_superadmin(auth.uid()));
CREATE POLICY "part_req_delete" ON public.participation_requests FOR DELETE
  TO authenticated USING (is_superadmin(auth.uid()));

-- =============================================
-- VALIDATED_PARTICIPATIONS
-- =============================================
CREATE POLICY "val_part_select" ON public.validated_participations FOR SELECT
  TO authenticated USING (user_id = auth.uid() OR is_superadmin(auth.uid()));
CREATE POLICY "val_part_insert" ON public.validated_participations FOR INSERT
  TO authenticated WITH CHECK (is_superadmin(auth.uid()));
CREATE POLICY "val_part_update" ON public.validated_participations FOR UPDATE
  TO authenticated USING (is_superadmin(auth.uid()));
CREATE POLICY "val_part_delete" ON public.validated_participations FOR DELETE
  TO authenticated USING (is_superadmin(auth.uid()));

-- =============================================
-- CONTRACTS
-- =============================================
CREATE POLICY "contracts_select" ON public.contracts FOR SELECT
  TO authenticated USING (user_id = auth.uid() OR is_superadmin(auth.uid()));
CREATE POLICY "contracts_insert" ON public.contracts FOR INSERT
  TO authenticated WITH CHECK (is_superadmin(auth.uid()));
CREATE POLICY "contracts_update" ON public.contracts FOR UPDATE
  TO authenticated USING (is_superadmin(auth.uid()));
CREATE POLICY "contracts_delete" ON public.contracts FOR DELETE
  TO authenticated USING (is_superadmin(auth.uid()));

-- =============================================
-- RESERVATIONS
-- =============================================
CREATE POLICY "reservations_select" ON public.reservations FOR SELECT
  TO authenticated USING (
    user_id = auth.uid()
    OR is_superadmin(auth.uid())
    OR (is_city_manager(auth.uid()) AND EXISTS (
      SELECT 1 FROM public.cars c WHERE c.id = car_id AND c.location_id = get_user_city_id(auth.uid())
    ))
  );
CREATE POLICY "reservations_insert" ON public.reservations FOR INSERT
  TO authenticated WITH CHECK (user_id = auth.uid() OR is_superadmin(auth.uid()));
CREATE POLICY "reservations_update" ON public.reservations FOR UPDATE
  TO authenticated USING (is_superadmin(auth.uid()));
CREATE POLICY "reservations_delete" ON public.reservations FOR DELETE
  TO authenticated USING (is_superadmin(auth.uid()));

-- =============================================
-- VEHICLE_INSPECTIONS
-- =============================================
CREATE POLICY "inspections_select" ON public.vehicle_inspections FOR SELECT
  TO authenticated USING (
    is_superadmin(auth.uid())
    OR (is_city_manager(auth.uid()) AND EXISTS (
      SELECT 1 FROM public.cars c WHERE c.id = car_id AND c.location_id = get_user_city_id(auth.uid())
    ))
  );
CREATE POLICY "inspections_insert" ON public.vehicle_inspections FOR INSERT
  TO authenticated WITH CHECK (
    is_superadmin(auth.uid())
    OR (is_city_manager(auth.uid()) AND EXISTS (
      SELECT 1 FROM public.cars c WHERE c.id = car_id AND c.location_id = get_user_city_id(auth.uid())
    ))
  );
CREATE POLICY "inspections_update" ON public.vehicle_inspections FOR UPDATE
  TO authenticated USING (is_superadmin(auth.uid()));
CREATE POLICY "inspections_delete" ON public.vehicle_inspections FOR DELETE
  TO authenticated USING (is_superadmin(auth.uid()));

-- =============================================
-- BANK_RECONCILIATION
-- =============================================
CREATE POLICY "bank_recon_select" ON public.bank_reconciliation FOR SELECT
  TO authenticated USING (user_id = auth.uid() OR is_superadmin(auth.uid()));
CREATE POLICY "bank_recon_insert" ON public.bank_reconciliation FOR INSERT
  TO authenticated WITH CHECK (is_superadmin(auth.uid()));
CREATE POLICY "bank_recon_update" ON public.bank_reconciliation FOR UPDATE
  TO authenticated USING (is_superadmin(auth.uid()));
CREATE POLICY "bank_recon_delete" ON public.bank_reconciliation FOR DELETE
  TO authenticated USING (is_superadmin(auth.uid()));

-- =============================================
-- VOTES
-- =============================================
CREATE POLICY "votes_select" ON public.votes FOR SELECT
  TO authenticated USING (true);
CREATE POLICY "votes_insert" ON public.votes FOR INSERT
  TO authenticated WITH CHECK (user_id = auth.uid());
CREATE POLICY "votes_update" ON public.votes FOR UPDATE
  TO authenticated USING (user_id = auth.uid() OR is_superadmin(auth.uid()));
CREATE POLICY "votes_delete" ON public.votes FOR DELETE
  TO authenticated USING (user_id = auth.uid() OR is_superadmin(auth.uid()));

-- =============================================
-- AUDIT_LOGS (superadmin read only)
-- =============================================
CREATE POLICY "audit_select" ON public.audit_logs FOR SELECT
  TO authenticated USING (is_superadmin(auth.uid()));

-- Secure audit log insertion function
CREATE OR REPLACE FUNCTION public.insert_audit_log(
  _action TEXT,
  _target_table TEXT DEFAULT NULL,
  _target_id TEXT DEFAULT NULL,
  _details JSONB DEFAULT NULL
)
RETURNS UUID
LANGUAGE plpgsql SECURITY DEFINER
SET search_path = public
AS $$
DECLARE _log_id UUID;
BEGIN
  INSERT INTO public.audit_logs (admin_id, action, target_table, target_id, details)
  VALUES (auth.uid(), _action, _target_table, _target_id, _details)
  RETURNING id INTO _log_id;
  RETURN _log_id;
END;
$$;

-- =============================================
-- CONTACTS (keep existing logic)
-- =============================================
CREATE POLICY "contacts_select" ON public.contacts FOR SELECT
  TO authenticated USING (is_superadmin(auth.uid()));
CREATE POLICY "contacts_insert" ON public.contacts FOR INSERT
  TO anon, authenticated WITH CHECK (true);
CREATE POLICY "contacts_update" ON public.contacts FOR UPDATE
  TO authenticated USING (is_superadmin(auth.uid()));

-- =============================================
-- CONTENT_SECTIONS
-- =============================================
CREATE POLICY "content_select" ON public.content_sections FOR SELECT
  TO anon, authenticated USING (is_active = true OR is_superadmin(auth.uid()));
CREATE POLICY "content_insert" ON public.content_sections FOR INSERT
  TO authenticated WITH CHECK (is_superadmin(auth.uid()));
CREATE POLICY "content_update" ON public.content_sections FOR UPDATE
  TO authenticated USING (is_superadmin(auth.uid()));
CREATE POLICY "content_delete" ON public.content_sections FOR DELETE
  TO authenticated USING (is_superadmin(auth.uid()));

-- =============================================
-- FEATURED_CARS
-- =============================================
CREATE POLICY "featured_select" ON public.featured_cars FOR SELECT
  TO anon, authenticated USING (is_active = true OR is_superadmin(auth.uid()));
CREATE POLICY "featured_insert" ON public.featured_cars FOR INSERT
  TO authenticated WITH CHECK (is_superadmin(auth.uid()));
CREATE POLICY "featured_update" ON public.featured_cars FOR UPDATE
  TO authenticated USING (is_superadmin(auth.uid()));
CREATE POLICY "featured_delete" ON public.featured_cars FOR DELETE
  TO authenticated USING (is_superadmin(auth.uid()));

-- =============================================
-- HERO_SLIDES
-- =============================================
CREATE POLICY "hero_select" ON public.hero_slides FOR SELECT
  TO anon, authenticated USING (is_active = true OR is_superadmin(auth.uid()));
CREATE POLICY "hero_insert" ON public.hero_slides FOR INSERT
  TO authenticated WITH CHECK (is_superadmin(auth.uid()));
CREATE POLICY "hero_update" ON public.hero_slides FOR UPDATE
  TO authenticated USING (is_superadmin(auth.uid()));
CREATE POLICY "hero_delete" ON public.hero_slides FOR DELETE
  TO authenticated USING (is_superadmin(auth.uid()));

-- =============================================
-- PARTICIPATIONS (legacy table)
-- =============================================
CREATE POLICY "participations_select" ON public.participations FOR SELECT
  TO authenticated USING (user_id = auth.uid() OR is_superadmin(auth.uid()));
CREATE POLICY "participations_insert" ON public.participations FOR INSERT
  TO authenticated WITH CHECK (user_id = auth.uid());
CREATE POLICY "participations_update" ON public.participations FOR UPDATE
  TO authenticated USING (is_superadmin(auth.uid()));

-- =============================================
-- USER_ROLES
-- =============================================
CREATE POLICY "roles_select" ON public.user_roles FOR SELECT
  TO authenticated USING (is_superadmin(auth.uid()) OR user_id = auth.uid());
CREATE POLICY "roles_insert" ON public.user_roles FOR INSERT
  TO authenticated WITH CHECK (is_superadmin(auth.uid()));
CREATE POLICY "roles_update" ON public.user_roles FOR UPDATE
  TO authenticated USING (is_superadmin(auth.uid()));
CREATE POLICY "roles_delete" ON public.user_roles FOR DELETE
  TO authenticated USING (is_superadmin(auth.uid()));
