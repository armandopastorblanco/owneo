-- 1. Add `role` column to profiles
ALTER TABLE public.profiles
  ADD COLUMN IF NOT EXISTS role text NOT NULL DEFAULT 'user';

CREATE OR REPLACE FUNCTION public.validate_profile_role()
RETURNS trigger
LANGUAGE plpgsql
SET search_path = public
AS $$
BEGIN
  IF NEW.role IS NOT NULL AND NEW.role NOT IN ('superadmin', 'city_manager', 'user') THEN
    RAISE EXCEPTION 'Invalid profile role: %', NEW.role;
  END IF;
  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS trg_validate_profile_role ON public.profiles;
CREATE TRIGGER trg_validate_profile_role
BEFORE INSERT OR UPDATE OF role ON public.profiles
FOR EACH ROW EXECUTE FUNCTION public.validate_profile_role();

-- 2. Recreate storage policies using is_superadmin instead of is_admin
DROP POLICY IF EXISTS "Admins can delete images" ON storage.objects;
DROP POLICY IF EXISTS "Admins can update images" ON storage.objects;
DROP POLICY IF EXISTS "Admins can view all documents" ON storage.objects;

CREATE POLICY "Superadmins can delete images"
ON storage.objects FOR DELETE TO authenticated
USING (bucket_id = 'images' AND public.is_superadmin(auth.uid()));

CREATE POLICY "Superadmins can update images"
ON storage.objects FOR UPDATE TO authenticated
USING (bucket_id = 'images' AND public.is_superadmin(auth.uid()));

CREATE POLICY "Superadmins can view all documents"
ON storage.objects FOR SELECT TO authenticated
USING (bucket_id = 'documents' AND public.is_superadmin(auth.uid()));

-- 3. Drop the unused is_admin helper now that nothing depends on it
DROP FUNCTION IF EXISTS public.is_admin(uuid);

-- 4. Rebuild app_role enum without 'admin'
ALTER TYPE public.app_role RENAME TO app_role_old;
CREATE TYPE public.app_role AS ENUM ('superadmin', 'city_manager', 'user');

ALTER TABLE public.user_roles
  ALTER COLUMN role TYPE public.app_role
  USING (role::text::public.app_role);

DROP TYPE public.app_role_old;

-- 5. Promote admin@owneo.es
UPDATE public.profiles
SET role = 'superadmin'
WHERE email = 'admin@owneo.es';

INSERT INTO public.user_roles (user_id, role)
SELECT id, 'superadmin'::public.app_role
FROM public.profiles
WHERE email = 'admin@owneo.es'
ON CONFLICT (user_id, role) DO NOTHING;