
CREATE TABLE public.extra_cost_categories (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  value TEXT NOT NULL UNIQUE,
  label TEXT NOT NULL,
  sort_order INTEGER NOT NULL DEFAULT 0,
  is_active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE public.extra_cost_categories ENABLE ROW LEVEL SECURITY;

CREATE POLICY "ecc_select" ON public.extra_cost_categories
  FOR SELECT TO authenticated USING (true);
CREATE POLICY "ecc_insert" ON public.extra_cost_categories
  FOR INSERT TO authenticated WITH CHECK (is_superadmin(auth.uid()));
CREATE POLICY "ecc_update" ON public.extra_cost_categories
  FOR UPDATE TO authenticated USING (is_superadmin(auth.uid()));
CREATE POLICY "ecc_delete" ON public.extra_cost_categories
  FOR DELETE TO authenticated USING (is_superadmin(auth.uid()));

CREATE TRIGGER extra_cost_categories_updated_at BEFORE UPDATE ON public.extra_cost_categories
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

INSERT INTO public.extra_cost_categories (value, label, sort_order) VALUES
  ('multa', 'Multa', 1),
  ('servicio', 'Servicio', 2),
  ('extra', 'Extra', 3);

-- Quitar restricción fija del trigger validador
CREATE OR REPLACE FUNCTION public.validate_extra_cost_type()
RETURNS TRIGGER LANGUAGE plpgsql SET search_path TO 'public' AS $$
BEGIN
  IF NEW.category IS NULL OR length(trim(NEW.category)) = 0 THEN
    RAISE EXCEPTION 'extra_cost_type category cannot be empty';
  END IF;
  RETURN NEW;
END;
$$;
