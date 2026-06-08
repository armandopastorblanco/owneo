
CREATE TABLE public.press_mentions (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  quote TEXT NOT NULL,
  logo_key TEXT,
  sort_order INTEGER NOT NULL DEFAULT 0,
  is_active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

GRANT SELECT ON public.press_mentions TO anon, authenticated;
GRANT INSERT, UPDATE, DELETE ON public.press_mentions TO authenticated;
GRANT ALL ON public.press_mentions TO service_role;

ALTER TABLE public.press_mentions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "press_mentions_select_all" ON public.press_mentions
  FOR SELECT TO anon, authenticated USING (true);
CREATE POLICY "press_mentions_insert_admin" ON public.press_mentions
  FOR INSERT TO authenticated WITH CHECK (public.is_superadmin(auth.uid()));
CREATE POLICY "press_mentions_update_admin" ON public.press_mentions
  FOR UPDATE TO authenticated USING (public.is_superadmin(auth.uid())) WITH CHECK (public.is_superadmin(auth.uid()));
CREATE POLICY "press_mentions_delete_admin" ON public.press_mentions
  FOR DELETE TO authenticated USING (public.is_superadmin(auth.uid()));

CREATE TRIGGER update_press_mentions_updated_at
  BEFORE UPDATE ON public.press_mentions
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

INSERT INTO public.press_mentions (name, quote, logo_key, sort_order) VALUES
  ('Forbes', 'Revolucionando el acceso al lujo automovilístico en España', 'forbes', 0),
  ('Motorpasión', 'La forma más inteligente de disfrutar un superdeportivo', 'motorpasion', 1),
  ('GQ', 'El club de supercoches que está redefiniendo el lujo', 'gq', 2),
  ('Vanity Fair', 'Donde la exclusividad se encuentra con la comunidad', 'vanityfair', 3);

INSERT INTO public.app_settings (key, value) VALUES ('press_section_enabled', 'true')
  ON CONFLICT (key) DO NOTHING;
