
-- 1. Allow city managers to read calendar_blocks for cars in their city
CREATE POLICY calendar_blocks_select_city_manager
ON public.calendar_blocks
FOR SELECT
USING (
  is_city_manager(auth.uid())
  AND EXISTS (
    SELECT 1 FROM public.cars c
    WHERE c.id = calendar_blocks.car_id
      AND c.location_id = get_user_city_id(auth.uid())
  )
);

-- 2. Revoke anon access to sensitive car column matricula
REVOKE SELECT (matricula) ON public.cars FROM anon;
