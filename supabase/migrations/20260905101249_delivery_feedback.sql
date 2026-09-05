-- Tabla para la recogida de opinión sobre la entrega (email O4 del onboarding del CRM).
-- La página pública /opinion (/en/feedback) inserta una fila por visita, sin autenticación.
-- El cruce con el contacto se hace por email (clave de deduplicación del CRM), no por UUID.
CREATE TABLE IF NOT EXISTS public.delivery_feedback (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  rating TEXT NOT NULL CHECK (rating IN ('positive', 'neutral', 'negative')),
  contact_email TEXT,
  reservation_id UUID,
  user_id UUID,
  source TEXT NOT NULL DEFAULT 'crm_o4',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE public.delivery_feedback ENABLE ROW LEVEL SECURITY;

-- Alta anónima: la página se abre desde un email sin sesión.
CREATE POLICY "delivery_feedback_insert_anyone"
ON public.delivery_feedback FOR INSERT
TO anon, authenticated
WITH CHECK (true);

-- Lectura solo para administración.
CREATE POLICY "delivery_feedback_select_admin"
ON public.delivery_feedback FOR SELECT
TO authenticated
USING (public.is_superadmin(auth.uid()));

-- Sin políticas de UPDATE ni DELETE: el histórico no se edita ni se borra desde el cliente.
