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

export interface Car {
  id: string;
  name: string;
  brand: string;
  model: string;
  year: number;
  price: string;
  image: string;
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
    category: "Convertible GT",
    description: "The epitome of Italian elegance meets breathtaking performance",
    luxuryDescription: "The Ferrari Portofino embodies the perfect fusion of exhilarating performance and luxurious comfort. This sophisticated convertible grand tourer captures the essence of la dolce vita with its retractable hardtop, sumptuous leather interiors, and the unmistakable roar of a Ferrari V8 engine. Every journey becomes an unforgettable experience, whether cruising along the Mediterranean coast or commanding the open road with absolute authority.",
    specifications: {
      engine: "3.9L Twin-Turbo V8",
      power: "600 HP",
      torque: "760 Nm",
      acceleration: "0-100 km/h in 3.5s",
      topSpeed: "320 km/h",
      transmission: "7-Speed Dual-Clutch",
      drivetrain: "RWD",
      weight: "1,664 kg"
    },
    features: [
      "Retractable hardtop",
      "Leather Frau interiors",
      "Apple CarPlay integration",
      "Advanced aerodynamics",
      "Manettino driving modes"
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
    category: "Sports Coupe",
    description: "German engineering at its absolute finest",
    luxuryDescription: "The Porsche 911 Turbo S represents the pinnacle of precision engineering and timeless design. This legendary sports car combines blistering acceleration with everyday usability, delivering an uncompromising driving experience that has captivated enthusiasts for generations. Its iconic silhouette conceals cutting-edge technology and raw power, making it the ultimate expression of automotive excellence.",
    specifications: {
      engine: "3.8L Twin-Turbo Flat-6",
      power: "650 HP",
      torque: "800 Nm",
      acceleration: "0-100 km/h in 2.7s",
      topSpeed: "330 km/h",
      transmission: "8-Speed PDK",
      drivetrain: "AWD",
      weight: "1,640 kg"
    },
    features: [
      "Active suspension management",
      "Sport Chrono Package",
      "Ceramic composite brakes",
      "Burmester sound system",
      "Adaptive cruise control"
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
    category: "Supercar",
    description: "Raw Italian passion in its purest form",
    luxuryDescription: "The Lamborghini Huracán EVO is a masterpiece of automotive artistry that commands attention wherever it goes. With its aggressive angular design and naturally aspirated V10 engine, this supercar delivers an visceral driving experience that awakens all your senses. The Huracán EVO isn't just a car—it's a statement of uncompromising ambition and unapologetic performance.",
    specifications: {
      engine: "5.2L V10",
      power: "640 HP",
      torque: "600 Nm",
      acceleration: "0-100 km/h in 2.9s",
      topSpeed: "325 km/h",
      transmission: "7-Speed Dual-Clutch",
      drivetrain: "AWD",
      weight: "1,422 kg"
    },
    features: [
      "LDVI vehicle dynamics",
      "Rear-wheel steering",
      "Alcantara interiors",
      "Telemetry system",
      "Advanced aerodynamics"
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
    category: "Luxury SUV",
    description: "The sports car of SUVs",
    luxuryDescription: "The Porsche Macan Turbo redefines what a luxury SUV can be. Combining Porsche's legendary sports car DNA with the versatility of an SUV, it delivers exhilarating performance without sacrificing comfort or practicality. Whether navigating city streets or conquering mountain roads, the Macan Turbo offers an unmatched blend of power, agility, and refined luxury.",
    specifications: {
      engine: "2.9L Twin-Turbo V6",
      power: "440 HP",
      torque: "550 Nm",
      acceleration: "0-100 km/h in 4.3s",
      topSpeed: "270 km/h",
      transmission: "7-Speed PDK",
      drivetrain: "AWD",
      weight: "2,035 kg"
    },
    features: [
      "Air suspension",
      "Sport Chrono Package",
      "Panoramic roof",
      "Bose sound system",
      "Lane keeping assist"
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
    category: "Supercar",
    description: "A tribute to the most powerful V8 in Ferrari history",
    luxuryDescription: "The Ferrari F8 Tributo celebrates Ferrari's most powerful V8 engine with stunning design and extraordinary performance. This mid-engine masterpiece delivers track-focused dynamics with road-car refinement, offering an unfiltered connection between driver and machine. Every detail, from its sculpted bodywork to its meticulously crafted interior, reflects Ferrari's unwavering commitment to excellence.",
    specifications: {
      engine: "3.9L Twin-Turbo V8",
      power: "720 HP",
      torque: "770 Nm",
      acceleration: "0-100 km/h in 2.9s",
      topSpeed: "340 km/h",
      transmission: "7-Speed Dual-Clutch",
      drivetrain: "RWD",
      weight: "1,330 kg"
    },
    features: [
      "Side Slip Control 6.1",
      "Ferrari Dynamic Enhancer",
      "Carbon fiber racing seats",
      "Advanced telemetry",
      "Adaptive headlights"
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
    description: "The world's first Super Sport Utility Vehicle",
    luxuryDescription: "The Lamborghini Urus breaks all conventions as the world's first Super SUV. Combining Lamborghini's iconic design language with unprecedented versatility, the Urus delivers supercar performance in an SUV package. Its luxurious cabin, cutting-edge technology, and unmistakable Lamborghini character make it the perfect choice for those who refuse to compromise.",
    specifications: {
      engine: "4.0L Twin-Turbo V8",
      power: "650 HP",
      torque: "850 Nm",
      acceleration: "0-100 km/h in 3.6s",
      topSpeed: "305 km/h",
      transmission: "8-Speed Automatic",
      drivetrain: "AWD",
      weight: "2,200 kg"
    },
    features: [
      "ANIMA driving modes",
      "Active roll stabilization",
      "Night vision",
      "Bang & Olufsen audio",
      "Adaptive air suspension"
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
    category: "Electric Sports Sedan",
    description: "The future of performance is electric",
    luxuryDescription: "The Porsche Taycan Turbo S proves that electric performance can be truly exhilarating. This groundbreaking sports sedan combines instant torque delivery with Porsche's legendary handling dynamics, creating a driving experience unlike any other. With its stunning design, luxurious interior, and zero-emission powertrain, the Taycan Turbo S represents the perfect fusion of sustainability and performance.",
    specifications: {
      engine: "Dual Electric Motors",
      power: "761 HP",
      torque: "1,050 Nm",
      acceleration: "0-100 km/h in 2.8s",
      topSpeed: "260 km/h",
      transmission: "2-Speed Automatic",
      drivetrain: "AWD",
      weight: "2,295 kg"
    },
    features: [
      "800V architecture",
      "Fast charging capability",
      "Adaptive air suspension",
      "Porsche Active Suspension",
      "Premium interior package"
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
    category: "Grand Tourer",
    description: "Contemporary elegance meets timeless Ferrari performance",
    luxuryDescription: "The Ferrari Roma captures the carefree, pleasurable way of life of 1950s and '60s Rome, reimagined for the modern era. This sophisticated grand tourer features a minimalist yet elegant design, a driver-focused cockpit, and the thrilling performance of a Ferrari V8. The Roma represents a new chapter in Ferrari's legacy, where refined luxury meets exhilarating dynamics.",
    specifications: {
      engine: "3.9L Twin-Turbo V8",
      power: "620 HP",
      torque: "760 Nm",
      acceleration: "0-100 km/h in 3.4s",
      topSpeed: "320 km/h",
      transmission: "8-Speed Dual-Clutch",
      drivetrain: "RWD",
      weight: "1,570 kg"
    },
    features: [
      "Digital instrument cluster",
      "Passenger display screen",
      "Premium leather interiors",
      "Advanced driver assistance",
      "Magnetorheological suspension"
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
    category: "Flagship Supercar",
    description: "The final evolution of an icon",
    luxuryDescription: "The Lamborghini Aventador Ultimae represents the ultimate expression of naturally aspirated V12 performance. This limited-edition masterpiece combines the best elements of the Aventador SVJ and S models, creating the most powerful and refined Aventador ever built. With its dramatic scissor doors, carbon fiber monocoque, and spine-tingling V12 soundtrack, the Ultimae is a fitting tribute to one of the greatest supercars ever created.",
    specifications: {
      engine: "6.5L V12",
      power: "780 HP",
      torque: "720 Nm",
      acceleration: "0-100 km/h in 2.8s",
      topSpeed: "355 km/h",
      transmission: "7-Speed ISR",
      drivetrain: "AWD",
      weight: "1,550 kg"
    },
    features: [
      "Carbon fiber monocoque",
      "Rear-wheel steering",
      "Scissor doors",
      "Advanced aerodynamics",
      "Exclusive Ultimae design"
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
    category: "Grand Tourer",
    description: "British elegance at its finest",
    luxuryDescription: "The Aston Martin DB11 embodies the perfect balance of beauty and performance. This quintessentially British grand tourer features hand-crafted luxury, timeless design, and a powerful twin-turbo V8 or V12 engine. Every journey in the DB11 is an occasion, whether you're crossing continents in supreme comfort or enjoying spirited driving on your favorite road.",
    specifications: {
      engine: "4.0L Twin-Turbo V8",
      power: "528 HP",
      torque: "675 Nm",
      acceleration: "0-100 km/h in 3.9s",
      topSpeed: "301 km/h",
      transmission: "8-Speed Automatic",
      drivetrain: "RWD",
      weight: "1,770 kg"
    },
    features: [
      "Hand-stitched leather",
      "Bang & Olufsen audio",
      "Adaptive damping",
      "Aeroblade technology",
      "Premium connectivity"
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
    category: "Supercar",
    description: "Aerodynamic excellence meets raw performance",
    luxuryDescription: "The McLaren 720S pushes the boundaries of what a supercar can achieve. With its innovative carbon fiber structure, distinctive dihedral doors, and breathtaking performance, the 720S delivers a driving experience that's both thrilling and refined. Every aspect of its design serves a purpose, creating a machine that's as functional as it is beautiful.",
    specifications: {
      engine: "4.0L Twin-Turbo V8",
      power: "720 HP",
      torque: "770 Nm",
      acceleration: "0-100 km/h in 2.9s",
      topSpeed: "341 km/h",
      transmission: "7-Speed SSG",
      drivetrain: "RWD",
      weight: "1,283 kg"
    },
    features: [
      "Carbon fiber monocoque",
      "Proactive Chassis Control",
      "Dihedral doors",
      "Variable Drift Control",
      "Bowers & Wilkins audio"
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
    category: "Performance SUV",
    description: "The most powerful Cayenne ever created",
    luxuryDescription: "The Porsche Cayenne Turbo GT is the ultimate performance SUV, combining track-focused capabilities with everyday usability. This exceptional vehicle features aggressive styling, enhanced aerodynamics, and the most powerful engine ever fitted to a Cayenne. It's proof that an SUV can deliver genuine sports car performance without compromise.",
    specifications: {
      engine: "4.0L Twin-Turbo V8",
      power: "640 HP",
      torque: "850 Nm",
      acceleration: "0-100 km/h in 3.3s",
      topSpeed: "300 km/h",
      transmission: "8-Speed Tiptronic S",
      drivetrain: "AWD",
      weight: "2,200 kg"
    },
    features: [
      "Sport Chrono Package",
      "Carbon ceramic brakes",
      "Active anti-roll bars",
      "GT-specific aerodynamics",
      "Lightweight sport seats"
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
    category: "Sports Coupe",
    description: "The Beast of the Green Hell",
    luxuryDescription: "The Mercedes-AMG GT R, known as 'The Beast of the Green Hell,' is a track-focused supercar that brings Nürburgring-honed performance to the road. With its distinctive styling, handcrafted AMG V8 engine, and race-derived technology, the GT R delivers an intoxicating blend of raw power and refined luxury that only AMG can provide.",
    specifications: {
      engine: "4.0L Twin-Turbo V8",
      power: "585 HP",
      torque: "700 Nm",
      acceleration: "0-100 km/h in 3.6s",
      topSpeed: "318 km/h",
      transmission: "7-Speed Dual-Clutch",
      drivetrain: "RWD",
      weight: "1,555 kg"
    },
    features: [
      "AMG RIDE CONTROL",
      "Rear-wheel steering",
      "Carbon ceramic brakes",
      "Track-focused aerodynamics",
      "AMG Performance exhaust"
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
    category: "Luxury Grand Tourer",
    description: "Unparalleled luxury meets effortless performance",
    luxuryDescription: "The Bentley Continental GT represents the pinnacle of grand touring luxury. Hand-crafted in Crewe, England, this magnificent coupe combines exquisite materials, meticulous attention to detail, and potent W12 power. Every journey becomes an experience in absolute comfort and refinement, where the only limit is the horizon ahead.",
    specifications: {
      engine: "6.0L Twin-Turbo W12",
      power: "635 HP",
      torque: "900 Nm",
      acceleration: "0-100 km/h in 3.7s",
      topSpeed: "333 km/h",
      transmission: "8-Speed Dual-Clutch",
      drivetrain: "AWD",
      weight: "2,244 kg"
    },
    features: [
      "Rotating display",
      "Naim for Bentley audio",
      "Diamond-quilted leather",
      "Adaptive cruise control",
      "Handcrafted wood veneers"
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
    category: "Luxury Coupe",
    description: "The most powerful Rolls-Royce ever created",
    luxuryDescription: "The Rolls-Royce Wraith is a statement of uncompromising luxury and performance. This fastback coupe combines the effortless power of a twin-turbo V12 with the supreme comfort and craftsmanship that only Rolls-Royce can deliver. Every detail, from the starlight headliner to the spirit of ecstasy, is designed to create an automotive experience beyond compare.",
    specifications: {
      engine: "6.6L Twin-Turbo V12",
      power: "632 HP",
      torque: "820 Nm",
      acceleration: "0-100 km/h in 4.4s",
      topSpeed: "250 km/h (limited)",
      transmission: "8-Speed Automatic",
      drivetrain: "RWD",
      weight: "2,435 kg"
    },
    features: [
      "Starlight headliner",
      "Bespoke audio system",
      "Satellite-aided transmission",
      "Hand-stitched leather",
      "Coach doors"
    ],
    availableIn: ["Barcelona", "Marbella", "Ibiza"]
  }
];

export const cities = [
  {
    id: "barcelona",
    name: "Barcelona",
    description: "The cosmopolitan capital of Catalonia, where modernist architecture meets Mediterranean beaches",
    image: "/placeholder.svg"
  },
  {
    id: "madrid",
    name: "Madrid",
    description: "Spain's vibrant capital, renowned for its royal heritage and world-class culture",
    image: "/placeholder.svg"
  },
  {
    id: "marbella",
    name: "Marbella",
    description: "The jewel of Costa del Sol, synonymous with luxury, glamour, and sophisticated living",
    image: "/placeholder.svg"
  },
  {
    id: "valencia",
    name: "Valencia",
    description: "A perfect blend of historic charm and futuristic architecture on Spain's eastern coast",
    image: "/placeholder.svg"
  },
  {
    id: "ibiza",
    name: "Ibiza",
    description: "The legendary Mediterranean island offering pristine beaches and exclusive experiences",
    image: "/placeholder.svg"
  }
];
