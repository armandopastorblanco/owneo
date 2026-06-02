ALTER TABLE public.internal_notes
  ADD CONSTRAINT internal_notes_admin_id_fkey
  FOREIGN KEY (admin_id) REFERENCES public.profiles(id) ON DELETE CASCADE;