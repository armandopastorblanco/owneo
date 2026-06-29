
-- 1) waitlist: add policies (RLS enabled, none existed)
CREATE POLICY "waitlist_superadmin_select" ON public.waitlist
  FOR SELECT TO authenticated USING (public.is_superadmin(auth.uid()));
CREATE POLICY "waitlist_superadmin_modify" ON public.waitlist
  FOR ALL TO authenticated
  USING (public.is_superadmin(auth.uid()))
  WITH CHECK (public.is_superadmin(auth.uid()));

-- 2) calendar_blocks: remove city_manager from broad read scope
DROP POLICY IF EXISTS calendar_blocks_select_scoped ON public.calendar_blocks;
CREATE POLICY calendar_blocks_select_scoped ON public.calendar_blocks
  FOR SELECT
  USING (
    public.is_superadmin(auth.uid())
    OR EXISTS (
      SELECT 1 FROM public.validated_participations vp
      WHERE vp.car_id = calendar_blocks.car_id AND vp.user_id = auth.uid()
    )
  );

-- 3) cars: hide manager contact columns from anonymous role
REVOKE SELECT ON public.cars FROM anon;
GRANT SELECT (
  id, name, brand, model, year, price, category, description, luxury_description,
  specifications, image_url, gallery, available_in, is_active, created_at, updated_at,
  max_participations, remaining_participations, participation_price, status, deadline,
  total_km, location_id, technical_sheet, promotion, min_reservation_days,
  max_reservation_days, reservation_advance_days, annual_fee_percent, annual_fee_override,
  participation_duration_years, weeks_per_participation, km_per_participation,
  luxury_description_override, consultation_enabled, slug, matricula, features
) ON public.cars TO anon;

-- 4) participant_documents: column-level UPDATE for authenticated + admin RPC
REVOKE UPDATE ON public.participant_documents FROM authenticated;
GRANT UPDATE (file_url, file_name, file_size, updated_at) ON public.participant_documents TO authenticated;
GRANT UPDATE ON public.participant_documents TO service_role;

CREATE OR REPLACE FUNCTION public.admin_update_document_status(
  _id uuid, _status text, _notes text DEFAULT NULL
) RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  IF NOT public.is_superadmin(auth.uid()) THEN
    RAISE EXCEPTION 'Only superadmins can update document review status';
  END IF;
  UPDATE public.participant_documents
     SET status = _status,
         notes = _notes,
         reviewed_at = now(),
         reviewed_by = auth.uid()
   WHERE id = _id;
END;
$$;
REVOKE ALL ON FUNCTION public.admin_update_document_status(uuid, text, text) FROM PUBLIC;
GRANT EXECUTE ON FUNCTION public.admin_update_document_status(uuid, text, text) TO authenticated;
