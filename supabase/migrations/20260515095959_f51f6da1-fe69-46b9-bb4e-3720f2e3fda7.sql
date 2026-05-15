ALTER TABLE public.cars DROP COLUMN IF EXISTS slug;
ALTER TABLE public.cars ADD COLUMN slug TEXT;

UPDATE public.cars SET slug = 'aston-martin-db11'            WHERE id = '2aeadef8-c31e-4cba-bc02-8ebc1226eea2';
UPDATE public.cars SET slug = 'bentley-continental-gt'        WHERE id = '45b3d614-ccf3-466c-a418-64e4acb1b39e';
UPDATE public.cars SET slug = 'ferrari-f8-tributo'            WHERE id = '5bd510f3-2ec7-419d-a187-ca64954b771d';
UPDATE public.cars SET slug = 'ferrari-portofino'             WHERE id = '87791097-73dc-4c32-b042-f718b1767e30';
UPDATE public.cars SET slug = 'ferrari-roma'                  WHERE id = '8b5f54f3-abaa-4ae1-997a-ca948a39929c';
UPDATE public.cars SET slug = 'lamborghini-aventador-ultimae' WHERE id = '504c5ef8-d16b-4ec3-8d42-661289d06854';
UPDATE public.cars SET slug = 'lamborghini-huracan-evo'       WHERE id = '7ffcf04d-133d-4d40-85ec-b74a00746dca';
UPDATE public.cars SET slug = 'lamborghini-urus'              WHERE id = '6dacf95f-7618-4378-93dc-c9112335fa70';
UPDATE public.cars SET slug = 'mclaren-720s'                  WHERE id = '1712bc89-4a73-47d8-be4b-9e93d73416fa';
UPDATE public.cars SET slug = 'mercedes-amg-gt-r'             WHERE id = 'c3c57dc6-07b2-4d24-805b-de2984131b66';
UPDATE public.cars SET slug = 'porsche-911-turbo-s'           WHERE id = '96f8902c-7f8f-4518-a6df-940ebdc0dec0';
UPDATE public.cars SET slug = 'porsche-cayenne-turbo-gt'      WHERE id = '1d6e2df5-a8d5-488d-99a2-66f707795a55';
UPDATE public.cars SET slug = 'porsche-macan-turbo'           WHERE id = '4aa6ed21-38d6-4c7c-9750-4c3b77191c04';
UPDATE public.cars SET slug = 'porsche-taycan-turbo-s'        WHERE id = 'cc203125-577d-49c3-b074-0400cc2abe2e';
UPDATE public.cars SET slug = 'rolls-royce-wraith'            WHERE id = 'c2baff66-8819-43ae-8dcd-855739fe6570';

ALTER TABLE public.cars ADD CONSTRAINT cars_slug_key UNIQUE (slug);