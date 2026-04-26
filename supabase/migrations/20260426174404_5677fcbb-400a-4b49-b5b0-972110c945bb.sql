
-- Tabla de tipos de costes extra
CREATE TABLE public.extra_cost_types (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  category TEXT NOT NULL DEFAULT 'multa',
  description TEXT,
  default_amount NUMERIC,
  is_active BOOLEAN NOT NULL DEFAULT true,
  sort_order INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE public.extra_cost_types ENABLE ROW LEVEL SECURITY;

CREATE POLICY "extra_cost_types_select" ON public.extra_cost_types
  FOR SELECT TO authenticated USING (true);
CREATE POLICY "extra_cost_types_insert" ON public.extra_cost_types
  FOR INSERT TO authenticated WITH CHECK (is_superadmin(auth.uid()));
CREATE POLICY "extra_cost_types_update" ON public.extra_cost_types
  FOR UPDATE TO authenticated USING (is_superadmin(auth.uid()));
CREATE POLICY "extra_cost_types_delete" ON public.extra_cost_types
  FOR DELETE TO authenticated USING (is_superadmin(auth.uid()));

CREATE TRIGGER extra_cost_types_updated_at BEFORE UPDATE ON public.extra_cost_types
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- Validación categoría
CREATE OR REPLACE FUNCTION public.validate_extra_cost_type()
RETURNS TRIGGER LANGUAGE plpgsql SET search_path TO 'public' AS $$
BEGIN
  IF NEW.category NOT IN ('multa','servicio','extra') THEN
    RAISE EXCEPTION 'Invalid extra_cost_type category: %', NEW.category;
  END IF;
  RETURN NEW;
END;
$$;
CREATE TRIGGER extra_cost_types_validate BEFORE INSERT OR UPDATE ON public.extra_cost_types
  FOR EACH ROW EXECUTE FUNCTION public.validate_extra_cost_type();

-- Extender bank_reconciliation
ALTER TABLE public.bank_reconciliation
  ADD COLUMN payment_type TEXT NOT NULL DEFAULT 'participation',
  ADD COLUMN description TEXT,
  ADD COLUMN extra_cost_type_id UUID REFERENCES public.extra_cost_types(id) ON DELETE SET NULL,
  ADD COLUMN due_date DATE,
  ALTER COLUMN participation_request_id DROP NOT NULL;

-- Actualizar validador para aceptar payment_type
CREATE OR REPLACE FUNCTION public.validate_bank_reconciliation()
RETURNS TRIGGER LANGUAGE plpgsql SET search_path TO 'public' AS $$
BEGIN
  IF NEW.status IS NOT NULL AND NEW.status NOT IN ('pending','matched','validated','failed') THEN
    RAISE EXCEPTION 'Invalid bank_reconciliation status: %', NEW.status;
  END IF;
  IF NEW.payment_type IS NOT NULL AND NEW.payment_type NOT IN ('signal','participation','annual_fee','extra_cost') THEN
    RAISE EXCEPTION 'Invalid payment_type: %', NEW.payment_type;
  END IF;
  RETURN NEW;
END;
$$;

-- Semillas iniciales de costes extra
INSERT INTO public.extra_cost_types (name, category, description, sort_order) VALUES
  ('Multa de tráfico', 'multa', 'Multas recibidas durante la reserva', 1),
  ('Kilometraje extra', 'extra', 'Km adicionales fuera del límite incluido', 2),
  ('Cancelación tardía', 'multa', 'Cancelación de reserva fuera del plazo permitido', 3),
  ('Limpieza', 'servicio', 'Limpieza adicional del vehículo', 4),
  ('Daños', 'multa', 'Reparación de daños al vehículo', 5);
