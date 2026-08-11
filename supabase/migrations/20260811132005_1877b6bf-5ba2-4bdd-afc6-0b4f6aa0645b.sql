ALTER TABLE public.cars
  ADD COLUMN IF NOT EXISTS features_en text[],
  ADD COLUMN IF NOT EXISTS specifications_en jsonb;