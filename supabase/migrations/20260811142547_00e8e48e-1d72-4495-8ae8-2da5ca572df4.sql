CREATE OR REPLACE FUNCTION public.enforce_user_reservation_update()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  IF public.is_superadmin(auth.uid()) THEN
    RETURN NEW;
  END IF;

  -- Owners may only cancel; everything else must remain unchanged
  IF NEW.user_id IS DISTINCT FROM OLD.user_id
     OR NEW.car_id IS DISTINCT FROM OLD.car_id
     OR NEW.participation_id IS DISTINCT FROM OLD.participation_id
     OR NEW.start_date IS DISTINCT FROM OLD.start_date
     OR NEW.end_date IS DISTINCT FROM OLD.end_date
     OR NEW.credits_used IS DISTINCT FROM OLD.credits_used
     OR NEW.standard_credits_used IS DISTINCT FROM OLD.standard_credits_used
     OR NEW.premium_credits_used IS DISTINCT FROM OLD.premium_credits_used
     OR NEW.reservation_type IS DISTINCT FROM OLD.reservation_type
     OR NEW.is_peak_period IS DISTINCT FROM OLD.is_peak_period
     OR NEW.credit_multiplier IS DISTINCT FROM OLD.credit_multiplier
     OR NEW.rejected_by IS DISTINCT FROM OLD.rejected_by
     OR NEW.rejected_at IS DISTINCT FROM OLD.rejected_at
     OR NEW.rejection_reason IS DISTINCT FROM OLD.rejection_reason
     OR NEW.id IS DISTINCT FROM OLD.id
     OR NEW.created_at IS DISTINCT FROM OLD.created_at
  THEN
    RAISE EXCEPTION 'Users cannot modify protected reservation fields';
  END IF;

  IF NEW.status IS DISTINCT FROM OLD.status THEN
    IF NEW.status <> 'cancelled' THEN
      RAISE EXCEPTION 'Users can only cancel their reservations';
    END IF;
    IF OLD.status NOT IN ('pending', 'confirmed') THEN
      RAISE EXCEPTION 'Reservation cannot be cancelled from its current state';
    END IF;
    -- Cancellation audit fields are always set by the system, never by the client
    NEW.cancelled_by := auth.uid();
    NEW.cancelled_at := now();
  ELSE
    -- Outside of a cancellation, audit fields cannot be touched
    IF NEW.cancelled_by IS DISTINCT FROM OLD.cancelled_by
       OR NEW.cancelled_at IS DISTINCT FROM OLD.cancelled_at
    THEN
      RAISE EXCEPTION 'Users cannot modify cancellation audit fields';
    END IF;
  END IF;

  RETURN NEW;
END;
$$;