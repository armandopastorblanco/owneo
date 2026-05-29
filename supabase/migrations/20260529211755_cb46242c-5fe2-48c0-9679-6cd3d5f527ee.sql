DO $$
DECLARE uid uuid := 'fbdaf09d-6d2f-4c95-84b0-dce699aa7617';
BEGIN
  DELETE FROM public.reservations WHERE user_id = uid;
  DELETE FROM public.participation_requests WHERE user_id = uid;
  DELETE FROM public.participations WHERE user_id = uid;
  DELETE FROM public.validated_participations WHERE user_id = uid;
  DELETE FROM public.kyc_documents WHERE user_id = uid;
  DELETE FROM public.participant_documents WHERE user_id = uid;
  DELETE FROM public.contracts WHERE user_id = uid;
  DELETE FROM public.bank_reconciliation WHERE user_id = uid;
  DELETE FROM public.contact_logs WHERE user_id = uid;
  DELETE FROM public.cookie_consents WHERE user_id = uid;
  DELETE FROM public.user_roles WHERE user_id = uid;
  DELETE FROM public.profiles WHERE id = uid;
  DELETE FROM auth.users WHERE id = uid;
END $$;