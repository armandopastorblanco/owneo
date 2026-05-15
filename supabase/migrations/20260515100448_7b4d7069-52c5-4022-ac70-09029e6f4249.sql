ALTER TABLE public.locations ADD COLUMN slug TEXT;

UPDATE public.locations SET slug = 'alicante'  WHERE id = '98864fd4-0412-42f1-85b5-f6363ed57478';
UPDATE public.locations SET slug = 'barcelona' WHERE id = '03e88814-c0af-4287-8e9c-efd44be64192';
UPDATE public.locations SET slug = 'ibiza'     WHERE id = '02c5e1b6-abe7-4c2a-baa5-b64bf9185835';
UPDATE public.locations SET slug = 'madrid'    WHERE id = '7c1b562b-1281-4b4b-8e9e-f6da148a4dfe';
UPDATE public.locations SET slug = 'marbella'  WHERE id = '12800ab8-e39e-4c54-a299-bc27a5aeddc4';
UPDATE public.locations SET slug = 'valencia'  WHERE id = '83bf1b36-f974-44b8-928a-b1d55fd495dc';

ALTER TABLE public.locations ADD CONSTRAINT locations_slug_key UNIQUE (slug);