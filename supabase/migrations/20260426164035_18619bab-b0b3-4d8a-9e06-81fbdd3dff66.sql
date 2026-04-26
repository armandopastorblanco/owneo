-- Tabla de tipos de documentos configurables
CREATE TABLE IF NOT EXISTS public.document_types (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  description TEXT,
  is_required BOOLEAN NOT NULL DEFAULT false,
  applies_to TEXT NOT NULL DEFAULT 'all',
  sort_order INTEGER NOT NULL DEFAULT 0,
  is_active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Tipos por defecto
INSERT INTO public.document_types (name, description, is_required, sort_order) VALUES
('DNI / Pasaporte', 'Documento nacional de identidad o pasaporte vigente', true, 1),
('Carnet de conducir', 'Permiso de conducción vigente', true, 2),
('Contrato de participación', 'Contrato firmado de participación OWNEO', true, 3),
('Documentación bancaria', 'IBAN y justificante bancario', true, 4),
('Seguro de responsabilidad civil', 'Póliza de seguro vigente', true, 5),
('Justificante de ingresos', 'Nómina, declaración de renta o equivalente', false, 6),
('Otros documentos', 'Cualquier otro documento relevante', false, 7);

-- Tabla de documentos por participante
CREATE TABLE IF NOT EXISTS public.participant_documents (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL,
  document_type_id UUID NOT NULL REFERENCES public.document_types(id) ON DELETE RESTRICT,
  file_url TEXT NOT NULL,
  file_name TEXT,
  file_size INTEGER,
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'validated', 'rejected')),
  notes TEXT,
  reviewed_by UUID,
  reviewed_at TIMESTAMPTZ,
  uploaded_by TEXT NOT NULL DEFAULT 'admin' CHECK (uploaded_by IN ('admin', 'user')),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_participant_documents_user ON public.participant_documents(user_id);
CREATE INDEX IF NOT EXISTS idx_participant_documents_type ON public.participant_documents(document_type_id);

-- Triggers updated_at
CREATE TRIGGER trg_document_types_updated_at
BEFORE UPDATE ON public.document_types
FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER trg_participant_documents_updated_at
BEFORE UPDATE ON public.participant_documents
FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- RLS
ALTER TABLE public.document_types ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.participant_documents ENABLE ROW LEVEL SECURITY;

-- document_types policies
CREATE POLICY "doc_types_select" ON public.document_types
  FOR SELECT TO authenticated, anon
  USING (is_active = true OR public.is_superadmin(auth.uid()));

CREATE POLICY "doc_types_insert" ON public.document_types
  FOR INSERT TO authenticated
  WITH CHECK (public.is_superadmin(auth.uid()));

CREATE POLICY "doc_types_update" ON public.document_types
  FOR UPDATE TO authenticated
  USING (public.is_superadmin(auth.uid()));

CREATE POLICY "doc_types_delete" ON public.document_types
  FOR DELETE TO authenticated
  USING (public.is_superadmin(auth.uid()));

-- participant_documents policies
CREATE POLICY "participant_docs_select" ON public.participant_documents
  FOR SELECT TO authenticated
  USING (user_id = auth.uid() OR public.is_superadmin(auth.uid()));

CREATE POLICY "participant_docs_insert" ON public.participant_documents
  FOR INSERT TO authenticated
  WITH CHECK (
    public.is_superadmin(auth.uid())
    OR (user_id = auth.uid() AND uploaded_by = 'user')
  );

CREATE POLICY "participant_docs_update" ON public.participant_documents
  FOR UPDATE TO authenticated
  USING (public.is_superadmin(auth.uid()));

CREATE POLICY "participant_docs_delete" ON public.participant_documents
  FOR DELETE TO authenticated
  USING (public.is_superadmin(auth.uid()));

-- Storage policies for 'documents' bucket
-- Admins manage all files, users manage files inside their own user_id/ prefix
CREATE POLICY "documents_admin_all" ON storage.objects
  FOR ALL TO authenticated
  USING (bucket_id = 'documents' AND public.is_superadmin(auth.uid()))
  WITH CHECK (bucket_id = 'documents' AND public.is_superadmin(auth.uid()));

CREATE POLICY "documents_user_select_own" ON storage.objects
  FOR SELECT TO authenticated
  USING (bucket_id = 'documents' AND auth.uid()::text = (storage.foldername(name))[1]);

CREATE POLICY "documents_user_insert_own" ON storage.objects
  FOR INSERT TO authenticated
  WITH CHECK (bucket_id = 'documents' AND auth.uid()::text = (storage.foldername(name))[1]);

CREATE POLICY "documents_user_update_own" ON storage.objects
  FOR UPDATE TO authenticated
  USING (bucket_id = 'documents' AND auth.uid()::text = (storage.foldername(name))[1]);