-- Capture the visitor's browsing language and city of interest on every lead entry point.

ALTER TABLE public.consultation_requests
  ADD COLUMN IF NOT EXISTS language text DEFAULT 'es',
  ADD COLUMN IF NOT EXISTS city text,
  ADD COLUMN IF NOT EXISTS city_id uuid REFERENCES public.locations(id);

ALTER TABLE public.contacts
  ADD COLUMN IF NOT EXISTS language text DEFAULT 'es',
  ADD COLUMN IF NOT EXISTS city text;

ALTER TABLE public.waitlist
  ADD COLUMN IF NOT EXISTS language text DEFAULT 'es';

ALTER TABLE public.participation_requests
  ADD COLUMN IF NOT EXISTS language text DEFAULT 'es';

ALTER TABLE public.profiles
  ADD COLUMN IF NOT EXISTS preferred_language text DEFAULT 'es';

CREATE INDEX IF NOT EXISTS consultation_requests_city_idx ON public.consultation_requests (city);
CREATE INDEX IF NOT EXISTS consultation_requests_language_idx ON public.consultation_requests (language);
