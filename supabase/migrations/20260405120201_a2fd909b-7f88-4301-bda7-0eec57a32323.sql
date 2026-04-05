
-- 1. ALTER TABLE cars
ALTER TABLE public.cars ADD COLUMN IF NOT EXISTS max_participations INTEGER DEFAULT 10;
ALTER TABLE public.cars ADD COLUMN IF NOT EXISTS remaining_participations INTEGER DEFAULT 10;
ALTER TABLE public.cars ADD COLUMN IF NOT EXISTS participation_price NUMERIC;
ALTER TABLE public.cars ADD COLUMN IF NOT EXISTS status TEXT DEFAULT 'active';
ALTER TABLE public.cars ADD COLUMN IF NOT EXISTS deadline TIMESTAMPTZ;
ALTER TABLE public.cars ADD COLUMN IF NOT EXISTS total_km INTEGER DEFAULT 0;
ALTER TABLE public.cars ADD COLUMN IF NOT EXISTS location_id UUID REFERENCES public.locations(id);
ALTER TABLE public.cars ADD COLUMN IF NOT EXISTS technical_sheet JSONB;

-- Validation trigger for cars.status
CREATE OR REPLACE FUNCTION public.validate_car_status()
RETURNS TRIGGER LANGUAGE plpgsql SET search_path = public AS $$
BEGIN
  IF NEW.status IS NOT NULL AND NEW.status NOT IN ('active', 'complete', 'archived') THEN
    RAISE EXCEPTION 'Invalid car status: %', NEW.status;
  END IF;
  RETURN NEW;
END;
$$;
CREATE TRIGGER trg_validate_car_status BEFORE INSERT OR UPDATE ON public.cars
FOR EACH ROW EXECUTE FUNCTION public.validate_car_status();

-- 2. ALTER TABLE profiles (surname already exists, role stored in user_roles)
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS city_id UUID REFERENCES public.locations(id);
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS kyc_status TEXT DEFAULT 'pending';
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS iban TEXT;

CREATE OR REPLACE FUNCTION public.validate_profile_kyc_status()
RETURNS TRIGGER LANGUAGE plpgsql SET search_path = public AS $$
BEGIN
  IF NEW.kyc_status IS NOT NULL AND NEW.kyc_status NOT IN ('pending', 'in_review', 'validated', 'rejected') THEN
    RAISE EXCEPTION 'Invalid kyc_status: %', NEW.kyc_status;
  END IF;
  RETURN NEW;
END;
$$;
CREATE TRIGGER trg_validate_profile_kyc BEFORE INSERT OR UPDATE ON public.profiles
FOR EACH ROW EXECUTE FUNCTION public.validate_profile_kyc_status();

-- 3. kyc_documents
CREATE TABLE public.kyc_documents (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  type TEXT NOT NULL,
  file_url TEXT,
  status TEXT DEFAULT 'pending',
  reviewed_by UUID REFERENCES public.profiles(id),
  reviewed_at TIMESTAMPTZ,
  notes TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE OR REPLACE FUNCTION public.validate_kyc_document()
RETURNS TRIGGER LANGUAGE plpgsql SET search_path = public AS $$
BEGIN
  IF NEW.type NOT IN ('id_card', 'driving_license', 'proof_address', 'selfie') THEN
    RAISE EXCEPTION 'Invalid kyc document type: %', NEW.type;
  END IF;
  IF NEW.status IS NOT NULL AND NEW.status NOT IN ('pending', 'validated', 'rejected') THEN
    RAISE EXCEPTION 'Invalid kyc document status: %', NEW.status;
  END IF;
  RETURN NEW;
END;
$$;
CREATE TRIGGER trg_validate_kyc_doc BEFORE INSERT OR UPDATE ON public.kyc_documents
FOR EACH ROW EXECUTE FUNCTION public.validate_kyc_document();

ALTER TABLE public.kyc_documents ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can view own kyc docs" ON public.kyc_documents FOR SELECT USING (user_id = auth.uid() OR is_admin(auth.uid()));
CREATE POLICY "Users can insert own kyc docs" ON public.kyc_documents FOR INSERT WITH CHECK (user_id = auth.uid());
CREATE POLICY "Admins can update kyc docs" ON public.kyc_documents FOR UPDATE USING (is_admin(auth.uid()));
CREATE POLICY "Admins can delete kyc docs" ON public.kyc_documents FOR DELETE USING (is_admin(auth.uid()));

-- 4. participation_requests
CREATE TABLE public.participation_requests (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES public.profiles(id),
  car_id UUID NOT NULL REFERENCES public.cars(id),
  status TEXT DEFAULT 'pending',
  questionnaire_answers JSONB,
  score INTEGER,
  score_notes TEXT,
  payment_status TEXT DEFAULT 'pending',
  payment_proof_url TEXT,
  payment_amount NUMERIC,
  num_participations INTEGER DEFAULT 1,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE OR REPLACE FUNCTION public.validate_participation_request()
RETURNS TRIGGER LANGUAGE plpgsql SET search_path = public AS $$
BEGIN
  IF NEW.status IS NOT NULL AND NEW.status NOT IN ('pending', 'scoring', 'approved', 'rejected', 'waitlist') THEN
    RAISE EXCEPTION 'Invalid participation_request status: %', NEW.status;
  END IF;
  IF NEW.payment_status IS NOT NULL AND NEW.payment_status NOT IN ('pending', 'proof_uploaded', 'validated') THEN
    RAISE EXCEPTION 'Invalid payment_status: %', NEW.payment_status;
  END IF;
  RETURN NEW;
END;
$$;
CREATE TRIGGER trg_validate_part_req BEFORE INSERT OR UPDATE ON public.participation_requests
FOR EACH ROW EXECUTE FUNCTION public.validate_participation_request();

CREATE TRIGGER update_participation_requests_updated_at BEFORE UPDATE ON public.participation_requests
FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

ALTER TABLE public.participation_requests ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can view own requests" ON public.participation_requests FOR SELECT USING (user_id = auth.uid() OR is_admin(auth.uid()));
CREATE POLICY "Users can create requests" ON public.participation_requests FOR INSERT WITH CHECK (user_id = auth.uid());
CREATE POLICY "Admins can update requests" ON public.participation_requests FOR UPDATE USING (is_admin(auth.uid()));
CREATE POLICY "Admins can delete requests" ON public.participation_requests FOR DELETE USING (is_admin(auth.uid()));

-- 5. validated_participations
CREATE TABLE public.validated_participations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  request_id UUID NOT NULL REFERENCES public.participation_requests(id),
  user_id UUID NOT NULL REFERENCES public.profiles(id),
  car_id UUID NOT NULL REFERENCES public.cars(id),
  participation_number INTEGER NOT NULL,
  credits_remaining INTEGER DEFAULT 4,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE public.validated_participations ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can view own participations" ON public.validated_participations FOR SELECT USING (user_id = auth.uid() OR is_admin(auth.uid()));
CREATE POLICY "Admins can insert participations" ON public.validated_participations FOR INSERT WITH CHECK (is_admin(auth.uid()));
CREATE POLICY "Admins can update participations" ON public.validated_participations FOR UPDATE USING (is_admin(auth.uid()));
CREATE POLICY "Admins can delete participations" ON public.validated_participations FOR DELETE USING (is_admin(auth.uid()));

-- 6. contracts
CREATE TABLE public.contracts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  participation_id UUID REFERENCES public.validated_participations(id),
  user_id UUID NOT NULL REFERENCES public.profiles(id),
  car_id UUID NOT NULL REFERENCES public.cars(id),
  type TEXT NOT NULL,
  file_url TEXT,
  requires_signature BOOLEAN DEFAULT false,
  signature_status TEXT DEFAULT 'pending',
  signed_at TIMESTAMPTZ,
  uploaded_by UUID REFERENCES public.profiles(id),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE OR REPLACE FUNCTION public.validate_contract()
RETURNS TRIGGER LANGUAGE plpgsql SET search_path = public AS $$
BEGIN
  IF NEW.type NOT IN ('participation', 'insurance', 'inspection', 'restitution', 'notice') THEN
    RAISE EXCEPTION 'Invalid contract type: %', NEW.type;
  END IF;
  IF NEW.signature_status IS NOT NULL AND NEW.signature_status NOT IN ('pending', 'signed', 'refused') THEN
    RAISE EXCEPTION 'Invalid signature_status: %', NEW.signature_status;
  END IF;
  RETURN NEW;
END;
$$;
CREATE TRIGGER trg_validate_contract BEFORE INSERT OR UPDATE ON public.contracts
FOR EACH ROW EXECUTE FUNCTION public.validate_contract();

ALTER TABLE public.contracts ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can view own contracts" ON public.contracts FOR SELECT USING (user_id = auth.uid() OR is_admin(auth.uid()));
CREATE POLICY "Admins can insert contracts" ON public.contracts FOR INSERT WITH CHECK (is_admin(auth.uid()));
CREATE POLICY "Admins can update contracts" ON public.contracts FOR UPDATE USING (is_admin(auth.uid()));
CREATE POLICY "Admins can delete contracts" ON public.contracts FOR DELETE USING (is_admin(auth.uid()));

-- 7. reservations
CREATE TABLE public.reservations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  participation_id UUID NOT NULL REFERENCES public.validated_participations(id),
  user_id UUID NOT NULL REFERENCES public.profiles(id),
  car_id UUID NOT NULL REFERENCES public.cars(id),
  start_date DATE NOT NULL,
  end_date DATE NOT NULL,
  status TEXT DEFAULT 'confirmed',
  is_red_period BOOLEAN DEFAULT false,
  credits_used INTEGER DEFAULT 1,
  notes TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE OR REPLACE FUNCTION public.validate_reservation()
RETURNS TRIGGER LANGUAGE plpgsql SET search_path = public AS $$
BEGIN
  IF NEW.status IS NOT NULL AND NEW.status NOT IN ('confirmed', 'cancelled', 'completed') THEN
    RAISE EXCEPTION 'Invalid reservation status: %', NEW.status;
  END IF;
  RETURN NEW;
END;
$$;
CREATE TRIGGER trg_validate_reservation BEFORE INSERT OR UPDATE ON public.reservations
FOR EACH ROW EXECUTE FUNCTION public.validate_reservation();

ALTER TABLE public.reservations ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can view own reservations" ON public.reservations FOR SELECT USING (user_id = auth.uid() OR is_admin(auth.uid()));
CREATE POLICY "Users can create reservations" ON public.reservations FOR INSERT WITH CHECK (user_id = auth.uid());
CREATE POLICY "Admins can update reservations" ON public.reservations FOR UPDATE USING (is_admin(auth.uid()));
CREATE POLICY "Admins can delete reservations" ON public.reservations FOR DELETE USING (is_admin(auth.uid()));

-- 8. vehicle_inspections
CREATE TABLE public.vehicle_inspections (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  car_id UUID NOT NULL REFERENCES public.cars(id),
  reservation_id UUID REFERENCES public.reservations(id),
  km_before INTEGER,
  km_after INTEGER,
  photos_before TEXT[],
  photos_after TEXT[],
  condition_before TEXT,
  condition_after TEXT,
  notes TEXT,
  inspector_id UUID REFERENCES public.profiles(id),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE public.vehicle_inspections ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can view inspections of own reservations" ON public.vehicle_inspections FOR SELECT USING (
  is_admin(auth.uid()) OR EXISTS (
    SELECT 1 FROM public.reservations r WHERE r.id = reservation_id AND r.user_id = auth.uid()
  )
);
CREATE POLICY "Admins can insert inspections" ON public.vehicle_inspections FOR INSERT WITH CHECK (is_admin(auth.uid()));
CREATE POLICY "Admins can update inspections" ON public.vehicle_inspections FOR UPDATE USING (is_admin(auth.uid()));
CREATE POLICY "Admins can delete inspections" ON public.vehicle_inspections FOR DELETE USING (is_admin(auth.uid()));

-- 9. bank_reconciliation
CREATE TABLE public.bank_reconciliation (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  participation_request_id UUID NOT NULL REFERENCES public.participation_requests(id),
  user_id UUID NOT NULL REFERENCES public.profiles(id),
  expected_amount NUMERIC,
  iban_user TEXT,
  reference_code TEXT UNIQUE DEFAULT 'OWNEO-' || substr(gen_random_uuid()::text, 1, 8),
  status TEXT DEFAULT 'pending',
  matched_at TIMESTAMPTZ,
  validated_by UUID REFERENCES public.profiles(id),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE OR REPLACE FUNCTION public.validate_bank_reconciliation()
RETURNS TRIGGER LANGUAGE plpgsql SET search_path = public AS $$
BEGIN
  IF NEW.status IS NOT NULL AND NEW.status NOT IN ('pending', 'matched', 'validated', 'failed') THEN
    RAISE EXCEPTION 'Invalid bank_reconciliation status: %', NEW.status;
  END IF;
  RETURN NEW;
END;
$$;
CREATE TRIGGER trg_validate_bank_recon BEFORE INSERT OR UPDATE ON public.bank_reconciliation
FOR EACH ROW EXECUTE FUNCTION public.validate_bank_reconciliation();

ALTER TABLE public.bank_reconciliation ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can view own reconciliation" ON public.bank_reconciliation FOR SELECT USING (user_id = auth.uid() OR is_admin(auth.uid()));
CREATE POLICY "Admins can insert reconciliation" ON public.bank_reconciliation FOR INSERT WITH CHECK (is_admin(auth.uid()));
CREATE POLICY "Admins can update reconciliation" ON public.bank_reconciliation FOR UPDATE USING (is_admin(auth.uid()));
CREATE POLICY "Admins can delete reconciliation" ON public.bank_reconciliation FOR DELETE USING (is_admin(auth.uid()));

-- 10. votes
CREATE TABLE public.votes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES public.profiles(id),
  car_model TEXT NOT NULL,
  brand TEXT,
  comment TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE(user_id, car_model)
);

ALTER TABLE public.votes ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone can view votes" ON public.votes FOR SELECT USING (true);
CREATE POLICY "Users can insert own votes" ON public.votes FOR INSERT WITH CHECK (user_id = auth.uid());
CREATE POLICY "Users can update own votes" ON public.votes FOR UPDATE USING (user_id = auth.uid());
CREATE POLICY "Users can delete own votes" ON public.votes FOR DELETE USING (user_id = auth.uid());

-- 11. audit_logs
CREATE TABLE public.audit_logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  admin_id UUID REFERENCES public.profiles(id),
  action TEXT NOT NULL,
  target_table TEXT,
  target_id TEXT,
  details JSONB,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE public.audit_logs ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Admins can view audit logs" ON public.audit_logs FOR SELECT USING (is_admin(auth.uid()));
CREATE POLICY "Admins can insert audit logs" ON public.audit_logs FOR INSERT WITH CHECK (is_admin(auth.uid()));
