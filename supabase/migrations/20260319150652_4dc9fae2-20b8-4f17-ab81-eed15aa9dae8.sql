
-- Create public bucket for car/site images
INSERT INTO storage.buckets (id, name, public) VALUES ('images', 'images', true);

-- Create private bucket for user documents
INSERT INTO storage.buckets (id, name, public) VALUES ('documents', 'documents', false);

-- Images: anyone can view
CREATE POLICY "Public image access" ON storage.objects FOR SELECT USING (bucket_id = 'images');

-- Images: authenticated users can upload
CREATE POLICY "Authenticated users can upload images" ON storage.objects FOR INSERT TO authenticated WITH CHECK (bucket_id = 'images');

-- Images: admins can delete images
CREATE POLICY "Admins can delete images" ON storage.objects FOR DELETE TO authenticated USING (bucket_id = 'images' AND public.is_admin(auth.uid()));

-- Images: admins can update images
CREATE POLICY "Admins can update images" ON storage.objects FOR UPDATE TO authenticated USING (bucket_id = 'images' AND public.is_admin(auth.uid()));

-- Documents: users can view own documents
CREATE POLICY "Users can view own documents" ON storage.objects FOR SELECT TO authenticated USING (bucket_id = 'documents' AND auth.uid()::text = (storage.foldername(name))[1]);

-- Documents: users can upload own documents
CREATE POLICY "Users can upload own documents" ON storage.objects FOR INSERT TO authenticated WITH CHECK (bucket_id = 'documents' AND auth.uid()::text = (storage.foldername(name))[1]);

-- Documents: users can delete own documents
CREATE POLICY "Users can delete own documents" ON storage.objects FOR DELETE TO authenticated USING (bucket_id = 'documents' AND auth.uid()::text = (storage.foldername(name))[1]);

-- Documents: admins can view all documents
CREATE POLICY "Admins can view all documents" ON storage.objects FOR SELECT TO authenticated USING (bucket_id = 'documents' AND public.is_admin(auth.uid()));
