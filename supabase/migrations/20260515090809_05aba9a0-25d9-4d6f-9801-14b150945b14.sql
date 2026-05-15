CREATE TABLE public.cookie_consents (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  session_id TEXT NOT NULL,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  analytics BOOLEAN NOT NULL DEFAULT false,
  marketing BOOLEAN NOT NULL DEFAULT false,
  personalization BOOLEAN NOT NULL DEFAULT false,
  consent_version TEXT NOT NULL DEFAULT '1.0',
  consented_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  user_agent TEXT
);

CREATE INDEX idx_cookie_consents_session_id ON public.cookie_consents(session_id);
CREATE INDEX idx_cookie_consents_user_id ON public.cookie_consents(user_id);

ALTER TABLE public.cookie_consents ENABLE ROW LEVEL SECURITY;

-- Anyone (anon + authenticated) can insert a consent record
CREATE POLICY "cookie_consents_insert_anyone"
ON public.cookie_consents
FOR INSERT
TO anon, authenticated
WITH CHECK (
  (auth.uid() IS NULL AND user_id IS NULL)
  OR (auth.uid() IS NOT NULL AND (user_id = auth.uid() OR user_id IS NULL))
);

-- Authenticated users can read their own rows; superadmins can read all
CREATE POLICY "cookie_consents_select_own"
ON public.cookie_consents
FOR SELECT
TO authenticated
USING (user_id = auth.uid() OR public.is_superadmin(auth.uid()));

-- Authenticated users can update their own rows
CREATE POLICY "cookie_consents_update_own"
ON public.cookie_consents
FOR UPDATE
TO authenticated
USING (user_id = auth.uid() OR public.is_superadmin(auth.uid()))
WITH CHECK (user_id = auth.uid() OR public.is_superadmin(auth.uid()));

-- Only superadmins can delete
CREATE POLICY "cookie_consents_delete_admin"
ON public.cookie_consents
FOR DELETE
TO authenticated
USING (public.is_superadmin(auth.uid()));