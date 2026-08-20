INSERT INTO public.cars (
  name, brand, model, year, slug, price, participation_price,
  category, category_en, description, description_en,
  luxury_description, luxury_description_en,
  image_url, gallery, features, features_en,
  specifications, specifications_en,
  location_id, available_in,
  max_participations, remaining_participations, annual_fee_percent,
  weeks_per_participation, km_per_participation, participation_duration_years,
  min_reservation_days, max_reservation_days, reservation_advance_days,
  is_active, status, consultation_enabled, total_km
) VALUES (
  'Porsche 911 GT3', 'Porsche', '911 GT3', 2025, 'porsche-911-gt3', 225000.00, NULL,
  'Coupé Deportivo', 'Sports Coupé',
  'El purismo de la pista homologado para carretera',
  'Track purism made road legal',
  'El Porsche 911 GT3 es la expresión más pura del automóvil deportivo: un motor bóxer de 4.0 litros atmosférico que sube hasta 9.000 rpm, una aerodinámica derivada directamente de la competición y un chasis afinado en Nürburgring. Cada elemento existe por una razón: el alerón de cuello de cisne, los frenos cerámicos, la suspensión de doble trapecio delantera. Conducirlo no es solo desplazarse, es acceder a una precisión mecánica que muy pocos coches en el mundo pueden ofrecer, con la fiabilidad y el confort que solo Porsche consigue en un deportivo de estas prestaciones.',
  'The Porsche 911 GT3 is the purest expression of the sports car: a naturally aspirated 4.0-litre flat-six revving to 9,000 rpm, aerodynamics taken straight from motorsport and a chassis honed at the Nürburgring. Every element exists for a reason — the swan-neck rear wing, the ceramic brakes, the double-wishbone front suspension. Driving it is not simply travelling: it is accessing a level of mechanical precision that very few cars in the world can offer, with the reliability and everyday usability only Porsche achieves at this level of performance.',
  '/assets/cars/porsche-911-gt3.jpg',
  ARRAY['/assets/cars/gallery/porsche-911-gt3-1.jpg','/assets/cars/gallery/porsche-911-gt3-2.jpg','/assets/cars/gallery/porsche-911-gt3-3.jpg','/assets/cars/gallery/porsche-911-gt3-4.jpg','/assets/cars/gallery/porsche-911-gt3-5.jpg','/assets/cars/gallery/porsche-911-gt3-6.jpg'],
  ARRAY['Motor bóxer 4.0 atmosférico hasta 9.000 rpm','Alerón trasero de cuello de cisne','Frenos cerámicos PCCB','Suspensión de doble trapecio delantera','Eje trasero direccional','Asientos baquet de carbono'],
  ARRAY['Naturally aspirated 4.0 flat-six revving to 9,000 rpm','Swan-neck rear wing','PCCB carbon ceramic brakes','Double-wishbone front suspension','Rear-axle steering','Carbon fibre full bucket seats'],
  '{"engine":"4.0L Bóxer 6 atmosférico","power":"510 CV a 8.500 rpm","torque":"450 Nm a 6.250 rpm","displacement":"3.996 cc","cylinders":"6 cilindros bóxer","valves":"24 válvulas","compression":"13.3:1","fuelSystem":"Inyección directa DFI","fuelType":"Gasolina sin plomo 98","transmission":"PDK doble embrague 7 velocidades","drivetrain":"Tracción trasera (RWD)","acceleration":"0-100 km/h en 3,4 s","topSpeed":"311 km/h","brakes":"PCCB cerámicos 408/380 mm","suspension":"Doble trapecio delantero / Multibrazo trasero con PASM","tiresFront":"255/35 ZR20","tiresRear":"315/30 ZR21","weight":"1.435 kg","length":"4.573 mm","width":"1.852 mm","height":"1.279 mm","wheelbase":"2.457 mm","seats":"2","doors":"2","trunkCapacity":"132 litros","tankCapacity":"64 litros","fuelConsumption":"13,0 L/100 km","co2Emissions":"294 g/km","emissionClass":"Euro 6e"}'::jsonb,
  '{"engine":"4.0L naturally aspirated Flat-6","power":"510 HP at 8,500 rpm","torque":"450 Nm at 6,250 rpm","displacement":"3,996 cc","cylinders":"Flat-6 (Boxer)","valves":"24 (4 per cylinder)","compression":"13.3:1","fuelSystem":"Direct injection (DFI)","fuelType":"Petrol (98 RON)","transmission":"7-speed PDK dual-clutch","drivetrain":"Rear-wheel drive (RWD)","acceleration":"0-100 km/h in 3.4 s","topSpeed":"311 km/h","brakes":"Carbon ceramic (PCCB) 408/380 mm","suspension":"Double-wishbone (front) / Multi-link (rear) with PASM","tiresFront":"255/35 ZR20","tiresRear":"315/30 ZR21","weight":"1,435 kg","length":"4,573 mm","width":"1,852 mm","height":"1,279 mm","wheelbase":"2,457 mm","seats":"2","doors":"2","trunkCapacity":"132 L","tankCapacity":"64 L","fuelConsumption":"13.0 L/100 km","co2Emissions":"294 g/km","emissionClass":"Euro 6e"}'::jsonb,
  '7c1b562b-1281-4b4b-8e9e-f6da148a4dfe', ARRAY['Madrid','Barcelona'],
  10, 10, 10, 4, 2000, 5, 7, 14, 7,
  true, 'active', true, 0
);