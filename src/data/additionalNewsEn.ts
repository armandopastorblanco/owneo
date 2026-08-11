export interface NewsArticleEn {
  excerpt: string;
  intro: string;
  sections: { title: string; paragraphs: string[] }[];
}

// English translations of the Spanish articles in additionalNews.ts, keyed by slug.
export const newsEn: Record<string, NewsArticleEn> = {
  "ferrari-296-speciale": {
    "excerpt": "Ferrari takes its hybrid V6 berlinetta to its maximum expression with the 296 Speciale. The combination of the twin-turbo V6 with the electric system reaches 880 hp, accompanied by extensive lightweighting and aerodynamic work. It is the sharpest and most high-performance version of the 296 family.",
    "intro": "With the 296 GTB, Ferrari demonstrated that a hybrid V6 could offer thrills worthy of the Prancing Horse. The Speciale version takes that concept and radicalises it, following in the footsteps of legendary names like the 458 Speciale, with a clear focus on pure performance and track driving. Every aspect of the 296 Speciale has been revised to extract the maximum: more power, less weight, and more aggressive aerodynamics make up a berlinetta designed for those seeking the most intense Ferrari experience.",
    "sections": [
      {
        "title": "Hybrid V6 taken to the limit",
        "paragraphs": [
          "The powertrain starts with the 3.0-litre 120-degree twin-turbo V6 combined with an electric motor, but in the Speciale, the combined power is elevated to 880 hp. The response, already exceptional in the 296 GTB, gains in immediacy thanks to improvements in electronic management and electric thrust. The eight-speed dual-clutch gearbox and rear-wheel drive complete the setup.",
          "The lightweighting work, using carbon fibre and specific components, improves the power-to-weight ratio and sharpens dynamic response, while revised aerodynamics increase downforce without penalising efficiency."
        ]
      },
      {
        "title": "Aerodynamics and track dynamics",
        "paragraphs": [
          "The 296 Speciale incorporates a specific aerodynamic package, with active and passive elements that increase downforce in corners and under braking. The suspension settings, control electronics, and tyres have been calibrated for track use, offering a superior level of precision and grip compared to the standard 296 GTB.",
          "The interior adopts a minimalist and sporty approach, with bucket seats, lightweight materials, and details that reinforce the model's racing vocation, without losing Maranello's characteristic sophistication."
        ]
      },
      {
        "title": "Price and exclusivity",
        "paragraphs": [
          "As a Speciale version of the 296 range, this model sits above the 296 GTB in terms of price and exclusivity, with production aimed at the most demanding clients. With it, Ferrari confirms that the hybrid era can coexist with the purest emotion of the Prancing Horse."
        ]
      }
    ]
  },
  "aston-martin-vanquish": {
    "excerpt": "Aston Martin revives one of its most legendary names for its new flagship. The Vanquish debuts a 5.2-litre twin-turbo V12 delivering 835 hp and 1,000 Nm, making it the most powerful production Aston Martin ever. A front-engined super GT with no direct rival.",
    "intro": "The name Vanquish evokes the very best of Aston Martin tradition, and the British marque reserves it for its most ambitious model. After years of a range populated by AMG-sourced V8s, Gaydon reasserts the V12 as the identity of its flagship, a gesture as emotional as it is strategic in an era of electrification. The new Vanquish is not just another evolution: it is a declaration that Aston Martin continues to believe in the twelve-cylinder, front-engined, rear-wheel-drive grand tourer in its purest and most extreme form.",
    "sections": [
      {
        "title": "An in-house developed twin-turbo V12",
        "paragraphs": [
          "At the heart of the Vanquish beats a 5.2-litre twin-turbo V12 in a front-mid position, developed internally by Aston Martin. With 835 hp at 6,500 rpm and 1,000 Nm of torque between 2,500 and 5,000 rpm, it is the most powerful engine ever fitted to a production Aston Martin.",
          "The power is delivered to the rear axle via an eight-speed automatic transmission with an electronic limited-slip differential. Performance lives up to the engine: 0 to 100 km/h in 3.3 seconds and a top speed of 345 km/h, figures that place the Vanquish among the fastest GTs in the world."
        ]
      },
      {
        "title": "Design: presence and grand tourer proportions",
        "paragraphs": [
          "The Vanquish exhibits classic front-engined GT proportions, with a long bonnet, a set-back cabin, and a muscular rear. The front grille, the largest ever seen on a production Aston Martin, dominates the front and reinforces the model's imposing character. Every line conveys the blend of elegance and aggression that defines the brand.",
          "The interior combines British craftsmanship with modern technology: hand-stitched leather, aluminium, and a new digital interface that modernises the cabin without losing the exclusive feel characteristic of a top-tier Aston Martin."
        ]
      },
      {
        "title": "Price and positioning",
        "paragraphs": [
          "As the new flagship of the range, the Vanquish sits at the pinnacle of Aston Martin's offering, with a price commensurate with its status as a limited-production V12 super GT. With it, Gaydon reasserts its place among the great manufacturers of luxury grand tourers."
        ]
      }
    ]
  },
  "maserati-gt2-stradale": {
    "excerpt": "Maserati brings its GT2 racing car to the road with the new GT2 Stradale. Based on the MC20, it adopts the 640 hp twin-turbo Nettuno V6, a remarkable weight reduction, and aerodynamics capable of generating up to 500 kg of downforce. It is the most radical road-legal Maserati ever produced.",
    "intro": "The MC20 brought Maserati back to the supercar segment with a brilliant product. The GT2 Stradale goes a step further: it takes the GT2 racing car as its base and homologates it for road use, offering customers an experience as close as possible to racing without sacrificing a licence plate. Every engineering decision in the GT2 Stradale pursues the same goal: track performance. Less weight, more downforce and a sharper response define this version, which crowns the Trident's sports range.",
    "sections": [
      {
        "title": "Nettuno: Modena's most advanced V6",
        "paragraphs": [
          "The heart of the GT2 Stradale is the 3.0-litre twin-turbo Nettuno V6, the same Formula 1-derived pre-chamber combustion technology engine that debuted in the MC20. Here it delivers 640 hp, ten more than the standard MC20, channelled exclusively to the rear axle via an eight-speed dual-clutch gearbox.",
          "The weight reduction — in the order of 60 kg compared to the MC20 — and the improved aerodynamics translate into a 0 to 100 km/h sprint in just 2.8 seconds. Active aerodynamics and specific appendages generate up to 500 kg of downforce at high speed, a figure unthinkable in a conventional GT."
        ]
      },
      {
        "title": "Lightweight construction and racing aerodynamics",
        "paragraphs": [
          "The GT2 Stradale extensively uses carbon fibre to reduce weight, both in the bodywork and interior components. The large rear wing, front splitter, and optimised diffuser form an aerodynamic package that directly references the racing car from which it is derived.",
          "The stripped-back, driver-focused cabin retains the essential elements of Maserati luxury but with a clear sporting emphasis: bucket seats, lightweight materials, and ergonomics designed for the track."
        ]
      },
      {
        "title": "Price and exclusivity",
        "paragraphs": [
          "The Maserati GT2 Stradale positions itself as the highest-performing and most exclusive model in the range, with a price that reflects its nature as a homologated racing-derived supercar. With it, Maserati reaffirms its return to the highest level of the segment."
        ]
      }
    ]
  },
  "lamborghini-urus-se-performante": {
    "excerpt": "Lamborghini takes its Super SUV to a new level with the Urus SE Performante. The combination of the twin-turbo V8 with a plug-in hybrid system elevates the power output to 812 hp, making it the most radical and performance-oriented version of the Urus. Sant'Agata Bolognese redefines what an SUV can be.",
    "intro": "The Urus has been a resounding success for Lamborghini since its launch, and the brand has not stopped pushing its potential. With the SE Performante variant, Sant'Agata Bolognese fuses plug-in electrification with the sportiest and sharpest focus of the range for the first time, resulting in the most powerful and capable Super SUV in its history. Unlike the conventional Urus SE, the Performante version prioritises dynamics over comfort. Lowered suspension, specific tuning, and a track-oriented setup transform this SUV into a tool capable of humiliating many pure sports cars.",
    "sections": [
      {
        "title": "Hybrid V8: 812 hp of electrified fury",
        "paragraphs": [
          "The powertrain combines the well-known 4.0-litre twin-turbo V8 with an electric motor powered by a 25.9 kWh battery. The result is a combined output of 812 hp and 1,000 Nm of torque, figures that represent a significant leap compared to previous versions. The PHEV system not only adds power but also instant response thanks to the electric boost.",
          "The performance figures are typical of a supercar: 0 to 100 km/h in 3.3 seconds, 0 to 200 km/h in 10.8 seconds, and a top speed of 312 km/h. All this with the possibility of driving in 100% electric mode in urban environments."
        ]
      },
      {
        "title": "Benchmark chassis and dynamics",
        "paragraphs": [
          "The Urus SE Performante features recalibrated chassis electronics, with roll control, four-wheel steering, and vectorial torque distribution that improves cornering agility. The reduced ride height and specific tyres complete a package designed to offer sensations that no rival Super SUV can match.",
          "Inside, the sporty materials, carbon fibre, and bucket seats reinforce the model's racing character, without sacrificing the luxury and spaciousness expected from a four-seater Lamborghini."
        ]
      },
      {
        "title": "Price and positioning",
        "paragraphs": [
          "The Urus SE Performante sits at the pinnacle of the Urus range, with a price commensurate with its exclusivity and performance. With it, Lamborghini reaffirms its leadership in the Super SUV segment, a market that the brand itself helped to create."
        ]
      }
    ]
  },
  "porsche-911-turbo-s-hibrido-992-2": {
    "excerpt": "Porsche takes the most significant step in the history of the 911 Turbo: electrification. The 992.2 update of the Turbo S introduces the competition-derived T-Hybrid system, with which the twin-turbo boxer engine reaches 711 hp. Never before has the Turbo S been so fast or so sophisticated.",
    "intro": "The 911 Turbo S has always represented the pinnacle of Stuttgart's production range, the point where daily usability and supercar performance meet. With the arrival of the 992.2 generation, Porsche introduces hybrid technology to this variant for the first time, a change many approached with apprehension and which finally confirms the brand's direction. Far from softening the Turbo S's character, electrification intensifies it. The T-Hybrid system does not seek electric range or maximum efficiency, but rather aims to completely eliminate turbo lag and multiply responsiveness. It is the same philosophy that Porsche applied to the GTS, now taken to the extreme.",
    "sections": [
      {
        "title": "T-Hybrid: electrification in the service of performance",
        "paragraphs": [
          "The heart of the new Turbo S remains a twin-turbo six-cylinder boxer engine, but it is now assisted by a high-voltage mild-hybrid system directly inherited from motorsport. An electric turbocharger virtually eliminates all lag, while an integrated electric motor provides instant thrust. Combined power reaches 711 hp, placing the Turbo S in territory previously reserved for pure supercars.",
          "The eight-speed PDK transmission and permanent all-wheel drive complete a package that makes the 911 Turbo S one of the most effective machines on the market in any condition. Acceleration figures drop below 2.5 seconds for the 0 to 100 km/h sprint."
        ]
      },
      {
        "title": "Evolutionary design, intact essence",
        "paragraphs": [
          "True to 911 tradition, the aesthetic evolution is restrained. New air intakes, redesigned headlights, and specific aerodynamic details distinguish the Turbo S from its lesser siblings. The adaptive rear spoiler and active aerodynamics manage downforce according to speed and the selected driving mode.",
          "Inside, Porsche maintains the balance between sportiness and refinement that characterises the Turbo S variant, with exclusive finishes, a digital display, and the latest generation instrumentation from the 992.2 family."
        ]
      },
      {
        "title": "Price and availability",
        "paragraphs": [
          "The new 911 Turbo S starts at a price close to 270,000 euros, a figure that can increase significantly with Porsche's extensive customisation catalogue. First deliveries are underway in key European markets."
        ]
      }
    ]
  },
  "ferrari-purosangue": {
    "excerpt": "Ferrari rewrites its own rules with the Purosangue, the first four-door, four-seater car in its history. Beneath its elevated body beats a 6.5-litre naturally aspirated V12 engine, centrally mounted at the front. Maranello refuses to call it an SUV: it defines it as the most versatile Ferrari ever created.",
    "intro": "For decades, the mere idea of a four-door Ferrari was unthinkable in Maranello. The Purosangue breaks that taboo, but does so without betraying the brand's essence. Instead of following the luxury SUV playbook, Ferrari has designed a car that combines the practicality of four real seats with the dynamics and feel of an authentic Prancing Horse sports car. «Purosangue means pure blood. It's not an SUV, it's a four-door Ferrari,» Maranello has reiterated since its unveiling, distancing itself from rivals such as the Lamborghini Urus or Aston Martin DBX. The philosophical difference is evident as soon as you lift the bonnet.",
    "sections": [
      {
        "title": "The Heart: A Counter-Current Naturally Aspirated V12",
        "paragraphs": [
          "While the rest of the segment opts for turbocharged V8 engines or hybrid systems, Ferrari has made the most radical decision possible: equipping the Purosangue with a 6.5-litre naturally aspirated V12. This engine, positioned centrally at the front for optimal weight distribution, delivers 725 hp at 7,750 rpm and 716 Nm of torque, with 80% available from just 2,100 rpm.",
          "The result is a linear power delivery and an engine note that no SUV on the market can match. The eight-speed dual-clutch gearbox is located at the rear axle, forming a transaxle layout that enhances dynamic balance. All-wheel drive, with a specific Ferrari front-drive system, engages only when necessary."
        ]
      },
      {
        "title": "Design: Height Yes, SUV Silhouette No",
        "paragraphs": [
          "Ferrari has worked obsessively to ensure the Purosangue does not resemble a conventional SUV. The silhouette, lower and more streamlined than its rivals, hides meticulously crafted proportions. The most distinctive feature is the rear doors with antagonistic opening — the so-called «suicide doors» — which facilitate access to the two individual rear seats without compromising a flowing roofline.",
          "At nearly 2,033 kg kerb weight, the Purosangue is no lightweight, but Ferrari has used carbon fibre for the roof and a mixed aluminium body to control the figures. The active Ferrari suspension controls roll and mass transfers with a precision that redefines what a vehicle of this height can offer in corners."
        ]
      },
      {
        "title": "A Four-Seater Interior for Real Use",
        "paragraphs": [
          "The cabin abandons the symbolic 2+2 configuration to offer four independent and truly usable seats. The dual-cockpit architecture places a dedicated screen in front of the passenger, while the driver has access to the latest generation Ferrari digital instrumentation. Materials combine leather, aluminium, and carbon fibre, with a boot that makes the Purosangue a truly usable Ferrari for daily driving."
        ]
      },
      {
        "title": "Price and Positioning",
        "paragraphs": [
          "The Ferrari Purosangue starts at a price close to 390,000 euros. Maranello has limited its production so that it does not exceed 20% of the brand's total volume, thus preserving exclusivity. The waiting list extends for years in most markets."
        ]
      }
    ]
  },
  "ferrari-f80-hypercar": {
    "excerpt": "Ferrari unveils the F80, successor to the LaFerrari with a 1,184 hp hybrid V6. Only 799 units at over 3.6 million euros. Deliveries commence early 2026.",
    "intro": "Ferrari has officially unveiled the F80, the sixth hypercar in the brand's history, following the 288 GTO, F40, F50, Enzo, and LaFerrari. With 1,184 hp derived from a 3.0-litre twin-turbo V6 combined with three electric motors, the F80 sets a new standard in performance and technology directly derived from Formula 1.",
    "sections": [
      {
        "title": "Competition Hybrid V6 Engine",
        "paragraphs": [
          "The heart of the F80 is a 3.0-litre twin-turbo V6 engine with a 120° architecture, directly derived from the 499P hypercar's power unit that conquered Le Mans. This engine alone generates 900 hp, complemented by three electric motors contributing an additional 284 hp. The result: 1,184 hp of combined power and a power-to-weight ratio of 1.27 kg/hp.",
          "The 2.28 kWh high-voltage battery uses cell technology developed by Ferrari in collaboration with its F1 team, capable of extremely rapid charge and discharge cycles. The e-turbo system (MGU-H) virtually eliminates turbo lag, providing instantaneous throttle response."
        ]
      },
      {
        "title": "Radical Design and Active Aerodynamics",
        "paragraphs": [
          "The F80 breaks new ground with a design signed by Flavio Manzoni that incorporates active aerodynamic elements on practically every surface. The triple-element rear diffuser, front S-Duct channels, and movable rear wing generate up to 1,000 kg of downforce at 250 km/h.",
          "The T1000 carbon fibre monocoque structure — the same material used in F1 chassis — allows for a dry weight of just 1,525 kg. The vertical-opening doors and wraparound cockpit create a unique driving experience."
        ]
      },
      {
        "title": "Performance and Exclusivity",
        "paragraphs": [
          "The F80 accelerates from 0 to 100 km/h in 2.15 seconds, from 0 to 200 km/h in under 5.75 seconds, and reaches a top speed of 350 km/h. At Fiorano, it has recorded a time of 1:15.3, the fastest ever achieved by a production Ferrari.",
          "Limited to 799 units with a base price of 3.6 million euros, the F80 is already completely sold out. Deliveries commence early 2026 from the Maranello plant."
        ]
      }
    ]
  },
  "aston-martin-valhalla": {
    "excerpt": "The Aston Martin Valhalla makes its dynamic public debut ahead of the Monaco GP. Twin-turbo V8 engine with 828 hp plus PHEV system, 999 units, deliveries in 2025.",
    "intro": "Aston Martin has chosen the unparalleled setting of the Monaco Grand Prix for the dynamic public debut of its highly anticipated Valhalla hybrid supercar. With a PHEV powertrain combining an 828 hp 4.0L twin-turbo V8 with an electric system to reach a total of 1,079 hp, the Valhalla marks Aston Martin's entry into the hypercar era.",
    "sections": [
      {
        "title": "Engine and Performance",
        "paragraphs": [
          "At the heart of the Valhalla is an internally developed 4.0-litre twin-turbo V8 with a flat-plane crank by Aston Martin, generating 828 hp. Complemented by a PHEV system with an electric motor on the rear axle, total power reaches 1,079 hp with a torque of 1,100 Nm.",
          "0-100 km/h is completed in 2.5 seconds, 0-200 km/h in less than 7 seconds, and the top speed is electronically limited to 350 km/h."
        ]
      },
      {
        "title": "Carbon Chassis and Aerodynamics",
        "paragraphs": [
          "The carbon fibre monocoque, developed with F1 technology, offers exceptional structural rigidity with a dry weight of less than 1,550 kg. Active aerodynamics generate over 600 kg of downforce at top speed, with Venturi channels under the car creating ground effect.",
          "Limited to 999 units with an estimated price of £800,000, deliveries are set to begin in the second half of 2025."
        ]
      }
    ]
  },
  "porsche-911-gt2-rs-2026": {
    "excerpt": "Porsche unveils the new 911 GT2 RS with a bi-turbo hybrid boxer engine producing over 750 hp. It is the fastest and most powerful 911 ever made. Price: €450,000.",
    "intro": "Porsche has officially presented the new 992.2 generation 911 GT2 RS, the most powerful and extreme model in the entire 911 range. With a 6-cylinder bi-turbo boxer engine assisted by a hybrid system, the GT2 RS exceeds 750 hp and promises to be the fastest 911 in history, both on the track and on the road.",
    "sections": [
      {
        "title": "The most powerful bi-turbo flat-six",
        "paragraphs": [
          "The 3.8-litre bi-turbo boxer engine has been extensively modified with new turbochargers, larger intercoolers, and entirely new electronic management. The electric assistance provides instant response and additional power during acceleration phases. The result exceeds 750 hp, making the GT2 RS the most powerful 911 in the model's 60-year history.",
          "The 7-speed PDK transmission has been reinforced to withstand the increased torque, and the rear-wheel-drive propulsion system remains true to GT2 RS tradition."
        ]
      },
      {
        "title": "Extreme aerodynamics",
        "paragraphs": [
          "The aerodynamic package is the most aggressive ever seen on a production 911, featuring a fixed double-plane rear wing, an extended carbon fibre front splitter, and a racing diffuser. Downforce exceeds 900 kg at maximum speed.",
          "Orders are now open with a price of 450,000 euros. Deliveries commence in June 2026 with limited production."
        ]
      }
    ]
  },
  "lamborghini-fenomeno": {
    "excerpt": "Lamborghini unveils the Fenomeno, an ultra-limited version of the Revuelto with 1,080 hp from its hybrid V12. Only 29 units under the Few Off programme.",
    "intro": "Lamborghini has unveiled the Fenomeno, the most powerful and exclusive model in its current history. Based on the Revuelto but taken to the extreme, the Fenomeno is part of the brand's 'Few Off' programme, with production limited to just 29 units. Its 6.5-litre hybrid V12 generates 1,080 hp, surpassing even the standard Revuelto.",
    "sections": [
      {
        "title": "Hybrid V12 pushed to the max",
        "paragraphs": [
          "The Fenomeno's 6.5-litre naturally aspirated V12 engine has been fine-tuned to deliver 835 hp, 15 hp more than the standard Revuelto. The three electric motors have been uprated to provide an additional 245 hp, increasing the total power output to 1,080 hp. Combined torque exceeds 1,000 Nm.",
          "The aerodynamic package includes a fixed racing spoiler, extended front splitter, and aggressive rear diffuser, all in exposed carbon fibre."
        ]
      },
      {
        "title": "Ultimate exclusivity",
        "paragraphs": [
          "With 29 units planned and an estimated price exceeding 600,000 euros, the Fenomeno is a collector's item from its inception. Each unit is personalised by Ad Personam with unique colour and finish options."
        ]
      }
    ]
  },
  "ferrari-elettrica": {
    "excerpt": "Ferrari unveils the chassis and production components of its first EV during Capital Markets Day. Four motors, 800V, and over 60 exclusive patents.",
    "intro": "In a historic event during its Capital Markets Day 2025, Ferrari has for the first time unveiled the chassis and production components of its first all-electric vehicle, dubbed Elettrica. Featuring an 800V architecture, four electric motors, and over 60 exclusive patents, the Elettrica represents the future of the Prancing Horse brand.",
    "sections": [
      {
        "title": "Revolutionary Electric Architecture",
        "paragraphs": [
          "The Ferrari Elettrica utilises an 800V architecture with four independent electric motors providing all-wheel drive and an ultra-precise torque vectoring system. The battery, developed in-house at the new Maranello plant, uses recycled aluminium for its casing and latest-generation cells.",
          "Ferrari has developed a patented sound system that generates an emotional acoustic experience without resorting to recordings of combustion engines. The sound is organically generated by the electric components of the powertrain."
        ]
      },
      {
        "title": "Design and Positioning",
        "paragraphs": [
          "Although Ferrari has not revealed the full exterior design, it has confirmed that the Elettrica will be a four-seater Grand Tourer competing in the ultra-luxury segment. The price is estimated at around 500,000 euros, with deliveries set to begin in 2026.",
          "This is the first step in Ferrari's multi-energy strategy, which encompasses internal combustion engines, PHEV hybrids, and now pure electric vehicles."
        ]
      }
    ]
  },
  "aston-martin-vanquish-volante": {
    "excerpt": "Aston Martin unveils the Vanquish Volante with an 824 hp twin-turbo V12 engine. It is the fastest front-engined convertible ever produced by the British marque.",
    "intro": "Celebrating 60 years of Volante production, Aston Martin has unveiled the Vanquish Volante, equipped with the powerful 5.2-litre twin-turbo V12 engine that generates 824 hp. It is Aston Martin's fastest ever front-engined convertible, capable of reaching 345 km/h.",
    "sections": [
      {
        "title": "824 hp Twin-Turbo V12",
        "paragraphs": [
          "The 5.2-litre twin-turbo V12 engine, the latest evolution of this iconic powertrain, delivers 824 hp and 1,000 Nm of torque. Combined with an 8-speed ZF automatic transmission and rear-wheel drive, the Vanquish Volante offers a purely hedonistic driving experience.",
          "Despite the reinforced structure required for a convertible, Aston Martin has achieved a weight of just 1,865 kg thanks to the extensive use of aluminium and carbon."
        ]
      },
      {
        "title": "Production and Price",
        "paragraphs": [
          "Production of the Vanquish Volante, combined with that of the coupé, is limited to fewer than 1,000 units annually. Deliveries begin in late 2025 with an estimated price exceeding 350,000 euros."
        ]
      }
    ]
  },
  "bentley-batur-convertible": {
    "excerpt": "Bentley unveils the Batur Convertible in Dubai, Mulliner's third coachbuilt model and one of the last Bentleys with the iconic 750 hp W12 engine.",
    "intro": "Bentley Motors has unveiled the Batur Convertible at an exclusive event in Dubai, Mulliner's third coachbuilt model of the modern era, crafted by the brand's personalisation division. This spectacular convertible is one of the last vehicles to feature the legendary 6.0-litre W12 engine, making each unit a piece of automotive history.",
    "sections": [
      {
        "title": "The Legendary W12 in its Final Evolution",
        "paragraphs": [
          "The 6.0-litre twin-turbo W12 engine generates 750 hp and 1,000 Nm of torque, in what is the most powerful version ever produced of this emblematic powertrain. The 8-speed dual-clutch transmission and all-wheel drive complete a drivetrain that combines raw power with absolute refinement.",
          "As a swansong for the W12, each Batur Convertible is delivered with a commemorative plaque signed by the Mulliner team."
        ]
      },
      {
        "title": "Craftsmanship Without Limits",
        "paragraphs": [
          "Each Batur Convertible is unique, personalised by the Mulliner design team in Crewe. Owners can choose from over 100 exterior colours and unlimited interior materials, including options such as sustainable wood, vintage leather, and hand-woven carbon fibre. Production is limited to 16 units."
        ]
      }
    ]
  },
  "mclaren-w1-primeras-entregas": {
    "excerpt": "McLaren begins deliveries of the W1 from its Woking plant. The 1,275 hp hypercar has already completed extensive testing at Silverstone with extraordinary results.",
    "intro": "McLaren has officially commenced deliveries of its W1 hypercar from the McLaren Production Centre in Woking, England. After months of exhaustive testing at circuits such as Silverstone and Spa-Francorchamps, the world's first 399 owners are beginning to receive their units of the most advanced McLaren ever built.",
    "sections": [
      {
        "title": "Silverstone Testing",
        "paragraphs": [
          "During final testing at Silverstone, the W1 has demonstrated capabilities that exceed McLaren's most optimistic expectations. Its Active Long Tail aerodynamic system and the 1,275 hp power of the hybrid V8 powertrain have enabled lap times that rival those of some GT3 racing cars.",
          "Each W1 undergoes more than 400 hours of hand assembly before being delivered to its owner."
        ]
      },
      {
        "title": "A Milestone for McLaren",
        "paragraphs": [
          "With all 399 units already sold at a price of 2.1 million euros, the W1 represents the absolute pinnacle of McLaren's capabilities and the beginning of a new era for the British brand."
        ]
      }
    ]
  },
  "rimac-nevera-r": {
    "excerpt": "Rimac introduces the Nevera R, an extreme version of the electric hypercar with 2,107 hp, a new 0-100 record of 1.74 seconds, and racing aerodynamics.",
    "intro": "Rimac Automobili has unveiled the Nevera R, the most extreme and powerful version of its electric hypercar. With 2,107 hp, reduced weight, and a racing aerodynamic package, the Nevera R sets new records in the world of high-performance electric vehicles.",
    "sections": [
      {
        "title": "Unprecedented Electric Power",
        "paragraphs": [
          "The Nevera R's four electric motors generate a combined output of 2,107 hp with an instantly available torque of 2,340 Nm. The 0-100 km/h sprint is completed in just 1.74 seconds, and the top speed exceeds 412 km/h. The 120 kWh battery offers a range of up to 490 km on the WLTP cycle.",
          "The fourth-generation R-AWTV (Rimac All-Wheel Torque Vectoring) system adjusts power distribution between all four wheels 100 times per second."
        ]
      },
      {
        "title": "Croatian Exclusivity",
        "paragraphs": [
          "Limited to 40 units with a price tag of 2.4 million euros, the Nevera R is the ultimate Rimac and an absolute benchmark in high-performance electrification."
        ]
      }
    ]
  },
  "porsche-taycan-turbo-gt": {
    "excerpt": "The Porsche Taycan Turbo GT with Weissach package sets a new record at Laguna Seca for electric saloons with 1,108 hp in overboost mode.",
    "intro": "The Porsche Taycan Turbo GT, equipped with the Weissach performance package, has set a new record for electric saloons at the Laguna Seca circuit. With 1,108 hp in overboost mode and a completely reconfigured chassis, the Taycan Turbo GT demonstrates that electrification is not incompatible with track performance.",
    "sections": [
      {
        "title": "Extreme Electric Performance",
        "paragraphs": [
          "The Taycan Turbo GT generates 1,108 hp in overboost mode with launch control, allowing for a 0-100 km/h sprint in 2.2 seconds. The 105 kWh Performance Plus battery with 800V architecture enables charging from 10% to 80% in just 18 minutes, while active thermal management maintains consistent performance lap after lap.",
          "The Weissach package reduces weight by an additional 70 kg through the extensive use of forged carbon and the removal of the rear seats, which are replaced by a structural brace."
        ]
      },
      {
        "title": "Price and Availability",
        "paragraphs": [
          "Priced at 230,000 euros and already available at Porsche dealerships, the Taycan Turbo GT is the ultimate proof of Porsche's ability to create exhilarating electric vehicles."
        ]
      }
    ]
  },
  "rolls-royce-spectre-black-badge": {
    "excerpt": "Rolls-Royce unveils the Spectre Black Badge with 612 hp, exclusive dark finishes, and the world's most luxurious electric driving experience.",
    "intro": "Rolls-Royce has unveiled the Spectre Black Badge, the most powerful and expressive version of its revolutionary electric coupé. With a power increase to 612 hp, exclusive black chrome finishes, and a more dynamic driving character, the Spectre Black Badge redefines electric luxury.",
    "sections": [
      {
        "title": "Power and Refinement",
        "paragraphs": [
          "The Spectre Black Badge's two electric motors have been recalibrated to deliver 612 hp and 900 Nm of torque. Acceleration from 0-100 km/h is completed in 4.2 seconds, with the smoothness and silence that only a Rolls-Royce can offer. The 102 kWh battery provides a range of up to 530 km.",
          "The Planar suspension has been stiffened by 10% to offer a more direct response, while the four-wheel steering provides surprising agility for a 2,975 kg car."
        ]
      },
      {
        "title": "Black Badge Aesthetics",
        "paragraphs": [
          "Exclusive finishes include the Spirit of Ecstasy in dark chrome, 23-inch gloss black wheels, and the emblematic hand-painted coach line. The price starts from 450,000 euros."
        ]
      }
    ]
  },
  "pagani-utopia-roadster": {
    "excerpt": "Pagani introduces the Roadster version of the Utopia with an 864 hp AMG V12 engine, limited to just 130 units and priced at 3.5 million euros.",
    "intro": "Horacio Pagani has unveiled the Roadster version of the Utopia, his latest hypercar that combines an 864 hp Mercedes-AMG twin-turbo V12 engine with craftsmanship that borders on perfection. Limited to 130 units, the Utopia Roadster is a celebration of design, engineering, and automotive passion.",
    "sections": [
      {
        "title": "Engine and Craftsmanship",
        "paragraphs": [
          "The 6.0-litre twin-turbo V12 developed by Mercedes-AMG generates 864 hp and 1,100 Nm of torque, transmitted to the rear wheels via a 7-speed Xtrac automated manual gearbox. Each engine is hand-signed by its responsible engineer in Affalterbach.",
          "Pagani's exclusive Carbo-Titanium HP62-G2 chassis combines carbon fibre and titanium to achieve extraordinary rigidity with minimal weight. The Roadster weighs just 1,280 kg dry."
        ]
      },
      {
        "title": "Italian Exclusivity",
        "paragraphs": [
          "With a price of 3.5 million euros and a waiting list extending until 2028, the Utopia Roadster is one of the most coveted objects in the automotive world. Each unit requires more than 600 hours of artisanal work at the San Cesario sul Panaro factory."
        ]
      }
    ]
  },
  "koenigsegg-jesko-entregas": {
    "excerpt": "Koenigsegg begins deliveries of the Jesko Absolut and Attack after years of development. 5.0L twin-turbo V8 engine with 1,600 hp and revolutionary LST transmission.",
    "intro": "After years of development and refinement, Koenigsegg has officially commenced customer deliveries of the Jesko. Available in Absolut (top speed) and Attack (track) variants, the Jesko is the most advanced Swedish hypercar ever created, featuring a 5.0-litre twin-turbo V8 engine capable of generating 1,600 hp with E85 fuel.",
    "sections": [
      {
        "title": "Engine and Revolutionary Transmission",
        "paragraphs": [
          "The Jesko's 5.0-litre twin-turbo V8 generates 1,280 hp on petrol and 1,600 hp on E85, making it one of the most powerful production engines in the world. The true technological marvel is the 9-speed Light Speed Transmission (LST) multi-clutch, capable of instantaneously shifting to any gear without passing through intermediate ones.",
          "The theoretical top speed of the Jesko Absolut exceeds 530 km/h, although Koenigsegg has yet to make an official record attempt."
        ]
      },
      {
        "title": "Handcrafted Production",
        "paragraphs": [
          "Only 125 units of the Jesko will be produced, split between the Absolut and Attack variants. Each unit is handcrafted at the Ängelholm plant in Sweden, with a base price of 2.8 million euros."
        ]
      }
    ]
  },
  "ford-gt-mk-iv": {
    "excerpt": "Ford unveils the GT Mk IV, a track-exclusive version of the Ford GT with an EcoBoost V6 engine producing over 800 hp, with only 67 units manufactured.",
    "intro": "Ford has delivered the final units of the GT Mk IV, the track-exclusive version of the Ford GT that pays homage to the legendary GT40 Mk IV which dominated the 24 Hours of Le Mans in 1967. Featuring a 3.5L EcoBoost V6 engine boosted to over 800 hp and a completely revised chassis, the Mk IV is the most extreme production Ford ever created.",
    "sections": [
      {
        "title": "Competition Engine and Chassis",
        "paragraphs": [
          "The 3.5-litre twin-turbo EcoBoost V6 engine has been significantly boosted compared to the road-going GT, exceeding 800 hp. The tubular steel chassis replaces the carbon monocoque of the road GT, allowing for a more extreme configuration with anchoring points for racing harnesses and FIA safety systems.",
          "Only 67 units have been produced, a number that commemorates the 1967 Le Mans victory year. The price: 1.7 million dollars."
        ]
      }
    ]
  },
  "gordon-murray-t50": {
    "excerpt": "Gordon Murray Automotive begins deliveries of the T.50, the 663 hp supercar with a rear fan and manual transmission that weighs only 986 kg.",
    "intro": "Gordon Murray Automotive has commenced deliveries of the T.50, the supercar many consider the true spiritual successor to the legendary McLaren F1. Designed by Gordon Murray, the father of the original F1, the T.50 prioritises extreme lightness, mechanical purity, and driver connection above raw power figures.",
    "sections": [
      {
        "title": "Philosophy of Extreme Lightness",
        "paragraphs": [
          "Weighing just 986 kg dry, the T.50 is lighter than many modern compact cars. Its naturally aspirated 3.9-litre V12 engine, developed by Cosworth, generates 663 hp at 11,500 rpm — the highest revving production engine currently available. The transmission is a 6-speed manual, with no automatic option.",
          "The 400 mm diameter rear fan, inspired by the F1 Brabham BT46B, actively manages aerodynamic flow to increase downforce or reduce drag depending on driving conditions."
        ]
      },
      {
        "title": "British Craftsmanship",
        "paragraphs": [
          "Only 100 units of the T.50 will be produced at the new Dunsfold, Surrey, factory, priced at 3.1 million euros. Each car requires more than 300 hours of manual assembly."
        ]
      }
    ]
  },
  "maserati-mc20-icona": {
    "excerpt": "Maserati introduces the MC20 Icona, a limited edition of 50 units with an enhanced 630 hp Nettuno V6 engine and finishes inspired by historic Maserati racing cars.",
    "intro": "Maserati has unveiled the MC20 Icona, a special edition limited to 50 units that celebrates the Trident brand's rich racing heritage. The 3.0-litre twin-turbo Nettuno V6 engine has been boosted to 630 hp, and each example features finishes inspired by legendary Maserati racing cars.",
    "sections": [
      {
        "title": "Enhanced Nettuno Engine",
        "paragraphs": [
          "The 3.0-litre twin-turbo Nettuno V6 engine, with its innovative pre-chamber combustion, has been optimised to deliver 630 hp, an increase of 11 hp over the standard MC20. Torque also rises to 740 Nm. The 8-speed dual-clutch transmission remains, but with more aggressive specific calibrations.",
          "Each MC20 Icona is offered in one of five historic colour schemes, including Rosso Trofeo, Bianco Eldorado, and Azzurro Argentina, all inspired by Maserati's most iconic racing cars."
        ]
      },
      {
        "title": "Italian Exclusivity",
        "paragraphs": [
          "Limited to 50 units with a price of 275,000 euros, the MC20 Icona is a collector's item for enthusiasts of the Trident brand."
        ]
      }
    ]
  },
  "lotus-emeya-r": {
    "excerpt": "Lotus unveils the Emeya R, the sportiest version of its electric saloon with 918 hp, active suspension, and a Track mode that transforms the experience.",
    "intro": "Lotus has unveiled the Emeya R, the most radical version of its high-performance electric saloon. With 918 hp, fully active suspension, and a specific Track mode, the Emeya R proves that Lotus has not forgotten its sporting DNA in the transition towards electrification.",
    "sections": [
      {
        "title": "Performance and Technology",
        "paragraphs": [
          "The Emeya R's two electric motors generate 918 hp and 985 Nm of instant torque, enabling a 0-100 km/h sprint in 2.68 seconds. The 102 kWh battery with 800V architecture offers ultra-fast charging at 350 kW and a range of 480 km.",
          "The active air-spring suspension with CDC adaptive dampers scans the road 1,000 times per second, adjusting each wheel independently. In Track mode, the Emeya R lowers by 15 mm, stiffens the suspension, and activates maximum engine response."
        ]
      },
      {
        "title": "Competitive Pricing",
        "paragraphs": [
          "With a price tag of 120,000 euros, the Emeya R competes directly with the Porsche Taycan Turbo GT and the BMW i5 M60, offering superior performance at a more accessible price."
        ]
      }
    ]
  },
  "bmw-xm-label-red": {
    "excerpt": "BMW updates the XM Label Red with dynamic enhancements, new finishes, and the same 748 hp hybrid V8 that makes it the most powerful BMW in history.",
    "intro": "BMW M has introduced a significant update for the XM Label Red, the most powerful and exclusive SUV ever produced by BMW M's Munich division. With 748 hp from its 4.4-litre twin-turbo plug-in hybrid V8, the XM Label Red continues to be the most powerful BMW ever homologated for road use, now featuring profound improvements in driving dynamics, recalibrated chassis electronics, and new personalisation options through the BMW Individual Manufaktur programme. The philosophy behind the Label Red remains intact: to offer a large SUV capable of competing in pure performance with the most exclusive super sports cars on the market, without sacrificing the comfort, interior space, and versatility characteristic of a luxury family vehicle. The 2026 update responds to criticism received after the initial launch and demonstrates that BMW is willing to invest what is necessary for the XM to meet the expectations of the most demanding segment of the premium market.",
    "sections": [
      {
        "title": "748 hp hybrid V8: brute force at the service of luxury",
        "paragraphs": [
          "The XM Label Red's powertrain combines the M division's 4.4-litre S68 twin-turbo V8 with a synchronous electric motor integrated into the ZF eight-speed automatic transmission. The combined power of 748 hp and a maximum torque of 1,000 Nm available from 1,600 rpm allow for a 0 to 100 km/h sprint in just 3.8 seconds, truly extraordinary figures for an SUV that comfortably exceeds 2.7 tonnes unladen weight. The 25.7 kWh lithium-ion battery allows for an all-electric range of up to 80 kilometres in the WLTP cycle, sufficient for daily urban commutes without resorting to the combustion engine.",
          "The main novelty of the 2026 update lies in the new calibration of the powertrain control unit, which improves the transition between electric, hybrid, and sport modes, practically imperceptible to the driver. The throttle response in Sport Plus mode has become more aggressive, with a stepped torque delivery reminiscent of large-displacement naturally aspirated engines. The sound of the V8, amplified by an active quad-outlet exhaust system, has been re-orchestrated by BMW M acoustic engineers to deliver a deeper and more emotional soundtrack, especially between 4,000 and 7,000 rpm where the engine expresses its full character."
        ]
      },
      {
        "title": "Chassis, suspension and refined driving dynamics",
        "paragraphs": [
          "The M Professional adaptive suspension has been completely recalibrated to improve cornering control without compromising ride comfort in daily use. New electric anti-roll bars, derived directly from the M5 Saloon, virtually eliminate body roll in dynamic driving and allow the XM to behave with agility uncharacteristic of its dimensions. Four-wheel steering, which features new software, improves manoeuvrability at low speeds and provides exceptional stability on motorways at high speeds, where the SUV feels planted and predictable.",
          "The M Compound carbon ceramic brakes are now standard on the Label Red version, with 420-millimetre front discs and specific six-piston calipers. The M xDrive all-wheel-drive system allows precise torque distribution between all four tyres and, in 2WD mode, sends 100% of the power to the rear axle for more experienced drivers seeking a more radical experience. Michelin Pilot Sport 5 tyres specifically developed for the XM complete a dynamic package that places the Label Red on par with the most capable sports SUVs on the market, including the Lamborghini Urus Performante and the Aston Martin DBX 707."
        ]
      },
      {
        "title": "M exclusivity and commercial positioning",
        "paragraphs": [
          "The BMW XM Label Red is offered with a starting price of 199,000 euros in the European market, a figure that positions it above the standard XM but below its direct premium rivals. Production is limited and exclusively carried out at the Spartanburg plant in South Carolina, the same factory that assembles all X5, X6, and X7 models destined for the global market. Each Label Red receives extended personalisation treatment through the BMW Individual Manufaktur programme, with an extended range of colours that includes model-specific Frozen matte finishes and exclusive two-tone combinations reminiscent of the brand's historic racing liveries.",
          "The interior, completely upholstered in two-tone Merino leather with Toro Red contrast stitching and a perforated Alcantara headlining with integrated ambient lighting, clearly sets it apart from any other BMW on the market. The numbered identification plate on the centre console and the test driver's signature detail on the driver's headrest reinforce the unique nature of each unit. The first deliveries of the updated version will begin in March 2026, and BMW anticipates demand concentrated in the United States, the Middle East, and Southeast Asia, markets where the XM has found a better reception compared to the initial scepticism of the European press."
        ]
      }
    ]
  },
  "mercedes-amg-gt-63-pro": {
    "excerpt": "Mercedes-AMG unveils the GT 63 PRO, a track version of the AMG GT with a 612 hp biturbo V8 engine, F1-derived aerodynamics, and an advanced cooling system.",
    "intro": "Mercedes-AMG has unveiled the GT 63 PRO, a track-focused version of the new AMG GT, incorporating technology directly transferred from Mercedes' Formula 1 programme. With 612 hp from its 4.0-litre biturbo V8 engine and an entirely new aerodynamic package developed in the Brackley wind tunnel, the GT 63 PRO positions itself as the most extreme AMG GT ever produced for road-legal track use. Affalterbach's strategy is clear: to offer the most demanding customers a GT version capable of competing with the Porsche 911 GT3 and the new Aston Martin Vantage AMR on track days, without sacrificing the ability to drive on open roads thanks to full European homologation. The project, personally overseen by Sebastian Vettel as programme advisor, marks a strategic shift for AMG towards more radical products focused on pure driving experience, moving away from the mainstream trend that had characterised the brand over the last decade.",
    "sections": [
      {
        "title": "Biturbo V8 optimised for intensive track use",
        "paragraphs": [
          "The M177 4.0-litre biturbo V8 engine has undergone extensive optimisation with larger turbochargers derived from the AMG GT Black Series, an improved cooling system featuring two additional radiators in the front wheel arches, and bespoke electronic management for track use developed in collaboration with HWA Racelab. The result is an output of 612 hp at 6,500 rpm and a constant peak torque of 850 Nm between 2,500 and 5,000 rpm, with a noticeably sharper throttle response than the standard GT 63 S. The nine-speed MCT transmission has been completely recalibrated to reduce shift times by 20%, thanks to new software that anticipates the next gear based on throttle opening and brake pressure.",
          "The cooling system, arguably the car's most innovative aspect, includes an independent water circuit for engine oil and transmission, inspired by the technology used in the <a href=\"/noticias/mercedes-amg-one-actualizacion\" class=\"text-[#bda095] hover:underline\">AMG ONE</a> hypercar. This circuit allows for stable temperatures during prolonged track sessions without the need to lift off the accelerator to cool the components, a classic problem for AMGs in extreme conditions. The intake system, with additional bonnet vents fitted with washable filters, improves airflow by 15% compared to the standard model and is particularly effective on high-altitude circuits where air density is lower."
        ]
      },
      {
        "title": "Formula 1-inspired aerodynamics",
        "paragraphs": [
          "The GT 63 PRO's aerodynamic package is, without question, the most sophisticated ever seen on a road-going AMG. It includes a 1,450-millimetre wide fixed carbon fibre rear wing with a manually adjustable three-position upper flap, dual-element front dive planes, an extended carbon front splitter, and a dual-level rear diffuser developed in collaboration with the Mercedes-AMG Petronas F1 team. Total downforce increases by a notable 35% compared to the standard GT at 250 km/h, while aerodynamic drag is slightly reduced thanks to new active management of the front air intakes which close when cooling is not required.",
          "The rear wheel arches have been widened by 30 millimetres to accommodate 325/30 R20 Michelin Pilot Sport Cup 2 R tyres, while 285/30 R20 tyres specifically developed for the model are fitted to the front axle. AMG ceramic brakes, measuring 420 millimetres at the front axle and 390 millimetres at the rear, with six-piston calipers, guarantee unalterable braking performance session after session. The price of the AMG GT 63 PRO has been set at 220,000 euros, a competitive figure against its direct rivals, and it will be available at European dealerships from January 2026 with an estimated annual production of around 800 units."
        ]
      }
    ]
  },
  "porsche-911-turbo-s-2026": {
    "excerpt": "The 2026 Porsche 911 Turbo S is shaping up to be one of the most radical evolutions of Stuttgart's icon. It maintains the classic 911 formula but elevates it to a new level of performance, technology, and sophistication.",
    "intro": "The 2026 Porsche 911 Turbo S is shaping up to be one of the most radical and comprehensive evolutions of Stuttgart's iconic sports car. The new generation fully retains the classic 911 formula — rear engine, intelligent all-wheel drive, and genuine everyday usability — but takes it to an unprecedented level of performance, technology, and sophistication. This model directly targets those who want a supercar capable of humbling many contemporary hypercars, without sacrificing comfort or the discreet character typical of a grand tourer suitable for daily use. It is, in essence, the latest reinterpretation of the 911 formula that Porsche has been perfecting since 1963, and in its Turbo S version, it now reaches a level of refinement that many analysts consider unsurpassed. For the first time in the model's history, the Turbo S incorporates a mild-hybrid system that not only provides additional performance but also a notable improvement in efficiency and immediate engine response at any rpm.",
    "sections": [
      {
        "title": "Exterior Design: Aggression Under Control",
        "paragraphs": [
          "Aesthetically, the 2026 Porsche 911 Turbo S does not break with the classic 911 line but rather elevates it to its maximum expression, introducing details that underscore its extreme character without resorting to exhibitionism. The front and rear bumpers are more sculpted than ever, with significantly larger air intakes to feed and cool the supercharging system, the side intercoolers, and the new additional radiators of the hybrid system. The active rear wing increases in surface area to 0.38 square metres and works more intelligently with the active aerodynamics of the front, generating optimal aerodynamic balance in every driving condition.",
          "The 22-millimetre wider tracks, new 20 and 21-inch Y-Spoke forged wheels, and standard PCCB carbon-ceramic brakes with 420-millimetre discs make it clear that this is the absolute pinnacle of the range. Even so, the car retains that understated elegance so typical of Porsche: every visual detail has an aerodynamic or cooling function, with no purely decorative elements. This makes it an ideal option for those seeking hypercar performance without the overly flashy design that characterises other supercars in its segment, whether for personal taste or the desire to remain inconspicuous in urban environments."
        ]
      },
      {
        "title": "Interior: Luxury, Technology, and Driver Focus",
        "paragraphs": [
          "Inside, the 911 Turbo S 2026 continues the progressive digitalisation initiated in recent generations, but without sacrificing the analogue heritage so valued by the brand's most purist fans. The instrument cluster combines traditional dials directly inspired by the classic tachometer of the first 911s with configurable high-resolution screens that display performance information, driving modes, real-time circuit maps, and basic telemetry data for track days. The new large-format head-up display, projected onto the windscreen, allows the driver to keep their eyes on the road without missing critical information.",
          "The centre console adopts a clean and minimalist architecture, with a large 12.6-inch touchscreen for the PCM 7.0 infotainment system, compatible with the latest wireless connectivity functions, Apple CarPlay, and Porsche Connect online services. The adaptive Sports Seats Plus with carbon fibre backrests, 18-way electric adjustments, and memory, offer the perfect balance between extreme lateral support during spirited driving and comfort on long journeys. The materials — naturally tanned leather, perforated Alcantara, brushed aluminium inserts, and, optionally, forged carbon fibre — reinforce the feeling of being in a luxury supercar rather than a radical track-focused machine."
        ]
      },
      {
        "title": "Engine and Performance: The Heart of the Brutality",
        "paragraphs": [
          "The main protagonist of the 2026 Porsche 911 Turbo S remains its turbocharged six-cylinder 3.8-litre boxer engine, although the architecture stays true to tradition. Porsche has refined the supercharging with two new VTG variable geometry turbos, redesigned the complete electronic management, and revised the intake system to achieve more power and, above all, a fuller and more progressive delivery across the entire rev range. The new 60 hp electric motor integrated into the PDK transmission provides immediate additional torque during the initial moments of acceleration, practically eliminating the already minimal turbo lag that was still perceptible in the previous generation.",
          "The result is a notable increase in performance compared to its predecessor: even faster acceleration with 0 to 100 km/h in 2.6 seconds, instant responsiveness at any rpm, and a sensation of continuous thrust that makes the official figures seem conservative on paper. Paired with an ultra-fast-reacting eight-speed PDK dual-clutch automatic gearbox and a highly refined Porsche Traction Management active all-wheel-drive system, the 2026 Turbo S becomes an almost unrivalled accelerating machine, both from a standstill and during high-speed overtakes on unrestricted German motorways."
        ]
      },
      {
        "title": "Chassis and Dynamic Behaviour: Efficiency Without Drama",
        "paragraphs": [
          "One of the great historical arguments for the 911 Turbo S against other supercars is its ability to put power down with absolute efficiency in almost any weather and grip conditions. The 2026 version goes a step further thanks to a revised setup of the PASM Sport active suspension with new dual-valve dampers, finer management of the front and rear PTV Plus differentials, and an electric steering system with variable assistance that is even more precise and communicative than the previous generation. The four-wheel steering system has become more sophisticated in its programming, improving both agility in tight corners and stability in high-speed, large-radius curves.",
          "The driving modes allow a transformation from a comfortable grand tourer to an extreme sports car with just a turn of the selector on the GT sports steering wheel. In the most radical Sport Plus mode, throttle response, suspension stiffness, PDK gear management, and steering assistance are geared towards extracting maximum performance, while in the softer Normal and Wet modes, the car proves surprisingly civilised, even in urban use or on the motorway at cruising speed. The latest generation driving assistance systems include predictive InnoDrive, lane change assist, and speed limit recognition, demonstrating that Porsche can integrate advanced technology without diluting the characteristic 911 driving experience."
        ]
      }
    ]
  },
  "bugatti-tourbillon-lanzamiento": {
    "excerpt": "Molsheim lifts the veil on the Chiron's successor. The Tourbillon combines an 8.3-litre naturally aspirated V16 with three electric motors to achieve 1,800 hp. Only 250 units at 3.8 million euros.",
    "intro": "Bugatti inaugurates a new era with the Tourbillon, the first model entirely conceived under the direction of Mate Rimac. The Alsatian brand has opted for a completely novel architecture: a naturally aspirated V16 developed alongside Cosworth, complemented by three electric motors, capable of delivering 1,800 hp without sacrificing the emotional purity of a naturally aspirated engine. A declaration of principles that marks the beginning of the next chapter in Molsheim.",
    "sections": [
      {
        "title": "The rebirth of natural aspiration: 8.3-litre V16",
        "paragraphs": [
          "The heart of the Tourbillon is an 8.3-litre naturally aspirated V16 with a 90° V-bank, capable of revving up to 9,000 rpm and delivering 1,000 hp on its own. Cosworth developed this unit from scratch, foregoing turbochargers to return to Bugatti the immediate response and organic sound that characterised the great sports cars of the 20th century.",
          "Three electric motors (two front and one integrated into the 8-speed DCT transmission) provide an additional 800 hp, powered by a 25 kWh structural battery with 800-volt technology. The combined system raises total power to 1,800 hp with torque exceeding 1,600 Nm, and allows for up to 60 km of 100% electric range."
        ]
      },
      {
        "title": "Analogue design in the digital age",
        "paragraphs": [
          "The Tourbillon's interior breaks with the general trend in the industry: instead of giant screens, Bugatti has collaborated with Swiss watchmakers to create an entirely mechanical instrument cluster, machined from titanium and sapphire, with over 600 components reminiscent of the complication of a high-end tourbillon watch.",
          "The dihedral doors open upwards to facilitate access, and the carbon fibre body integrates active aerodynamic elements that deploy at high speed. The silhouette maintains Bugatti's visual signature – central line, horseshoe grille, optional two-tone finish – but introduces more compact and athletic proportions."
        ]
      },
      {
        "title": "Performance and exclusivity",
        "paragraphs": [
          "The Tourbillon accelerates from 0 to 100 km/h in 2.0 seconds, reaches 300 km/h in under 10 seconds, and rockets to a top speed of 445 km/h with the Speed Key. Figures that position it as one of the fastest street-legal cars ever homologated.",
          "Bugatti will produce only 250 units starting in 2026, with an entry price of 3.8 million euros before taxes and options. The waiting list is already closed: each future owner has been personally selected by the brand to preserve the exclusive nature of the programme."
        ]
      }
    ]
  },
  "lamborghini-revuelto-spider": {
    "excerpt": "Sant'Agata Bolognese officially delivers the first Revuelto Spider to a European customer. 1,015 hp, retractable carbon roof and the ultimate naturally aspirated V12 in the open air. An unfiltered sensory experience.",
    "intro": "Lamborghini opens a new chapter for its flagship with the Spider version of the Revuelto. The first example was delivered this month to a German collector during a private ceremony at the Sant'Agata Bolognese factory. With a combined 1,015 hp, the Revuelto Spider is the most powerful convertible ever produced by the Italian marque, and also the most laden with symbolism: it is probably the last Lamborghini with a naturally aspirated V12 engine capable of breathing the open air.",
    "sections": [
      {
        "title": "825 hp naturally aspirated V12 with electric assistance",
        "paragraphs": [
          "The central rear engine retains the 6.5-litre 60° V12 architecture of the Revuelto coupé: 825 hp at 9,250 rpm, a redline that still raises goosebumps and a sound that has been specially tuned to be appreciated with the roof open. Three electric motors add an additional 190 hp, bringing the total power to 1,015 hp.",
          "The reinforced structure to compensate for the absence of a roof adds barely 95 kg compared to the coupé. The entirely carbon fibre monocoque guarantees the torsional rigidity necessary for dynamic behaviour to remain that of a benchmark supercar."
        ]
      },
      {
        "title": "Carbon roof and craftsmanship",
        "paragraphs": [
          "The rigid roof consists of two carbon fibre panels that are stored in the front in just 12 seconds, at speeds of up to 50 km/h. With the roof closed, the aerodynamic coefficient remains practically intact compared to the coupé.",
          "The first customer opted for a Verde Selvans livery with Nero Cosmos leather interiors and green thread stitching. The Ad Personam programme allowed for more than 40 details to be personalised, from the embroidery on the headrests to the owner's signature engraved on the sill."
        ]
      }
    ]
  },
  "ferrari-12cilindri-spider-circuito": {
    "excerpt": "Maranello's latest convertible has completed its first official laps at the Fiorano circuit. Retaining the naturally aspirated 6.5-litre V12 engine with 830 hp, the 12Cilindri Spider promises a unique experience.",
    "intro": "Ferrari has officially unveiled the 12Cilindri Spider in a private session at the Fiorano circuit, with international journalists invited to witness the new convertible's first dynamic laps. The Spider version fully maintains the spirit of the coupé introduced in 2024: a naturally aspirated 6.5-litre V12 engine with 830 hp, positioned front-mid and paired with an 8-speed DCT transmission.",
    "sections": [
      {
        "title": "Uncompromising Naturally Aspirated V12",
        "paragraphs": [
          "The F140HD engine delivers 830 hp at 9,250 rpm and 678 Nm of torque. Ferrari has meticulously worked on the breathing, intake ducts, and exhaust so that the characteristic sound of Maranello's twelve cylinders can be enjoyed in all its purity with the roof down.",
          "Performance remains practically unchanged compared to the coupé: 0 to 100 km/h in 2.9 seconds, 0 to 200 km/h in less than 8 seconds, and a top speed exceeding 340 km/h. An absolute rarity among current convertibles, almost all of which are committed to downsizing and hybridisation."
        ]
      },
      {
        "title": "Aluminium Retractable Roof",
        "paragraphs": [
          "The retractable hardtop, made entirely of aluminium, folds in 14 seconds and can be operated even while driving at speeds up to 45 km/h. Once folded, it completely frees up the cabin while maintaining a perfectly usable boot for weekend getaways.",
          "The interior adopts the coupé's neo-classical philosophy, with two digital screens for the driver and passenger, physical controls on the steering wheel, and premium materials applied with Maranello's usual mastery. The price is around 425,000 euros, and deliveries are expected to begin in late 2026."
        ]
      }
    ]
  },
  "porsche-911-gt3-rs-2026-especificaciones": {
    "excerpt": "Porsche updates the 911 GT3 RS with a revised aerodynamic package, recalibrated suspension, and more permissive electronics for track use. The 4.0-litre naturally aspirated boxer engine delivers 518 hp.",
    "intro": "The definitive specifications for the 2026 model are pending official confirmation from Porsche. Based on the current official figures for the 911 GT3 RS, the 4.0-litre naturally aspirated boxer engine delivers 518 hp. The 2026 evolution would focus on three areas: active aerodynamics, chassis electronics, and a fine-tuning of the naturally aspirated flat-six.",
    "sections": [
      {
        "title": "Naturally Aspirated Boxer Engine Tuned to Perfection",
        "paragraphs": [
          "The 4.0-litre naturally aspirated boxer engine retains its essence with refined electronic management, a revised intake system, and a lightened titanium exhaust. Current official figures place power at 518 hp at 8,500 rpm, with the redline at 9,000 rpm, and a maximum torque of 465 Nm. The definitive specifications for the 2026 model are pending official confirmation from Porsche.",
          "Paired with a 7-speed PDK gearbox specifically programmed for track use, the GT3 RS achieves 0 to 100 km/h in 3.2 seconds and a top speed of around 296 km/h, with a kerb weight of 1,450 kg."
        ]
      },
      {
        "title": "LMDh-Inspired Active Aerodynamics",
        "paragraphs": [
          "The rear wing adopts a two-position DRS system that is automatically managed based on the driving mode, improving both top speed and downforce in corners. Maximum downforce exceeds 860 kg at 285 km/h, a benchmark figure in its class.",
          "The optional Weissach package (estimated at 30,000 euros) replaces numerous elements with exposed carbon fibre, including the roof, front bonnet, roll cage, and wing mirrors. It allows for a reduction of several additional kilograms and unlocks specific KW suspension adjustments for intensive track use."
        ]
      }
    ]
  },
  "mclaren-w1-spider-confirmacion": {
    "excerpt": "Rumours point to a Spider version of the W1, which would retain the 1,275 hp of the V8 hybrid and add a manually removable carbon roof. McLaren has not confirmed official production figures or pricing.",
    "intro": "⚠️ The Spider version of the <a href=\"/noticias/mclaren-w1\" class=\"text-[#bda095] hover:underline\">McLaren W1</a> has not been officially confirmed by McLaren as of the publication date. According to initial rumours from within Woking, the British marque is reportedly working on an open-top variant of the hypercar that succeeds the P1 and Speedtail. Available information suggests a possible priority reservation for selected original W1 programme clients, with deliveries commencing in late 2027 once coupé production is complete.",
    "sections": [
      {
        "title": "1,275 hp V8 Hybrid Intact",
        "paragraphs": [
          "According to rumours, the powertrain of the W1 Spider would completely retain that of the coupé: a newly designed 4.0-litre twin-turbo V8, assisted by a radial electric motor integrated into the transmission, for a combined output of 1,275 hp and 1,340 Nm of torque. The 1.4 kWh battery would allow for 2 km of electric range during low-speed manoeuvres.",
          "Despite the structural reinforcement required for the absence of a roof, the weight would barely increase compared to the coupé, thanks to the Aerocell carbon monocoque developed to withstand the W1's extreme aerodynamic loads without needing additional bars."
        ]
      },
      {
        "title": "Removable Carbon Roof",
        "paragraphs": [
          "Unlike other hypercars, McLaren reportedly opted for a manually removable rigid carbon fibre roof, which can be stored in the front. This solution would preserve aesthetic purity and reduce weight compared to a motorised folding roof.",
          "The Dihedral doors with upward opening would remain, and the Active Long Tail active aerodynamics would function exactly as in the coupé, generating up to 1,000 kg of downforce at 280 km/h. Limited production is speculated, although McLaren has not confirmed official figures."
        ]
      }
    ]
  },
  "aston-martin-vantage-gt3-2026": {
    "excerpt": "Aston Martin Racing unveils the new Vantage GT3 homologated for the 2026 GT racing season. Twin-turbo V8 derived from the road model, optimised aerodynamics, and a new competition electronics package.",
    "intro": "Aston Martin Racing has unveiled the new 2026 Vantage GT3, successor to one of the most successful GT3s of recent years. The new generation arrives with a profound evolution of the aerodynamics, new control electronics, and a refined twin-turbo V8 designed to overcome the complex Balance of Performance regulations in force in the World Endurance Championship and IMSA.",
    "sections": [
      {
        "title": "Optimised Mercedes-AMG-derived twin-turbo V8",
        "paragraphs": [
          "The engine remains the 4.0-litre twin-turbo V8 developed in collaboration with Mercedes-AMG, but the engine management electronics are completely new. The new Vantage GT3 delivers close to 590 hp (variable depending on BoP) with a much more linear torque delivery, particularly useful in Pro-Am categories where smooth driving is a priority.",
          "The 6-speed Xtrac sequential gearbox, oil-cooled and paddle-operated, has been reinforced to withstand the high loads of the 24 Hours of Le Mans, the flagship event of Aston Martin Racing's official programme."
        ]
      },
      {
        "title": "New-generation chassis and aerodynamics",
        "paragraphs": [
          "The monocoque comes from the road-going Vantage but receives an FIA safety cage, polycarbonate windows, and a completely new aerodynamic architecture: bonnet with extractors, adjustable splitter, extended diffuser, and a dual-plane rear wing allowing precise adjustments for each circuit.",
          "The customer car price is set at 575,000 euros, with phased deliveries starting from June 2026 for private teams competing in the GT World Challenge and the new national GT3 championships."
        ]
      }
    ]
  },
  "lamborghini-urus-se-actualizado": {
    "excerpt": "Lamborghini renews the Urus SE for 2026 with a recalibrated PHEV system, 800 hp combined, up to 60 km of 100% electric range, and chassis electronics derived from the Revuelto.",
    "intro": "Lamborghini has confirmed a significant update for the Urus SE for 2026, the first plug-in hybrid version of the Sant'Agata Super SUV. The modifications focus on improving the integration between the twin-turbo V8 and the electric motor, increasing the 100% electric range, and inheriting some of the chassis electronics developed for the Revuelto.",
    "sections": [
      {
        "title": "Twin-turbo V8 plus electric motor: 800 hp",
        "paragraphs": [
          "The 4.0-litre twin-turbo V8 maintains 620 hp, while the synchronous electric motor integrated into the 8-speed automatic transmission contributes an additional 192 hp and 483 Nm of torque. The combined power reaches 800 hp with a maximum torque of 950 Nm, available from just 1,750 rpm.",
          "The 25.9 kWh lithium-ion battery allows for a WLTP electric range of up to 60 km and accepts AC charging at 7.4 kW. This makes the Urus SE a genuine option for those who want a Lamborghini compatible with new traffic restrictions in large European cities."
        ]
      },
      {
        "title": "Active chassis and expanded driving modes",
        "paragraphs": [
          "The new generation introduces the central control LDVI 2.0 system, derived from the Revuelto, which integrates active air suspension, electric anti-roll bars, and rear torque vectoring. The result: a 2,500 kg SUV capable of behaving with the agility of a sports saloon on mountain roads.",
          "The new Città mode prioritises electric use in urban environments, while the Strada, Sport, Corsa, Neve, Terra, and Sabbia modes are retained. The Urus SE accelerates from 0 to 100 km/h in 3.4 seconds and reaches 312 km/h with a starting price of 248,000 euros."
        ]
      }
    ]
  },
  "bugatti-bolide-primeras-entregas": {
    "excerpt": "Molsheim delivers the first Bolide units to its select customers. Naturally aspirated 1,600 hp W16 engine, weighing only 1,450 kg, and Le Mans prototype aerodynamics. An uncompromising track-only experience.",
    "intro": "Bugatti has commenced deliveries of the first Bolide units to its customers during a private event held at the Paul Ricard circuit. Conceived as a track-only hypercar, the Bolide is the lightest and most radical car ever built by the Alsatian marque: a technical manifesto that bids farewell to the iconic W16 engine with an uncompromising expression.",
    "sections": [
      {
        "title": "Bugatti's Final Naturally Aspirated W16",
        "paragraphs": [
          "The 8.0-litre W16 engine that powers the Bolide is a deeply modified version of the Chiron's. Adapted to run on 110-octane racing fuel and with revised electronic management, it delivers 1,600 hp at 7,000 rpm and a sustained 1,600 Nm of torque. The 7-speed sequential gearbox is specific for track use.",
          "It is, officially, the last Bugatti with a W16 engine, after more than 20 years of service. Each customer receives, along with the car, a certificate signed by the engineers responsible for the project and an original test bench part as a souvenir."
        ]
      },
      {
        "title": "Featherweight and LMP1 Aerodynamics",
        "paragraphs": [
          "With only 1,450 kg in running order and an aerodynamic downforce coefficient of 1,800 kg at 320 km/h, the Bolide offers a power-to-weight ratio of 0.91 kg/hp. This figure places it on par with an LMP1 prototype, with the difference that the customer drives it themselves.",
          "The advertised price is 4 million euros before taxes, and production is limited to 40 units. Bugatti includes a three-year circuit use program in the package, with full technical assistance during exclusive events organised by the brand at Le Mans, Spa-Francorchamps, and Nardò."
        ]
      }
    ]
  },
  "rolls-royce-droptail-edicion-final": {
    "excerpt": "Rolls-Royce unveils the fourth and final unit of the Droptail programme, Goodwood's most exclusive coachbuilding project. Four unique cars, a 6.75-litre V12, and an estimated price exceeding 25 million euros per unit.",
    "intro": "Rolls-Royce has officially unveiled the fourth and final unit of the Droptail series, the most exclusive coachbuilt programme in the British marque's recent history. Following La Rose Noire, Amethyst Droptail, and Arcadia, this final piece concludes a saga that began in 2021, redefining the boundaries of contemporary automotive luxury and establishing Goodwood's Coachbuild department as a global benchmark.",
    "sections": [
      {
        "title": "6.75-litre V12 and Unique Architecture",
        "paragraphs": [
          "Beneath the Droptail's long bonnet lies Rolls-Royce's legendary 6.75-litre twin-turbo V12 engine, recalibrated to deliver 600 hp with an absolutely seamless power delivery. The 8-speed automatic transmission and Magic Carpet Ride active suspension ensure unparalleled ride comfort.",
          "Each Droptail is built on a specific platform that shares very few elements with the rest of the range. The entirely exclusive bodywork is handcrafted from hand-formed aluminium by the master craftspeople at Goodwood, in a process requiring more than 6,000 hours of work per unit."
        ]
      },
      {
        "title": "Coachbuilding in its Purest Expression",
        "paragraphs": [
          "Each of the four Droptails has been custom-designed for its owner, featuring unique colour palettes, materials, and decorative motifs. The fourth edition incorporates marquetry crafted from more than 1,600 pieces of wood, a specific clock developed with a Swiss manufacturer, and a removable hardtop roof system inspired by Rolls-Royce models from the interwar period.",
          "The price has not been publicly disclosed, but estimates place each Droptail above 25 million euros, which would make it one of the most expensive new cars ever produced. With this fourth unit, Rolls-Royce closes the Droptail chapter and prepares to announce a new coachbuild programme in 2027."
        ]
      }
    ]
  },
  "porsche-718-cayman-gt4-rs-electrico": {
    "excerpt": "Rumours and speculation point to a future 100% electric Cayman GT4 RS with two synchronous motors, 700 hp and 900 V architecture. Porsche has not officially confirmed the project.",
    "intro": "⚠️ This article is based on leaks not officially confirmed by Porsche. According to recent rumours and speculation from within Weissach circles, the brand is reportedly working on an electric 718 Cayman GT4 RS, which would be Porsche's first 100% electric GT. This hypothetical version would usher in a new family of purely electric 718 Cayman and Boxster models, designed from the ground up to deliver performance worthy of a Stuttgart GT without resorting to a combustion engine.",
    "sections": [
      {
        "title": "Two synchronous motors and 900 V architecture",
        "paragraphs": [
          "The new electric GT4 RS uses two permanent magnet synchronous motors, one on each axle, for a combined output of 700 hp and an instant torque of 850 Nm. Porsche has developed a 900-volt architecture, superior even to that of the <a href=\"/noticias/porsche-taycan-turbo-gt\" class=\"text-[#bda095] hover:underline\">Taycan</a>, which allows for ultra-fast charging and minimises thermal losses during track sessions.",
          "0 to 100 km/h is completed in 2.8 seconds, and the top speed is 295 km/h. But the true goal of the programme is not the absolute figure, but the ability to maintain consistent performance for 30 minutes straight on the track, a classic problem for electric sports cars that Porsche claims to have solved."
        ]
      },
      {
        "title": "Cooling derived from the Mission R",
        "paragraphs": [
          "The cooling system uses direct technology inherited from the Mission R racing prototype: direct cooling of the cells by dielectric oil and a specific intercooler for the electric motors. The result: the car can repeat limit times for 25 laps at Nürburgring without performance degradation.",
          "Weight has been kept to 1,685 kg thanks to a new cast aluminium rear subframe and an 85 kWh structural battery pack. WLTP range is 380 km, more than sufficient for a GT designed for mixed road-track use."
        ]
      },
      {
        "title": "Price and availability",
        "paragraphs": [
          "The announced price for the 718 Cayman GT4 RS electric is 195,000 euros, with first deliveries scheduled for the first quarter of 2027. Porsche will produce the model in parallel with the combustion version during a transition period until 2030.",
          "With this launch, the Stuttgart brand sends a clear message: electrification is not a compromise for the GT, but an opportunity to reinterpret the sporting DNA from a completely new technical basis, without sacrificing the essence that has made the Cayman one of the most balanced sports cars on the market."
        ]
      }
    ]
  }
};
