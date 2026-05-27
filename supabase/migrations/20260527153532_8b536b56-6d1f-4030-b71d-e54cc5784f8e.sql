
-- 1) Hide manager contact fields from anonymous users
REVOKE SELECT (manager_email, manager_phone, manager_name) ON public.cars FROM anon;

-- 2) Attach triggers to lock review fields on participant_documents
DROP TRIGGER IF EXISTS trg_enforce_user_doc_insert_defaults ON public.participant_documents;
CREATE TRIGGER trg_enforce_user_doc_insert_defaults
  BEFORE INSERT ON public.participant_documents
  FOR EACH ROW
  EXECUTE FUNCTION public.enforce_user_doc_insert_defaults();

DROP TRIGGER IF EXISTS trg_prevent_user_doc_review_change ON public.participant_documents;
CREATE TRIGGER trg_prevent_user_doc_review_change
  BEFORE UPDATE ON public.participant_documents
  FOR EACH ROW
  EXECUTE FUNCTION public.prevent_user_doc_review_change();
