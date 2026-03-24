
-- 1. Tabla de ubicaciones (ciudades)
CREATE TABLE public.locations (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT,
  image_url TEXT,
  sort_order INTEGER NOT NULL DEFAULT 0,
  is_active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- 2. Hero slider de la home
CREATE TABLE public.hero_slides (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT,
  subtitle TEXT,
  image_url TEXT NOT NULL,
  cta_text TEXT,
  cta_link TEXT,
  sort_order INTEGER NOT NULL DEFAULT 0,
  is_active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- 3. Secciones de contenido (home, nuestro concepto, etc.)
CREATE TABLE public.content_sections (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  page TEXT NOT NULL,
  section_key TEXT NOT NULL,
  title TEXT,
  subtitle TEXT,
  body TEXT,
  image_url TEXT,
  icon TEXT,
  cta_text TEXT,
  cta_link TEXT,
  sort_order INTEGER NOT NULL DEFAULT 0,
  is_active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(page, section_key)
);

-- 4. Colección destacada (coches destacados en home)
CREATE TABLE public.featured_cars (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  car_id UUID NOT NULL REFERENCES public.cars(id) ON DELETE CASCADE,
  sort_order INTEGER NOT NULL DEFAULT 0,
  is_active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- RLS para todas las tablas
ALTER TABLE public.locations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.hero_slides ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.content_sections ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.featured_cars ENABLE ROW LEVEL SECURITY;

-- Lectura pública para contenido activo
CREATE POLICY "Anyone can view active locations" ON public.locations FOR SELECT TO public USING (is_active = true OR is_admin(auth.uid()));
CREATE POLICY "Anyone can view active slides" ON public.hero_slides FOR SELECT TO public USING (is_active = true OR is_admin(auth.uid()));
CREATE POLICY "Anyone can view active sections" ON public.content_sections FOR SELECT TO public USING (is_active = true OR is_admin(auth.uid()));
CREATE POLICY "Anyone can view featured cars" ON public.featured_cars FOR SELECT TO public USING (is_active = true OR is_admin(auth.uid()));

-- Admin CRUD
CREATE POLICY "Admins can insert locations" ON public.locations FOR INSERT TO authenticated WITH CHECK (is_admin(auth.uid()));
CREATE POLICY "Admins can update locations" ON public.locations FOR UPDATE TO authenticated USING (is_admin(auth.uid()));
CREATE POLICY "Admins can delete locations" ON public.locations FOR DELETE TO authenticated USING (is_admin(auth.uid()));

CREATE POLICY "Admins can insert slides" ON public.hero_slides FOR INSERT TO authenticated WITH CHECK (is_admin(auth.uid()));
CREATE POLICY "Admins can update slides" ON public.hero_slides FOR UPDATE TO authenticated USING (is_admin(auth.uid()));
CREATE POLICY "Admins can delete slides" ON public.hero_slides FOR DELETE TO authenticated USING (is_admin(auth.uid()));

CREATE POLICY "Admins can insert sections" ON public.content_sections FOR INSERT TO authenticated WITH CHECK (is_admin(auth.uid()));
CREATE POLICY "Admins can update sections" ON public.content_sections FOR UPDATE TO authenticated USING (is_admin(auth.uid()));
CREATE POLICY "Admins can delete sections" ON public.content_sections FOR DELETE TO authenticated USING (is_admin(auth.uid()));

CREATE POLICY "Admins can insert featured" ON public.featured_cars FOR INSERT TO authenticated WITH CHECK (is_admin(auth.uid()));
CREATE POLICY "Admins can update featured" ON public.featured_cars FOR UPDATE TO authenticated USING (is_admin(auth.uid()));
CREATE POLICY "Admins can delete featured" ON public.featured_cars FOR DELETE TO authenticated USING (is_admin(auth.uid()));

-- Triggers updated_at
CREATE TRIGGER update_locations_updated_at BEFORE UPDATE ON public.locations FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_hero_slides_updated_at BEFORE UPDATE ON public.hero_slides FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_content_sections_updated_at BEFORE UPDATE ON public.content_sections FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
