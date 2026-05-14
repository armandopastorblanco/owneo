CREATE TABLE IF NOT EXISTS public.consultation_requests (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  car_id UUID REFERENCES public.cars(id) ON DELETE SET NULL,
  car_name TEXT,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  message TEXT,
  status TEXT NOT NULL DEFAULT 'pending',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE public.consultation_requests ENABLE ROW LEVEL SECURITY;

CREATE POLICY "consultation_insert_anyone"
ON public.consultation_requests FOR INSERT
TO anon, authenticated
WITH CHECK (true);

CREATE POLICY "consultation_select_admin"
ON public.consultation_requests FOR SELECT
TO authenticated
USING (public.is_superadmin(auth.uid()));

CREATE POLICY "consultation_update_admin"
ON public.consultation_requests FOR UPDATE
TO authenticated
USING (public.is_superadmin(auth.uid()));

CREATE POLICY "consultation_delete_admin"
ON public.consultation_requests FOR DELETE
TO authenticated
USING (public.is_superadmin(auth.uid()));