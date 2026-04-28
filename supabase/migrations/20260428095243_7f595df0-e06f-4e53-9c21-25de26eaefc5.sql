
ALTER TABLE public.vehicle_document_types
  ADD COLUMN IF NOT EXISTS is_public BOOLEAN DEFAULT false;

ALTER TABLE public.reservations
  ADD COLUMN IF NOT EXISTS credits_used NUMERIC DEFAULT 0;

-- credits_used already exists per schema; ensure default
ALTER TABLE public.reservations
  ALTER COLUMN credits_used SET DEFAULT 0;

ALTER TABLE public.reservations
  ADD COLUMN IF NOT EXISTS rejection_reason TEXT,
  ADD COLUMN IF NOT EXISTS rejected_at TIMESTAMPTZ,
  ADD COLUMN IF NOT EXISTS rejected_by UUID,
  ADD COLUMN IF NOT EXISTS cancelled_at TIMESTAMPTZ,
  ADD COLUMN IF NOT EXISTS cancelled_by UUID;

-- Allow status 'pending' in reservations validation trigger
CREATE OR REPLACE FUNCTION public.validate_reservation()
 RETURNS trigger
 LANGUAGE plpgsql
 SET search_path TO 'public'
AS $function$
BEGIN
  IF NEW.status IS NOT NULL AND NEW.status NOT IN ('pending', 'confirmed', 'cancelled', 'completed') THEN
    RAISE EXCEPTION 'Invalid reservation status: %', NEW.status;
  END IF;
  RETURN NEW;
END;
$function$;

-- Allow users to cancel their own reservations
DROP POLICY IF EXISTS reservations_update_own ON public.reservations;
CREATE POLICY reservations_update_own
ON public.reservations
FOR UPDATE
TO authenticated
USING (user_id = auth.uid())
WITH CHECK (user_id = auth.uid());
