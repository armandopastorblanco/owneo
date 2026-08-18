CREATE POLICY "cars_select_admins" ON public.cars
FOR SELECT TO authenticated
USING (public.is_superadmin(auth.uid()) OR public.is_city_manager(auth.uid()));