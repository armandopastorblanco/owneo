import { newsEn } from "./additionalNewsEn";
import ferrariF80 from "@/assets/news/ferrari-f80.jpg";

import astonMartinValhalla from "@/assets/news/aston-martin-valhalla.jpg";
import porscheGt2Rs from "@/assets/news/porsche-gt2-rs.jpg";
import lamborghiniFenomeno from "@/assets/news/lamborghini-fenomeno.jpg";
import ferrariElettrica from "@/assets/news/ferrari-elettrica.jpg";
import astonMartinVanquishVolante from "@/assets/news/aston-martin-vanquish-volante.jpg";
import bentleyBatur from "@/assets/news/bentley-batur.jpg";
import mclarenW1Delivery from "@/assets/news/mclaren-w1-delivery.jpg";
import rimacNevera from "@/assets/news/rimac-nevera.jpg";
import porscheTaycanGt from "@/assets/news/porsche-taycan-gt.jpg";
import rollsRoyceSpectre from "@/assets/news/rolls-royce-spectre.jpg";
import paganiUtopia from "@/assets/news/pagani-utopia.jpg";
import koenigseggJesko from "@/assets/news/koenigsegg-jesko.jpg";
import fordGtMkiv from "@/assets/news/ford-gt-mkiv.jpg";
import gordonMurrayT50 from "@/assets/news/gordon-murray-t50.jpg";
import maseratiMc20 from "@/assets/news/maserati-mc20.jpg";
import lotusEmeya from "@/assets/news/lotus-emeya.jpg";
import bmwXm from "@/assets/news/bmw-xm.jpg";
import mercedesAmgGt2025 from "@/assets/news/mercedes-amg-gt-2025.jpg";
import porsche911TurboS2026 from "@/assets/news/porsche-911-turbo-s-2026.jpg";
import porscheTurboSDetail1 from "@/assets/news/porsche-turbo-s-detail-1.jpg";
import porscheTurboSDetail2 from "@/assets/news/porsche-turbo-s-detail-2.jpg";
import porscheTurboSDetail3 from "@/assets/news/porsche-turbo-s-detail-3.jpg";
import bugattiTourbillonLaunch from "@/assets/news/bugatti-tourbillon-launch.jpg";
import lamborghiniRevueltoSpider from "@/assets/news/lamborghini-revuelto-spider.jpg";
import ferrari12CilindriSpider from "@/assets/news/ferrari-12cilindri-spider.jpg";
import porscheGt3Rs2026 from "@/assets/news/porsche-gt3-rs-2026.jpg";
import mclarenW1Spider from "@/assets/news/mclaren-w1-spider.jpg";
import astonMartinVantageGt3 from "@/assets/news/aston-martin-vantage-gt3.jpg";
import lamborghiniUrusSe from "@/assets/news/lamborghini-urus-se.jpg";
import bugattiBolide from "@/assets/news/bugatti-bolide.jpg";
import rollsRoyceDroptail from "@/assets/news/rolls-royce-droptail.jpg";
import porsche718CaymanElectric from "@/assets/news/porsche-718-cayman-electric.jpg";
import ferrariPurosangueImg from "@/assets/news/ferrari-purosangue.jpg.asset.json";
import porsche911TurboSHibridoImg from "@/assets/news/porsche-911-turbo-s-hibrido.jpg.asset.json";
import lamborghiniUrusSePerformanteImg from "@/assets/news/lamborghini-urus-se-performante.jpg.asset.json";
import maseratiGt2StradaleImg from "@/assets/news/maserati-gt2-stradale.jpg.asset.json";
import astonMartinVanquishImg from "@/assets/news/aston-martin-vanquish.jpg.asset.json";
import ferrari296SpecialeImg from "@/assets/news/ferrari-296-speciale.jpg.asset.json";
import lamborghiniTemerarioSpyder2026 from "@/assets/news/lamborghini-temerario-spyder-2026.jpg";
import porsche911Gt3Touring2025 from "@/assets/news/porsche-911-gt3-touring-2025.jpg";
import bentleyGtSpeed2026 from "@/assets/news/bentley-continental-gt-speed-2026.jpg";
import mclaren750sSpider2025 from "@/assets/news/mclaren-750s-spider-2025.jpg";
import rollsRoycePhantom2026 from "@/assets/news/rolls-royce-phantom-2026.jpg";
import ferrari12CilindriSpider2025 from "@/assets/news/ferrari-12cilindri-spider-2025.jpg";

export interface NewsArticle {
  id: number;
  slug: string;
  image: string;
  date: string;
  category: string;
  title: string;
  excerpt: string;
  /** English translation of excerpt */
  excerpt_en?: string;
  readTime: string;
  content: {
    intro: string;
    /** English translation of intro */
    intro_en?: string;
    sections: {
      title: string;
      paragraphs: string[];
      /** English translation of title */
      title_en?: string;
      /** English translation of paragraphs */
      paragraphs_en?: string[];
    }[];
  };
  specs?: { label: string; value: string }[];
  detailImages?: { src: string; alt: string }[];
}

const articlesEs: NewsArticle[] = [
  {
    id: 107,
    slug: "lamborghini-temerario-spyder-2026",
    image: lamborghiniTemerarioSpyder2026,
    date: "19 Julio 2026",
    category: "Lanzamientos",
    title: "Lamborghini Temerario Spyder: el descapotable V8 híbrido debuta oficialmente en Goodwood",
    excerpt: "Tras meses de imágenes espía en el Nürburgring, Lamborghini desvela oficialmente el Temerario Spyder en el Festival of Speed de Goodwood 2026. El mismo V8 biturbo híbrido de 920 CV del coupé, sin techo fijo y con la misma capacidad de rozar los 10.000 rpm. Sant'Agata Bolognese redefine el concepto de descapotable de altas prestaciones.",
    excerpt_en: "After months of spy shots at the Nürburgring, Lamborghini officially unveils the Temerario Spyder at the 2026 Goodwood Festival of Speed. The same 920 hp hybrid twin-turbo V8 as the coupé, open-top, and still capable of approaching 10,000 rpm. Sant'Agata Bolognese redefines the high-performance convertible.",
    readTime: "7 min",
    content: {
      intro: "El Festival of Speed de Goodwood ha sido históricamente el escenario elegido por Lamborghini para sus presentaciones más espectaculares, y el Temerario Spyder no es una excepción. Confirmando los pronósticos que apuntaban a una presentación en julio de 2026, Sant'Agata Bolognese desvela la versión descapotable del sucesor del Huracán con toda la potencia y sofisticación técnica del coupé, añadiendo la dimensión sensorial que solo un techo abierto puede ofrecer. La pregunta que se hacía la industria era si Lamborghini sería capaz de mantener la rigidez estructural necesaria para conservar las sensaciones dinámicas del coupé en una carrocería abierta. La respuesta, como era de esperar, es afirmativa.",
      intro_en: "The Goodwood Festival of Speed has historically been Lamborghini's stage of choice for its most spectacular unveilings, and the Temerario Spyder is no exception. Confirming predictions that pointed to a July 2026 reveal, Sant'Agata Bolognese unveils the open-top version of the Huracán successor with all the power and technical sophistication of the coupé, adding the sensory dimension that only an open roof can provide. The question the industry was asking was whether Lamborghini could maintain the structural rigidity needed to preserve the coupé's dynamic feel in an open-top body. The answer, as expected, is yes.",
      sections: [
        {
          title: "V8 híbrido de 920 CV: la misma fórmula, a cielo abierto",
          title_en: "920 hp hybrid V8: the same formula, open to the sky",
          paragraphs: [
            "El corazón del Temerario Spyder es idéntico al del coupé: el V8 biturbo de 4.0 litros L411 con tres motores eléctricos, uno en el eje trasero y dos en el delantero, que suman una potencia combinada de 920 CV. El motor de combustión puede girar hasta casi 10.000 rpm, una cifra extraordinaria para un V8 sobrealimentado que otorga al Temerario un carácter sonoro y de respuesta único en su segmento.",
            "La transmisión de doble embrague de ocho velocidades gestiona la potencia con la precisión característica de Lamborghini, y el sistema de vectorización de par entre los ejes delantero y trasero garantiza una agilidad y una tracción que ningún rival descapotable puede igualar. Las cifras de rendimiento del Spyder son prácticamente idénticas a las del coupé: 0 a 100 km/h en 2,7 segundos y velocidad máxima de 343 km/h."
          ],
          paragraphs_en: [
            "The heart of the Temerario Spyder is identical to the coupé: the 4.0-litre L411 twin-turbo V8 with three electric motors, one on the rear axle and two on the front, delivering a combined output of 920 hp. The combustion engine can rev to nearly 10,000 rpm, an extraordinary figure for a supercharged V8 that gives the Temerario a sound character and response unique in its segment.",
            "The eight-speed dual-clutch transmission manages the power with Lamborghini's characteristic precision, and the torque vectoring system between the front and rear axles guarantees agility and traction that no rival convertible can match. The Spyder's performance figures are virtually identical to the coupé: 0 to 100 km/h in 2.7 seconds and a top speed of 343 km/h."
          ]
        },
        {
          title: "Estructura reforzada y capota retráctil de tela",
          title_en: "Reinforced structure and retractable soft top",
          paragraphs: [
            "Lamborghini ha reforzado el chasis del Temerario Spyder con travesaños adicionales de fibra de carbono que compensan la ausencia del techo fijo. El resultado es una rigidez torsional que, según Sant'Agata Bolognese, supera a la de muchos coupés de la competencia, gracias al uso extensivo de la fibra de carbono en todos los elementos estructurales.",
            "La capota retráctil de tela opera en menos de 15 segundos y puede accionarse con el vehículo en marcha a velocidades de hasta 50 km/h. En posición abierta, el diseño de la capota se integra de forma limpia en la zaga, sin crear el volumen indeseable que penaliza a algunos descapotables convencionales. El arco de seguridad, integrado en el diseño, emerge automáticamente en caso de vuelco."
          ],
          paragraphs_en: [
            "Lamborghini has reinforced the Temerario Spyder's chassis with additional carbon fibre cross-members that compensate for the absence of the fixed roof. The result is a torsional rigidity that, according to Sant'Agata Bolognese, exceeds that of many rival coupés, thanks to the extensive use of carbon fibre in all structural elements.",
            "The retractable soft top operates in under 15 seconds and can be operated on the move at speeds of up to 50 km/h. In the open position, the hood design integrates cleanly into the rear, without creating the unwanted bulk that penalises some conventional convertibles. The roll-over bar, integrated into the design, automatically deploys in the event of a rollover."
          ]
        },
        {
          title: "Diseño y posicionamiento en la gama",
          title_en: "Design and position in the range",
          paragraphs: [
            "El Temerario Spyder mantiene la línea agresiva y futurista del coupé, adaptada a las exigencias estructurales de una carrocería abierta. Las salidas de aire laterales, el frontal activo y el difusor trasero son compartidos con el coupé, manteniendo la coherencia estética de la gama. El precio del Spyder se sitúa por encima del coupé, con estimaciones que apuntan a los 280.000 euros como punto de partida, antes de opciones del programa Ad Personam.",
            "Con el Temerario Spyder, Lamborghini consolida su oferta en el segmento de los superdeportivos de altas prestaciones descapotables, un mercado en el que la competencia del Ferrari 12Cilindri Spider y el McLaren 750S Spider es cada vez más intensa."
          ],
          paragraphs_en: [
            "The Temerario Spyder maintains the aggressive and futuristic lines of the coupé, adapted to the structural requirements of an open-top body. The lateral air outlets, active front end, and rear diffuser are shared with the coupé, maintaining the aesthetic coherence of the range. The Spyder's price sits above the coupé, with estimates pointing to 280,000 euros as a starting point, before Ad Personam programme options.",
            "With the Temerario Spyder, Lamborghini consolidates its offering in the high-performance open-top supercar segment, a market in which competition from the Ferrari 12Cilindri Spider and the McLaren 750S Spider is increasingly intense."
          ]
        }
      ]
    },
    specs: [
      { label: "Potencia", value: "920 CV" },
      { label: "0-100 km/h", value: "2,7 s" },
      { label: "Motor", value: "V8 4.0 biturbo + 3 eléctricos" },
      { label: "Velocidad máxima", value: "343 km/h" }
    ]
  },
  {
    id: 108,
    slug: "porsche-911-gt3-touring-2025",
    image: porsche911Gt3Touring2025,
    date: "26 Julio 2026",
    category: "Competición",
    title: "Porsche 911 GT3 Touring 2025: 502 CV atmosféricos y la pureza del GT3 sin alerón",
    excerpt: "El Porsche 911 GT3 con paquete Touring elimina el gran alerón fijo en favor de un spoiler integrado, manteniendo los 502 CV del bóxer atmosférico de 4.0 litros y toda la mecánica de competición. Para quienes quieren el GT3 de verdad sin que se note demasiado.",
    excerpt_en: "The Porsche 911 GT3 with Touring package removes the large fixed wing in favour of an integrated spoiler, retaining all 502 hp of the 4.0-litre naturally aspirated boxer and full competition-grade mechanicals. For those who want the real GT3 without making a statement.",
    readTime: "7 min",
    content: {
      intro: "Desde su introducción, el paquete Touring del 911 GT3 ha sido uno de los grandes aciertos de Porsche: ofrecer toda la mecánica del modelo más deportivo de la gama 911 con una presentación exterior más discreta, pensada para quienes prefieren la sutileza a la ostentación. La generación 992.2 del GT3 Touring lleva este concepto a su máxima expresión, con un motor bóxer atmosférico de 4.0 litros y 502 CV que representa el pináculo de la ingeniería de motores aspirados de Zuffenhausen, combinado con una carrocería que podría confundirse con un 911 convencional a primera vista.",
      intro_en: "Since its introduction, the 911 GT3 Touring package has been one of Porsche's great successes: offering all the mechanicals of the most sporting model in the 911 range with a more discreet exterior, designed for those who prefer subtlety to ostentation. The 992.2 generation GT3 Touring takes this concept to its fullest expression, with a 4.0-litre naturally aspirated 502 hp boxer engine that represents the pinnacle of Zuffenhausen's naturally aspirated engine engineering, combined with a body that could be mistaken for a standard 911 at first glance.",
      sections: [
        {
          title: "Bóxer 4.0 atmosférico: el mejor motor de la historia de Porsche",
          title_en: "4.0 naturally aspirated boxer: the greatest Porsche engine ever made",
          paragraphs: [
            "El motor del GT3 Touring es el mismo que el del GT3 estándar: un bóxer de seis cilindros y 4.0 litros de aspiración natural que entrega 502 CV a 9.000 rpm y 465 Nm a 6.100 rpm, con una línea roja situada a 9.000 rpm. Es un propulsor que no tiene rival en la actualidad entre los coches de producción de altas prestaciones, con una entrega de potencia lineal y una sonoridad que ningún motor turboalimentado puede replicar.",
            "La transmisión PDK de siete velocidades y la tracción trasera completan un esquema dinámico que Porsche ha perfeccionado durante décadas. El 0 a 100 km/h se completa en 3,4 segundos, y la velocidad máxima supera los 320 km/h. El chassis, con el eje trasero directriz y los frenos de carbono-cerámica opcionales, procede directamente de la competición."
          ],
          paragraphs_en: [
            "The GT3 Touring's engine is the same as the standard GT3: a 4.0-litre six-cylinder naturally aspirated boxer delivering 502 hp at 9,000 rpm and 465 Nm at 6,100 rpm, with a redline at 9,000 rpm. It is a powertrain that currently has no rival among high-performance production cars, with a linear power delivery and a sound that no turbocharged engine can replicate.",
            "The seven-speed PDK transmission and rear-wheel drive complete a dynamic package that Porsche has perfected over decades. The 0 to 100 km/h sprint is completed in 3.4 seconds, and the top speed exceeds 320 km/h. The chassis, with rear-wheel steering and optional carbon-ceramic brakes, is derived directly from motorsport."
          ]
        },
        {
          title: "Touring: discreción sin renuncias",
          title_en: "Touring: discretion without compromise",
          paragraphs: [
            "La diferencia estética fundamental entre el GT3 y el GT3 Touring reside en el alerón trasero. El Touring sustituye el gran ala fija de fibra de carbono por un spoiler integrado en la tapa del maletero que despliega automáticamente según la velocidad, manteniendo la carga aerodinámica necesaria sin el impacto visual del ala biplano del GT3 convencional.",
            "En el interior, el GT3 Touring puede configurarse con asientos de cuero en lugar de los baquet de tela de los modelos más deportivos, y ofrece un mayor número de opciones de confort que lo hacen más adecuado para el uso en carretera diario. Sin embargo, toda la electrónica de chasis, los modos de conducción y la puesta a punto deportiva son compartidos con el GT3 estándar."
          ],
          paragraphs_en: [
            "The fundamental aesthetic difference between the GT3 and the GT3 Touring lies in the rear spoiler. The Touring replaces the large fixed carbon fibre wing with a spoiler integrated into the bonnet lid that deploys automatically according to speed, maintaining the necessary aerodynamic downforce without the visual impact of the conventional GT3's biplane wing.",
            "Inside, the GT3 Touring can be configured with leather seats instead of the fabric bucket seats of the more sporting models, and offers a greater number of comfort options that make it more suited to everyday road use. However, all the chassis electronics, driving modes, and sporting tuning are shared with the standard GT3."
          ]
        },
        {
          title: "Precio y disponibilidad",
          title_en: "Price and availability",
          paragraphs: [
            "El Porsche 911 GT3 Touring parte de un precio de 234.195 dólares en el mercado estadounidense, aproximadamente 220.000 euros en Europa. Con el catálogo de opciones, el precio puede superar fácilmente los 280.000 euros. La demanda supera habitualmente la oferta disponible, con listas de espera en la mayoría de mercados."
          ],
          paragraphs_en: [
            "The Porsche 911 GT3 Touring starts from a price of $234,195 in the US market, approximately 220,000 euros in Europe. With the options catalogue, the price can easily exceed 280,000 euros. Demand consistently outstrips available supply, with waiting lists in most markets."
          ]
        }
      ]
    },
    specs: [
      { label: "Potencia", value: "502 CV" },
      { label: "0-100 km/h", value: "3,4 s" },
      { label: "Motor", value: "Bóxer 6 cil. 4.0 atmosférico" },
      { label: "Velocidad máxima", value: "+320 km/h" }
    ]
  },
  {
    id: 109,
    slug: "bentley-continental-gt-speed-2026",
    image: bentleyGtSpeed2026,
    date: "2 Agosto 2026",
    category: "Gran Turismo",
    title: "Bentley Continental GT Speed 2026: 782 CV híbridos para el gran turismo más rápido de Crewe",
    excerpt: "Bentley presenta el Continental GT Speed 2026 con un sistema híbrido enchufable que eleva la potencia a 782 CV combinados sobre la base del V8 biturbo. El gran turismo más exclusivo de Crewe alcanza los 335 km/h y completa el 0 a 100 km/h en 3,2 segundos. Una nueva era para el GT Speed.",
    excerpt_en: "Bentley unveils the 2026 Continental GT Speed with a plug-in hybrid system that raises combined output to 782 hp on the twin-turbo V8 base. Crewe's most exclusive grand tourer reaches 335 km/h and completes the 0 to 100 km/h sprint in 3.2 seconds. A new era for the GT Speed.",
    readTime: "7 min",
    content: {
      intro: "El Continental GT Speed ha representado siempre la cúspide de la gama Continental, el modelo que lleva el concepto de gran turismo de Bentley a su expresión más potente y dinámica. Con la generación 2026, Crewe da un paso histórico al adoptar la electrificación enchufable en su modelo más deportivo, combinando el V8 biturbo de 4.0 litros con un motor eléctrico para alcanzar 782 CV combinados. Lejos de suavizar el carácter del Speed, el sistema híbrido lo intensifica: el empuje eléctrico instantáneo elimina cualquier sensación de espera en la respuesta del motor y multiplica la energía disponible en los tramos de aceleración.",
      intro_en: "The Continental GT Speed has always represented the pinnacle of the Continental range, the model that takes Bentley's grand tourer concept to its most powerful and dynamic expression. With the 2026 generation, Crewe takes a historic step by adopting plug-in electrification in its most sporting model, combining the 4.0-litre twin-turbo V8 with an electric motor to achieve a combined 782 hp. Far from softening the Speed's character, the hybrid system intensifies it: the instant electric thrust eliminates any sense of delay in engine response and multiplies the energy available during acceleration.",
      sections: [
        {
          title: "V8 híbrido enchufable: el GT Speed más potente de la historia",
          title_en: "Plug-in hybrid V8: the most powerful GT Speed ever",
          paragraphs: [
            "El sistema motriz del Continental GT Speed 2026 combina el V8 biturbo de 4.0 litros, revisado para esta generación, con un motor eléctrico integrado en la caja de cambios de doble embrague de ocho velocidades. La potencia combinada de 782 CV y un par de 1.000 Nm convierten al GT Speed en el Continental más potente jamás producido en Crewe.",
            "El rendimiento está a la altura de las cifras: 0 a 100 km/h en 3,2 segundos y velocidad máxima de 335 km/h. La tracción total permanente gestiona el caudal de potencia con una eficiencia que garantiza tracción máxima en cualquier condición climatológica, manteniendo siempre el comportamiento dinámico refinado que caracteriza a los grandes Bentley."
          ],
          paragraphs_en: [
            "The 2026 Continental GT Speed's drivetrain combines the revised 4.0-litre twin-turbo V8 with an electric motor integrated into the eight-speed dual-clutch gearbox. The combined output of 782 hp and 1,000 Nm of torque makes the GT Speed the most powerful Continental ever produced at Crewe.",
            "The performance lives up to the figures: 0 to 100 km/h in 3.2 seconds and a top speed of 335 km/h. Permanent all-wheel drive manages the flow of power with an efficiency that guarantees maximum traction in any weather condition, always maintaining the refined dynamic behaviour that characterises great Bentleys."
          ]
        },
        {
          title: "Artesanía británica en la era eléctrica",
          title_en: "British craftsmanship in the electric age",
          paragraphs: [
            "El interior del Continental GT Speed 2026 mantiene los estándares artesaníales que han definido a Bentley durante más de un siglo. Cuero cosido a mano, madera pulida de procedencia sostenible y aluminio torneado conviven con una nueva interfaz de infoentretenimiento que integra la gestión del sistema híbrido de forma intuitiva. El display de cristal girado y las pantallas de alta resolución coexisten con los detalles analógicos que los clientes de Bentley aprecian.",
            "El GT Speed 2026 estrena además nuevas opciones de personalización del programa Mulliner, con acabados exclusivos para la carrocería, las llantas y el interior que permiten a cada cliente crear un ejemplar único. El precio de partida se sitúa en torno a los 260.000 euros en Europa antes de opciones."
          ],
          paragraphs_en: [
            "The interior of the 2026 Continental GT Speed maintains the artisanal standards that have defined Bentley for more than a century. Hand-stitched leather, sustainably sourced polished wood, and turned aluminium coexist with a new infotainment interface that integrates hybrid system management intuitively. The rotating glass display and high-resolution screens coexist with the analogue details that Bentley customers appreciate.",
            "The 2026 GT Speed also debuts new Mulliner programme personalisation options, with exclusive body, wheel, and interior finishes that allow each customer to create a unique example. The starting price is around 260,000 euros in Europe before options."
          ]
        },
        {
          title: "Posicionamiento y entrega",
          title_en: "Positioning and delivery",
          paragraphs: [
            "Con el GT Speed 2026, Bentley demuestra que la electrificación puede convivir con la tradición del gran turismo de lujo sin sacrificar ninguna de las cualidades que hacen único a este modelo. Las primeras entregas a clientes europeos están en marcha, con una demanda que supera la producción disponible en los principales mercados."
          ],
          paragraphs_en: [
            "With the 2026 GT Speed, Bentley demonstrates that electrification can coexist with the luxury grand tourer tradition without sacrificing any of the qualities that make this model unique. First deliveries to European customers are underway, with demand exceeding available production in key markets."
          ]
        }
      ]
    },
    specs: [
      { label: "Potencia", value: "782 CV" },
      { label: "0-100 km/h", value: "3,2 s" },
      { label: "Motor", value: "V8 4.0 biturbo PHEV" },
      { label: "Velocidad máxima", value: "335 km/h" }
    ]
  },
  {
    id: 110,
    slug: "mclaren-750s-spider-2025",
    image: mclaren750sSpider2025,
    date: "9 Agosto 2026",
    category: "Lanzamientos",
    title: "McLaren 750S Spider: el descapotable de Woking que redefine la relación entre el piloto y la máquina",
    excerpt: "El McLaren 750S Spider lleva la experiencia del 720S al siguiente nivel con 750 CV, un peso de solo 1.277 kg y una capota retráctil de fibra de carbono que opera en 11 segundos. Es el McLaren más equilibrado y accesible del segmento Super Series, con primeras entregas europeas completadas.",
    excerpt_en: "The McLaren 750S Spider takes the 720S experience to the next level with 750 hp, a weight of just 1,277 kg, and a retractable carbon fibre roof that operates in 11 seconds. It is the most balanced and accessible McLaren in the Super Series segment, with first European deliveries complete.",
    readTime: "7 min",
    content: {
      intro: "McLaren ha construido su reputación sobre la pureza dinámica y la relación entre el piloto y el coche. El 750S Spider lleva esa filosofía al segmento de los superdeportivos descapotables con una fórmula que prioriza el peso mínimo, la potencia máxima y una aerodinámica activa que trabaja en perfecta coordinación con el conjunto mecánico. El resultado es un coche que, sobre papel, podría parecer una evolución del 720S Spider, pero que en la carretera representa un salto cualitativo significativo en precisión, respuesta y capacidad en límite.",
      intro_en: "McLaren has built its reputation on dynamic purity and the relationship between driver and car. The 750S Spider takes that philosophy into the open-top supercar segment with a formula that prioritises minimum weight, maximum power, and active aerodynamics that work in perfect coordination with the mechanical package. The result is a car that, on paper, might seem like an evolution of the 720S Spider, but on the road represents a significant qualitative leap in precision, response, and limit-handling capability.",
      sections: [
        {
          title: "750 CV y 1.277 kg: la ecuación perfecta",
          title_en: "750 hp and 1,277 kg: the perfect equation",
          paragraphs: [
            "El motor del 750S Spider es el V8 biturbo de 4.0 litros M840T en su revisión más potente, con 750 CV a 8.500 rpm y 800 Nm de par. La transmisión de doble embrague de siete velocidades y la tracción trasera completan un conjunto que lleva el comportamiento dinámico del coche a un nivel prácticamente indistinguible del de un superdeportivo puro de circuito.",
            "El peso de 1.277 kg en orden de marcha —apenas 40 kg más que el coupé 750S— es consecuencia de la utilización de paneles de carrocería en fibra de carbono, la estructura del monocasco MonoCell II-T en fibra de carbono y una filosofía de ingeniería que rechaza el peso innecesario en cada componente. El 0 a 100 km/h se completa en 2,8 segundos, y el 0 a 200 km/h en menos de 7,9 segundos."
          ],
          paragraphs_en: [
            "The 750S Spider's engine is the 4.0-litre M840T twin-turbo V8 in its most powerful iteration, with 750 hp at 8,500 rpm and 800 Nm of torque. The seven-speed dual-clutch transmission and rear-wheel drive complete a package that takes the car's dynamic behaviour to a level practically indistinguishable from a pure track supercar.",
            "The kerb weight of 1,277 kg — barely 40 kg more than the 750S coupé — is a consequence of the use of carbon fibre body panels, the MonoCell II-T carbon fibre monocoque structure, and an engineering philosophy that rejects unnecessary weight in every component. The 0 to 100 km/h sprint is completed in 2.8 seconds, and 0 to 200 km/h in under 7.9 seconds."
          ]
        },
        {
          title: "Capota de fibra de carbono y Proactive Chassis Control II",
          title_en: "Carbon fibre roof and Proactive Chassis Control II",
          paragraphs: [
            "La capota retráctil del 750S Spider está fabricada en fibra de carbono, lo que contribuye a mantener el peso al mínimo y a preservar la rigidez estructural del monocasco. Opera en 11 segundos y puede accionarse hasta 50 km/h, integrándose limpiamente en la zaga sin alterar las líneas del coche cuando está recogida.",
            "El sistema Proactive Chassis Control II, con amortiguadores de actuación hidráulica que ajustan la respuesta individualmente en cada rueda, es la clave de la extraordinaria capacidad dinámica del 750S Spider. En modo Sport y Track, el coche adquiere una precisión y una comunicación que muy pocos descapotables en el mercado pueden igualar. Las entregas europeas a clientes están en marcha desde principios de 2025."
          ],
          paragraphs_en: [
            "The 750S Spider's retractable roof is made from carbon fibre, which helps maintain minimum weight and preserve the structural rigidity of the monocoque. It operates in 11 seconds and can be actuated at up to 50 km/h, integrating cleanly into the rear without altering the car's lines when stowed.",
            "The Proactive Chassis Control II system, with hydraulically actuated dampers that individually adjust the response at each wheel, is the key to the 750S Spider's extraordinary dynamic capability. In Sport and Track modes, the car acquires a precision and communication that very few convertibles on the market can match. European deliveries to customers have been underway since early 2025."
          ]
        },
        {
          title: "Precio y competidores",
          title_en: "Price and competitors",
          paragraphs: [
            "El McLaren 750S Spider parte de un precio cercano a los 370.000 dólares en el mercado estadounidense, con un equivalente europeo de aproximadamente 320.000 euros antes de impuestos y opciones. Se posiciona directamente frente al Ferrari 12Cilindri Spider y al Lamborghini Temerario Spyder, con la ventaja del menor peso como principal argumento diferenciador."
          ],
          paragraphs_en: [
            "The McLaren 750S Spider starts at a price close to $370,000 in the US market, with a European equivalent of approximately 320,000 euros before taxes and options. It positions itself directly against the Ferrari 12Cilindri Spider and the Lamborghini Temerario Spyder, with the lower weight advantage as its main differentiating argument."
          ]
        }
      ]
    },
    specs: [
      { label: "Potencia", value: "750 CV" },
      { label: "0-100 km/h", value: "2,8 s" },
      { label: "Peso", value: "1.277 kg" },
      { label: "Motor", value: "V8 4.0 biturbo" }
    ]
  },
  {
    id: 111,
    slug: "rolls-royce-phantom-2026",
    image: rollsRoycePhantom2026,
    date: "16 Agosto 2026",
    category: "Gran Turismo",
    title: "Rolls-Royce Phantom 2026: el summum del lujo se actualiza con nuevas opciones Bespoke y mayor personalización",
    excerpt: "Rolls-Royce refina el Phantom para 2026 con nuevas opciones de personalización Bespoke, materiales exclusivos de nueva generación y actualizaciones en la conectividad. El V12 biturbo de 6,75 litros y 563 CV permanece inalterado. La arquitectura de la excelencia no necesita revolución, solo evolución.",
    excerpt_en: "Rolls-Royce refines the Phantom for 2026 with new Bespoke personalisation options, next-generation exclusive materials, and connectivity updates. The 6.75-litre twin-turbo V12 with 563 hp remains unchanged. The architecture of excellence requires no revolution, only evolution.",
    readTime: "7 min",
    content: {
      intro: "El Rolls-Royce Phantom no necesita presentación. Desde 1925, el nombre define el concepto de automóvil de lujo absoluto, el vehículo al que todos los demás aspiran a parecerse sin lograrlo jamás. La actualización para 2026 no busca revolucionar un modelo que ya representa la cúspide de la industria, sino refinarlo en los aspectos que los clientes más exigentes del mundo valoran: la personalización sin límites, los materiales de la más alta calidad y la experiencia de conducción más silenciosa y refinada del planeta.",
      intro_en: "The Rolls-Royce Phantom needs no introduction. Since 1925, the name has defined the concept of absolute luxury motoring, the car that all others aspire to emulate without ever succeeding. The 2026 update does not seek to revolutionise a model that already represents the pinnacle of the industry, but to refine it in the aspects that the world's most demanding customers value: unlimited personalisation, the highest quality materials, and the most silent and refined driving experience on the planet.",
      sections: [
        {
          title: "V12 eterno: 6,75 litros de silencio",
          title_en: "Eternal V12: 6.75 litres of silence",
          paragraphs: [
            "El corazón del Phantom 2026 sigue siendo el V12 biturbo de 6,75 litros, un propulsor con historia propia en los anales de Rolls-Royce. Con 563 CV a 5.000 rpm y 900 Nm disponibles desde 1.700 rpm, el motor ofrece una entrega de potencia que se percibe más como una fuerza de la naturaleza que como el funcionamiento de un motor convencional. La transmisión automática de ocho velocidades trabaja de forma imperceptible, y la insonorización de más de 130 kg de material absorbente garantiza que el único sonido en el habitáculo sea el que el ocupante elija escuchar.",
            "La suspensión neumática con amortiguadores controlados electrónicamente y la dirección de cuatro ruedas contribuyen a una experiencia de rodadura que Rolls-Royce denomina 'Magic Carpet Ride', capaz de aislar completamente a los ocupantes de cualquier irregularidad del pavimento."
          ],
          paragraphs_en: [
            "The heart of the 2026 Phantom remains the 6.75-litre twin-turbo V12, an engine with its own history in the annals of Rolls-Royce. With 563 hp at 5,000 rpm and 900 Nm available from 1,700 rpm, the engine delivers power in a way that feels more like a force of nature than the operation of a conventional engine. The eight-speed automatic transmission works imperceptibly, and over 130 kg of sound-absorbing material ensures that the only sound in the cabin is the one the occupant chooses to hear.",
            "The air suspension with electronically controlled dampers and four-wheel steering contribute to a ride experience that Rolls-Royce calls the 'Magic Carpet Ride', capable of completely isolating occupants from any road surface irregularity."
          ]
        },
        {
          title: "Bespoke 2026: personalización sin límites",
          title_en: "Bespoke 2026: personalisation without limits",
          paragraphs: [
            "Las novedades más significativas del Phantom 2026 se encuentran en el programa Bespoke. Rolls-Royce amplía el catálogo de maderas, metales y cueros disponibles, incorporando nuevas especies de madera de procedencia sostenible certificada FSC, aleaciones metálicas de nueva generación para elementos decorativos y una paleta ampliada de cueros tintados a mano en la curtidora histórica de Cornualles.",
            "La Gallery, el panel de instrumentos acristalado que permite alojar objetos únicos entre dos capas de cristal, recibe nuevas posibilidades de iluminación LED de alta resolución que permiten crear composiciones lumínicas personalizadas. La conectividad se actualiza con la integración de Apple CarPlay inalámbrico y un nuevo sistema de audio Bespoke diseñado conjuntamente con un fabricante de equipos de alta fidelidad de referencia mundial."
          ],
          paragraphs_en: [
            "The most significant innovations of the 2026 Phantom are found in the Bespoke programme. Rolls-Royce expands the catalogue of available woods, metals, and leathers, incorporating new species of FSC-certified sustainably sourced wood, next-generation metal alloys for decorative elements, and an expanded palette of hand-dyed leathers from the historic Cornish tannery.",
            "The Gallery, the glazed instrument panel that allows unique objects to be housed between two layers of glass, receives new high-resolution LED lighting possibilities that allow personalised light compositions to be created. Connectivity is updated with the integration of wireless Apple CarPlay and a new Bespoke audio system co-designed with a world-reference high-fidelity equipment manufacturer."
          ]
        },
        {
          title: "El Phantom como inversión y legado",
          title_en: "The Phantom as investment and legacy",
          paragraphs: [
            "El precio del Rolls-Royce Phantom 2026 parte de 520.000 euros en Europa, una cifra que puede multiplicarse varias veces con el programa Bespoke completo. La lista de espera, habitual en todos los Phantom de producción reciente, se extiende entre 12 y 24 meses según el nivel de personalización. Para sus propietarios, el Phantom no es solo un automóvil: es un objeto de arte funcional concebido para perdurar generaciones."
          ],
          paragraphs_en: [
            "The price of the 2026 Rolls-Royce Phantom starts from 520,000 euros in Europe, a figure that can be multiplied several times with the full Bespoke programme. The waiting list, standard for all recently produced Phantoms, extends between 12 and 24 months depending on the level of personalisation. For their owners, the Phantom is not just a car: it is a functional work of art conceived to last generations."
          ]
        }
      ]
    },
    specs: [
      { label: "Potencia", value: "563 CV" },
      { label: "0-100 km/h", value: "5,1 s" },
      { label: "Motor", value: "V12 6.75 biturbo" },
      { label: "Precio desde", value: "520.000 €" }
    ]
  },
  {
    id: 112,
    slug: "ferrari-12cilindri-spider-2025",
    image: ferrari12CilindriSpider2025,
    date: "23 Agosto 2026",
    category: "Lanzamientos",
    title: "Ferrari 12Cilindri Spider: carta de amor al V12 atmosférico con techo de cristal retráctil",
    excerpt: "Ferrari presenta el 12Cilindri Spider, la versión descapotable del gran turismo V12 más emocionante de Maranello. 830 CV a 9.500 rpm, 1.570 kg y un techo de cristal retráctil en 14 segundos. La experiencia del V12 atmosférico más pura que Ferrari ha ofrecido en décadas.",
    excerpt_en: "Ferrari introduces the 12Cilindri Spider, the open-top version of Maranello's most thrilling V12 grand tourer. 830 hp at 9,500 rpm, 1,570 kg, and a retractable glass roof in 14 seconds. The purest naturally aspirated V12 experience Ferrari has offered in decades.",
    readTime: "7 min",
    content: {
      intro: "Si el 12Cilindri coupé ya era una declaración de amor al motor de doce cilindros atmosférico en una era de electrificación creciente, el Spider lleva esa declaración al máximo. Ferrari ha creado no solo un descapotable, sino una experiencia sensorial completa: la posibilidad de escuchar sin filtros el V12 de 6,5 litros y 830 CV mientras gira hasta los 9.500 rpm es algo que ningún otro fabricante puede ofrecer en la actualidad. El 12Cilindri Spider no es simplemente un 12Cilindri sin techo: es una obra de ingeniería que ha requerido una revisión completa de la estructura y del sistema de apertura para preservar las sensaciones dinámicas del coupé con toda la intensidad añadida que ofrece el cielo abierto.",
      intro_en: "If the 12Cilindri coupé was already a love letter to the naturally aspirated twelve-cylinder engine in an era of increasing electrification, the Spider takes that declaration to its maximum. Ferrari has created not just a convertible, but a complete sensory experience: the possibility of hearing the unfiltered 6.5-litre 830 hp V12 as it spins to 9,500 rpm is something no other manufacturer can currently offer. The 12Cilindri Spider is not simply a 12Cilindri without a roof: it is an engineering feat that has required a complete revision of the structure and opening system to preserve the coupé's dynamic sensations with all the added intensity that the open sky provides.",
      sections: [
        {
          title: "El V12 atmosférico más avanzado de Maranello",
          title_en: "Maranello's most advanced naturally aspirated V12",
          paragraphs: [
            "El motor del 12Cilindri Spider es el F140HD: un V12 de 6,5 litros de aspiración natural que entrega 830 CV a 9.250 rpm y 678 Nm de par. La línea roja a 9.500 rpm es una cifra que pocos motores de producción en el mundo pueden alcanzar, y la entrega de potencia completamente lineal desde las bajas revoluciones hasta el límite del cuentarrevoluciones define la experiencia de conducción única que solo un Ferrari V12 puede ofrecer.",
            "La transmisión de doble embrague de ocho velocidades y la tracción trasera completan un esquema que Maranello ha perfeccionado durante décadas. El 0 a 100 km/h se completa en 2,9 segundos, y la velocidad máxima supera los 320 km/h. El peso en orden de marcha de 1.570 kg es extraordinariamente contenido para un gran turismo V12 descapotable con todas las prestaciones activas."
          ],
          paragraphs_en: [
            "The 12Cilindri Spider's engine is the F140HD: a 6.5-litre naturally aspirated V12 delivering 830 hp at 9,250 rpm and 678 Nm of torque. The redline at 9,500 rpm is a figure that few production engines in the world can reach, and the completely linear power delivery from low revs to the limit of the rev counter defines the unique driving experience that only a Ferrari V12 can offer.",
            "The eight-speed dual-clutch transmission and rear-wheel drive complete a package that Maranello has perfected over decades. The 0 to 100 km/h sprint is completed in 2.9 seconds, and the top speed exceeds 320 km/h. The kerb weight of 1,570 kg is extraordinarily controlled for a V12 convertible grand tourer with all active features."
          ]
        },
        {
          title: "Techo de cristal retráctil: la solución Ferrari",
          title_en: "Retractable glass roof: the Ferrari solution",
          paragraphs: [
            "Ferrari ha optado por un techo retráctil de cristal en lugar de una capota de tela, una decisión que tiene implicaciones tanto estéticas como dinámicas. El Retractable Hard Top (RHT) de cristal opera en 14 segundos y puede accionarse con el coche en marcha hasta 45 km/h. La estructura de cristal filtrado reduce el calor solar y preserva la luminosidad del habitáculo incluso con el techo cerrado.",
            "La rigidez estructural del 12Cilindri Spider se ha conseguido mediante el uso extensivo de fibra de carbono en puntos clave del chasis, con el objetivo de igualar la experiencia dinámica del coupé. La suspensión activa Ferrari, el sistema Side Slip Control de última generación y el diferencial electrónico de deslizamiento limitado E-Diff3 trabajan en sinergia para ofrecer una dinámica de referencia en el segmento."
          ],
          paragraphs_en: [
            "Ferrari has opted for a retractable glass roof rather than a fabric hood, a decision with both aesthetic and dynamic implications. The glass Retractable Hard Top (RHT) operates in 14 seconds and can be actuated on the move at up to 45 km/h. The filtered glass structure reduces solar heat and preserves cabin luminosity even with the roof closed.",
            "The structural rigidity of the 12Cilindri Spider has been achieved through extensive use of carbon fibre at key chassis points, with the aim of matching the coupé's dynamic experience. The Ferrari active suspension, the latest-generation Side Slip Control system, and the E-Diff3 electronic limited-slip differential work in synergy to offer benchmark dynamics in the segment."
          ]
        },
        {
          title: "Precio y exclusividad",
          title_en: "Price and exclusivity",
          paragraphs: [
            "El Ferrari 12Cilindri Spider parte de un precio aproximado de 465.000 euros en Europa, unos 50.000 euros más que el coupé equivalente. La lista de espera supera los 18 meses en la mayoría de mercados europeos, con todos los ejemplares de la primera asignación ya comprometidos. Para sus propietarios, el 12Cilindri Spider no es solo un automóvil de lujo: es la última oportunidad de experimentar el V12 atmosférico de Ferrari en su forma más pura y emocional."
          ],
          paragraphs_en: [
            "The Ferrari 12Cilindri Spider starts at an approximate price of 465,000 euros in Europe, around 50,000 euros more than the equivalent coupé. The waiting list exceeds 18 months in most European markets, with all examples from the first allocation already committed. For their owners, the 12Cilindri Spider is not just a luxury car: it is the last opportunity to experience Ferrari's naturally aspirated V12 in its purest and most emotional form."
          ]
        }
      ]
    },
    specs: [
      { label: "Potencia", value: "830 CV" },
      { label: "0-100 km/h", value: "2,9 s" },
      { label: "Motor", value: "V12 6.5 atmosférico" },
      { label: "Línea roja", value: "9.500 rpm" }
    ]
  },
  {
    id: 101,
    slug: "ferrari-296-speciale",
    image: ferrari296SpecialeImg.url,
    date: "11 Julio 2026",
    category: "Competición",
    title: "Ferrari 296 Speciale: el V6 híbrido de Maranello alcanza los 880 CV",
    excerpt: "Ferrari lleva su berlinetta V6 híbrida a su máxima expresión con la 296 Speciale. La combinación del V6 biturbo con el sistema eléctrico alcanza los 880 CV, acompañada de un profundo trabajo de aligeramiento y aerodinámica. Es la versión más afilada y prestacional de la familia 296.",
    readTime: "7 min",
    content: {
      intro: "Con la 296 GTB, Ferrari demostró que un V6 híbrido podía ofrecer emociones dignas del Cavallino Rampante. La versión Speciale toma ese concepto y lo radicaliza siguiendo la estela de nombres míticos como el 458 Speciale, con un enfoque claramente orientado al rendimiento puro y a la conducción en circuito. Cada aspecto de la 296 Speciale ha sido revisado para extraer el máximo: más potencia, menos peso y una aerodinámica más agresiva componen una berlinetta pensada para quienes buscan la experiencia Ferrari más intensa.",
      sections: [
        { title: "V6 híbrido llevado al límite", paragraphs: [
          "El propulsor parte del V6 biturbo de 3.0 litros a 120 grados combinado con un motor eléctrico, pero en la Speciale la potencia combinada se eleva hasta los 880 CV. La respuesta, ya excepcional en la 296 GTB, gana en inmediatez gracias a las mejoras en la gestión electrónica y el empuje eléctrico. La caja de doble embrague de ocho velocidades y la tracción trasera completan el esquema.",
          "El trabajo de aligeramiento, con fibra de carbono y componentes específicos, mejora la relación peso-potencia y agudiza la respuesta dinámica, mientras que la aerodinámica revisada incrementa la carga sin penalizar la eficiencia."
        ]},
        { title: "Aerodinámica y dinámica de circuito", paragraphs: [
          "La 296 Speciale incorpora un paquete aerodinámico específico, con elementos activos y pasivos que aumentan la carga aerodinámica en curva y bajo frenada. Los reglajes de suspensión, la electrónica de control y los neumáticos han sido calibrados para el uso en pista, ofreciendo un nivel de precisión y agarre superior al de la 296 GTB de partida.",
          "El interior adopta un enfoque minimalista y deportivo, con asientos baquet, materiales ligeros y detalles que refuerzan la vocación racing del modelo, sin perder la sofisticación característica de Maranello."
        ]},
        { title: "Precio y exclusividad", paragraphs: [
          "Como versión Speciale de la gama 296, este modelo se sitúa por encima de la 296 GTB en precio y exclusividad, con una producción orientada a los clientes más exigentes. Con él, Ferrari confirma que la era híbrida puede convivir con la emoción más pura del Cavallino Rampante."
        ]}
      ]
    },
    specs: [
      { label: "Potencia", value: "880 CV" },
      { label: "Motor", value: "V6 3.0 biturbo híbrido" },
      { label: "Transmisión", value: "Doble embrague 8 vel." },
      { label: "Tracción", value: "Trasera" },
    ]
  },
  {
    id: 102,
    slug: "aston-martin-vanquish",
    image: astonMartinVanquishImg.url,
    date: "4 Julio 2026",
    category: "Gran Turismo",
    title: "Aston Martin Vanquish: el V12 biturbo de 835 CV que corona la gama de Gaydon",
    excerpt: "Aston Martin recupéra uno de sus nombres más legendarios para su nuevo buque insignia. El Vanquish estrena un V12 biturbo de 5.2 litros que entrega 835 CV y 1.000 Nm, convirtiéndose en el Aston Martin de producción más potente de la historia. Un super GT de motor delantero sin rival directo.",
    readTime: "7 min",
    content: {
      intro: "El nombre Vanquish evoca lo mejor de la tradición Aston Martin, y la marca británica lo reserva para su modelo más ambicioso. Tras años de gama poblada por V8 de origen AMG, Gaydon reivindica el V12 como seña de identidad de su flagship, un gesto tan emocional como estratégico en una era de electrificación. El nuevo Vanquish no es una evolución más: es la declaración de que Aston Martin sigue creyendo en el gran turismo de doce cilindros, motor delantero y tracción trasera, en su forma más pura y extrema.",
      sections: [
        { title: "Un V12 biturbo desarrollado en casa", paragraphs: [
          "En el corazón del Vanquish late un V12 biturbo de 5.2 litros en posición delantera-central, desarrollado internamente por Aston Martin. Con 835 CV a 6.500 rpm y 1.000 Nm de par entre 2.500 y 5.000 rpm, es el motor más potente jamás montado en un Aston Martin de serie. La potencia llega al eje trasero a través de una transmisión automática de ocho velocidades con diferencial electrónico de deslizamiento limitado.",
          "Las prestaciones están a la altura del propulsor: 0 a 100 km/h en 3,3 segundos y una velocidad máxima de 345 km/h, cifras que sitúan al Vanquish entre los GT más rápidos del mundo."
        ]},
        { title: "Diseño: presencia y proporciones de gran turismo", paragraphs: [
          "El Vanquish exhibe unas proporciones clásicas de GT delantero, con un capó largo, una cabina retrasada y una zaga musculosa. La parrilla frontal, la más grande jamás vista en un Aston Martin de serie, domina el frontal y refuerza el carácter imponente del modelo. Cada línea transmite la mezcla de elegancia y agresividad que define a la marca.",
          "El interior combina artesanía británica con tecnología moderna: cuero cosido a mano, aluminio y una nueva interfaz digital que moderniza el habitáculo sin perder el aire exclusivo propio de un Aston Martin de primer nivel."
        ]},
        { title: "Precio y posicionamiento", paragraphs: [
          "Como nuevo buque insignia de la gama, el Vanquish se sitúa en lo más alto de la oferta de Aston Martin, con un precio acorde a su condición de super GT V12 de producción limitada. Con él, Gaydon reafirma su lugar entre los grandes fabricantes de gran turismo de lujo."
        ]}
      ]
    },
    specs: [
      { label: "Potencia", value: "835 CV" },
      { label: "0-100 km/h", value: "3,3 s" },
      { label: "Motor", value: "V12 5.2 biturbo" },
      { label: "Velocidad máxima", value: "345 km/h" },
    ]
  },
  {
    id: 103,
    slug: "maserati-gt2-stradale",
    image: maseratiGt2StradaleImg.url,
    date: "27 Junio 2026",
    category: "Gran Turismo",
    title: "Maserati GT2 Stradale: el V6 Nettuno de 640 CV lleva el MC20 al circuito",
    excerpt: "Maserati traslada su coche de competición GT2 a la carretera con el nuevo GT2 Stradale. Basado en el MC20, adopta el V6 Nettuno biturbo de 640 CV, una notable reducción de peso y una aerodinámica capaz de generar hasta 500 kg de carga. Es el Maserati de calle más radical jamás producido.",
    readTime: "7 min",
    content: {
      intro: "El MC20 devolvió a Maserati al segmento de los superdeportivos con un producto brillante. El GT2 Stradale va un paso más allá: toma como base el coche de carreras GT2 y lo homologa para uso en carretera, ofreciendo a los clientes una experiencia lo más cercana posible a la competición sin renunciar a la matrícula. Cada decisión de ingeniería en el GT2 Stradale persigue el mismo objetivo: rendimiento en circuito. Menos peso, más carga aerodinámica y una respuesta más afilada definen a esta versión que corona la gama deportiva del Tridente.",
      sections: [
        { title: "Nettuno: el V6 más avanzado de Módena", paragraphs: [
          "El corazón del GT2 Stradale es el V6 Nettuno biturbo de 3.0 litros, el mismo propulsor de tecnología derivada de la Fórmula 1 con precámara de combustión que debutó en el MC20. Aquí entrega 640 CV, diez más que en el MC20 de partida, canalizados exclusivamente al eje trasero a través de una caja de doble embrague de ocho velocidades.",
          "La reducción de peso —del orden de 60 kg respecto al MC20— y la mejora aerodinámica se traducen en un 0 a 100 km/h en apenas 2,8 segundos. La aerodinámica activa y los apéndices específicos generan hasta 500 kg de carga aerodinámica a alta velocidad, cifra impensable en un GT convencional."
        ]},
        { title: "Ligereza y aerodinámica de competición", paragraphs: [
          "El GT2 Stradale recurre de forma extensiva a la fibra de carbono para reducir peso, tanto en la carrocería como en elementos interiores. El gran alerón trasero, el splitter delantero y el difúsor optimizado forman un paquete aerodinámico que remite directamente al coche de carreras del que deriva.",
          "El habitáculo, despojado y orientado a la conducción, mantiene los elementos esenciales del lujo Maserati pero con un claro enfoque deportivo: asientos baquet, materiales ligeros y una ergonomía pensada para el circuito."
        ]},
        { title: "Precio y exclusividad", paragraphs: [
          "El Maserati GT2 Stradale se posiciona como el modelo más prestacional y exclusivo de la gama, con un precio que refleja su naturaleza de superdeportivo homologado derivado de la competición. Con él, Maserati reafirma su regreso al más alto nivel del segmento."
        ]}
      ]
    },
    specs: [
      { label: "Potencia", value: "640 CV" },
      { label: "0-100 km/h", value: "2,8 s" },
      { label: "Motor", value: "V6 Nettuno 3.0 biturbo" },
      { label: "Carga aerodinámica", value: "Hasta 500 kg" },
    ]
  },
  {
    id: 104,
    slug: "lamborghini-urus-se-performante",
    image: lamborghiniUrusSePerformanteImg.url,
    date: "20 Junio 2026",
    category: "SUV Deportivo",
    title: "Lamborghini Urus SE Performante: el Super SUV híbrido más rápido con 812 CV",
    excerpt: "Lamborghini lleva su Super SUV a un nuevo nivel con el Urus SE Performante. La combinación del V8 biturbo con un sistema híbrido enchufable eleva la potencia hasta los 812 CV, convirtiéndolo en la versión más radical y prestacional del Urus. Sant'Agata Bolognese redefine lo que un SUV puede llegar a ser.",
    readTime: "7 min",
    content: {
      intro: "El Urus ha sido un éxito rotundo para Lamborghini desde su lanzamiento, y la marca no ha dejado de exprimir su potencial. Con la variante SE Performante, Sant'Agata Bolognese fusiona por primera vez la electrificación enchufable con el enfoque más deportivo y afilado de la gama, dando como resultado el Super SUV más potente y capaz de su historia. A diferencia del Urus SE convencional, la versión Performante prioriza la dinámica sobre el confort. Suspensión rebajada, reglajes específicos y una puesta a punto orientada al circuito convierten a este SUV en una herramienta capaz de humillar a muchos deportivos puros.",
      sections: [
        { title: "V8 híbrido: 812 CV de furia electrificada", paragraphs: [
          "El propulsor combina el conocido V8 biturbo de 4.0 litros con un motor eléctrico alimentado por una batería de 25,9 kWh. El resultado es una potencia combinada de 812 CV y 1.000 Nm de par, cifras que representan un salto notable respecto a las versiones anteriores. El sistema PHEV no solo añade potencia, sino también una respuesta instantánea gracias al empuje eléctrico.",
          "Las prestaciones son propias de un superdeportivo: 0 a 100 km/h en 3,3 segundos, 0 a 200 km/h en 10,8 segundos y una velocidad máxima de 312 km/h. Todo ello con la posibilidad de circular en modo 100% eléctrico en entornos urbanos."
        ]},
        { title: "Chasis y dinámica de referencia", paragraphs: [
          "El Urus SE Performante estrena una electrónica de chasis recalibrada, con control de balanceo, dirección a las cuatro ruedas y un reparto de par vectorial que mejora la agilidad en curva. La altura de conducción reducida y los neumáticos específicos completan un conjunto diseñado para ofrecer sensaciones que ningún Super SUV rival puede igualar.",
          "En el interior, los materiales deportivos, la fibra de carbono y los asientos envolventes refuerzan el carácter racing del modelo, sin renunciar al lujo y la habitabilidad que se esperan de un Lamborghini de cuatro plazas."
        ]},
        { title: "Precio y posicionamiento", paragraphs: [
          "El Urus SE Performante se sitúa en la cúspide de la gama Urus, con un precio acorde a su exclusividad y prestaciones. Con él, Lamborghini reafirma su liderazgo en el segmento de los Super SUV, un mercado que la propia marca contribuyó a crear."
        ]}
      ]
    },
    specs: [
      { label: "Potencia", value: "812 CV" },
      { label: "0-100 km/h", value: "3,3 s" },
      { label: "Motor", value: "V8 4.0 biturbo PHEV" },
      { label: "Velocidad máxima", value: "312 km/h" },
    ]
  },
  {
    id: 105,
    slug: "porsche-911-turbo-s-hibrido-992-2",
    image: porsche911TurboSHibridoImg.url,
    date: "13 Junio 2026",
    category: "Lanzamientos",
    title: "Porsche 911 Turbo S (992.2): el icono se hace híbrido y supera los 700 CV",
    excerpt: "Porsche da el paso más importante en la historia del 911 Turbo: la electrificación. La actualización 992.2 del Turbo S estrena el sistema T-Hybrid derivado de la competición, con el que el bóxer biturbo alcanza los 711 CV. Nunca antes el Turbo S había sido tan rápido ni tan sofisticado.",
    readTime: "7 min",
    content: {
      intro: "El 911 Turbo S siempre ha representado la cima de la gama de producción de Stuttgart, el punto en el que el uso diario y las prestaciones de superdeportivo se encuentran. Con la llegada de la generación 992.2, Porsche introduce por primera vez la tecnología híbrida en esta variante, un cambio que muchos esperaban con recelo y que finalmente confirma la dirección de la marca. Lejos de suavizar el carácter del Turbo S, la electrificación lo intensifica. El sistema T-Hybrid no busca autonomía eléctrica ni eficiencia máxima, sino eliminar por completo el retardo del turbo y multiplicar la respuesta. Es la misma filosofía que Porsche aplicó en el GTS, ahora llevada al extremo.",
      sections: [
        { title: "T-Hybrid: electrificación al servicio del rendimiento", paragraphs: [
          "El corazón del nuevo Turbo S sigue siendo un motor bóxer de seis cilindros biturbo, pero ahora asistido por un sistema híbrido ligero de alto voltaje directamente heredado de la competición. Un turbocompresor eléctrico elimina prácticamente todo el lag, mientras que un motor eléctrico integrado aporta un empuje instantáneo. La potencia combinada alcanza los 711 CV, situando al Turbo S en territorio hasta ahora reservado a los superdeportivos puros.",
          "La transmisión PDK de ocho velocidades y la tracción total permanente completan un conjunto que hace del 911 Turbo S una de las máquinas más efectivas del mercado en cualquier condición. Las cifras de aceleración descienden por debajo de los 2,5 segundos en el 0 a 100 km/h."
        ]},
        { title: "Diseño evolutivo, esencia intacta", paragraphs: [
          "Fiel a la tradición del 911, la evolución estética es contenida. Nuevas entradas de aire, faros rediseñados y detalles aerodinámicos específicos distinguen al Turbo S de sus hermanos menores. El alerón trasero adaptativo y la aerodinámica activa gestionan la carga según la velocidad y el modo de conducción seleccionado.",
          "En el interior, Porsche mantiene el equilibrio entre deportividad y refinamiento que caracteriza a la variante Turbo S, con acabados exclusivos, cuadro digital y la instrumentación de última generación de la familia 992.2."
        ]},
        { title: "Precio y disponibilidad", paragraphs: [
          "El nuevo 911 Turbo S parte de un precio cercano a los 270.000 euros, cifra que puede escalar notablemente con el amplio catálogo de personalización de Porsche. Las primeras entregas están en marcha en los principales mercados europeos."
        ]}
      ]
    },
    specs: [
      { label: "Potencia", value: "711 CV" },
      { label: "0-100 km/h", value: "2,5 s" },
      { label: "Motor", value: "Bóxer 6 cil. biturbo T-Hybrid" },
      { label: "Precio", value: "Desde ~270.000 €" },
    ]
  },
  {
    id: 106,
    slug: "ferrari-purosangue",
    image: ferrariPurosangueImg.url,
    date: "6 Junio 2026",
    category: "SUV Deportivo",
    title: "Ferrari Purosangue: el primer «SUV» de Maranello y su V12 atmosférico de 725 CV",
    excerpt: "Ferrari reescribe sus propias reglas con el Purosangue, el primer coche de cuatro puertas y cuatro plazas de su historia. Bajo su carrocería elevada late un V12 atmosférico de 6.5 litros y 725 CV, colocado en posición central-delantera. Maranello se niega a llamarlo SUV: lo define como el Ferrari más versátil jamás creado.",
    readTime: "7 min",
    content: {
      intro: "Durante décadas, la sola idea de un Ferrari de cuatro puertas resultaba impensable en Maranello. El Purosangue rompe ese tabú, pero lo hace sin traicionar la esencia de la marca. En lugar de seguir el manual del SUV de lujo, Ferrari ha diseñado un automóvil que combina la practicidad de cuatro plazas reales con la dinámica y las sensaciones de un auténtico deportivo del Cavallino Rampante. «Purosangue significa pura sangre. No es un SUV, es un Ferrari con cuatro puertas», ha repetido Maranello desde su presentación, marcando distancia con rivales como el Lamborghini Urus o el Aston Martin DBX. La diferencia filosófica es evidente en cuanto se levanta el capó.",
      sections: [
        { title: "El corazón: un V12 atmosférico contra corriente", paragraphs: [
          "Mientras el resto del segmento apuesta por motores V8 turboalimentados o sistemas híbridos, Ferrari ha tomado la decisión más radical posible: dotar al Purosangue de un V12 atmosférico de 6.5 litros. Este propulsor, ubicado en posición central-delantera para lograr un reparto de pesos óóptimo, entrega 725 CV a 7.750 rpm y 716 Nm de par, con el 80% disponible ya a 2.100 rpm.",
          "El resultado es una entrega de potencia lineal y una sonoridad que ningún SUV del mercado puede igualar. La caja de cambios de doble embrague y ocho velocidades se sitúa en el eje trasero, configurando un esquema transaxle que refuerza el equilibrio dinámico. La tracción total, con un sistema de transmisión delantera específico de Ferrari, se activa únicamente cuando resulta necesaria."
        ]},
        { title: "Diseño: altura sí, silueta de SUV no", paragraphs: [
          "Ferrari ha trabajado obsesivamente para que el Purosangue no parezca un todocamino convencional. La silueta, más baja y estilizada que la de sus rivales, esconde unas proporciones cuidadas al milímetro. El elemento más distintivo son las puertas traseras con apertura antagónica —las llamadas puertas «suicidas»— que facilitan el acceso a las dos plazas traseras individuales sin renunciar a una línea de techo fluida.",
          "Con cerca de 2.033 kg en orden de marcha, el Purosangue no es un peso pluma, pero Ferrari ha recurrido a la fibra de carbono en el techo y a una carrocería mixta de aluminio para contener las cifras. La suspensión activa Ferrari controla el balanceo y las transferencias de masa con una precisión que redefine lo que un vehículo de esta altura puede ofrecer en curva."
        ]},
        { title: "Un interior de cuatro plazas reales", paragraphs: [
          "El habitáculo abandona la configuración 2+2 simbólica para ofrecer cuatro asientos independientes y verdaderamente utilizables. La arquitectura de doble cockpit sitúa una pantalla dedicada frente al pasajero, mientras el conductor dispone de la instrumentación digital de la última generación Ferrari. Los materiales combinan cuero, aluminio y fibra de carbono, con un maletero que hace del Purosangue un Ferrari realmente utilizable a diario."
        ]},
        { title: "Precio y posicionamiento", paragraphs: [
          "El Ferrari Purosangue parte de un precio cercano a los 390.000 euros. Maranello ha limitado su producción para que no supere el 20% del volumen total de la marca, preservando así la exclusividad. La lista de espera se extiende durante años en la mayoría de mercados."
        ]}
      ]
    },
    specs: [
      { label: "Potencia", value: "725 CV" },
      { label: "0-100 km/h", value: "3,3 s" },
      { label: "Motor", value: "V12 6.5 atmosférico" },
      { label: "Velocidad máxima", value: "310 km/h" },
    ]
  },
  {
    id: 7,
    slug: "ferrari-f80-hypercar",
    image: ferrariF80,
    date: "17 Octubre 2024",
    category: "Hypercars",
    title: "Ferrari F80: el nuevo hypercar de Maranello con 1.184 CV y tecnología de F1",
    excerpt: "Ferrari presenta el F80, sucesor del LaFerrari con un V6 híbrido de 1.184 CV. Solo 799 unidades a más de 3,6 millones de euros. Las entregas comienzan a principios de 2026.",
    readTime: "8 min",
    content: {
      intro: "Ferrari ha desvelado oficialmente el F80, el sexto hypercar en la historia de la marca tras el 288 GTO, F40, F50, Enzo y LaFerrari. Con 1.184 CV procedentes de un V6 biturbo de 3.0 litros combinado con tres motores eléctricos, el F80 establece un nuevo estándar en rendimiento y tecnología derivada directamente de la Fórmula 1.",
      sections: [
        { title: "Motor V6 híbrido de competición", paragraphs: [
          "El corazón del F80 es un motor V6 biturbo de 3.0 litros con arquitectura de 120°, derivado directamente de la unidad de potencia del hypercar 499P que conquistó Le Mans. Este propulsor genera 900 CV por sí solo, complementado por tres motores eléctricos que aportan 284 CV adicionales. El resultado: 1.184 CV de potencia combinada y una relación peso-potencia de 1,27 kg/CV.",
          "La batería de alto voltaje de 2,28 kWh utiliza tecnología de celda desarrollada por Ferrari en colaboración con su equipo de F1, capaz de ciclos de carga y descarga extremadamente rápidos. El sistema e-turbo (MGU-H) elimina prácticamente el lag del turbo, proporcionando una respuesta instantánea al acelerador."
        ]},
        { title: "Diseño radical y aerodinámica activa", paragraphs: [
          "El F80 rompe con todo lo anterior con un diseño firmado por Flavio Manzoni que incorpora elementos aerodinámicos activos en prácticamente cada superficie. El difusor trasero de triple elemento, los canales S-Duct frontales y el alerón trasero móvil generan hasta 1.000 kg de carga aerodinámica a 250 km/h.",
          "La estructura monocasco en fibra de carbono T1000 — el mismo material utilizado en los chasis de F1 — permite un peso en seco de solo 1.525 kg. Las puertas de apertura vertical y la cabina envolvente crean una experiencia de pilotaje única."
        ]},
        { title: "Prestaciones y exclusividad", paragraphs: [
          "El F80 acelera de 0 a 100 km/h en 2,15 segundos, de 0 a 200 km/h en menos de 5,75 segundos y alcanza una velocidad máxima de 350 km/h. En Fiorano, ha registrado un tiempo de 1:15.3, el más rápido jamás logrado por un Ferrari de producción.",
          "Limitado a 799 unidades con un precio base de 3,6 millones de euros, el F80 ya está completamente vendido. Las entregas comienzan a principios de 2026 desde la planta de Maranello."
        ]}
      ]
    },
    specs: [
      { label: "Potencia", value: "1.184 CV" },
      { label: "0-100 km/h", value: "2,15 s" },
      { label: "Peso seco", value: "1.525 kg" },
      { label: "Producción", value: "799 uds" },
    ]
  },
  {
    id: 9, slug: "aston-martin-valhalla", image: astonMartinValhalla, date: "23 Mayo 2025", category: "Lanzamientos",
    title: "Aston Martin Valhalla: debut dinámico en Mónaco con 1.079 CV híbridos",
    excerpt: "El Aston Martin Valhalla hace su debut público dinámico antes del GP de Mónaco. Motor V8 biturbo de 828 CV más sistema PHEV, 999 unidades, entregas en 2025.",
    readTime: "7 min",
    content: { intro: "Aston Martin ha elegido el marco incomparable del Gran Premio de Mónaco para el debut dinámico público de su esperado superdeportivo híbrido Valhalla. Con un tren motriz PHEV que combina un V8 biturbo de 4.0L de 828 CV con un sistema eléctrico para alcanzar 1.079 CV totales, el Valhalla marca la entrada de Aston Martin en la era de los hypercars.", sections: [
      { title: "Motor y rendimiento", paragraphs: ["El corazón del Valhalla es un V8 biturbo de 4.0 litros con cigüeñal de plano plano diseñado internamente por Aston Martin, que genera 828 CV. Complementado por un sistema PHEV con motor eléctrico en el eje trasero, la potencia total alcanza 1.079 CV con un par de 1.100 Nm. La transmisión es un DCT de 8 velocidades de nueva generación.", "El 0-100 km/h se completa en 2,5 segundos, el 0-200 km/h en menos de 7 segundos, y la velocidad máxima está limitada electrónicamente a 350 km/h."] },
      { title: "Chasis de carbono y aerodinámica", paragraphs: ["El monocasco de fibra de carbono, desarrollado con tecnología de F1, ofrece una rigidez estructural excepcional con un peso en seco inferior a 1.550 kg. La aerodinámica activa genera más de 600 kg de carga aerodinámica a velocidad máxima, con canales Venturi bajo el coche que crean efecto suelo.", "Limitado a 999 unidades con un precio estimado de 800.000 libras, las entregas comienzan en el segundo semestre de 2025."] }
    ] },
    specs: [{ label: "Potencia", value: "1.079 CV" }, { label: "0-100 km/h", value: "2,5 s" }, { label: "V. máxima", value: "350 km/h" }, { label: "Producción", value: "999 uds" }]
  },
  {
    id: 10, slug: "porsche-911-gt2-rs-2026", image: porscheGt2Rs, date: "27 Junio 2025", category: "Competición",
    title: "Porsche 911 GT2 RS 2026: el 911 más potente de la historia con más de 750 CV",
    excerpt: "Porsche desvela el nuevo 911 GT2 RS con motor bóxer biturbo híbrido de más de 750 CV. Es el 911 más rápido y potente jamás fabricado. Precio: 450.000 €.",
    readTime: "7 min",
    content: { intro: "Porsche ha presentado oficialmente el nuevo 911 GT2 RS de la generación 992.2, el modelo más potente y extremo de toda la gama 911. Con un motor bóxer de 6 cilindros biturbo asistido por un sistema híbrido, el GT2 RS supera los 750 CV y promete ser el 911 más rápido de la historia tanto en circuito como en carretera.", sections: [
      { title: "El flat-six biturbo más potente", paragraphs: ["El motor bóxer de 3.8 litros biturbo ha sido extensivamente modificado con nuevos turbos, intercoolers más grandes y una gestión electrónica completamente nueva. La asistencia eléctrica aporta respuesta instantánea y potencia adicional en las fases de aceleración. El resultado supera los 750 CV, convirtiendo al GT2 RS en el 911 más potente de los 60 años de historia del modelo.", "La transmisión PDK de 7 velocidades ha sido reforzada para soportar el aumento de par, y el sistema de propulsión trasera se mantiene fiel a la tradición GT2 RS."] },
      { title: "Aerodinámica extrema", paragraphs: ["El paquete aerodinámico es el más agresivo jamás visto en un 911 de producción, con un alerón trasero de doble plano fijo, splitter delantero extendido en fibra de carbono y difusor de competición. La carga aerodinámica supera los 900 kg a velocidad máxima.", "Los pedidos ya están abiertos con un precio de 450.000 euros. Las entregas comienzan en junio de 2026 con una producción limitada."] }
    ] },
    specs: [{ label: "Potencia", value: "750+ CV" }, { label: "0-100 km/h", value: "2,5 s" }, { label: "Motor", value: "Flat-6 Biturbo" }, { label: "Precio", value: "450.000 €" }]
  },
  {
    id: 11, slug: "lamborghini-fenomeno", image: lamborghiniFenomeno, date: "16 Agosto 2025", category: "Ediciones Limitadas",
    title: "Lamborghini Fenomeno: 1.080 CV y solo 29 unidades del Revuelto más extremo",
    excerpt: "Lamborghini presenta el Fenomeno, una versión ultra-limitada del Revuelto con 1.080 CV del V12 híbrido. Solo 29 unidades dentro del programa Few Off.",
    readTime: "6 min",
    content: { intro: "Lamborghini ha presentado el Fenomeno, el modelo más potente y exclusivo de su historia actual. Basado en el Revuelto pero llevado al extremo, el Fenomeno forma parte del programa 'Few Off' de la marca, con una producción limitada a 29 unidades. Su V12 híbrido de 6.5 litros genera 1.080 CV, superando incluso al Revuelto estándar.", sections: [
      { title: "V12 híbrido al máximo", paragraphs: ["El motor V12 atmosférico de 6.5 litros del Fenomeno ha sido afinado para entregar 835 CV, 15 CV más que el Revuelto estándar. Los tres motores eléctricos han sido repotenciados para aportar 245 CV adicionales, elevando la potencia total a 1.080 CV. El par combinado supera los 1.000 Nm.", "El paquete aerodinámico incluye un alerón fijo de competición, divisor frontal extendido y difusor trasero agresivo, todo en fibra de carbono expuesta."] },
      { title: "Exclusividad máxima", paragraphs: ["Con 29 unidades previstas y un precio estimado superior a 600.000 euros, el Fenomeno es una pieza de colección desde su nacimiento. Cada unidad es personalizada por Ad Personam con opciones únicas de color y acabado."] }
    ] },
    specs: [{ label: "Potencia", value: "1.080 CV" }, { label: "Motor", value: "V12 6.5L + 3 eléctricos" }, { label: "Producción", value: "29 uds" }, { label: "Precio est.", value: "600.000+ €" }]
  },
  {
    id: 12, slug: "ferrari-elettrica", image: ferrariElettrica, date: "9 Octubre 2025", category: "Eléctricos",
    title: "Ferrari Elettrica: Maranello desvela la tecnología de su primer coche 100% eléctrico",
    excerpt: "Ferrari revela el chasis y los componentes de producción de su primer EV durante el Capital Markets Day. Cuatro motores, 800V y más de 60 patentes exclusivas.",
    readTime: "8 min",
    content: { intro: "En un evento histórico durante su Capital Markets Day 2025, Ferrari ha desvelado por primera vez el chasis y los componentes de producción de su primer vehículo totalmente eléctrico, bautizado como Elettrica. Con una arquitectura de 800V, cuatro motores eléctricos y más de 60 patentes exclusivas, el Elettrica representa el futuro de la marca del Cavallino Rampante.", sections: [
      { title: "Arquitectura eléctrica revolucionaria", paragraphs: ["El Ferrari Elettrica utiliza una arquitectura de 800V con cuatro motores eléctricos independientes que proporcionan tracción total y un sistema de vectorización de par ultra-preciso. La batería, desarrollada internamente en la nueva planta de Maranello, utiliza aluminio reciclado para su carcasa y celdas de última generación.", "Ferrari ha desarrollado un sistema de sonido patentado que genera una experiencia acústica emocional sin recurrir a grabaciones de motores de combustión. El sonido está generado orgánicamente por los componentes eléctricos del tren motriz."] },
      { title: "Diseño y posicionamiento", paragraphs: ["Aunque Ferrari no ha revelado el diseño exterior completo, ha confirmado que el Elettrica será un Gran Turismo de cuatro plazas que competirá en el segmento ultra-lujo. El precio se estima en torno a los 500.000 euros, y las entregas comenzarán en 2026.", "Es el primer paso de la estrategia multi-energía de Ferrari que abarca motores de combustión interna, híbridos PHEV y ahora eléctricos puros."] }
    ] },
    specs: [{ label: "Arquitectura", value: "800V" }, { label: "Motores", value: "4 eléctricos" }, { label: "Patentes", value: "60+" }, { label: "Lanzamiento", value: "2026" }]
  },
  {
    id: 13, slug: "aston-martin-vanquish-volante", image: astonMartinVanquishVolante, date: "25 Marzo 2025", category: "Gran Turismo",
    title: "Aston Martin Vanquish Volante: el convertible frontal más rápido del mundo con 824 CV",
    excerpt: "Aston Martin desvela el Vanquish Volante con motor V12 biturbo de 824 CV. Es el convertible de motor delantero más rápido jamás producido por la marca británica.",
    readTime: "6 min",
    content: { intro: "Celebrando 60 años de producción Volante, Aston Martin ha presentado el Vanquish Volante, equipado con el potente motor V12 biturbo de 5.2 litros que genera 824 CV. Es el convertible de motor delantero más rápido de la historia de Aston Martin, capaz de alcanzar 345 km/h.", sections: [
      { title: "V12 biturbo de 824 CV", paragraphs: ["El motor V12 biturbo de 5.2 litros, la última evolución de este icónico propulsor, entrega 824 CV y 1.000 Nm de par. Combinado con una transmisión automática ZF de 8 velocidades y tracción trasera, el Vanquish Volante ofrece una experiencia de conducción puramente hedonista.", "A pesar de la estructura reforzada necesaria para un convertible, Aston Martin ha logrado un peso de solo 1.865 kg gracias al uso extensivo de aluminio y carbono."] },
      { title: "Producción y precio", paragraphs: ["La producción del Vanquish Volante, combinada con la del coupé, está limitada a menos de 1.000 unidades anuales. Las entregas comienzan a finales de 2025 con un precio estimado superior a 350.000 euros."] }
    ] },
    specs: [{ label: "Potencia", value: "824 CV" }, { label: "V. máxima", value: "345 km/h" }, { label: "Motor", value: "V12 5.2L Biturbo" }, { label: "Par", value: "1.000 Nm" }]
  },
  {
    id: 14, slug: "bentley-batur-convertible", image: bentleyBatur, date: "17 Abril 2025", category: "Lujo",
    title: "Bentley Batur Convertible: el último W12 al aire libre debuta en Dubái",
    excerpt: "Bentley presenta el Batur Convertible en Dubái, el tercer modelo coachbuilt de Mulliner y uno de los últimos Bentley con el icónico motor W12 de 750 CV.",
    readTime: "6 min",
    content: { intro: "Bentley Motors ha presentado el Batur Convertible en un exclusivo evento en Dubái, el tercer modelo coachbuilt de la era moderna creado por Mulliner, la división de personalización de la marca. Este espectacular convertible es uno de los últimos vehículos que llevarán el legendario motor W12 de 6.0 litros, haciendo de cada unidad una pieza de historia del automóvil.", sections: [
      { title: "El legendario W12 en su última evolución", paragraphs: ["El motor W12 biturbo de 6.0 litros genera 750 CV y 1.000 Nm de par, en lo que es la versión más potente jamás producida de este emblemático propulsor. La transmisión de doble embrague de 8 velocidades y la tracción integral completan un tren motriz que combina potencia bruta con refinamiento absoluto.", "Como canto del cisne para el W12, cada Batur Convertible se entrega con una placa conmemorativa firmada por el equipo de Mulliner."] },
      { title: "Artesanía sin límites", paragraphs: ["Cada Batur Convertible es único, personalizado por el equipo de diseño de Mulliner en Crewe. Los propietarios pueden elegir entre más de 100 colores exteriores y materiales interiores ilimitados, incluyendo opciones como madera sostenible, cuero vintage y fibra de carbono tejida a mano. La producción se limita a 16 unidades."] }
    ] },
    specs: [{ label: "Potencia", value: "750 CV" }, { label: "Motor", value: "W12 6.0L Biturbo" }, { label: "Producción", value: "16 uds" }, { label: "Par", value: "1.000 Nm" }]
  },
  {
    id: 15, slug: "mclaren-w1-primeras-entregas", image: mclarenW1Delivery, date: "10 Julio 2025", category: "Hypercars",
    title: "McLaren W1: comienzan las primeras entregas del hypercar de 1.275 CV",
    excerpt: "McLaren inicia las entregas del W1 desde su planta de Woking. El hypercar de 1.275 CV ya ha completado pruebas extensivas en Silverstone con resultados extraordinarios.",
    readTime: "6 min",
    content: { intro: "McLaren ha comenzado oficialmente las entregas de su hypercar W1 desde el McLaren Production Centre en Woking, Inglaterra. Tras meses de pruebas exhaustivas en circuitos como Silverstone y Spa-Francorchamps, los primeros 399 propietarios del mundo comienzan a recibir sus unidades del McLaren más avanzado jamás construido.", sections: [
      { title: "Pruebas en Silverstone", paragraphs: ["Durante las pruebas finales en Silverstone, el W1 ha demostrado capacidades que superan las expectativas más optimistas de McLaren. Su sistema aerodinámico Active Long Tail y la potencia de 1.275 CV del tren motriz híbrido V8 han permitido tiempos que rivalizan con los de algunos coches de competición GT3.", "Cada W1 pasa por más de 400 horas de ensamblaje artesaníal antes de ser entregado a su propietario."] },
      { title: "Un hito para McLaren", paragraphs: ["Con las 399 unidades ya vendidas a un precio de 2,1 millones de euros, el W1 representa el pináculo absoluto de las capacidades de McLaren y el comienzo de una nueva era para la marca británica."] }
    ] },
    specs: [{ label: "Potencia", value: "1.275 CV" }, { label: "Peso seco", value: "1.399 kg" }, { label: "Producción", value: "399 uds" }, { label: "Precio", value: "2,1M €" }]
  },
  {
    id: 16, slug: "rimac-nevera-r", image: rimacNevera, date: "5 Septiembre 2025", category: "Eléctricos",
    title: "Rimac Nevera R: la versión más radical del hypercar eléctrico croata con 2.107 CV",
    excerpt: "Rimac presenta la Nevera R, versión extrema del hypercar eléctrico con 2.107 CV, nuevo récord de 0-100 en 1,74 segundos y aerodinámica de competición.",
    readTime: "6 min",
    content: { intro: "Rimac Automobili ha presentado la Nevera R, la versión más extrema y potente de su hypercar eléctrico. Con 2.107 CV, un peso reducido y un paquete aerodinámico de competición, la Nevera R establece nuevos récords en el mundo de los vehículos eléctricos de alto rendimiento.", sections: [
      { title: "Potencia eléctrica sin precedentes", paragraphs: ["Los cuatro motores eléctricos de la Nevera R generan una potencia combinada de 2.107 CV con un par de 2.340 Nm disponible de forma instantánea. El 0-100 km/h se completa en apenas 1,74 segundos, y la velocidad máxima supera los 412 km/h. La batería de 120 kWh ofrece una autonomía de hasta 490 km en ciclo WLTP.", "El sistema de vectorización de par R-AWTV (Rimac All-Wheel Torque Vectoring) de cuarta generación ajusta la distribución de potencia entre las cuatro ruedas 100 veces por segundo."] },
      { title: "Exclusividad croata", paragraphs: ["Limitada a 40 unidades con un precio de 2,4 millones de euros, la Nevera R es el Rimac definitivo y un referente absoluto en la electrificación de alto rendimiento."] }
    ] },
    specs: [{ label: "Potencia", value: "2.107 CV" }, { label: "0-100 km/h", value: "1,74 s" }, { label: "V. máxima", value: "412 km/h" }, { label: "Producción", value: "40 uds" }]
  },
  {
    id: 17, slug: "porsche-taycan-turbo-gt", image: porscheTaycanGt, date: "20 Agosto 2025", category: "Eléctricos",
    title: "Porsche Taycan Turbo GT: el eléctrico más rápido de Porsche bate récords en circuito",
    excerpt: "El Porsche Taycan Turbo GT con paquete Weissach establece nuevo récord en Laguna Seca para berlinas eléctricas con 1.108 CV en modo overboost.",
    readTime: "6 min",
    content: { intro: "El Porsche Taycan Turbo GT, equipado con el paquete de rendimiento Weissach, ha establecido un nuevo récord para berlinas eléctricas en el circuito de Laguna Seca. Con 1.108 CV en modo overboost y un chasis completamente reconfigurado, el Taycan Turbo GT demuestra que la electrificación no está reñida con las prestaciones en circuito.", sections: [
      { title: "Rendimiento eléctrico extremo", paragraphs: ["El Taycan Turbo GT genera 1.108 CV en modo overboost con launch control, permitiendo un 0-100 km/h en 2,2 segundos. La batería Performance Plus de 105 kWh con arquitectura de 800V permite cargas del 10% al 80% en solo 18 minutos, mientras que la gestión térmica activa mantiene el rendimiento constante vuelta tras vuelta.", "El paquete Weissach reduce el peso en 70 kg adicionales mediante el uso extensivo de carbono forjado y el desmontaje de los asientos traseros, sustituidos por una barra de refuerzo estructural."] },
      { title: "Precio y disponibilidad", paragraphs: ["Con un precio de 230.000 euros y ya disponible en los concesionarios Porsche, el Taycan Turbo GT es la prueba definitiva de la capacidad de Porsche para crear vehículos eléctricos emocionantes."] }
    ] },
    specs: [{ label: "Potencia", value: "1.108 CV" }, { label: "0-100 km/h", value: "2,2 s" }, { label: "Batería", value: "105 kWh" }, { label: "Precio", value: "230.000 €" }]
  },
  {
    id: 18, slug: "rolls-royce-spectre-black-badge", image: rollsRoyceSpectre, date: "15 Julio 2025", category: "Lujo",
    title: "Rolls-Royce Spectre Black Badge: la versión más oscura y potente del coupé eléctrico",
    excerpt: "Rolls-Royce presenta el Spectre Black Badge con 612 CV, acabados oscuros exclusivos y la experiencia de conducción eléctrica más lujosa del mundo.",
    readTime: "6 min",
    content: { intro: "Rolls-Royce ha presentado el Spectre Black Badge, la versión más poderosa y expresiva de su revolucionario coupé eléctrico. Con un aumento de potencia hasta 612 CV, acabados exclusivos en negro cromado y un carácter de conducción más dinámico, el Spectre Black Badge redefine el lujo eléctrico.", sections: [
      { title: "Potencia y refinamiento", paragraphs: ["Los dos motores eléctricos del Spectre Black Badge han sido recalibrados para entregar 612 CV y 900 Nm de par. La aceleración de 0-100 km/h se completa en 4,2 segundos, con la suavidad y el silencio que solo un Rolls-Royce puede ofrecer. La batería de 102 kWh proporciona una autonomía de hasta 530 km.", "La suspensión Planar ha sido endurecida un 10% para ofrecer una respuesta más directa, mientras que la dirección en las cuatro ruedas otorga una agilidad sorprendente para un coche de 2.975 kg."] },
      { title: "Estética Black Badge", paragraphs: ["Los acabados exclusivos incluyen la Spirit of Ecstasy en cromo oscuro, llantas de 23 pulgadas en negro brillante y el emblemático coach line pintado a mano. El precio parte de 450.000 euros."] }
    ] },
    specs: [{ label: "Potencia", value: "612 CV" }, { label: "Autonomía", value: "530 km" }, { label: "0-100 km/h", value: "4,2 s" }, { label: "Precio", value: "450.000+ €" }]
  },
  {
    id: 19, slug: "pagani-utopia-roadster", image: paganiUtopia, date: "12 Junio 2025", category: "Hypercars",
    title: "Pagani Utopia Roadster: la obra maestra italiana se descubre con 864 CV",
    excerpt: "Pagani presenta la versión Roadster del Utopia con motor V12 AMG de 864 CV, solo 130 unidades y un precio de 3,5 millones de euros.",
    readTime: "6 min",
    content: { intro: "Horacio Pagani ha desvelado la versión Roadster del Utopia, su último hypercar que combina el motor Mercedes-AMG V12 biturbo de 864 CV con una artesanía que roza la perfección. Limitado a 130 unidades, el Utopia Roadster es una celebración del diseño, la ingeniería y la pasión por el automóvil.", sections: [
      { title: "Motor y artesanía", paragraphs: ["El V12 biturbo de 6.0 litros desarrollado por Mercedes-AMG genera 864 CV y 1.100 Nm de par, transmitidos a las ruedas traseras a través de una caja de cambios manual robotizada Xtrac de 7 velocidades. Cada motor es firmado a mano por su ingeniero responsable en Affalterbach.", "El chasis Carbo-Titanium HP62-G2, exclusivo de Pagani, combina fibra de carbono y titanio para lograr una rigidez extraordinaria con un peso mínimo. El Roadster pesa apenas 1.280 kg en seco."] },
      { title: "Exclusividad italiana", paragraphs: ["Con un precio de 3,5 millones de euros y una lista de espera que se extiende hasta 2028, el Utopia Roadster es uno de los objetos más deseados del mundo del automóvil. Cada unidad requiere más de 600 horas de trabajo artesaníal en la factoría de San Cesario sul Panaro."] }
    ] },
    specs: [{ label: "Potencia", value: "864 CV" }, { label: "Peso seco", value: "1.280 kg" }, { label: "Producción", value: "130 uds" }, { label: "Precio", value: "3,5M €" }]
  },
  {
    id: 20, slug: "koenigsegg-jesko-entregas", image: koenigseggJesko, date: "28 Mayo 2025", category: "Hypercars",
    title: "Koenigsegg Jesko: comienzan las entregas del hypercar sueco de 1.600 CV",
    excerpt: "Koenigsegg inicia las entregas del Jesko Absolut y Attack tras años de desarrollo. Motor V8 biturbo de 5.0L con 1.600 CV y transmisión LST revolucionaria.",
    readTime: "6 min",
    content: { intro: "Tras años de desarrollo y perfeccionamiento, Koenigsegg ha comenzado oficialmente las entregas del Jesko a sus clientes. Disponible en las variantes Absolut (velocidad máxima) y Attack (circuito), el Jesko es el hypercar sueco más avanzado jamás creado, con un motor V8 biturbo de 5.0 litros capaz de generar 1.600 CV con combustible E85.", sections: [
      { title: "Motor y transmisión revolucionaria", paragraphs: ["El V8 biturbo de 5.0 litros del Jesko genera 1.280 CV con gasolina y 1.600 CV con E85, haciendo de él uno de los motores de producción más potentes del mundo. El verdadero hito tecnológico es la transmisión Light Speed Transmission (LST) de 9 velocidades multi-embrague, capaz de cambiar instantáneamente a cualquier marcha sin pasar por las intermedias.", "La velocidad máxima teórica del Jesko Absolut supera los 530 km/h, aunque Koenigsegg aún no ha realizado un intento de récord oficial."] },
      { title: "Producción artesaníal", paragraphs: ["Solo 125 unidades del Jesko serán producidas, repartidas entre las variantes Absolut y Attack. Cada unidad se fabrica a mano en la planta de Ängelholm, Suecia, con un precio base de 2,8 millones de euros."] }
    ] },
    specs: [{ label: "Potencia (E85)", value: "1.600 CV" }, { label: "Transmisión", value: "LST 9 vel." }, { label: "Producción", value: "125 uds" }, { label: "Precio", value: "2,8M €" }]
  },
  {
    id: 21, slug: "ford-gt-mk-iv", image: fordGtMkiv, date: "5 Abril 2025", category: "Competición",
    title: "Ford GT Mk IV: el superdeportivo americano exclusivo para circuito con 800+ CV",
    excerpt: "Ford presenta el GT Mk IV, versión exclusiva para circuito del Ford GT con motor EcoBoost V6 de más de 800 CV y solo 67 unidades producidas.",
    readTime: "5 min",
    content: { intro: "Ford ha entregado las últimas unidades del GT Mk IV, la versión exclusivamente para circuito del Ford GT que rinde homenaje al legendario GT40 Mk IV que dominó las 24 Horas de Le Mans en 1967. Con un motor EcoBoost V6 de 3.5L potenciado hasta más de 800 CV y un chasis completamente revisado, el Mk IV es el Ford de producción más extremo jamás creado.", sections: [
      { title: "Motor y chasis de competición", paragraphs: ["El motor EcoBoost V6 biturbo de 3.5 litros ha sido potenciado significativamente respecto al GT de calle, superando los 800 CV. El chasis tubular de acero reemplaza al monocasco de carbono del GT de calle, permitiendo una configuración más extrema con puntos de anclaje para arneses de competición y sistemas de seguridad FIA.", "Solo 67 unidades han sido producidas, un número que homenajea el año de la victoria en Le Mans de 1967. El precio: 1,7 millones de dólares."] }
    ] },
    specs: [{ label: "Potencia", value: "800+ CV" }, { label: "Motor", value: "V6 3.5L Biturbo" }, { label: "Producción", value: "67 uds" }, { label: "Uso", value: "Solo circuito" }]
  },
  {
    id: 22, slug: "gordon-murray-t50", image: gordonMurrayT50, date: "18 Marzo 2025", category: "Hypercars",
    title: "Gordon Murray T.50: las primeras entregas del sucesor espiritual del McLaren F1",
    excerpt: "Gordon Murray Automotive inicia las entregas del T.50, el superdeportivo de 663 CV con ventilador trasero y transmisión manual que pesa solo 986 kg.",
    readTime: "6 min",
    content: { intro: "Gordon Murray Automotive ha comenzado las entregas del T.50, el superdeportivo que muchos consideran el verdadero sucesor espiritual del legendario McLaren F1. Diseñado por Gordon Murray, el padre del F1 original, el T.50 prioriza la ligereza extrema, la pureza mecánica y la conexión del conductor por encima de las cifras brutas de potencia.", sections: [
      { title: "Filosofía de ligereza extrema", paragraphs: ["Con un peso de solo 986 kg en seco, el T.50 es más ligero que muchos coches compactos modernos. Su motor V12 atmosférico de 3.9 litros, desarrollado por Cosworth, genera 663 CV a 11.500 rpm — el régimen de giro más alto de cualquier motor de producción actual. La transmisión es manual de 6 velocidades, sin opción automática.", "El ventilador trasero de 400 mm de diámetro, inspirado en el Brabham BT46B de F1, gestiona activamente el flujo aerodinámico para aumentar la carga o reducir la resistencia según las condiciones de conducción."] },
      { title: "Artesanía británica", paragraphs: ["Solo 100 unidades del T.50 serán producidas en la nueva factoría de Dunsfold, Surrey, con un precio de 3,1 millones de euros. Cada coche requiere más de 300 horas de ensamblaje manual."] }
    ] },
    specs: [{ label: "Potencia", value: "663 CV" }, { label: "Peso seco", value: "986 kg" }, { label: "Régimen máx.", value: "11.500 rpm" }, { label: "Transmisión", value: "Manual 6V" }]
  },
  {
    id: 23, slug: "maserati-mc20-icona", image: maseratiMc20, date: "22 Septiembre 2025", category: "Ediciones Limitadas",
    title: "Maserati MC20 Icona: edición especial que celebra la herencia racing del Tridente",
    excerpt: "Maserati presenta el MC20 Icona, edición limitada a 50 unidades con motor Nettuno V6 de 630 CV potenciado y acabados inspirados en los Maserati de competición históricos.",
    readTime: "5 min",
    content: { intro: "Maserati ha presentado el MC20 Icona, una edición especial limitada a 50 unidades que celebra la rica herencia en competición de la marca del Tridente. El motor Nettuno V6 biturbo de 3.0 litros ha sido potenciado hasta 630 CV, y cada ejemplar luce acabados inspirados en los Maserati de carreras legendarios.", sections: [
      { title: "Motor Nettuno potenciado", paragraphs: ["El motor Nettuno V6 biturbo de 3.0 litros con su innovadora cámara de precombustión ha sido optimizado para entregar 630 CV, un aumento de 11 CV respecto al MC20 estándar. El par también crece hasta 740 Nm. La transmisión de doble embrague de 8 velocidades se mantiene, pero con calibraciones específicas más agresivas.", "Cada MC20 Icona se ofrece en uno de cinco esquemas de color históricos, incluyendo el Rosso Trofeo, el Bianco Eldorado y el Azzurro Argentina, todos inspirados en los Maserati de competición más icónicos."] },
      { title: "Exclusividad italiana", paragraphs: ["Limitado a 50 unidades con un precio de 275.000 euros, el MC20 Icona es una pieza de colección para los amantes de la marca del Tridente."] }
    ] },
    specs: [{ label: "Potencia", value: "630 CV" }, { label: "Motor", value: "V6 Nettuno 3.0L" }, { label: "Producción", value: "50 uds" }, { label: "0-100 km/h", value: "< 2,9 s" }]
  },
  {
    id: 24, slug: "lotus-emeya-r", image: lotusEmeya, date: "8 Noviembre 2025", category: "Eléctricos",
    title: "Lotus Emeya R: la berlina eléctrica británica más rápida con 918 CV y modo Track",
    excerpt: "Lotus presenta el Emeya R, la versión más deportiva de su berlina eléctrica con 918 CV, suspensión activa y un modo Track que transforma la experiencia.",
    readTime: "5 min",
    content: { intro: "Lotus ha presentado el Emeya R, la versión más radical de su berlina eléctrica de alto rendimiento. Con 918 CV, una suspensión completamente activa y un modo Track específico, el Emeya R demuestra que Lotus no ha olvidado su ADN deportivo en la transición hacia la electrificación.", sections: [
      { title: "Rendimiento y tecnología", paragraphs: ["Los dos motores eléctricos del Emeya R generan 918 CV y 985 Nm de par instantáneo, permitiendo un 0-100 km/h en 2,68 segundos. La batería de 102 kWh con arquitectura de 800V ofrece carga ultrarrápida a 350 kW y una autonomía de 480 km.", "La suspensión activa air-spring con amortiguadores adaptativos CDC escanea la carretera 1.000 veces por segundo, ajustando cada rueda de forma independiente. En modo Track, el Emeya R baja 15 mm, endurece la suspensión y activa la respuesta máxima de los motores."] },
      { title: "Precio competitivo", paragraphs: ["Con un precio de 120.000 euros, el Emeya R compite directamente con el Porsche Taycan Turbo GT y el BMW i5 M60, ofreciendo prestaciones superiores a un precio más accesible."] }
    ] },
    specs: [{ label: "Potencia", value: "918 CV" }, { label: "0-100 km/h", value: "2,68 s" }, { label: "Autonomía", value: "480 km" }, { label: "Precio", value: "120.000 €" }]
  },
  {
    id: 25, slug: "bmw-xm-label-red", image: bmwXm, date: "1 Diciembre 2025", category: "SUV Deportivo",
    title: "BMW XM Label Red: actualización del SUV híbrido más potente de BMW con 748 CV",
    excerpt: "BMW actualiza el XM Label Red con mejoras en la dinámica, nuevos acabados y el mismo V8 híbrido de 748 CV que lo convierte en el BMW más potente de la historia.",
    readTime: "6 min",
    content: { intro: "BMW M ha presentado una actualización significativa para el XM Label Red, el SUV más potente y exclusivo jamás producido por la división M de Múnich. Con 748 CV procedentes de su V8 biturbo híbrido enchufable de 4,4 litros, el XM Label Red continúa siendo el BMW más potente jamás homologado para circulación, ahora con mejoras profundas en la dinámica de conducción, una electrónica de chasis recalibrada y nuevas opciones de personalización a través del programa BMW Individual Manufaktur. La filosofía detrás del Label Red sigue intacta: ofrecer un SUV de gran tamaño capaz de competir en prestaciones puras con los superdeportivos más exclusivos del mercado, sin renunciar al confort, al espacio interior y a la versatilidad propia de un vehículo familiar de lujo. La actualización 2026 responde a las críticas recibidas tras el lanzamiento inicial y demuestra que BMW está dispuesto a invertir lo necesario para que el XM cumpla con las expectativas del segmento más exigente del mercado premium.", sections: [
      { title: "V8 híbrido de 748 CV: la fuerza bruta al servicio del lujo", paragraphs: [
        "El tren motriz del XM Label Red combina el V8 biturbo S68 de 4,4 litros desarrollado por la división M con un motor eléctrico síncrono integrado en la transmisión automática ZF de ocho velocidades. La potencia combinada de 748 CV y un par máximo de 1.000 Nm disponibles desde las 1.600 rpm permiten un 0 a 100 km/h en apenas 3,8 segundos, cifras realmente extraordinarias para un SUV que supera holgadamente las 2,7 toneladas de peso en orden de marcha. La batería de iones de litio de 25,7 kWh permite una autonomía 100% eléctrica de hasta 80 kilómetros en ciclo WLTP, suficiente para los desplazamientos urbanos diarios sin recurrir al motor de combustión.",
        "La novedad principal de la actualización 2026 reside en la nueva calibración de la unidad de control del tren motriz, que mejora la transición entre los modos eléctrico, híbrido y deportivo, prácticamente imperceptible para el conductor. La respuesta del acelerador en modo Sport Plus se ha vuelto más agresiva, con una entrega de par escalonada que recuerda a los motores atmosféricos de gran cilindrada. El sonido del V8, amplificado mediante un sistema de escape activo de doble salida cuádruple, ha sido reorquestado por los ingenieros acústicos de BMW M para entregar una banda sonora más profunda y emocional, especialmente entre las 4.000 y las 7.000 rpm donde el propulsor expresa todo su carácter."
      ]},
      { title: "Chasis, suspensión y dinámica de conducción afinada", paragraphs: [
        "La suspensión adaptativa M Professional ha sido recalibrada por completo para mejorar el control en curva sin penalizar el confort de marcha en uso diario. Las nuevas barras estabilizadoras eléctricas, derivadas directamente del M5 Sedán, eliminan prácticamente el balanceo en conducción dinámica y permiten que el XM se comporte con una agilidad impropia de sus dimensiones. La dirección a las cuatro ruedas, que estrena un nuevo software, mejora la maniobrabilidad a baja velocidad y aporta una estabilidad excepcional en autopista a velocidades elevadas, donde el SUV se siente plantado y predecible.",
        "Los frenos cerámicos de carbono M Compound son ahora de serie en la versión Label Red, con discos delanteros de 420 milímetros y pinzas de seis pistones específicas. El sistema de tracción integral M xDrive permite distribuir el par con precisión entre los cuatro neumáticos y, en modo 2WD, enviar el 100% de la potencia al eje trasero para los conductores más expertos que busquen una experiencia más radical. Los neumáticos Michelin Pilot Sport 5 desarrollados específicamente para el XM completan un paquete dinámico que sitúa al Label Red a la altura de los SUV deportivos más capaces del mercado, incluyendo al Lamborghini Urus Performante y al Aston Martin DBX 707."
      ]},
      { title: "Exclusividad M y posicionamiento comercial", paragraphs: [
        "El BMW XM Label Red se ofrece con un precio de partida de 199.000 euros en el mercado europeo, una cifra que lo posiciona por encima del XM estándar pero por debajo de sus rivales directos premium. La producción está limitada y se realiza exclusivamente en la planta de Spartanburg, Carolina del Sur, la misma factoría que ensambla todos los X5, X6 y X7 destinados al mercado mundial. Cada Label Red recibe un tratamiento de personalización ampliado a través del programa BMW Individual Manufaktur, con una gama de colores extendida que incluye acabados Frozen mate específicos del modelo y combinaciones bicolor exclusivas que recuerdan a las liveas históricas de la marca en competición.",
        "El interior, completamente recubierto en cuero Merino bicolor con costuras en contraste rojo Toro y techo en Alcantara perforada con iluminación ambiental integrada, marca claramente la diferencia con cualquier otro BMW del mercado. La placa identificativa numerada en la consola central y el detalle de la firma del piloto de pruebas en el reposacabezas del conductor refuerzan el carácter de pieza única de cada unidad. Las primeras entregas de la versión actualizada comenzarán en marzo de 2026 y BMW prevé una demanda concentrada en Estados Unidos, Oriente Medio y el sudeste asiático, mercados donde el XM ha encontrado mejor acogida frente al escepticismo inicial de la prensa europea."
      ]}
    ] },
    specs: [{ label: "Potencia", value: "748 CV" }, { label: "0-100 km/h", value: "3,8 s" }, { label: "Motor", value: "V8 4.4L PHEV" }, { label: "Precio", value: "199.000 €" }]
  },
  {
    id: 26, slug: "mercedes-amg-gt-63-pro", image: mercedesAmgGt2025, date: "15 Noviembre 2025", category: "Gran Turismo",
    title: "Mercedes-AMG GT 63 PRO: la versión de circuito del GT con 612 CV y aerodinámica F1",
    excerpt: "Mercedes-AMG presenta el GT 63 PRO, versión de circuito del AMG GT con motor V8 biturbo de 612 CV, aerodinámica derivada de F1 y sistema de refrigeración avanzado.",
    readTime: "6 min",
    content: { intro: "Mercedes-AMG ha presentado el GT 63 PRO, una versión orientada al uso intensivo en circuito del nuevo AMG GT que incorpora tecnología directamente transferida del programa de Fórmula 1 de Mercedes. Con 612 CV del motor V8 biturbo de 4.0 litros y un paquete aerodinámico completamente nuevo desarrollado en el túnel de viento de Brackley, el GT 63 PRO se posiciona como el AMG GT más extremo jamás producido para uso en pista de forma legal. La estrategia de Affalterbach es clara: ofrecer a los clientes más exigentes una versión del GT capaz de competir con los Porsche 911 GT3 y los nuevos Aston Martin Vantage AMR en jornadas de circuito, sin renunciar a la posibilidad de circular por carretera abierta gracias a una homologación europea completa. El proyecto, supervisado personalmente por Sebastian Vettel como asesor del programa, marca un giro estratégico para AMG hacia productos más radicales y centrados en la experiencia de conducción pura, alejándose de la tendencia generalista que había caracterizado a la marca durante la última década.", sections: [
      { title: "V8 biturbo optimizado para uso intensivo en pista", paragraphs: [
        "El motor M177 V8 biturbo de 4.0 litros ha sido objeto de una optimización profunda con turbocompresores más grandes derivados del AMG GT Black Series, un sistema de refrigeración mejorado con dos radiadores adicionales en los pasos de rueda delanteros y una gestión electrónica específica para uso en circuito desarrollada en colaboración con HWA Racelab. El resultado es una potencia de 612 CV a 6.500 rpm y un par máximo de 850 Nm constantes entre las 2.500 y las 5.000 rpm, con una respuesta al acelerador notablemente más afilada que la del GT 63 S estándar. La transmisión MCT de nueve velocidades ha sido recalibrada por completo para reducir los tiempos de cambio en un 20%, gracias a un nuevo software que anticipa la próxima relación basándose en la apertura del acelerador y la presión sobre el freno.",
        "El sistema de refrigeración, probablemente el aspecto más innovador del coche, incluye un circuito de agua independiente para el aceite del motor y la transmisión, inspirado en la tecnología utilizada en el hypercar <a href=\"/noticias/mercedes-amg-one-actualizacion\" class=\"text-[#bda095] hover:underline\">AMG ONE</a>. Este circuito permite mantener temperaturas estables durante sesiones prolongadas en circuito sin necesidad de levantar el pie del acelerador para refrigerar el conjunto, un problema clásico de los AMG en condiciones extremas. El sistema de admisión, con tomas adicionales en el capó dotadas de filtros lavables, mejora el caudal de aire en un 15% respecto al modelo estándar y resulta particularmente eficaz en circuitos de altitud donde la densidad del aire es menor."
      ]},
      { title: "Aerodinámica de inspiración Fórmula 1", paragraphs: [
        "El paquete aerodinámico del GT 63 PRO es, sin discusión, el más sofisticado jamás visto en un AMG de calle. Incluye un alerón trasero fijo de fibra de carbono de 1.450 milímetros de envergadura con flap superior ajustable manualmente en tres posiciones, dive planes frontales de doble elemento, splitter delantero extendido en carbono y un difusor trasero de doble nivel desarrollado en colaboración con el equipo Mercedes-AMG Petronas F1. La carga aerodinámica total aumenta un notable 35% respecto al GT estándar a 250 km/h, mientras que la resistencia aerodinámica se reduce ligeramente gracias a una nueva gestión activa de las tomas de aire frontales que se cierran cuando la refrigeración no es necesaria.",
        "Los pasos de rueda traseros han sido ensanchados en 30 milímetros para alojar neumáticos Michelin Pilot Sport Cup 2 R de medida 325/30 R20, mientras que en el eje delantero se han instalado neumáticos 285/30 R20 específicamente desarrollados para el modelo. Los frenos cerámicos AMG de 420 milímetros en el eje delantero y 390 milímetros en el trasero, con pinzas de seis pistones, garantizan una capacidad de frenada inalterable sesión tras sesión. El precio del AMG GT 63 PRO se ha fijado en 220.000 euros, una cifra competitiva frente a sus rivales directos, y estará disponible en concesionarios europeos desde enero de 2026 con una producción anual estimada en torno a las 800 unidades."
      ]}
    ] },
    specs: [{ label: "Potencia", value: "612 CV" }, { label: "0-100 km/h", value: "3,2 s" }, { label: "Motor", value: "V8 4.0L Biturbo" }, { label: "Precio", value: "220.000 €" }]
  },
  {
    id: 27, slug: "porsche-911-turbo-s-2026", image: porsche911TurboS2026, date: "12 Marzo 2026", category: "Competición",
    title: "Porsche 911 Turbo S 2026: aún más brutal que nunca",
    excerpt: "El Porsche 911 Turbo S 2026 se perfila como una de las evoluciones más radicales del icono de Stuttgart. Mantiene la fórmula clásica del 911 pero la lleva a un nuevo nivel de prestaciones, tecnología y sofisticación.",
    readTime: "7 min",
    content: { intro: "El Porsche 911 Turbo S 2026 se perfila como una de las evoluciones más radicales y completas del icono deportivo de Stuttgart. La nueva generación mantiene íntegra la fórmula clásica del 911 — motor trasero, tracción integral inteligente y usabilidad real en uso diario — pero la lleva a un nivel inédito de prestaciones, tecnología y sofisticación. Este modelo apunta directamente a quienes quieren un superdeportivo capaz de humillar a muchos hypercars contemporáneos, sin renunciar a la comodidad ni a la discreción característica de un gran turismo apto para uso cotidiano. Es, en esencia, la enésima reinterpretación de la fórmula 911 que Porsche viene perfeccionando desde 1963, y que en su versión Turbo S alcanza ahora un nivel de refinamiento que muchos analistas consideran insuperable. Por primera vez en la historia del modelo, el Turbo S incorpora un sistema híbrido suave que aporta no solo prestaciones adicionales sino también una mejora notable en la eficiencia y una respuesta inmediata del propulsor en cualquier régimen.", sections: [
      { title: "Diseño exterior: agresividad bajo control", paragraphs: [
        "Estéticamente, el Porsche 911 Turbo S 2026 no rompe con la línea clásica del 911 sino que la lleva a su máxima expresión, introduciendo detalles que subrayan su carácter extremo sin caer en el exhibicionismo. Los paragolpes delantero y trasero son más esculpidos que nunca, con tomas de aire significativamente más grandes para alimentar y refrigerar el sistema de sobrealimentación, los intercoolers laterales y los nuevos radiadores adicionales del sistema híbrido. El alerón trasero activo crece en superficie hasta los 0,38 metros cuadrados y trabaja de forma más inteligente con la aerodinámica activa del frontal, generando un equilibrio aerodinámico óóptimo en cada condición de uso.",
        "Las vías ensanchadas en 22 milímetros, las nuevas llantas forjadas Y-Spoke de 20 y 21 pulgadas y los frenos carbocerámicos PCCB de serie con discos de 420 milímetros dejan claro que estamos ante el tope absoluto de la gama. Aun así, el coche conserva esa elegancia sobria tan típica de Porsche: cada detalle visual tiene una función aerodinámica o de refrigeración, sin elementos puramente decorativos. Esto lo convierte en una opción ideal para quien busca prestaciones de hypercar sin el diseño excesivamente llamativo que caracteriza a otros superdeportivos de su segmento, ya sea por gusto personal o por la voluntad de pasar desapercibido en entornos urbanos."
      ]},
      { title: "Interior: lujo, tecnología y enfoque al conductor", paragraphs: [
        "En el interior, el 911 Turbo S 2026 continúa la digitalización progresiva iniciada en las últimas generaciones, pero sin sacrificar la herencia analógica que tanto valoran los fans más puristas de la marca. El cuadro de instrumentos combina relojes tradicionales inspirados directamente en el tacómetro clásico de los primeros 911 con pantallas configurables de alta resolución que muestran información de rendimiento, modos de conducción, mapas de circuito en tiempo real y datos de telemetría básica para los días de track. El nuevo head-up display de gran formato, proyectado sobre el parabrisas, permite al conductor mantener la vista en la carretera sin perder información crítica.",
        "La consola central adopta una arquitectura limpia y minimalista, con una gran pantalla táctil de 12,6 pulgadas para el sistema de infoentretenimiento PCM 7.0, compatible con las últimas funciones de conectividad inalámbrica, Apple CarPlay y servicios en línea Porsche Connect. Los asientos deportivos adaptativos Plus con respaldo en fibra de carbono, ajustes eléctricos de 18 vías y memoria, ofrecen el equilibrio perfecto entre sujeción lateral extrema en conducción rápida y confort en viajes largos. Los materiales — cuero natural curtido vegetalmente, Alcantara perforada, inserciones de aluminio cepillado y, opcionalmente, fibra de carbono forjado — refuerzan la sensación de estar en un superdeportivo de lujo más que en un coche radical orientado únicamente al circuito."
      ]},
      { title: "Motor y prestaciones: el corazón de la brutalidad", paragraphs: [
        "El gran protagonista del Porsche 911 Turbo S 2026 sigue siendo su motor bóxer turboalimentado de seis cilindros y 3.8 litros, aunque la arquitectura se mantiene fiel a la tradición. Porsche ha afinado la sobrealimentación con dos nuevos turbos de geometría variable VTG, ha rediseñado la gestión electrónica completa y ha revisado el sistema de admisión para lograr más potencia y, sobre todo, una entrega más llena y progresiva en todo el rango de revoluciones. El nuevo motor eléctrico de 60 CV integrado en la transmisión PDK aporta par adicional inmediato en los primeros instantes de aceleración, eliminando prácticamente el ya escaso lag turbo que aún se percibía en la generación anterior.",
        "El resultado es un incremento notable de prestaciones respecto a su predecesor: aceleraciones todavía más rápidas con un 0 a 100 km/h en 2,6 segundos, recupéraciones instantáneas a cualquier régimen y una sensación de empuje continuo que hace que las cifras oficiales parezcan conservadoras sobre el papel. Asociado a una caja de cambios automática de doble embrague PDK de ocho velocidades de respuesta ultrarrápida y a un sistema de tracción integral activa Porsche Traction Management muy refinado, el Turbo S 2026 se convierte en una máquina de acelerar prácticamente inigualable, tanto desde parado como en adelantamientos a alta velocidad en autopista alemana sin limitaciones."
      ]},
      { title: "Chasis y comportamiento dinámico: eficacia sin drama", paragraphs: [
        "Uno de los grandes argumentos históricos del 911 Turbo S frente a otros superdeportivos es su capacidad para poner la potencia en el suelo de forma absolutamente eficaz en casi cualquier condición climatológica y de adherencia. La versión 2026 va un paso más allá gracias a una puesta a punto revisada de la suspensión activa PASM Sport con nuevos amortiguadores de doble válvula, una gestión más fina de los diferenciales delantero y trasero PTV Plus, y una dirección eléctrica con asistencia variable todavía más precisa y comunicativa que la generación anterior. El sistema de dirección a las cuatro ruedas se ha vuelto más sofisticado en su programación, mejorando tanto la agilidad en curvas cerradas como la estabilidad en curvas rápidas de gran radio.",
        "Los modos de conducción permiten pasar de un gran turismo cómodo a un deportivo extremo con apenas un giro del selector situado en el volante deportivo GT. En el modo más radical Sport Plus, la respuesta del acelerador, la dureza de la suspensión, la gestión del cambio PDK y la asistencia de la dirección se orientan a exprimir al máximo las prestaciones del conjunto, mientras que en los modos más suaves Normal y Wet el coche se muestra sorprendentemente civilizado, incluso en uso urbano o en autopista a velocidad de crucero. Los sistemas de ayuda a la conducción de última generación incluyen InnoDrive predictivo, asistente de cambio de carril y reconocimiento de límites de velocidad, demostrando que Porsche puede integrar tecnología avanzada sin diluir la experiencia de conducción característica del 911."
      ]}
    ] },
    specs: [{ label: "Potencia", value: "650+ CV" }, { label: "0-100 km/h", value: "2,6 s" }, { label: "Motor", value: "Bóxer 6 Biturbo" }, { label: "Tracción", value: "Integral AWD" }],
    detailImages: [
      { src: porscheTurboSDetail1, alt: "Porsche 911 Turbo S 2026 - Vista frontal lateral" },
      { src: porscheTurboSDetail2, alt: "Porsche 911 Turbo S 2026 - Interior y cockpit" },
      { src: porscheTurboSDetail3, alt: "Porsche 911 Turbo S 2026 - Vista trasera en carretera" }
    ]
  }

  ,
  {
    id: 28, slug: "bugatti-tourbillon-lanzamiento", image: bugattiTourbillonLaunch, date: "21 Marzo 2026", category: "Hypercars",
    title: "Bugatti Tourbillon: lanzamiento oficial del V16 híbrido de 1.800 CV",
    excerpt: "Molsheim levanta el telón sobre el sucesor del Chiron. El Tourbillon combina un V16 atmosférico de 8.3 litros con tres motores eléctricos para alcanzar los 1.800 CV. Solo 250 unidades a 3,8 millones de euros.",
    readTime: "8 min",
    content: {
      intro: "Bugatti inaugura una nueva era con el Tourbillon, el primer modelo enteramente concebido bajo la dirección de Mate Rimac. La marca alsaciana ha optado por una arquitectura completamente inédita: un V16 atmosférico desarrollado junto a Cosworth complementado por tres motores eléctricos, capaz de entregar 1.800 CV sin sacrificar la pureza emocional de un motor de aspiración natural. Una declaración de principios que marca el inicio del próximo capítulo en Molsheim.",
      sections: [
        { title: "El renacer del aspirado: V16 de 8.3 litros", paragraphs: [
          "El corazón del Tourbillon es un V16 atmosférico de 8.3 litros con bancada en V a 90°, capaz de girar hasta 9.000 rpm y entregar 1.000 CV por sí solo. Cosworth ha desarrollado esta unidad partiendo de cero, prescindiendo de turbocompresores para devolver a Bugatti la respuesta inmediata y el sonido orgánico que caracterizaron a los grandes deportivos del siglo XX.",
          "Tres motores eléctricos (dos delanteros y uno integrado en la transmisión DCT de 8 velocidades) aportan 800 CV adicionales, alimentados por una batería estructural de 25 kWh con tecnología de 800 voltios. El conjunto eleva la potencia total a 1.800 CV con un par superior a 1.600 Nm, y permite hasta 60 km de autonomía 100% eléctrica."
        ]},
        { title: "Diseño analógico en la era digital", paragraphs: [
          "El interior del Tourbillon rompe con la tendencia general del sector: en lugar de pantallas gigantes, Bugatti ha colaborado con relojeros suizos para crear un cuadro de instrumentos enteramente mecánico, mecanizado en titanio y zafiro, con más de 600 componentes que recuerdan a la complicación de un tourbillon de alta relojería.",
          "Las puertas elitra se abren hacia arriba para facilitar el acceso, y la carrocería de fibra de carbono integra elementos aerodinámicos activos que se despliegan a alta velocidad. La silueta mantiene la firma visual Bugatti –línea central, herradura frontal, dos tonos opcionales– pero introduce proporciones más compactas y atléticas."
        ]},
        { title: "Prestaciones y exclusividad", paragraphs: [
          "El Tourbillon acelera de 0 a 100 km/h en 2,0 segundos, alcanza los 300 km/h en menos de 10 segundos y se desboca hasta una velocidad máxima de 445 km/h con la llave Speed Key. Cifras que lo sitúan como uno de los coches de calle más rápidos jamás homologados.",
          "Bugatti producirá únicamente 250 unidades a partir de 2026, con un precio de entrada de 3,8 millones de euros antes de impuestos y opciones. La lista de espera ya está cerrada: cada futuro propietario ha sido seleccionado personalmente por la marca para preservar el carácter exclusivo del programa."
        ]}
      ]
    },
    specs: [{ label: "Potencia", value: "1.800 CV" }, { label: "0-100 km/h", value: "2,0 s" }, { label: "Velocidad máx.", value: "445 km/h" }, { label: "Producción", value: "250 unidades" }]
  },
  {
    id: 29, slug: "lamborghini-revuelto-spider", image: lamborghiniRevueltoSpider, date: "28 Marzo 2026", category: "Lanzamientos",
    title: "Lamborghini Revuelto Spider: entregada la primera unidad del V12 híbrido descapotable",
    excerpt: "Sant'Agata Bolognese entrega oficialmente el primer Revuelto Spider a un cliente europeo. 1.015 CV, techo de carbono retráctil y el último V12 atmosférico al aire libre. Una experiencia sensorial sin filtros.",
    readTime: "7 min",
    content: {
      intro: "Lamborghini abre una nueva etapa para su buque insignia con la versión Spider del Revuelto. El primer ejemplar ha sido entregado este mes a un coleccionista alemán durante una ceremonia privada en la fábrica de Sant'Agata Bolognese. Con 1.015 CV combinados, el Revuelto Spider es el descapotable más potente jamás producido por la marca italiana, y también el más cargado de simbolismo: probablemente sea el último Lamborghini con motor V12 atmosférico capaz de respirar el aire libre.",
      sections: [
        { title: "V12 atmosférico de 825 CV con asistencia eléctrica", paragraphs: [
          "El propulsor central trasero conserva la arquitectura V12 a 60° de 6.5 litros del Revuelto coupé: 825 CV a 9.250 rpm, una zona roja que sigue erizando la piel y un sonido que ha sido especialmente afinado para apreciarse con el techo abierto. Tres motores eléctricos suman 190 CV adicionales, llevando la potencia total a 1.015 CV.",
          "La estructura reforzada para compensar la ausencia de techo apenas añade 95 kg respecto al coupé. El monocasco íntegramente en fibra de carbono garantiza la rigidez torsional necesaria para que el comportamiento dinámico siga siendo el de un superdeportivo de referencia."
        ]},
        { title: "Techo de carbono y artesanía", paragraphs: [
          "El techo rígido se compone de dos paneles de fibra de carbono que se almacenan en el frontal en apenas 12 segundos, a velocidades de hasta 50 km/h. Con el techo cerrado, el coeficiente aerodinámico se mantiene prácticamente intacto respecto al coupé.",
          "El primer cliente ha optado por una librea Verde Selvans con interiores en cuero Nero Cosmos y costuras en hilo verde. El programa Ad Personam ha permitido personalizar más de 40 detalles, desde el bordado de los reposacabezas hasta la firma del propietario grabada en el umbral."
        ]}
      ]
    },
    specs: [{ label: "Potencia", value: "1.015 CV" }, { label: "0-100 km/h", value: "2,6 s" }, { label: "Motor", value: "V12 6.5 PHEV" }, { label: "Precio", value: "640.000 €" }]
  },
  {
    id: 30, slug: "ferrari-12cilindri-spider-circuito", image: ferrari12CilindriSpider, date: "4 Abril 2026", category: "Gran Turismo",
    title: "Ferrari 12Cilindri Spider: debut dinámico en Fiorano con 830 CV",
    excerpt: "El descapotable más reciente de Maranello ha completado sus primeras vueltas oficiales en el circuito de Fiorano. Manteniendo el V12 atmosférico de 6.5 litros y 830 CV, el 12Cilindri Spider promete una experiencia única.",
    readTime: "6 min",
    content: {
      intro: "Ferrari ha presentado oficialmente el 12Cilindri Spider en una sesión privada en el circuito de Fiorano, con periodistas internacionales invitados a observar las primeras vueltas dinámicas del nuevo descapotable. La versión Spider mantiene íntegro el espíritu del coupé presentado en 2024: un V12 atmosférico de 6.5 litros con 830 CV, dispuesto en posición delantera-central y asociado a una transmisión DCT de 8 velocidades.",
      sections: [
        { title: "V12 de aspiración natural sin compromiso", paragraphs: [
          "El propulsor F140HD entrega 830 CV a 9.250 rpm y 678 Nm de par. Ferrari ha trabajado meticulosamente la respiración, los conductos de admisión y el escape para que el sonido característico de los doce cilindros de Maranello pueda disfrutarse en toda su pureza con el techo bajado.",
          "Las prestaciones se mantienen prácticamente intactas respecto al coupé: 0 a 100 km/h en 2,9 segundos, 0 a 200 km/h en menos de 8 segundos y una velocidad máxima superior a 340 km/h. Una rareza absoluta entre los descapotables actuales, casi todos abocados al downsizing y al híbrido."
        ]},
        { title: "Techo retráctil de aluminio", paragraphs: [
          "El techo rígido retráctil, fabricado íntegramente en aluminio, se pliega en 14 segundos y permite una operación incluso en marcha hasta 45 km/h. Una vez plegado, libera completamente el habitáculo manteniendo un maletero perfectamente aprovechable para escapadas de fin de semana.",
          "El interior recoge la filosofía neo-clásica del coupé, con dos pantallas digitales para conductor y pasajero, controles físicos en el volante y materiales premium aplicados con la habitual maestría de Maranello. El precio se sitúa en torno a los 425.000 euros y las entregas comenzarán a finales de 2026."
        ]}
      ]
    },
    specs: [{ label: "Potencia", value: "830 CV" }, { label: "0-100 km/h", value: "2,9 s" }, { label: "Motor", value: "V12 6.5 atmosférico" }, { label: "Precio", value: "425.000 €" }]
  },
  {
    id: 31, slug: "porsche-911-gt3-rs-2026-especificaciones", image: porscheGt3Rs2026, date: "11 Abril 2026", category: "Competición",
    title: "Porsche 911 GT3 RS 2026: nuevas especificaciones y aerodinámica activa evolucionada",
    excerpt: "Porsche actualiza el 911 GT3 RS con un paquete aerodinámico revisado, suspensión recalibrada y una electrónica más permisiva en circuito. El bóxer atmosférico de 4.0 litros entrega 518 CV.",
    readTime: "7 min",
    content: {
      intro: "Las especificaciones definitivas del modelo 2026 están pendientes de confirmación oficial por parte de Porsche. Sobre la base de las cifras oficiales actuales del 911 GT3 RS, el bóxer atmosférico de 4.0 litros entrega 518 CV. La evolución 2026 se centraría en tres ejes: aerodinámica activa, electrónica de chasis y un afinado del seis cilindros bóxer atmosférico.",
      sections: [
        { title: "Bóxer atmosférico afinado al milímetro", paragraphs: [
          "El bóxer de 4.0 litros de aspiración natural mantiene su esencia con una gestión electrónica afinada, un sistema de admisión revisado y un escape de titanio aligerado. Las cifras oficiales actuales sitúan la potencia en 518 CV a 8.500 rpm, con la zona roja en 9.000 rpm, y un par máximo de 465 Nm. Las especificaciones definitivas del modelo 2026 están pendientes de confirmación oficial por parte de Porsche.",
          "Asociado a una caja PDK de 7 velocidades específicamente programada para uso en circuito, el GT3 RS firma un 0 a 100 km/h en 3,2 segundos y una velocidad máxima en torno a 296 km/h, con un peso en orden de marcha de 1.450 kg."
        ]},
        { title: "Aerodinámica activa de inspiración LMDh", paragraphs: [
          "El alerón trasero adopta un sistema DRS de dos posiciones que se gestiona automáticamente en función del modo de conducción, mejorando tanto la velocidad punta como la carga aerodinámica en curva. La carga aerodinámica máxima supera los 860 kg a 285 km/h, una cifra de referencia en la categoría.",
          "El paquete Weissach opcional (estimado en 30.000 euros) sustituye numerosos elementos por fibra de carbono expuesta, incluyendo el techo, el capó delantero, la barra antivuelco y los retrovisores. Permite reducir varios kilos adicionales y desbloquea ajustes específicos de la suspensión KW para uso intensivo en pista."
        ]}
      ]
    },
    specs: [{ label: "Potencia", value: "518 CV" }, { label: "0-100 km/h", value: "3,2 s" }, { label: "Velocidad máx.", value: "296 km/h" }, { label: "Peso", value: "1.450 kg" }]
  },
  {
    id: 32, slug: "mclaren-w1-spider-confirmacion", image: mclarenW1Spider, date: "18 Abril 2026", category: "Hypercars",
    title: "McLaren W1 Spider: primeros rumores del hypercar a cielo abierto",
    excerpt: "Rumores apuntan a una versión Spider del W1, que mantendría los 1.275 CV del híbrido V8 y añadiría un techo de carbono desmontable manualmente. McLaren no ha confirmado cifras oficiales de producción ni precio.",
    readTime: "6 min",
    content: {
      intro: "⚠️ La versión Spider del <a href=\"/noticias/mclaren-w1\" class=\"text-[#bda095] hover:underline\">McLaren W1</a> no ha sido confirmada oficialmente por McLaren a fecha de publicación. Según los primeros rumores procedentes del entorno de Woking, la marca británica estaría trabajando en una variante a cielo abierto del hypercar que sucede al P1 y al Speedtail. Las informaciones disponibles apuntan a una posible reserva prioritaria para clientes seleccionados del programa W1 original, con entregas que comenzarían a finales de 2027 una vez completada la producción del coupé.",
      sections: [
        { title: "Híbrido V8 de 1.275 CV intacto", paragraphs: [
          "Según los rumores, el tren motriz del W1 Spider conservaría íntegramente el del coupé: un V8 biturbo de 4.0 litros de diseño completamente nuevo, asistido por un motor eléctrico radial integrado en la transmisión, para una potencia combinada de 1.275 CV y un par de 1.340 Nm. La batería de 1,4 kWh permitiría 2 km de autonomía eléctrica en maniobras de baja velocidad.",
          "A pesar del refuerzo estructural necesario para la ausencia de techo, el peso apenas aumentaría respecto al coupé, gracias al monocasco de carbono Aerocell desarrollado para soportar las cargas aerodinámicas extremas del W1 sin necesitar barras adicionales."
        ]},
        { title: "Techo de carbono extraíble", paragraphs: [
          "A diferencia de otros hypercars, McLaren habría optado por un techo rígido de fibra de carbono extraíble manualmente, almacenable en el frontal. Esta solución preservaría la pureza estética y reduciría el peso respecto a un techo plegable motorizado.",
          "Las puertas Dihedral con apertura hacia arriba se mantendrían, y la aerodinámica activa Active Long Tail funcionaría exactamente como en el coupé, generando hasta 1.000 kg de carga aerodinámica a 280 km/h. Se especula con una producción limitada, aunque McLaren no ha confirmado cifras oficiales."
        ]}
      ]
    },
    specs: [{ label: "Potencia", value: "1.275 CV" }, { label: "0-100 km/h", value: "2,7 s" }, { label: "Motor", value: "V8 4.0 PHEV" }, { label: "Producción", value: "Sin confirmar" }]
  },
  {
    id: 33, slug: "aston-martin-vantage-gt3-2026", image: astonMartinVantageGt3, date: "25 Abril 2026", category: "Competición",
    title: "Aston Martin Vantage GT3 2026: nueva era para la marca en resistencia",
    excerpt: "Aston Martin Racing presenta el nuevo Vantage GT3 homologado para la temporada 2026 de competiciones GT. V8 biturbo derivado del modelo de calle, aerodinámica optimizada y nuevo paquete electrónico de competición.",
    readTime: "5 min",
    content: {
      intro: "Aston Martin Racing ha desvelado el nuevo Vantage GT3 2026, sucesor de uno de los GT3 más exitosos de los últimos años. La nueva generación llega con una evolución profunda de la aerodinámica, una nueva electrónica de control y un V8 biturbo afinado para superar el complejo reglamento de Balance of Performance vigente en el campeonato del mundo de resistencia y el IMSA.",
      sections: [
        { title: "V8 biturbo de origen Mercedes-AMG optimizado", paragraphs: [
          "El motor sigue siendo el V8 biturbo de 4.0 litros desarrollado en colaboración con Mercedes-AMG, pero la electrónica de gestión es completamente nueva. El nuevo Vantage GT3 entrega cerca de 590 CV (variable según BoP) con una entrega de par mucho más lineal, particularmente útil en categorías Pro-Am donde la conducción suave es prioritaria.",
          "La caja de cambios secuencial Xtrac de 6 velocidades, refrigerada por aceite y accionada mediante levas, ha sido reforzada para soportar las altas cargas de las 24 Horas de Le Mans, prueba estrella del programa oficial de Aston Martin Racing."
        ]},
        { title: "Chasis y aerodinámica de nueva generación", paragraphs: [
          "El monocasco proviene del Vantage de calle pero recibe una jaula de seguridad FIA, ventanas de policarbonato y una arquitectura aerodinámica completamente nueva: capó con extractores, splitter ajustable, difusor extendido y alerón trasero de doble plano que permite ajustes precisos para cada circuito.",
          "El precio del coche cliente se sitúa en 575.000 euros, con entregas escalonadas a partir de junio de 2026 para los equipos privados que disputarán el GT World Challenge y los nuevos campeonatos GT3 nacionales."
        ]}
      ]
    },
    specs: [{ label: "Potencia", value: "590 CV (BoP)" }, { label: "Motor", value: "V8 4.0 biturbo" }, { label: "Caja", value: "Xtrac 6 vel." }, { label: "Precio", value: "575.000 €" }]
  },
  {
    id: 34, slug: "lamborghini-urus-se-actualizado", image: lamborghiniUrusSe, date: "2 Mayo 2026", category: "Lanzamientos",
    title: "Lamborghini Urus SE: la versión híbrida enchufable actualizada llega a Europa",
    excerpt: "Lamborghini renueva el Urus SE para 2026 con un sistema PHEV recalibrado, 800 CV combinados, hasta 60 km de autonomía 100% eléctrica y una electrónica de chasis derivada del Revuelto.",
    readTime: "6 min",
    content: {
      intro: "Lamborghini ha confirmado para 2026 una actualización significativa del Urus SE, la primera versión híbrida enchufable del Super SUV de Sant'Agata. Las modificaciones se centran en mejorar la integración entre el V8 biturbo y el motor eléctrico, aumentar la autonomía 100% eléctrica y heredar parte de la electrónica de chasis desarrollada para el Revuelto.",
      sections: [
        { title: "V8 biturbo más motor eléctrico: 800 CV", paragraphs: [
          "El V8 biturbo de 4.0 litros mantiene los 620 CV, mientras que el motor eléctrico síncrono integrado en la transmisión automática de 8 velocidades aporta 192 CV adicionales y 483 Nm de par. La potencia combinada alcanza los 800 CV con un par máximo de 950 Nm, disponible desde apenas 1.750 rpm.",
          "La batería de iones de litio de 25,9 kWh permite una autonomía eléctrica WLTP de hasta 60 km y acepta cargas en corriente alterna a 7,4 kW. Esto convierte al Urus SE en una opción real para quienes quieren un Lamborghini compatible con las nuevas restricciones de circulación en grandes ciudades europeas."
        ]},
        { title: "Chasis activo y modos de conducción ampliados", paragraphs: [
          "La nueva generación introduce el sistema LDVI 2.0 de control central, derivado del Revuelto, que integra suspensión neumática activa, barras estabilizadoras eléctricas y vectorización de par trasero. Resultado: un SUV de 2.500 kg capaz de comportarse con la agilidad de una berlina deportiva en carreteras de montaña.",
          "El nuevo modo Città prioriza el uso eléctrico en entorno urbano, mientras que los modos Strada, Sport, Corsa, Neve, Terra y Sabbia se mantienen. El Urus SE acelera de 0 a 100 km/h en 3,4 segundos y alcanza los 312 km/h con un precio de partida de 248.000 euros."
        ]}
      ]
    },
    specs: [{ label: "Potencia", value: "800 CV" }, { label: "0-100 km/h", value: "3,4 s" }, { label: "Autonomía EV", value: "60 km" }, { label: "Precio", value: "248.000 €" }]
  },
  {
    id: 35, slug: "bugatti-bolide-primeras-entregas", image: bugattiBolide, date: "9 Mayo 2026", category: "Hypercars",
    title: "Bugatti Bolide: comienzan las primeras entregas del hypercar exclusivo para pista",
    excerpt: "Molsheim entrega las primeras unidades del Bolide a sus selectos clientes. W16 atmosférico de 1.600 CV, peso de solo 1.450 kg y aerodinámica de prototipo Le Mans. Una experiencia track-only sin concesiones.",
    readTime: "7 min",
    content: {
      intro: "Bugatti ha comenzado la entrega de las primeras unidades del Bolide a sus clientes durante un evento privado celebrado en el circuito Paul Ricard. Concebido como un hypercar exclusivamente para pista, el Bolide es el coche más ligero y radical jamás construido por la marca alsaciana: un manifiesto técnico que despide al icónico motor W16 con una expresión sin compromisos.",
      sections: [
        { title: "El último W16 atmosférico de Bugatti", paragraphs: [
          "El propulsor W16 de 8.0 litros que equipa al Bolide es una versión profundamente modificada respecto al Chiron. Adaptado para funcionar con combustible 110 octanos de competición y revisado en su gestión electrónica, entrega 1.600 CV a 7.000 rpm y 1.600 Nm de par sostenido. La caja de cambios secuencial de 7 velocidades es específica para uso en pista.",
          "Es, oficialmente, el último Bugatti con motor W16, después de más de 20 años de servicio. Cada cliente recibe junto al coche un certificado firmado por los ingenieros responsables del proyecto y una pieza original del banco de pruebas como recuerdo."
        ]},
        { title: "Peso pluma y aerodinámica de LMP1", paragraphs: [
          "Con solo 1.450 kg en orden de marcha y un coeficiente de carga aerodinámica de 1.800 kg a 320 km/h, el Bolide ofrece una relación peso/potencia de 0,91 kg/CV. Esta cifra lo sitúa al nivel de un prototipo LMP1, con la diferencia de que el cliente lo conduce él mismo.",
          "El precio anunciado es de 4 millones de euros antes de impuestos, y la producción se limita a 40 unidades. Bugatti incluye en el paquete un programa de uso en circuito de tres años, con asistencia técnica completa durante los eventos exclusivos organizados por la marca en Le Mans, Spa-Francorchamps y Nardò."
        ]}
      ]
    },
    specs: [{ label: "Potencia", value: "1.600 CV" }, { label: "Peso", value: "1.450 kg" }, { label: "Carga aero", value: "1.800 kg" }, { label: "Producción", value: "40 unidades" }]
  },
  {
    id: 36, slug: "rolls-royce-droptail-edicion-final", image: rollsRoyceDroptail, date: "16 Mayo 2026", category: "Lujo",
    title: "Rolls-Royce Droptail: presentada la cuarta y última edición coachbuilt",
    excerpt: "Rolls-Royce desvela la cuarta y última unidad del programa Droptail, el coachbuilding más exclusivo de Goodwood. Cuatro coches únicos, V12 de 6.75 litros y un precio estimado superior a 25 millones de euros por unidad.",
    readTime: "6 min",
    content: {
      intro: "Rolls-Royce ha presentado oficialmente la cuarta y última unidad de la serie Droptail, el programa coachbuilt más exclusivo de la historia reciente de la marca británica. Tras La Rose Noire, Amethyst Droptail y Arcadia, esta última pieza cierra una saga iniciada en 2021 que ha redefinido los límites del lujo automovilístico contemporáneo y consolidado el departamento Coachbuild de Goodwood como referencia mundial.",
      sections: [
        { title: "V12 de 6.75 litros y arquitectura única", paragraphs: [
          "Bajo el largo capó del Droptail se encuentra el legendario motor V12 biturbo de 6.75 litros de Rolls-Royce, recalibrado para entregar 600 CV con una entrega absolutamente suave. La transmisión automática de 8 velocidades y la suspensión activa Magic Carpet Ride garantizan un confort de marcha sin parangón.",
          "Cada Droptail se construye sobre una plataforma específica que comparte muy pocos elementos con el resto de la gama. La carrocería, completamente exclusiva, está fabricada artesaníalmente en aluminio conformado a mano por los maestros de Goodwood, en un proceso que requiere más de 6.000 horas de trabajo por unidad."
        ]},
        { title: "Coachbuilding en su expresión más pura", paragraphs: [
          "Cada uno de los cuatro Droptail ha sido concebido a medida para su propietario, con códigos cromáticos, materiales y motivos decorativos únicos. La cuarta edición integra marquetería de madera elaborada con más de 1.600 piezas, un reloj específico desarrollado con una manufactura suiza y un sistema de techo rígido desmontable inspirado en los Rolls-Royce del periodo de entreguerras.",
          "El precio no se ha hecho público pero las estimaciones sitúan cada Droptail por encima de los 25 millones de euros, lo que lo convertiría en uno de los coches nuevos más caros jamás producidos. Con esta cuarta unidad, Rolls-Royce cierra el capítulo Droptail y se prepara para anunciar un nuevo programa coachbuild en 2027."
        ]}
      ]
    },
    specs: [{ label: "Potencia", value: "600 CV" }, { label: "Motor", value: "V12 6.75 biturbo" }, { label: "Producción", value: "4 unidades únicas" }, { label: "Precio est.", value: ">25 M€" }]
  },
  {
    id: 37, slug: "porsche-718-cayman-gt4-rs-electrico", image: porsche718CaymanElectric, date: "23 Mayo 2026", category: "Eléctricos",
    title: "Porsche 718 Cayman GT4 RS Eléctrico: los rumores del primer GT eléctrico de la marca",
    excerpt: "Rumores y especulaciones apuntan a un futuro Cayman GT4 RS 100% eléctrico con dos motores síncronos, 700 CV y arquitectura de 900 V. Porsche no ha confirmado oficialmente el proyecto.",
    readTime: "8 min",
    content: {
      intro: "⚠️ Este artículo está basado en filtraciones no confirmadas oficialmente por Porsche. Según rumores y especulaciones recientes procedentes del entorno de Weissach, la marca estaría trabajando en un 718 Cayman GT4 RS eléctrico, que sería el primer GT 100% eléctrico de Porsche. Esta hipotética versión inauguraría una nueva familia de modelos puramente eléctricos del 718 Cayman y Boxster, diseñados desde el principio para entregar prestaciones dignas de un GT de Stuttgart sin recurrir al motor de combustión.",
      sections: [
        { title: "Dos motores síncronos y arquitectura de 900 V", paragraphs: [
          "El nuevo GT4 RS eléctrico utiliza dos motores síncronos de imanes permanentes, uno en cada eje, para una potencia combinada de 700 CV y un par instantáneo de 850 Nm. Porsche ha desarrollado una arquitectura de 900 voltios, superior incluso a la del <a href=\"/noticias/porsche-taycan-turbo-gt\" class=\"text-[#bda095] hover:underline\">Taycan</a>, que permite cargas ultra-rápidas y minimiza las pérdidas térmicas durante las sesiones de circuito.",
          "El 0 a 100 km/h se completa en 2,8 segundos y la velocidad máxima se sitúa en 295 km/h. Pero el verdadero objetivo del programa no es la cifra absoluta, sino la capacidad de mantener prestaciones constantes durante 30 minutos seguidos en circuito, problema clásico de los deportivos eléctricos que Porsche asegura haber resuelto."
        ]},
        { title: "Refrigeración derivada del Mission R", paragraphs: [
          "El sistema de refrigeración utiliza tecnología directa heredada del prototipo de competición Mission R: refrigeración directa de las celdas por aceite dieléctrico y un intercambiador específico para los motores eléctricos. Resultado: el coche puede repetir tiempos al límite durante 25 vueltas en Nürburgring sin caída de prestaciones.",
          "El peso se ha contenido en 1.685 kg gracias a un nuevo subchasis trasero en aluminio fundido y un pack de baterías estructural de 85 kWh. La autonomía WLTP se sitúa en 380 km, una cifra más que suficiente para un GT pensado para uso mixto carretera-circuito."
        ]},
        { title: "Precio y disponibilidad", paragraphs: [
          "El precio anunciado para el 718 Cayman GT4 RS eléctrico es de 195.000 euros, con las primeras entregas previstas para el primer trimestre de 2027. Porsche producirá el modelo en paralelo con la versión de combustión durante un periodo de transición hasta 2030.",
          "Con este lanzamiento, la marca de Stuttgart envía un mensaje claro: la electrificación no es un compromiso para el GT, sino una oportunidad para reinterpretar el ADN deportivo desde una base técnica completamente nueva, sin renunciar a la esencia que ha hecho del Cayman uno de los deportivos más equilibrados del mercado."
        ]}
      ]
    },
    specs: [{ label: "Potencia", value: "700 CV" }, { label: "0-100 km/h", value: "2,8 s" }, { label: "Batería", value: "85 kWh / 900 V" }, { label: "Autonomía", value: "380 km WLTP" }]
  }
];

// Merge the English translations (see additionalNewsEn.ts) onto each article,
// so every article object also exposes excerpt_en / intro_en / title_en / paragraphs_en.
export const additionalNews: NewsArticle[] = articlesEs.map((a) => {
  const en = newsEn[a.slug];
  if (!en) return a;
  return {
    ...a,
    excerpt_en: en.excerpt,
    content: {
      ...a.content,
      intro_en: en.intro,
      sections: a.content.sections.map((s, i) => ({
        ...s,
        title_en: en.sections[i]?.title,
        paragraphs_en: en.sections[i]?.paragraphs,
      })),
    },
  };
});
