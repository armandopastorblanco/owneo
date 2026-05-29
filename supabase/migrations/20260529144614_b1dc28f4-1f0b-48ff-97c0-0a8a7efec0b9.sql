
-- 1) participant_documents: prevent users from self-approving
DROP POLICY IF EXISTS user_update_own_documents ON public.participant_documents;

CREATE POLICY user_update_own_documents_file_only
ON public.participant_documents
FOR UPDATE
TO authenticated
USING (auth.uid() = user_id)
WITH CHECK (auth.uid() = user_id);

-- Trigger to prevent non-admin users from changing review fields
CREATE OR REPLACE FUNCTION public.prevent_participant_doc_review_change()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  IF public.is_superadmin(auth.uid()) THEN
    RETURN NEW;
  END IF;
  IF NEW.status IS DISTINCT FROM OLD.status
     OR NEW.reviewed_by IS DISTINCT FROM OLD.reviewed_by
     OR NEW.reviewed_at IS DISTINCT FROM OLD.reviewed_at
     OR NEW.user_id IS DISTINCT FROM OLD.user_id
     OR NEW.document_type_id IS DISTINCT FROM OLD.document_type_id THEN
    RAISE EXCEPTION 'Only admins can change document review fields';
  END IF;
  -- Force status back to pending when user re-uploads
  NEW.status := 'pending';
  NEW.reviewed_by := NULL;
  NEW.reviewed_at := NULL;
  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS prevent_participant_doc_review_change_trg ON public.participant_documents;
CREATE TRIGGER prevent_participant_doc_review_change_trg
BEFORE UPDATE ON public.participant_documents
FOR EACH ROW EXECUTE FUNCTION public.prevent_participant_doc_review_change();

-- 2) calendar_blocks: restrict reads to admins, city_managers, or users with validated participation on the car
DROP POLICY IF EXISTS calendar_blocks_select_auth ON public.calendar_blocks;

CREATE POLICY calendar_blocks_select_scoped
ON public.calendar_blocks
FOR SELECT
TO authenticated
USING (
  is_superadmin(auth.uid())
  OR is_city_manager(auth.uid())
  OR EXISTS (
    SELECT 1 FROM public.validated_participations vp
    WHERE vp.car_id = calendar_blocks.car_id
      AND vp.user_id = auth.uid()
  )
);
