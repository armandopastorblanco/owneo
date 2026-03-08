import ferrariPortofino from "@/assets/cars/ferrari-portofino.jpg";
import porsche911TurboS from "@/assets/cars/porsche-911-turbo-s.jpg";
import lamborghiniHuracanEvo from "@/assets/cars/lamborghini-huracan-evo.jpg";
import porscheMacanTurbo from "@/assets/cars/porsche-macan-turbo.jpg";
import ferrariF8Tributo from "@/assets/cars/ferrari-f8-tributo.jpg";
import lamborghiniUrus from "@/assets/cars/lamborghini-urus.jpg";
import porscheTaycanTurboS from "@/assets/cars/porsche-taycan-turbo-s.jpg";
import ferrariRoma from "@/assets/cars/ferrari-roma.jpg";
import lamborghiniAventador from "@/assets/cars/lamborghini-aventador.jpg";
import astonMartinDB11 from "@/assets/cars/aston-martin-db11.jpg";
import mclaren720s from "@/assets/cars/mclaren-720s.jpg";
import porscheCayenneTurboGT from "@/assets/cars/porsche-cayenne-turbo-gt.jpg";
import mercedesAMGGTR from "@/assets/cars/mercedes-amg-gt-r.jpg";
import bentleyContinentalGT from "@/assets/cars/bentley-continental-gt.jpg";
import rollsRoyceWraith from "@/assets/cars/rolls-royce-wraith.jpg";

// Ferrari Portofino gallery images
import ferrariPortofinoGallery1 from "@/assets/cars/gallery/ferrari-portofino-1.jpg";
import ferrariPortofinoGallery2 from "@/assets/cars/gallery/ferrari-portofino-2.jpg";
import ferrariPortofinoGallery3 from "@/assets/cars/gallery/ferrari-portofino-3.jpg";
import ferrariPortofinoGallery4 from "@/assets/cars/gallery/ferrari-portofino-4.jpg";
import ferrariPortofinoGallery5 from "@/assets/cars/gallery/ferrari-portofino-5.jpg";
import ferrariPortofinoGallery6 from "@/assets/cars/gallery/ferrari-portofino-6.jpg";
import ferrariPortofinoGallery7 from "@/assets/cars/gallery/ferrari-portofino-7.jpg";
import ferrariPortofinoGallery8 from "@/assets/cars/gallery/ferrari-portofino-8.jpg";
import ferrariPortofinoGallery9 from "@/assets/cars/gallery/ferrari-portofino-9.jpg";
import ferrariPortofinoGallery10 from "@/assets/cars/gallery/ferrari-portofino-10.jpg";
import ferrariPortofinoGallery11 from "@/assets/cars/gallery/ferrari-portofino-11.jpg";
import ferrariPortofinoGallery12 from "@/assets/cars/gallery/ferrari-portofino-12.jpg";
import ferrariPortofinoGallery13 from "@/assets/cars/gallery/ferrari-portofino-13.jpg";
import ferrariPortofinoGallery14 from "@/assets/cars/gallery/ferrari-portofino-14.jpg";
import ferrariPortofinoGallery15 from "@/assets/cars/gallery/ferrari-portofino-15.jpg";

export interface Car {
  id: string;
  name: string;
  brand: string;
  model: string;
  year: number;
  price: string;
  image: string;
  gallery?: string[];
  category: string;
  description: string;
  luxuryDescription: string;
  specifications: {
    engine: string;
    power: string;
    torque: string;
    acceleration: string;
    topSpeed: string;
    transmission: string;
    drivetrain: string;
    weight: string;
  };
  features: string[];
  availableIn: string[];
}

export const cars: Car[] = [
  {
    id: "ferrari-portofino",
    name: "Ferrari Portofino",
    brand: "Ferrari",
    model: "Portofino",
    year: 2024,
    price: "€215,000",
    image: ferrariPortofino,
    gallery: [
      ferrariPortofinoGallery1,
      ferrariPortofinoGallery2,
      ferrariPortofinoGallery3,
      ferrariPortofinoGallery4,
      ferrariPortofinoGallery7,
      ferrariPortofinoGallery8,
      ferrariPortofinoGallery10,
      ferrariPortofinoGallery11,
      ferrariPortofinoGallery12,
      ferrariPortofinoGallery5,
      ferrariPortofinoGallery6,
      ferrariPortofinoGallery9,
      ferrariPortofinoGallery13,
      ferrariPortofinoGallery14,
      ferrariPortofinoGallery15
    ],
    category: "GT Descapotable",
    description: "La máxima expresión de la elegancia italiana con un rendimiento extraordinario",
    luxuryDescription: "El Ferrari Portofino encarna la fusión perfecta de rendimiento exhilarante y confort lujoso. Este sofisticado Gran Turismo descapotable captura la esencia de la dolce vita con su techo rígido retráctil, suntuosos interiores de cuero y el inconfundible rugido de un motor Ferrari V8. Cada viaje se convierte en una experiencia inolvidable, ya sea recorriendo la costa mediterránea o dominando la carretera abierta con absoluta autoridad.",
    specifications: {
      engine: "3.9L Twin-Turbo V8",
      power: "600 CV",
      torque: "760 Nm",
      acceleration: "0-100 km/h en 3.5s",
      topSpeed: "320 km/h",
      transmission: "Doble Embrague 7 Velocidades",
      drivetrain: "RWD",
      weight: "1.664 kg"
    },
    features: [
      "Techo rígido retráctil",
      "Interiores de cuero Frau",
      "Integración Apple CarPlay",
      "Aerodinámica avanzada",
      "Modos de conducción Manettino"
    ],
    availableIn: ["Barcelona", "Madrid", "Marbella", "Valencia"]
  },
  {
    id: "porsche-911-turbo-s",
    name: "Porsche 911 Turbo S",
    brand: "Porsche",
    model: "911 Turbo S",
    year: 2024,
    price: "€230,000",
    image: porsche911TurboS,
    category: "Coupé Deportivo",
    description: "Ingeniería alemana en su máxima expresión",
    luxuryDescription: "El Porsche 911 Turbo S representa la cúspide de la ingeniería de precisión y el diseño atemporal. Este legendario deportivo combina una aceleración fulminante con usabilidad cotidiana, ofreciendo una experiencia de conducción sin compromisos que ha cautivado a los entusiastas durante generaciones. Su icónica silueta oculta tecnología de vanguardia y potencia pura, convirtiéndolo en la expresión definitiva de la excelencia automotriz.",
    specifications: {
      engine: "3.8L Twin-Turbo Flat-6",
      power: "650 CV",
      torque: "800 Nm",
      acceleration: "0-100 km/h en 2.7s",
      topSpeed: "330 km/h",
      transmission: "PDK 8 Velocidades",
      drivetrain: "AWD",
      weight: "1.640 kg"
    },
    features: [
      "Gestión de suspensión activa",
      "Paquete Sport Chrono",
      "Frenos cerámicos compuestos",
      "Sistema de sonido Burmester",
      "Control de crucero adaptativo"
    ],
    availableIn: ["Barcelona", "Madrid", "Marbella", "Valencia", "Ibiza"]
  },
  {
    id: "lamborghini-huracan-evo",
    name: "Lamborghini Huracán EVO",
    brand: "Lamborghini",
    model: "Huracán EVO",
    year: 2024,
    price: "€250,000",
    image: lamborghiniHuracanEvo,
    category: "Superdeportivo",
    description: "Pasión italiana en su forma más pura",
    luxuryDescription: "El Lamborghini Huracán EVO es una obra maestra del arte automotriz que acapara la atención dondequiera que vaya. Con su agresivo diseño angular y motor V10 atmosférico, este superdeportivo ofrece una experiencia de conducción visceral que despierta todos tus sentidos. El Huracán EVO no es solo un coche—es una declaración de ambición sin compromisos y rendimiento sin disculpas.",
    specifications: {
      engine: "5.2L V10",
      power: "640 CV",
      torque: "600 Nm",
      acceleration: "0-100 km/h en 2.9s",
      topSpeed: "325 km/h",
      transmission: "Doble Embrague 7 Velocidades",
      drivetrain: "AWD",
      weight: "1.422 kg"
    },
    features: [
      "Dinámica vehicular LDVI",
      "Dirección trasera",
      "Interiores de Alcantara",
      "Sistema de telemetría",
      "Aerodinámica avanzada"
    ],
    availableIn: ["Barcelona", "Madrid", "Marbella", "Ibiza"]
  },
  {
    id: "porsche-macan-turbo",
    name: "Porsche Macan Turbo",
    brand: "Porsche",
    model: "Macan Turbo",
    year: 2024,
    price: "€95,000",
    image: porscheMacanTurbo,
    category: "SUV de Lujo",
    description: "El deportivo de los SUV",
    luxuryDescription: "El Porsche Macan Turbo redefine lo que un SUV de lujo puede ser. Combinando el legendario ADN de deportivo de Porsche con la versatilidad de un SUV, ofrece un rendimiento exhilarante sin sacrificar confort o practicidad. Ya sea navegando por calles urbanas o conquistando carreteras de montaña, el Macan Turbo ofrece una combinación inigualable de potencia, agilidad y lujo refinado.",
    specifications: {
      engine: "2.9L Twin-Turbo V6",
      power: "440 CV",
      torque: "550 Nm",
      acceleration: "0-100 km/h en 4.3s",
      topSpeed: "270 km/h",
      transmission: "PDK 7 Velocidades",
      drivetrain: "AWD",
      weight: "2.035 kg"
    },
    features: [
      "Suspensión neumática",
      "Paquete Sport Chrono",
      "Techo panorámico",
      "Sistema de sonido Bose",
      "Asistente de mantenimiento de carril"
    ],
    availableIn: ["Barcelona", "Madrid", "Valencia"]
  },
  {
    id: "ferrari-f8-tributo",
    name: "Ferrari F8 Tributo",
    brand: "Ferrari",
    model: "F8 Tributo",
    year: 2024,
    price: "€280,000",
    image: ferrariF8Tributo,
    category: "Superdeportivo",
    description: "Un tributo al V8 más potente en la historia de Ferrari",
    luxuryDescription: "El Ferrari F8 Tributo celebra el motor V8 más potente de Ferrari con un diseño impresionante y un rendimiento extraordinario. Esta obra maestra de motor central ofrece dinámicas enfocadas a la pista con el refinamiento de un coche de carretera, proporcionando una conexión sin filtros entre conductor y máquina. Cada detalle, desde su carrocería esculpida hasta su interior meticulosamente elaborado, refleja el compromiso inquebrantable de Ferrari con la excelencia.",
    specifications: {
      engine: "3.9L Twin-Turbo V8",
      power: "720 CV",
      torque: "770 Nm",
      acceleration: "0-100 km/h en 2.9s",
      topSpeed: "340 km/h",
      transmission: "Doble Embrague 7 Velocidades",
      drivetrain: "RWD",
      weight: "1.330 kg"
    },
    features: [
      "Side Slip Control 6.1",
      "Ferrari Dynamic Enhancer",
      "Asientos de carrera en fibra de carbono",
      "Telemetría avanzada",
      "Faros adaptativos"
    ],
    availableIn: ["Barcelona", "Madrid", "Marbella"]
  },
  {
    id: "lamborghini-urus",
    name: "Lamborghini Urus",
    brand: "Lamborghini",
    model: "Urus",
    year: 2024,
    price: "€220,000",
    image: lamborghiniUrus,
    category: "Super SUV",
    description: "El primer Super Sport Utility Vehicle del mundo",
    luxuryDescription: "El Lamborghini Urus rompe todas las convenciones como el primer Super SUV del mundo. Combinando el icónico lenguaje de diseño de Lamborghini con una versatilidad sin precedentes, el Urus ofrece rendimiento de superdeportivo en un paquete SUV. Su lujosa cabina, tecnología de vanguardia y carácter inconfundible de Lamborghini lo convierten en la elección perfecta para quienes se niegan a comprometer.",
    specifications: {
      engine: "4.0L Twin-Turbo V8",
      power: "650 CV",
      torque: "850 Nm",
      acceleration: "0-100 km/h en 3.6s",
      topSpeed: "305 km/h",
      transmission: "Automático 8 Velocidades",
      drivetrain: "AWD",
      weight: "2.200 kg"
    },
    features: [
      "Modos de conducción ANIMA",
      "Estabilización activa de balanceo",
      "Visión nocturna",
      "Audio Bang & Olufsen",
      "Suspensión neumática adaptativa"
    ],
    availableIn: ["Barcelona", "Madrid", "Marbella", "Valencia", "Ibiza"]
  },
  {
    id: "porsche-taycan-turbo-s",
    name: "Porsche Taycan Turbo S",
    brand: "Porsche",
    model: "Taycan Turbo S",
    year: 2024,
    price: "€190,000",
    image: porscheTaycanTurboS,
    category: "Sedán Deportivo Eléctrico",
    description: "El futuro del rendimiento es eléctrico",
    luxuryDescription: "El Porsche Taycan Turbo S demuestra que el rendimiento eléctrico puede ser verdaderamente exhilarante. Este revolucionario sedán deportivo combina entrega instantánea de par con las legendarias dinámicas de conducción de Porsche, creando una experiencia de conducción sin igual. Con su impresionante diseño, lujoso interior y tren motriz de cero emisiones, el Taycan Turbo S representa la fusión perfecta de sostenibilidad y rendimiento.",
    specifications: {
      engine: "Motores Eléctricos Duales",
      power: "761 CV",
      torque: "1.050 Nm",
      acceleration: "0-100 km/h en 2.8s",
      topSpeed: "260 km/h",
      transmission: "Automático 2 Velocidades",
      drivetrain: "AWD",
      weight: "2.295 kg"
    },
    features: [
      "Arquitectura 800V",
      "Capacidad de carga rápida",
      "Suspensión neumática adaptativa",
      "Porsche Active Suspension",
      "Paquete interior premium"
    ],
    availableIn: ["Barcelona", "Madrid", "Valencia"]
  },
  {
    id: "ferrari-roma",
    name: "Ferrari Roma",
    brand: "Ferrari",
    model: "Roma",
    year: 2024,
    price: "€210,000",
    image: ferrariRoma,
    category: "Gran Turismo",
    description: "Elegancia contemporánea con el rendimiento intemporal de Ferrari",
    luxuryDescription: "El Ferrari Roma captura la forma de vida despreocupada y placentera de la Roma de los años 50 y 60, reimaginada para la era moderna. Este sofisticado Gran Turismo presenta un diseño minimalista pero elegante, una cabina centrada en el conductor y el emocionante rendimiento de un Ferrari V8. El Roma representa un nuevo capítulo en el legado de Ferrari, donde el lujo refinado se encuentra con la dinámica exhilarante.",
    specifications: {
      engine: "3.9L Twin-Turbo V8",
      power: "620 CV",
      torque: "760 Nm",
      acceleration: "0-100 km/h en 3.4s",
      topSpeed: "320 km/h",
      transmission: "Doble Embrague 8 Velocidades",
      drivetrain: "RWD",
      weight: "1.570 kg"
    },
    features: [
      "Cuadro de instrumentos digital",
      "Pantalla para el pasajero",
      "Interiores de cuero premium",
      "Asistencia avanzada al conductor",
      "Suspensión magnetorreológica"
    ],
    availableIn: ["Barcelona", "Madrid", "Marbella", "Ibiza"]
  },
  {
    id: "lamborghini-aventador",
    name: "Lamborghini Aventador Ultimae",
    brand: "Lamborghini",
    model: "Aventador Ultimae",
    year: 2024,
    price: "€500,000",
    image: lamborghiniAventador,
    category: "Superdeportivo Insignia",
    description: "La evolución final de un icono",
    luxuryDescription: "El Lamborghini Aventador Ultimae representa la expresión definitiva del rendimiento V12 atmosférico. Esta obra maestra de edición limitada combina los mejores elementos de los modelos Aventador SVJ y S, creando el Aventador más potente y refinado jamás construido. Con sus dramáticas puertas de tijera, monocasco de fibra de carbono y la banda sonora escalofriante del V12, el Ultimae es un tributo digno a uno de los superdeportivos más grandes jamás creados.",
    specifications: {
      engine: "6.5L V12",
      power: "780 CV",
      torque: "720 Nm",
      acceleration: "0-100 km/h en 2.8s",
      topSpeed: "355 km/h",
      transmission: "ISR 7 Velocidades",
      drivetrain: "AWD",
      weight: "1.550 kg"
    },
    features: [
      "Monocasco de fibra de carbono",
      "Dirección trasera",
      "Puertas de tijera",
      "Aerodinámica avanzada",
      "Diseño exclusivo Ultimae"
    ],
    availableIn: ["Barcelona", "Marbella"]
  },
  {
    id: "aston-martin-db11",
    name: "Aston Martin DB11",
    brand: "Aston Martin",
    model: "DB11",
    year: 2024,
    price: "€225,000",
    image: astonMartinDB11,
    category: "Gran Turismo",
    description: "Elegancia británica en su máxima expresión",
    luxuryDescription: "El Aston Martin DB11 encarna el equilibrio perfecto entre belleza y rendimiento. Este Gran Turismo quintaesencialmente británico presenta lujo artesanal, diseño atemporal y un potente motor twin-turbo V8 o V12. Cada viaje en el DB11 es una ocasión especial, ya sea cruzando continentes con supremo confort o disfrutando de una conducción enérgica en tu carretera favorita.",
    specifications: {
      engine: "4.0L Twin-Turbo V8",
      power: "528 CV",
      torque: "675 Nm",
      acceleration: "0-100 km/h en 3.9s",
      topSpeed: "301 km/h",
      transmission: "Automático 8 Velocidades",
      drivetrain: "RWD",
      weight: "1.770 kg"
    },
    features: [
      "Cuero cosido a mano",
      "Audio Bang & Olufsen",
      "Amortiguación adaptativa",
      "Tecnología Aeroblade",
      "Conectividad premium"
    ],
    availableIn: ["Barcelona", "Madrid", "Marbella", "Ibiza"]
  },
  {
    id: "mclaren-720s",
    name: "McLaren 720S",
    brand: "McLaren",
    model: "720S",
    year: 2024,
    price: "€285,000",
    image: mclaren720s,
    category: "Superdeportivo",
    description: "Excelencia aerodinámica con rendimiento puro",
    luxuryDescription: "El McLaren 720S empuja los límites de lo que un superdeportivo puede lograr. Con su innovadora estructura de fibra de carbono, distintivas puertas diédricas y rendimiento impresionante, el 720S ofrece una experiencia de conducción que es tanto emocionante como refinada. Cada aspecto de su diseño tiene un propósito, creando una máquina que es tan funcional como hermosa.",
    specifications: {
      engine: "4.0L Twin-Turbo V8",
      power: "720 CV",
      torque: "770 Nm",
      acceleration: "0-100 km/h en 2.9s",
      topSpeed: "341 km/h",
      transmission: "SSG 7 Velocidades",
      drivetrain: "RWD",
      weight: "1.283 kg"
    },
    features: [
      "Monocasco de fibra de carbono",
      "Control de Chasis Proactivo",
      "Puertas diédricas",
      "Control de Deriva Variable",
      "Audio Bowers & Wilkins"
    ],
    availableIn: ["Barcelona", "Madrid", "Marbella"]
  },
  {
    id: "porsche-cayenne-turbo-gt",
    name: "Porsche Cayenne Turbo GT",
    brand: "Porsche",
    model: "Cayenne Turbo GT",
    year: 2024,
    price: "€185,000",
    image: porscheCayenneTurboGT,
    category: "SUV de Alto Rendimiento",
    description: "El Cayenne más potente jamás creado",
    luxuryDescription: "El Porsche Cayenne Turbo GT es el SUV de rendimiento definitivo, combinando capacidades enfocadas a la pista con usabilidad cotidiana. Este vehículo excepcional presenta un estilo agresivo, aerodinámica mejorada y el motor más potente jamás montado en un Cayenne. Es la prueba de que un SUV puede ofrecer rendimiento genuino de deportivo sin compromisos.",
    specifications: {
      engine: "4.0L Twin-Turbo V8",
      power: "640 CV",
      torque: "850 Nm",
      acceleration: "0-100 km/h en 3.3s",
      topSpeed: "300 km/h",
      transmission: "Tiptronic S 8 Velocidades",
      drivetrain: "AWD",
      weight: "2.200 kg"
    },
    features: [
      "Paquete Sport Chrono",
      "Frenos cerámicos de carbono",
      "Barras antivuelco activas",
      "Aerodinámica específica GT",
      "Asientos deportivos ligeros"
    ],
    availableIn: ["Barcelona", "Madrid", "Valencia"]
  },
  {
    id: "mercedes-amg-gt-r",
    name: "Mercedes-AMG GT R",
    brand: "Mercedes-AMG",
    model: "GT R",
    year: 2024,
    price: "€195,000",
    image: mercedesAMGGTR,
    category: "Coupé Deportivo",
    description: "La Bestia del Infierno Verde",
    luxuryDescription: "El Mercedes-AMG GT R, conocido como 'La Bestia del Infierno Verde', es un superdeportivo enfocado a la pista que trae el rendimiento perfeccionado en Nürburgring a la carretera. Con su estilo distintivo, motor V8 AMG artesanal y tecnología derivada de la competición, el GT R ofrece una mezcla embriagadora de potencia bruta y lujo refinado que solo AMG puede proporcionar.",
    specifications: {
      engine: "4.0L Twin-Turbo V8",
      power: "585 CV",
      torque: "700 Nm",
      acceleration: "0-100 km/h en 3.6s",
      topSpeed: "318 km/h",
      transmission: "Doble Embrague 7 Velocidades",
      drivetrain: "RWD",
      weight: "1.555 kg"
    },
    features: [
      "AMG RIDE CONTROL",
      "Dirección trasera",
      "Frenos cerámicos de carbono",
      "Aerodinámica enfocada a pista",
      "Escape AMG Performance"
    ],
    availableIn: ["Barcelona", "Madrid", "Valencia", "Ibiza"]
  },
  {
    id: "bentley-continental-gt",
    name: "Bentley Continental GT",
    brand: "Bentley",
    model: "Continental GT",
    year: 2024,
    price: "€240,000",
    image: bentleyContinentalGT,
    category: "Gran Turismo de Lujo",
    description: "Lujo incomparable con rendimiento sin esfuerzo",
    luxuryDescription: "El Bentley Continental GT representa la cúspide del lujo en Gran Turismo. Fabricado artesanalmente en Crewe, Inglaterra, este magnífico coupé combina materiales exquisitos, atención meticulosa al detalle y la potencia del W12. Cada viaje se convierte en una experiencia de confort y refinamiento absolutos, donde el único límite es el horizonte.",
    specifications: {
      engine: "6.0L Twin-Turbo W12",
      power: "635 CV",
      torque: "900 Nm",
      acceleration: "0-100 km/h en 3.7s",
      topSpeed: "333 km/h",
      transmission: "Doble Embrague 8 Velocidades",
      drivetrain: "AWD",
      weight: "2.244 kg"
    },
    features: [
      "Pantalla rotatoria",
      "Audio Naim for Bentley",
      "Cuero acolchado en diamante",
      "Control de crucero adaptativo",
      "Chapas de madera artesanales"
    ],
    availableIn: ["Barcelona", "Madrid", "Marbella", "Ibiza"]
  },
  {
    id: "rolls-royce-wraith",
    name: "Rolls-Royce Wraith",
    brand: "Rolls-Royce",
    model: "Wraith",
    year: 2024,
    price: "€350,000",
    image: rollsRoyceWraith,
    category: "Coupé de Lujo",
    description: "El Rolls-Royce más potente jamás creado",
    luxuryDescription: "El Rolls-Royce Wraith es una declaración de lujo y rendimiento sin compromisos. Este coupé fastback combina la potencia sin esfuerzo de un V12 biturbo con el supremo confort y artesanía que solo Rolls-Royce puede ofrecer. Cada detalle, desde el techo cielo estrellado hasta el Espíritu del Éxtasis, está diseñado para crear una experiencia automotriz sin igual.",
    specifications: {
      engine: "6.6L Twin-Turbo V12",
      power: "632 CV",
      torque: "820 Nm",
      acceleration: "0-100 km/h en 4.4s",
      topSpeed: "250 km/h (limitado)",
      transmission: "Automático 8 Velocidades",
      drivetrain: "RWD",
      weight: "2.435 kg"
    },
    features: [
      "Techo cielo estrellado",
      "Sistema de audio Bespoke",
      "Transmisión asistida por satélite",
      "Cuero cosido a mano",
      "Puertas coach"
    ],
    availableIn: ["Barcelona", "Marbella", "Ibiza"]
  }
];

import barcelonaImg from "@/assets/cities/barcelona.jpg";
import madridImg from "@/assets/cities/madrid.jpg";
import marbellaImg from "@/assets/cities/marbella.jpg";
import valenciaImg from "@/assets/cities/valencia.jpg";
import ibizaImg from "@/assets/cities/ibiza.jpg";
import alicanteImg from "@/assets/cities/alicante.jpg";

export const cities = [
  {
    id: "barcelona",
    name: "Barcelona",
    description: "La capital cosmopolita de Cataluña, donde la arquitectura modernista se encuentra con las playas mediterráneas",
    image: barcelonaImg
  },
  {
    id: "madrid",
    name: "Madrid",
    description: "La vibrante capital de España, conocida por su patrimonio real y su cultura de clase mundial",
    image: madridImg
  },
  {
    id: "marbella",
    name: "Marbella",
    description: "La joya de la Costa del Sol, sinónimo de lujo, glamour y vida sofisticada",
    image: marbellaImg
  },
  {
    id: "valencia",
    name: "Valencia",
    description: "Una mezcla perfecta de encanto histórico y arquitectura futurista en la costa este de España",
    image: valenciaImg
  },
  {
    id: "ibiza",
    name: "Ibiza",
    description: "La legendaria isla mediterránea que ofrece playas vírgenes y experiencias exclusivas",
    image: ibizaImg
  },
  {
    id: "alicante",
    name: "Alicante",
    description: "Una joya mediterránea impresionante con playas doradas, castillos históricos y un vibrante estilo de vida costero",
    image: alicanteImg
  }
];
