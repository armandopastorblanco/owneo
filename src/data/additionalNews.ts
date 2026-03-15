import ferrariF80 from "@/assets/news/ferrari-f80.jpg";
import lamborghiniTemerario from "@/assets/news/lamborghini-temerario.jpg";
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

export interface NewsArticle {
  id: number;
  slug: string;
  image: string;
  date: string;
  category: string;
  title: string;
  excerpt: string;
  readTime: string;
  content: {
    intro: string;
    sections: { title: string; paragraphs: string[] }[];
  };
  specs?: { label: string; value: string }[];
}

export const additionalNews: NewsArticle[] = [
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
    id: 8, slug: "lamborghini-temerario", image: lamborghiniTemerario, date: "16 Agosto 2024", category: "Lanzamientos",
    title: "Lamborghini Temerario: el sucesor del Huracán ya es oficial con 920 CV híbridos",
    excerpt: "Lamborghini presenta oficialmente el Temerario, sucesor del Huracán con un nuevo V8 biturbo de 4.0L y tres motores eléctricos que generan 920 CV combinados.",
    readTime: "7 min",
    content: { intro: "El Lamborghini Temerario ha sido presentado oficialmente como el sucesor del icónico Huracán. Equipado con un motor V8 biturbo de 4.0 litros completamente nuevo y tres motores eléctricos, el Temerario es el segundo modelo HPEV (High Performance Electrified Vehicle) de Lamborghini tras el Revuelto, y marca una nueva era para los superdeportivos de Sant'Agata Bolognese.", sections: [
      { title: "Un V8 revolucionario", paragraphs: ["El nuevo V8 biturbo de 4.0 litros con cigüeñal de plano plano es una creación 100% Lamborghini, no una derivación del motor Audi. Desarrolla 800 CV a 9.000 rpm, con un sonido agudo y distintivo que recuerda más a un motor de competición que a un turbo convencional. Combinado con tres motores eléctricos (dos delanteros y uno trasero integrado en la transmisión DCT de 8 velocidades), la potencia total alcanza los 920 CV.", "La batería de 3,8 kWh permite una autonomía eléctrica de 13 km y asiste activamente en la conducción deportiva, eliminando el lag del turbo y proporcionando impulsos de par instantáneo."] },
      { title: "Diseño y chasis", paragraphs: ["El Temerario presenta un diseño más afilado y compacto que el Huracán, con proporciones de motor central que enfatizan su carácter deportivo. El chasis combina aluminio y fibra de carbono con una rigidez torsional un 20% superior a su predecesor. El peso en seco de 1.340 kg (estimado) otorga una relación peso/potencia excepcional.", "La tracción integral inteligente distribuye el par entre los cuatro neumáticos con una frecuencia de ajuste de 500 veces por segundo, mientras que la dirección en las cuatro ruedas mejora la agilidad a baja velocidad y la estabilidad a alta velocidad."] },
      { title: "Precio y disponibilidad", paragraphs: ["El Lamborghini Temerario tiene un precio base de 290.000 dólares en EE.UU. Las primeras entregas están previstas para mediados de 2025, con versiones Performante y Sterrato previstas para los años siguientes."] }
    ] },
    specs: [{ label: "Potencia", value: "920 CV" }, { label: "0-100 km/h", value: "2,7 s" }, { label: "V. máxima", value: "343 km/h" }, { label: "Precio", value: "~290.000 $" }]
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
    title: "Lamborghini Fenomeno: 1.065 CV y solo 30 unidades del Revuelto más extremo",
    excerpt: "Lamborghini presenta el Fenomeno, una versión ultra-limitada del Revuelto con 1.065 CV del V12 híbrido. Solo 30 unidades dentro del programa Few Off.",
    readTime: "6 min",
    content: { intro: "Lamborghini ha presentado el Fenomeno, el modelo más potente y exclusivo de su historia actual. Basado en el Revuelto pero llevado al extremo, el Fenomeno forma parte del programa 'Few Off' de la marca, con una producción limitada a menos de 30 unidades. Su V12 híbrido de 6.5 litros genera 1.065 CV, superando incluso al Revuelto estándar.", sections: [
      { title: "V12 híbrido al máximo", paragraphs: ["El motor V12 atmosférico de 6.5 litros del Fenomeno ha sido afinado para entregar 825 CV a 9.250 rpm, 15 CV más que el Revuelto estándar. Los tres motores eléctricos han sido repotenciados para aportar 240 CV adicionales, elevando la potencia total a 1.065 CV. El par combinado supera los 1.000 Nm.", "El paquete aerodinámico incluye un alerón fijo de competición, divisor frontal extendido y difusor trasero agresivo, todo en fibra de carbono expuesta."] },
      { title: "Exclusividad máxima", paragraphs: ["Con menos de 30 unidades previstas y un precio estimado superior a 600.000 euros, el Fenomeno es una pieza de colección desde su nacimiento. Cada unidad es personalizada por Ad Personam con opciones únicas de color y acabado."] }
    ] },
    specs: [{ label: "Potencia", value: "1.065 CV" }, { label: "Motor", value: "V12 6.5L + 3 eléctricos" }, { label: "Producción", value: "~30 uds" }, { label: "Precio est.", value: "600.000+ €" }]
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
      { title: "Pruebas en Silverstone", paragraphs: ["Durante las pruebas finales en Silverstone, el W1 ha demostrado capacidades que superan las expectativas más optimistas de McLaren. Su sistema aerodinámico Active Long Tail y la potencia de 1.275 CV del tren motriz híbrido V8 han permitido tiempos que rivalizan con los de algunos coches de competición GT3.", "Cada W1 pasa por más de 400 horas de ensamblaje artesanal antes de ser entregado a su propietario."] },
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
      { title: "Exclusividad italiana", paragraphs: ["Con un precio de 3,5 millones de euros y una lista de espera que se extiende hasta 2028, el Utopia Roadster es uno de los objetos más deseados del mundo del automóvil. Cada unidad requiere más de 600 horas de trabajo artesanal en la factoría de San Cesario sul Panaro."] }
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
      { title: "Producción artesanal", paragraphs: ["Solo 125 unidades del Jesko serán producidas, repartidas entre las variantes Absolut y Attack. Cada unidad se fabrica a mano en la planta de Ängelholm, Suecia, con un precio base de 2,8 millones de euros."] }
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
    readTime: "5 min",
    content: { intro: "BMW ha presentado una actualización significativa para el XM Label Red, el SUV más potente y exclusivo de la marca bávara. Con 748 CV procedentes de su V8 biturbo híbrido enchufable, el XM Label Red continúa siendo el BMW más potente jamás producido, ahora con mejoras en la dinámica de conducción y nuevas opciones de personalización.", sections: [
      { title: "V8 híbrido de 748 CV", paragraphs: ["El tren motriz combina un V8 biturbo de 4.4 litros con un motor eléctrico integrado en la transmisión automática de 8 velocidades. La potencia combinada de 748 CV y 1.000 Nm de par permite un 0-100 km/h en 3,8 segundos, cifras extraordinarias para un SUV de más de 2.700 kg.", "La suspensión adaptativa M Professional ha sido recalibrada para mejorar el control en curva, y los frenos cerámicos de carbono son ahora de serie en la versión Label Red."] },
      { title: "Exclusividad M", paragraphs: ["El BMW XM Label Red se ofrece con un precio de 199.000 euros y está disponible en una gama ampliada de colores BMW Individual. La producción está limitada y se realiza exclusivamente en la planta de Spartanburg, Carolina del Sur."] }
    ] },
    specs: [{ label: "Potencia", value: "748 CV" }, { label: "0-100 km/h", value: "3,8 s" }, { label: "Motor", value: "V8 4.4L + Eléctrico" }, { label: "Precio", value: "199.000 €" }]
  },
  {
    id: 26, slug: "mercedes-amg-gt-63-pro", image: mercedesAmgGt2025, date: "15 Noviembre 2025", category: "Gran Turismo",
    title: "Mercedes-AMG GT 63 PRO: la versión de circuito del GT con 612 CV y aerodinámica F1",
    excerpt: "Mercedes-AMG presenta el GT 63 PRO, versión de circuito del AMG GT con motor V8 biturbo de 612 CV, aerodinámica derivada de F1 y sistema de refrigeración avanzado.",
    readTime: "5 min",
    content: { intro: "Mercedes-AMG ha presentado el GT 63 PRO, una versión orientada al circuito del AMG GT que incorpora tecnología directamente transferida del programa de Fórmula 1 de Mercedes. Con 612 CV del motor V8 biturbo de 4.0 litros y un paquete aerodinámico completamente nuevo, el GT 63 PRO es el AMG GT más extremo para circuito.", sections: [
      { title: "V8 biturbo optimizado", paragraphs: ["El motor V8 biturbo de 4.0 litros ha sido optimizado con turbocompresores más grandes, un sistema de refrigeración mejorado con radiadores adicionales y una gestión electrónica específica para circuito. El resultado: 612 CV a 6.500 rpm y 850 Nm de par. La transmisión MCT de 9 velocidades ha sido recalibrada para cambios un 20% más rápidos.", "El sistema de refrigeración incluye un circuito de agua independiente para el aceite del motor y la transmisión, inspirado en la tecnología utilizada en el hypercar AMG ONE."] },
      { title: "Aerodinámica de F1", paragraphs: ["El paquete aerodinámico incluye un alerón trasero fijo de fibra de carbono, dive planes frontales y un difusor de doble elemento. La carga aerodinámica aumenta un 15% respecto al GT estándar. El precio del AMG GT 63 PRO es de 220.000 euros, disponible en concesionarios desde enero de 2026."] }
    ] },
    specs: [{ label: "Potencia", value: "612 CV" }, { label: "0-100 km/h", value: "3,2 s" }, { label: "Motor", value: "V8 4.0L Biturbo" }, { label: "Precio", value: "220.000 €" }]
  },
  {
    id: 27, slug: "porsche-911-turbo-s-2026", image: porsche911TurboS2026, date: "12 Marzo 2026", category: "Competición",
    title: "Porsche 911 Turbo S 2026: aún más brutal que nunca",
    excerpt: "El Porsche 911 Turbo S 2026 se perfila como una de las evoluciones más radicales del icono de Stuttgart. Mantiene la fórmula clásica del 911 pero la lleva a un nuevo nivel de prestaciones, tecnología y sofisticación.",
    readTime: "6 min",
    content: { intro: "El Porsche 911 Turbo S 2026 se perfila como una de las evoluciones más radicales del icono de Stuttgart. Mantiene la fórmula clásica del 911 –motor trasero, tracción integral y usabilidad diaria–, pero la lleva a un nuevo nivel de prestaciones, tecnología y sofisticación. Este modelo apunta directamente a quienes quieren un superdeportivo capaz de humillar a muchos hypercars, sin renunciar a la comodidad ni a la discreción de un gran turismo de uso diario.", sections: [
      { title: "Diseño exterior: agresividad bajo control", paragraphs: ["Estéticamente, el Porsche 911 Turbo S 2026 no rompe con la línea clásica del 911, pero introduce detalles que subrayan su carácter extremo. Los paragolpes son más esculpidos, con tomas de aire todavía más grandes para alimentar y refrigerar el sistema de sobrealimentación y los intercoolers. El alerón trasero activo crece en superficie y trabaja de forma más inteligente con la aerodinámica activa del frontal.", "Las vías ensanchadas, las llantas específicas de gran diámetro y los frenos carbocerámicos de serie dejan claro que estamos ante el tope de gama. Aun así, el coche conserva esa elegancia sobria típica de Porsche: nada es gratuito ni puramente estético, casi todo tiene una función aerodinámica o de refrigeración. Esto lo convierte en una opción perfecta para quien quiere prestaciones de hypercar sin el diseño excesivamente llamativo de otros superdeportivos."] },
      { title: "Interior: lujo, tecnología y enfoque al conductor", paragraphs: ["En el interior, el 911 Turbo S 2026 continúa la digitalización progresiva iniciada en las últimas generaciones. El cuadro de instrumentos combina relojes tradicionales inspirados en el tacómetro clásico con pantallas configurables que muestran información de rendimiento, modos de conducción y datos de telemetría básica.", "La consola central adopta una arquitectura limpia, con una gran pantalla táctil para el sistema de infoentretenimiento, compatible con las últimas funciones de conectividad y servicios en línea. Los asientos deportivos, con ajustes eléctricos múltiples, ofrecen el equilibrio perfecto entre sujeción lateral en conducción rápida y confort en viajes largos. Los materiales –cuero, Alcantara, inserciones metálicas y, opcionalmente, carbono– refuerzan la sensación de estar en un superdeportivo de lujo, no en un coche radical de circuito."] },
      { title: "Motor y prestaciones: el corazón de la brutalidad", paragraphs: ["El gran protagonista del Porsche 911 Turbo S 2026 sigue siendo su motor bóxer turboalimentado de seis cilindros. Aunque la arquitectura se mantiene, Porsche afina la sobrealimentación, la gestión electrónica y el sistema de admisión para lograr más potencia y, sobre todo, una entrega más llena en todo el rango de revoluciones.", "El resultado es un incremento de prestaciones respecto a su predecesor: aceleraciones todavía más rápidas, recuperaciones instantáneas y una sensación de empuje continuo que hace que las cifras oficiales parezcan conservadoras. Asociado a una caja de cambios automática de doble embrague de respuesta ultrarrápida y a un sistema de tracción integral muy inteligente, el Turbo S 2026 se convierte en una máquina de acelerar casi inigualable, tanto desde parado como en adelantamientos a alta velocidad."] },
      { title: "Chasis y comportamiento dinámico: eficacia sin drama", paragraphs: ["Uno de los grandes argumentos del 911 Turbo S frente a otros superdeportivos es su capacidad para poner la potencia en el suelo de forma eficaz en casi cualquier condición. La versión 2026 va un paso más allá gracias a una puesta a punto revisada de la suspensión activa, una gestión más fina de los diferenciales y una dirección todavía más precisa.", "Los modos de conducción permiten pasar de un gran turismo cómodo a un deportivo muy serio con apenas un giro del selector en el volante. En modo más radical, la respuesta del acelerador, la dureza de la suspensión y la gestión del cambio se orientan a exprimir al máximo las prestaciones, mientras que en los modos más suaves el coche se muestra sorprendentemente civilizado, incluso en ciudad o en autopista."] },
      { title: "Uso diario: el superdeportivo que puedes conducir cada día", paragraphs: ["El Porsche 911 Turbo S 2026 refuerza una idea clave de la marca: un superdeportivo puede ser utilizable a diario. El habitáculo sigue siendo relativamente práctico para dos personas, con buena visibilidad, asistencias a la conducción modernas y un maletero frontal suficiente para escapadas de fin de semana.", "El aislamiento acústico, ajustable en parte mediante válvulas de escape activas, permite disfrutar del sonido del motor cuando apetece y viajar en silencio cuando no. Esto, sumado a un consumo razonable para su nivel de prestaciones (especialmente en conducción normal), hace del Turbo S una opción muy atractiva para quienes no quieren un coche de colección estático, sino un deportivo que se usa de verdad."] }
    ] },
    specs: [{ label: "Potencia", value: "650+ CV" }, { label: "0-100 km/h", value: "2,6 s" }, { label: "Motor", value: "Bóxer 6 Biturbo" }, { label: "Tracción", value: "Integral AWD" }]
  }
];
