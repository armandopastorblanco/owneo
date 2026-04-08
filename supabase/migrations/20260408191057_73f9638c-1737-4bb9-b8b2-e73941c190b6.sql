
-- 1. Modify reservations table
ALTER TABLE public.reservations
  ALTER COLUMN credits_used TYPE NUMERIC USING credits_used::NUMERIC,
  ALTER COLUMN credits_used SET NOT NULL,
  ADD COLUMN IF NOT EXISTS credit_multiplier NUMERIC DEFAULT 1.0,
  ADD COLUMN IF NOT EXISTS is_peak_period BOOLEAN DEFAULT false,
  ADD COLUMN IF NOT EXISTS updated_at TIMESTAMPTZ DEFAULT NOW();

-- Drop old is_red_period column (replaced by is_peak_period)
ALTER TABLE public.reservations DROP COLUMN IF EXISTS is_red_period;

-- Drop old validation trigger if exists and replace with a new one
DROP TRIGGER IF EXISTS validate_reservation_trigger ON public.reservations;

CREATE OR REPLACE FUNCTION public.validate_reservation()
RETURNS trigger LANGUAGE plpgsql SET search_path TO 'public' AS $function$
BEGIN
  IF NEW.status IS NOT NULL AND NEW.status NOT IN ('confirmed', 'cancelled', 'completed') THEN
    RAISE EXCEPTION 'Invalid reservation status: %', NEW.status;
  END IF;
  RETURN NEW;
END;
$function$;

CREATE TRIGGER validate_reservation_trigger
  BEFORE INSERT OR UPDATE ON public.reservations
  FOR EACH ROW EXECUTE FUNCTION public.validate_reservation();

-- Add updated_at trigger for reservations
CREATE TRIGGER update_reservations_updated_at
  BEFORE UPDATE ON public.reservations
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- 2. Create credit_rules table
CREATE TABLE public.credit_rules (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  description TEXT,
  start_date DATE,
  end_date DATE,
  is_recurring BOOLEAN DEFAULT true,
  months INTEGER[],
  multiplier NUMERIC NOT NULL DEFAULT 1.0,
  credits_per_day NUMERIC NOT NULL DEFAULT 1.0,
  applies_to_all BOOLEAN DEFAULT true,
  car_ids UUID[],
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE public.credit_rules ENABLE ROW LEVEL SECURITY;

-- Public read for active rules
CREATE POLICY "credit_rules_select" ON public.credit_rules
  FOR SELECT TO anon, authenticated
  USING (is_active = true OR is_superadmin(auth.uid()));

CREATE POLICY "credit_rules_insert" ON public.credit_rules
  FOR INSERT TO authenticated
  WITH CHECK (is_superadmin(auth.uid()));

CREATE POLICY "credit_rules_update" ON public.credit_rules
  FOR UPDATE TO authenticated
  USING (is_superadmin(auth.uid()));

CREATE POLICY "credit_rules_delete" ON public.credit_rules
  FOR DELETE TO authenticated
  USING (is_superadmin(auth.uid()));

CREATE TRIGGER update_credit_rules_updated_at
  BEFORE UPDATE ON public.credit_rules
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- 3. Add credit tracking columns to validated_participations
ALTER TABLE public.validated_participations
  ADD COLUMN IF NOT EXISTS credits_per_year NUMERIC DEFAULT 28,
  ADD COLUMN IF NOT EXISTS credits_used_this_year NUMERIC DEFAULT 0,
  ADD COLUMN IF NOT EXISTS credits_reset_date DATE;
