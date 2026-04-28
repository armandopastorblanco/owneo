-- ============================================
-- PARTE 1: Limpiar y recrear políticas de participant_documents
-- ============================================

-- Eliminar todas las políticas existentes para evitar conflictos
DROP POLICY IF EXISTS "user_upload_own_documents" ON public.participant_documents;
DROP POLICY IF EXISTS "user_own_documents" ON public.participant_documents;
DROP POLICY IF EXISTS "superadmin_all_participant_documents" ON public.participant_documents;
DROP POLICY IF EXISTS "participant_docs_delete" ON public.participant_documents;
DROP POLICY IF EXISTS "participant_docs_insert" ON public.participant_documents;
DROP POLICY IF EXISTS "participant_docs_select" ON public.participant_documents;
DROP POLICY IF EXISTS "participant_docs_update" ON public.participant_documents;
DROP POLICY IF EXISTS "user_insert_own_documents" ON public.participant_documents;
DROP POLICY IF EXISTS "user_select_own_documents" ON public.participant_documents;
DROP POLICY IF EXISTS "user_update_own_documents" ON public.participant_documents;

-- Asegurar RLS habilitado
ALTER TABLE public.participant_documents ENABLE ROW LEVEL SECURITY;

-- Usuario puede INSERT sus propios documentos (subidos por el propio usuario)
CREATE POLICY "user_insert_own_documents"
  ON public.participant_documents
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

-- Usuario puede SELECT sus propios documentos
CREATE POLICY "user_select_own_documents"
  ON public.participant_documents
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

-- Usuario puede UPDATE sus propios documentos (resubir tras rechazo)
CREATE POLICY "user_update_own_documents"
  ON public.participant_documents
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- Superadmin tiene acceso total
CREATE POLICY "superadmin_all_participant_documents"
  ON public.participant_documents
  FOR ALL
  TO authenticated
  USING (public.is_superadmin(auth.uid()))
  WITH CHECK (public.is_superadmin(auth.uid()));

-- ============================================
-- PARTE 2: Políticas de Storage para bucket 'documents'
-- ============================================

-- Limpiar políticas previas si existen
DROP POLICY IF EXISTS "documents_user_insert_own_kyc" ON storage.objects;
DROP POLICY IF EXISTS "documents_user_select_own_kyc" ON storage.objects;
DROP POLICY IF EXISTS "documents_user_update_own_kyc" ON storage.objects;
DROP POLICY IF EXISTS "documents_user_delete_own_kyc" ON storage.objects;
DROP POLICY IF EXISTS "documents_superadmin_all" ON storage.objects;

-- Usuario autenticado puede subir archivos a kyc/[su-id]/
CREATE POLICY "documents_user_insert_own_kyc"
  ON storage.objects
  FOR INSERT
  TO authenticated
  WITH CHECK (
    bucket_id = 'documents'
    AND (storage.foldername(name))[1] = 'kyc'
    AND (storage.foldername(name))[2] = auth.uid()::text
  );

-- Usuario autenticado puede ver sus propios archivos en kyc/[su-id]/
CREATE POLICY "documents_user_select_own_kyc"
  ON storage.objects
  FOR SELECT
  TO authenticated
  USING (
    bucket_id = 'documents'
    AND (storage.foldername(name))[1] = 'kyc'
    AND (storage.foldername(name))[2] = auth.uid()::text
  );

-- Usuario autenticado puede actualizar sus propios archivos en kyc/[su-id]/
CREATE POLICY "documents_user_update_own_kyc"
  ON storage.objects
  FOR UPDATE
  TO authenticated
  USING (
    bucket_id = 'documents'
    AND (storage.foldername(name))[1] = 'kyc'
    AND (storage.foldername(name))[2] = auth.uid()::text
  );

-- Usuario autenticado puede borrar sus propios archivos en kyc/[su-id]/
CREATE POLICY "documents_user_delete_own_kyc"
  ON storage.objects
  FOR DELETE
  TO authenticated
  USING (
    bucket_id = 'documents'
    AND (storage.foldername(name))[1] = 'kyc'
    AND (storage.foldername(name))[2] = auth.uid()::text
  );

-- Superadmin acceso total al bucket 'documents'
CREATE POLICY "documents_superadmin_all"
  ON storage.objects
  FOR ALL
  TO authenticated
  USING (
    bucket_id = 'documents' AND public.is_superadmin(auth.uid())
  )
  WITH CHECK (
    bucket_id = 'documents' AND public.is_superadmin(auth.uid())
  );