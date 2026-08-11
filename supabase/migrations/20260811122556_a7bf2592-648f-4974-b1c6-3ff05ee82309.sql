ALTER TABLE public.cars
  ADD COLUMN IF NOT EXISTS description_en text,
  ADD COLUMN IF NOT EXISTS category_en text,
  ADD COLUMN IF NOT EXISTS luxury_description_en text;

ALTER TABLE public.locations
  ADD COLUMN IF NOT EXISTS description_en text;