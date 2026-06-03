ALTER TABLE public.profiles DISABLE TRIGGER USER;
UPDATE public.profiles SET role = 'superadmin' WHERE id = '6ebfcb9f-0f48-4bdd-b978-7612933a3188';
ALTER TABLE public.profiles ENABLE TRIGGER USER;