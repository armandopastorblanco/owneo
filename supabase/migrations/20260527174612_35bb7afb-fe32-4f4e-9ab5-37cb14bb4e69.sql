
-- 1. validated_participations new columns
ALTER TABLE public.validated_participations
  ADD COLUMN IF NOT EXISTS standard_credits_per_year INTEGER NOT NULL DEFAULT 21,
  ADD COLUMN IF NOT EXISTS premium_credits_per_year INTEGER NOT NULL DEFAULT 7,
  ADD COLUMN IF NOT EXISTS standard_credits_remaining INTEGER NOT NULL DEFAULT 21,
  ADD COLUMN IF NOT EXISTS premium_credits_remaining INTEGER NOT NULL DEFAULT 7,
  ADD COLUMN IF NOT EXISTS standard_credits_used_this_year INTEGER NOT NULL DEFAULT 0,
  ADD COLUMN IF NOT EXISTS premium_credits_used_this_year INTEGER NOT NULL DEFAULT 0;

COMMENT ON COLUMN public.validated_participations.credits_per_year IS 'DEPRECATED: use standard_credits_per_year + premium_credits_per_year';
COMMENT ON COLUMN public.validated_participations.credits_remaining IS 'DEPRECATED: use standard_credits_remaining + premium_credits_remaining';
COMMENT ON COLUMN public.validated_participations.credits_used_this_year IS 'DEPRECATED: use standard_credits_used_this_year + premium_credits_used_this_year';

UPDATE public.validated_participations
SET standard_credits_per_year = 21,
    premium_credits_per_year = 7,
    standard_credits_remaining = 21,
    premium_credits_remaining = 7,
    standard_credits_used_this_year = 0,
    premium_credits_used_this_year = 0;

-- 2. reservations new columns
ALTER TABLE public.reservations
  ADD COLUMN IF NOT EXISTS reservation_type TEXT NOT NULL DEFAULT 'standard',
  ADD COLUMN IF NOT EXISTS standard_credits_used INTEGER NOT NULL DEFAULT 0,
  ADD COLUMN IF NOT EXISTS premium_credits_used INTEGER NOT NULL DEFAULT 0;

ALTER TABLE public.reservations
  DROP CONSTRAINT IF EXISTS reservations_reservation_type_check;
ALTER TABLE public.reservations
  ADD CONSTRAINT reservations_reservation_type_check CHECK (reservation_type IN ('standard','premium'));

UPDATE public.reservations
SET reservation_type = CASE WHEN is_peak_period THEN 'premium' ELSE 'standard' END,
    premium_credits_used = CASE WHEN is_peak_period THEN COALESCE(credits_used,0)::int ELSE 0 END,
    standard_credits_used = CASE WHEN is_peak_period THEN 0 ELSE COALESCE(credits_used,0)::int END;

-- 3. credit_rules: is_premium_period
ALTER TABLE public.credit_rules
  ADD COLUMN IF NOT EXISTS is_premium_period BOOLEAN NOT NULL DEFAULT true;

UPDATE public.credit_rules SET is_premium_period = true WHERE is_active = true AND multiplier > 1;

-- 4. Rewrite trigger function
CREATE OR REPLACE FUNCTION public.handle_reservation_credits()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public'
AS $function$
DECLARE
  v_vp_id UUID;
  v_std_used INTEGER;
  v_prem_used INTEGER;
BEGIN
  IF TG_OP = 'INSERT' AND NEW.status = 'confirmed' THEN
    v_std_used := COALESCE(NEW.standard_credits_used, 0);
    v_prem_used := COALESCE(NEW.premium_credits_used, 0);

    SELECT id INTO v_vp_id
    FROM validated_participations
    WHERE user_id = NEW.user_id AND car_id = NEW.car_id
    ORDER BY participation_number ASC LIMIT 1;

    IF v_vp_id IS NOT NULL THEN
      UPDATE validated_participations
      SET standard_credits_remaining = GREATEST(0, standard_credits_remaining - v_std_used),
          standard_credits_used_this_year = standard_credits_used_this_year + v_std_used,
          premium_credits_remaining = GREATEST(0, premium_credits_remaining - v_prem_used),
          premium_credits_used_this_year = premium_credits_used_this_year + v_prem_used
      WHERE id = v_vp_id;
    END IF;
  END IF;

  IF TG_OP = 'UPDATE' THEN
    -- Transition into confirmed
    IF NEW.status = 'confirmed' AND OLD.status IS DISTINCT FROM 'confirmed' THEN
      v_std_used := COALESCE(NEW.standard_credits_used, 0);
      v_prem_used := COALESCE(NEW.premium_credits_used, 0);

      SELECT id INTO v_vp_id
      FROM validated_participations
      WHERE user_id = NEW.user_id AND car_id = NEW.car_id
      ORDER BY participation_number ASC LIMIT 1;

      IF v_vp_id IS NOT NULL THEN
        UPDATE validated_participations
        SET standard_credits_remaining = GREATEST(0, standard_credits_remaining - v_std_used),
            standard_credits_used_this_year = standard_credits_used_this_year + v_std_used,
            premium_credits_remaining = GREATEST(0, premium_credits_remaining - v_prem_used),
            premium_credits_used_this_year = premium_credits_used_this_year + v_prem_used
        WHERE id = v_vp_id;
      END IF;
    END IF;

    -- Transition out of confirmed into cancelled
    IF NEW.status = 'cancelled' AND OLD.status = 'confirmed' THEN
      v_std_used := COALESCE(OLD.standard_credits_used, 0);
      v_prem_used := COALESCE(OLD.premium_credits_used, 0);

      SELECT id INTO v_vp_id
      FROM validated_participations
      WHERE user_id = NEW.user_id AND car_id = NEW.car_id
      ORDER BY participation_number ASC LIMIT 1;

      IF v_vp_id IS NOT NULL THEN
        UPDATE validated_participations
        SET standard_credits_remaining = standard_credits_remaining + v_std_used,
            standard_credits_used_this_year = GREATEST(0, standard_credits_used_this_year - v_std_used),
            premium_credits_remaining = premium_credits_remaining + v_prem_used,
            premium_credits_used_this_year = GREATEST(0, premium_credits_used_this_year - v_prem_used)
        WHERE id = v_vp_id;
      END IF;
    END IF;
  END IF;

  RETURN NEW;
END;
$function$;

DROP TRIGGER IF EXISTS trg_reservation_credits ON public.reservations;
CREATE TRIGGER trg_reservation_credits
BEFORE INSERT OR UPDATE ON public.reservations
FOR EACH ROW EXECUTE FUNCTION public.handle_reservation_credits();

-- 5. classify_reservation_type RPC
CREATE OR REPLACE FUNCTION public.classify_reservation_type(
  p_car_id UUID,
  p_start_date DATE,
  p_end_date DATE
) RETURNS TEXT
LANGUAGE plpgsql
STABLE
SECURITY DEFINER
SET search_path TO 'public'
AS $$
DECLARE
  v_day DATE;
  v_is_premium BOOLEAN;
BEGIN
  v_day := p_start_date;
  WHILE v_day <= p_end_date LOOP
    SELECT EXISTS (
      SELECT 1 FROM public.credit_rules cr
      WHERE cr.is_active = true
        AND cr.is_premium_period = true
        AND (cr.applies_to_all = true OR p_car_id = ANY(cr.car_ids))
        AND (
          (cr.is_recurring = true AND (
             cr.months IS NULL OR EXTRACT(MONTH FROM v_day)::int = ANY(cr.months)
          ))
          OR
          (cr.is_recurring = false
             AND cr.start_date IS NOT NULL AND cr.end_date IS NOT NULL
             AND v_day BETWEEN cr.start_date AND cr.end_date)
        )
    ) INTO v_is_premium;

    IF v_is_premium THEN
      RETURN 'premium';
    END IF;
    v_day := v_day + 1;
  END LOOP;
  RETURN 'standard';
END;
$$;

GRANT EXECUTE ON FUNCTION public.classify_reservation_type(UUID, DATE, DATE) TO authenticated, anon;
