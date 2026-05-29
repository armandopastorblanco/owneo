CREATE TABLE IF NOT EXISTS public.app_settings (
  key TEXT PRIMARY KEY,
  value TEXT NOT NULL,
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

GRANT SELECT ON public.app_settings TO anon;
GRANT SELECT ON public.app_settings TO authenticated;
GRANT ALL ON public.app_settings TO service_role;

ALTER TABLE public.app_settings ENABLE ROW LEVEL SECURITY;

CREATE POLICY "app_settings_select_all" ON public.app_settings
  FOR SELECT TO anon, authenticated USING (true);

CREATE POLICY "app_settings_insert_admin" ON public.app_settings
  FOR INSERT TO authenticated WITH CHECK (is_superadmin(auth.uid()));

CREATE POLICY "app_settings_update_admin" ON public.app_settings
  FOR UPDATE TO authenticated USING (is_superadmin(auth.uid())) WITH CHECK (is_superadmin(auth.uid()));

CREATE POLICY "app_settings_delete_admin" ON public.app_settings
  FOR DELETE TO authenticated USING (is_superadmin(auth.uid()));

INSERT INTO public.app_settings (key, value) VALUES ('beta_gate_enabled', 'false')
  ON CONFLICT (key) DO NOTHING;