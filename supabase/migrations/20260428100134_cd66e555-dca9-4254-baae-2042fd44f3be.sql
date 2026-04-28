-- Allow authenticated users to view public vehicle document types
CREATE POLICY "auth_view_public_vehicle_doc_types"
ON public.vehicle_document_types
FOR SELECT
TO authenticated
USING (is_public = true OR is_superadmin(auth.uid()));

-- Allow authenticated users to view public documents of cars they have a validated participation in
CREATE POLICY "user_view_own_car_public_documents"
ON public.vehicle_documents
FOR SELECT
TO authenticated
USING (
  EXISTS (
    SELECT 1 FROM public.validated_participations vp
    WHERE vp.car_id = vehicle_documents.car_id
      AND vp.user_id = auth.uid()
  )
  AND EXISTS (
    SELECT 1 FROM public.vehicle_document_types vdt
    WHERE vdt.id = vehicle_documents.document_type_id
      AND vdt.is_public = true
  )
);