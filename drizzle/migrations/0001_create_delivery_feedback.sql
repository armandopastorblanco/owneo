CREATE TABLE public.delivery_feedback (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  rating text NOT NULL,
  contact_email text,
  source text,
  created_at timestamptz NOT NULL DEFAULT now()
);

GRANT INSERT ON public.delivery_feedback TO anon;
GRANT SELECT, INSERT ON public.delivery_feedback TO authenticated;
GRANT ALL ON public.delivery_feedback TO service_role;

ALTER TABLE public.delivery_feedback ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can submit feedback"
  ON public.delivery_feedback FOR INSERT
  TO anon, authenticated
  WITH CHECK (rating IN ('positive','neutral','negative'));

CREATE POLICY "Superadmins can read feedback"
  ON public.delivery_feedback FOR SELECT
  TO authenticated
  USING (public.is_superadmin(auth.uid()));
