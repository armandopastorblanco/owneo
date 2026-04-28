ALTER TABLE public.validated_participations 
DROP CONSTRAINT IF EXISTS unique_user_car_participation;

ALTER TABLE public.validated_participations 
ADD CONSTRAINT unique_user_car_participation 
UNIQUE (user_id, car_id, participation_number);