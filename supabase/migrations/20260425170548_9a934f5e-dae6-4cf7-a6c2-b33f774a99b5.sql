-- ============================================
-- TAGS
-- ============================================
CREATE TABLE public.tags (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL UNIQUE,
  color TEXT NOT NULL DEFAULT '#6b7280',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  created_by UUID
);
ALTER TABLE public.tags ENABLE ROW LEVEL SECURITY;
CREATE POLICY tags_select ON public.tags FOR SELECT TO authenticated USING (is_superadmin(auth.uid()));
CREATE POLICY tags_insert ON public.tags FOR INSERT TO authenticated WITH CHECK (is_superadmin(auth.uid()));
CREATE POLICY tags_update ON public.tags FOR UPDATE TO authenticated USING (is_superadmin(auth.uid()));
CREATE POLICY tags_delete ON public.tags FOR DELETE TO authenticated USING (is_superadmin(auth.uid()));

-- ============================================
-- REQUEST_TAGS (link)
-- ============================================
CREATE TABLE public.request_tags (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  request_id UUID NOT NULL,
  tag_id UUID NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  created_by UUID,
  UNIQUE(request_id, tag_id)
);
ALTER TABLE public.request_tags ENABLE ROW LEVEL SECURITY;
CREATE POLICY request_tags_select ON public.request_tags FOR SELECT TO authenticated USING (is_superadmin(auth.uid()));
CREATE POLICY request_tags_insert ON public.request_tags FOR INSERT TO authenticated WITH CHECK (is_superadmin(auth.uid()));
CREATE POLICY request_tags_delete ON public.request_tags FOR DELETE TO authenticated USING (is_superadmin(auth.uid()));

-- ============================================
-- INTERNAL_NOTES
-- ============================================
CREATE TABLE public.internal_notes (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  request_id UUID NOT NULL,
  admin_id UUID NOT NULL,
  content TEXT NOT NULL,
  highlighted_text TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);
ALTER TABLE public.internal_notes ENABLE ROW LEVEL SECURITY;
CREATE POLICY internal_notes_select ON public.internal_notes FOR SELECT TO authenticated USING (is_superadmin(auth.uid()));
CREATE POLICY internal_notes_insert ON public.internal_notes FOR INSERT TO authenticated WITH CHECK (is_superadmin(auth.uid()) AND admin_id = auth.uid());
CREATE POLICY internal_notes_update ON public.internal_notes FOR UPDATE TO authenticated USING (is_superadmin(auth.uid()) AND admin_id = auth.uid());
CREATE POLICY internal_notes_delete ON public.internal_notes FOR DELETE TO authenticated USING (is_superadmin(auth.uid()) AND admin_id = auth.uid());

-- ============================================
-- CONTACT_LOGS
-- ============================================
CREATE TABLE public.contact_logs (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  request_id UUID,
  admin_id UUID NOT NULL,
  type TEXT NOT NULL,
  content TEXT NOT NULL,
  follow_up_date DATE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);
ALTER TABLE public.contact_logs ENABLE ROW LEVEL SECURITY;
CREATE POLICY contact_logs_select ON public.contact_logs FOR SELECT TO authenticated USING (is_superadmin(auth.uid()));
CREATE POLICY contact_logs_insert ON public.contact_logs FOR INSERT TO authenticated WITH CHECK (is_superadmin(auth.uid()) AND admin_id = auth.uid());
CREATE POLICY contact_logs_delete ON public.contact_logs FOR DELETE TO authenticated USING (is_superadmin(auth.uid()) AND admin_id = auth.uid());

-- ============================================
-- QUESTIONNAIRE_CONFIG
-- ============================================
CREATE TABLE public.questionnaire_config (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  question_key TEXT NOT NULL UNIQUE,
  section INTEGER NOT NULL DEFAULT 1,
  question_text TEXT NOT NULL,
  question_type TEXT NOT NULL DEFAULT 'radio',
  order_index INTEGER NOT NULL DEFAULT 0,
  is_active BOOLEAN NOT NULL DEFAULT true,
  options JSONB DEFAULT '[]'::jsonb,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);
ALTER TABLE public.questionnaire_config ENABLE ROW LEVEL SECURITY;
CREATE POLICY qc_select ON public.questionnaire_config FOR SELECT TO authenticated, anon USING (true);
CREATE POLICY qc_insert ON public.questionnaire_config FOR INSERT TO authenticated WITH CHECK (is_superadmin(auth.uid()));
CREATE POLICY qc_update ON public.questionnaire_config FOR UPDATE TO authenticated USING (is_superadmin(auth.uid()));
CREATE POLICY qc_delete ON public.questionnaire_config FOR DELETE TO authenticated USING (is_superadmin(auth.uid()));
CREATE TRIGGER qc_updated_at BEFORE UPDATE ON public.questionnaire_config FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- ============================================
-- SCORING_CONFIG
-- ============================================
CREATE TABLE public.scoring_config (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  question_key TEXT NOT NULL,
  answer_value TEXT NOT NULL,
  points INTEGER NOT NULL DEFAULT 0,
  is_excludent BOOLEAN NOT NULL DEFAULT false,
  excludent_type TEXT,
  risk_flag TEXT NOT NULL DEFAULT 'none',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(question_key, answer_value)
);
ALTER TABLE public.scoring_config ENABLE ROW LEVEL SECURITY;
CREATE POLICY sc_select ON public.scoring_config FOR SELECT TO authenticated USING (is_superadmin(auth.uid()));
CREATE POLICY sc_insert ON public.scoring_config FOR INSERT TO authenticated WITH CHECK (is_superadmin(auth.uid()));
CREATE POLICY sc_update ON public.scoring_config FOR UPDATE TO authenticated USING (is_superadmin(auth.uid()));
CREATE POLICY sc_delete ON public.scoring_config FOR DELETE TO authenticated USING (is_superadmin(auth.uid()));
CREATE TRIGGER sc_updated_at BEFORE UPDATE ON public.scoring_config FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- ============================================
-- EXTEND participation_requests
-- ============================================
ALTER TABLE public.participation_requests
  ADD COLUMN IF NOT EXISTS list_priority INTEGER,
  ADD COLUMN IF NOT EXISTS reopened_at TIMESTAMP WITH TIME ZONE,
  ADD COLUMN IF NOT EXISTS reopened_by UUID,
  ADD COLUMN IF NOT EXISTS num_participations_modified BOOLEAN DEFAULT false;

-- ============================================
-- SEED questionnaire_config (18 questions)
-- ============================================
INSERT INTO public.questionnaire_config (question_key, section, question_text, question_type, order_index, options) VALUES
('q1', 1, '¿Cuántos años tienes el carnet de conducir?', 'radio', 1, '[{"value":"mas10","label":"Más de 10 años"},{"value":"5a10","label":"Entre 5 y 10 años"},{"value":"2a5","label":"Entre 2 y 5 años"},{"value":"menos2","label":"Menos de 2 años"}]'::jsonb),
('q2', 1, '¿Has tenido el carnet menos de 2 años?', 'radio', 2, '[{"value":"no","label":"No"},{"value":"menos2","label":"Sí, menos de 2 años"}]'::jsonb),
('q3', 1, '¿Te han retirado el carnet alguna vez?', 'radio', 3, '[{"value":"no","label":"No"},{"value":"si","label":"Sí"}]'::jsonb),
('q4', 1, '¿Cuántas multas has tenido en los últimos 3 años?', 'radio', 4, '[{"value":"ninguna","label":"Ninguna"},{"value":"1a2","label":"1 o 2"},{"value":"3a5","label":"3 a 5"},{"value":"mas5","label":"Más de 5"}]'::jsonb),
('q5', 1, '¿Has tenido accidentes de tráfico?', 'radio', 5, '[{"value":"no","label":"No"},{"value":"leve","label":"Leves"},{"value":"grave","label":"Graves"}]'::jsonb),
('q6', 2, '¿Has conducido vehículos de más de 300CV?', 'radio', 6, '[{"value":"si","label":"Sí, frecuentemente"},{"value":"alguna","label":"Alguna vez"},{"value":"no","label":"No"}]'::jsonb),
('q7', 2, '¿Tienes experiencia en circuito?', 'radio', 7, '[{"value":"si","label":"Sí"},{"value":"no","label":"No"}]'::jsonb),
('q8', 2, '¿Conoces la diferencia entre tracción trasera y delantera?', 'radio', 8, '[{"value":"si","label":"Sí"},{"value":"no","label":"No"}]'::jsonb),
('q9', 2, '¿Sabes lo que es el sobreviraje?', 'radio', 9, '[{"value":"si","label":"Sí"},{"value":"no","label":"No"}]'::jsonb),
('q10', 2, '¿Has conducido con lluvia intensa?', 'radio', 10, '[{"value":"si","label":"Sí"},{"value":"no","label":"No"}]'::jsonb),
('q11', 3, '¿Cómo describirías tu estilo de conducción?', 'radio', 11, '[{"value":"prudente","label":"Prudente"},{"value":"deportivo","label":"Deportivo"},{"value":"agresivo","label":"Agresivo"}]'::jsonb),
('q12', 3, '¿Cómo reaccionas ante una situación de estrés al volante?', 'radio', 12, '[{"value":"calma","label":"Con calma"},{"value":"confrontar","label":"Confrontando"}]'::jsonb),
('q13', 3, '¿Has conducido bajo los efectos del alcohol?', 'radio', 13, '[{"value":"no","label":"No"},{"value":"si","label":"Sí"}]'::jsonb),
('q14', 3, '¿Cuándo fue tu última infracción grave?', 'radio', 14, '[{"value":"nunca","label":"Nunca"},{"value":"antigua","label":"Hace más de 3 años"},{"value":"reciente","label":"Reciente"}]'::jsonb),
('q15', 3, '¿Estás dispuesto a respetar las normas de uso del vehículo?', 'radio', 15, '[{"value":"si","label":"Sí, totalmente"},{"value":"no","label":"No"}]'::jsonb),
('q16', 4, '¿Cuál es tu motivación principal para participar?', 'textarea', 16, '[]'::jsonb),
('q17', 4, '¿Con qué frecuencia planeas usar el vehículo?', 'textarea', 17, '[]'::jsonb),
('q18', 4, '¿Tienes garaje o parking privado?', 'textarea', 18, '[]'::jsonb)
ON CONFLICT (question_key) DO NOTHING;

-- ============================================
-- SEED scoring_config — exclusionary answers
-- ============================================
INSERT INTO public.scoring_config (question_key, answer_value, points, is_excludent, excludent_type, risk_flag) VALUES
('q1', 'mas10', 10, false, NULL, 'none'),
('q1', '5a10', 8, false, NULL, 'none'),
('q1', '2a5', 5, false, NULL, 'none'),
('q1', 'menos2', 0, false, NULL, 'orange'),
('q2', 'no', 5, false, NULL, 'none'),
('q2', 'menos2', 0, true, 'automatic', 'red'),
('q3', 'no', 5, false, NULL, 'none'),
('q3', 'si', 0, true, 'automatic', 'red'),
('q4', 'ninguna', 8, false, NULL, 'none'),
('q4', '1a2', 5, false, NULL, 'none'),
('q4', '3a5', 2, false, NULL, 'orange'),
('q4', 'mas5', 0, false, NULL, 'red'),
('q5', 'no', 8, false, NULL, 'none'),
('q5', 'leve', 4, false, NULL, 'orange'),
('q5', 'grave', 0, false, NULL, 'red'),
('q6', 'si', 8, false, NULL, 'none'),
('q6', 'alguna', 5, false, NULL, 'none'),
('q6', 'no', 2, false, NULL, 'orange'),
('q7', 'si', 5, false, NULL, 'none'),
('q7', 'no', 2, false, NULL, 'none'),
('q8', 'si', 5, false, NULL, 'none'),
('q8', 'no', 0, false, NULL, 'orange'),
('q9', 'si', 5, false, NULL, 'none'),
('q9', 'no', 0, false, NULL, 'orange'),
('q10', 'si', 5, false, NULL, 'none'),
('q10', 'no', 2, false, NULL, 'none'),
('q11', 'prudente', 8, false, NULL, 'none'),
('q11', 'deportivo', 5, false, NULL, 'none'),
('q11', 'agresivo', 0, false, NULL, 'red'),
('q12', 'calma', 8, false, NULL, 'none'),
('q12', 'confrontar', 0, true, 'automatic', 'red'),
('q13', 'no', 5, false, NULL, 'none'),
('q13', 'si', 0, true, 'automatic', 'red'),
('q14', 'nunca', 8, false, NULL, 'none'),
('q14', 'antigua', 5, false, NULL, 'orange'),
('q14', 'reciente', 0, true, 'automatic', 'red'),
('q15', 'si', 10, false, NULL, 'none'),
('q15', 'no', 0, true, 'automatic', 'red')
ON CONFLICT (question_key, answer_value) DO NOTHING;

-- ============================================
-- SEED tags (default set)
-- ============================================
INSERT INTO public.tags (name, color) VALUES
('VIP', '#a855f7'),
('Prioritario', '#f59e0b'),
('Riesgo', '#ef4444'),
('Repetidor', '#10b981'),
('Verificado', '#3b82f6'),
('Recomendado', '#ec4899')
ON CONFLICT (name) DO NOTHING;