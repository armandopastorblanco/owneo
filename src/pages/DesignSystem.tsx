import { Percent, CalendarDays, Users, ArrowRight, MapPin, Star, Shield, Check } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import featureBg from "@/assets/cars/ferrari-roma.jpg";

const Block = ({ title, children }: { title: string; children: React.ReactNode }) => (
  <section className="py-12 border-b border-border">
    <h2 className="ds-h3 text-foreground mb-8">{title}</h2>
    {children}
  </section>
);

const Swatch = ({ name, varName, fg }: { name: string; varName: string; fg?: boolean }) => (
  <div className="rounded-2xl overflow-hidden border border-border">
    <div className="h-24 flex items-end p-3" style={{ background: `hsl(var(--${varName}))` }}>
      <span className={`text-xs ${fg ? "text-foreground" : "text-background"}`}>
        hsl(var(--{varName}))
      </span>
    </div>
    <div className="p-3 bg-card">
      <p className="text-sm text-foreground">{name}</p>
    </div>
  </div>
);

/* Carte immersive de référence (gabarit officiel) */
const FeatureCard = ({ icon: Icon, figure, unit, title, desc, note }: any) => (
  <div className="ds-card-feature">
    <img src={featureBg} alt="" aria-hidden="true" loading="lazy" className="ds-card-feature-img" />
    <div className="ds-card-feature-overlay" />
    <div className="ds-feature-body">
      <Icon className="ds-icon w-10 h-10 mb-4" />
      <div className="ds-feature-figure">
        <span className="text-4xl font-semibold text-white">{figure}</span>
        {unit && <span className="text-sm text-white/80 mt-1">{unit}</span>}
      </div>
      <h3 className="ds-card-title text-white mt-2 mb-2">{title}</h3>
      <p className="text-sm text-white/80 leading-relaxed">{desc}</p>
      {note && <div className="ds-feature-note text-xs text-champagne">{note}</div>}
    </div>
  </div>
);

const DesignSystem = () => {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="container mx-auto max-w-5xl px-4 sm:px-6 py-16">

        <header className="mb-12">
          <span className="ds-eyebrow-pill mb-6">Design System</span>
          <h1 className="ds-h1 text-foreground mb-4">Owneo — Guía de estilo</h1>
          <p className="ds-lead max-w-2xl">
            Referencia única de la marca. Principio: sobriedad + champagne con moderación = lujo.
            Todo elemento del sitio debe reutilizar estos tokens y clases. Ninguna variante fuera de esta guía.
          </p>
        </header>

        {/* COLORES */}
        <Block title="Colores">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <Swatch name="Champagne (acento)" varName="champagne" />
            <Swatch name="Fondo" varName="background" fg />
            <Swatch name="Tarjeta" varName="card" fg />
            <Swatch name="Atenuado" varName="muted" fg />
            <Swatch name="Primario (CTA)" varName="primary" />
            <Swatch name="Secundario" varName="secondary" fg />
            <Swatch name="Borde" varName="border" fg />
            <Swatch name="Destructivo" varName="destructive" />
          </div>
          <p className="ds-body mt-6">
            Acento único: <span className="text-champagne">champagne</span>, usado con moderación
            (cifras clave, pictogramas, CTA, acentos). El resto en blanco/gris.
            Nunca colores fijos (#hex / rgba) salvo overlays sobre imágenes.
          </p>
        </Block>

        {/* TIPOGRAFÍA */}
        <Block title="Tipografía — Encode Sans Expanded">
          <div className="space-y-6">
            <div><span className="ds-eyebrow mb-2 block">.ds-display — hero</span><p className="ds-display text-foreground">Vive lo Extraordinario</p></div>
            <div><span className="ds-eyebrow mb-2 block">.ds-h1 — título de página</span><p className="ds-h1 text-foreground">Nuestra colección</p></div>
            <div><span className="ds-eyebrow mb-2 block">.ds-h2 — título de sección</span><p className="ds-h2 text-foreground">El lujo que se comparte</p></div>
            <div><span className="ds-eyebrow mb-2 block">.ds-h3 — subsección</span><p className="ds-h3 text-foreground">Nuestras ubicaciones</p></div>
            <div><span className="ds-eyebrow mb-2 block">.ds-card-title — título de tarjeta</span><p className="ds-card-title text-foreground">Ferrari Roma</p></div>
            <div><span className="ds-eyebrow mb-2 block">.ds-lead — entradilla</span><p className="ds-lead">Una marca que redefine el acceso a los coches de alta gama.</p></div>
            <div><span className="ds-eyebrow mb-2 block">.ds-body — texto corriente</span><p className="ds-body">Seguro, mantenimiento y garaje se dividen entre los 10 socios.</p></div>
          </div>
        </Block>

        {/* PASTILLAS & TAGS */}
        <Block title="Pastillas y tags">
          <div className="space-y-6">
            <div>
              <span className="ds-eyebrow mb-2 block">.ds-eyebrow-pill — un solo eyebrow por sección, encima del título</span>
              <span className="ds-eyebrow-pill">Nuestro modelo</span>
            </div>
            <div>
              <span className="ds-eyebrow mb-2 block">.ds-tag — grupos de etiquetas secundarias</span>
              <div className="flex flex-wrap gap-3">
                <span className="ds-tag"><Shield className="w-4 h-4 text-champagne" />Sin propiedad</span>
                <span className="ds-tag">Sin gestión</span>
                <span className="ds-tag">Sin compromiso</span>
              </div>
            </div>
          </div>
        </Block>

        {/* BOTONES */}
        <Block title="Botones">
          <div className="flex flex-wrap gap-4 items-center">
            <Button>Botón primario</Button>
            <Button variant="secondary">Secundario</Button>
            <Button variant="outline">Contorno</Button>
          </div>
        </Block>

        {/* PICTOGRAMAS */}
        <Block title="Pictogramas">
          <p className="ds-body mb-6">Todo pictograma decorativo en acento mediante <code>.ds-icon</code>.</p>
          <div className="flex flex-wrap gap-8">
            {[Percent, CalendarDays, Users, MapPin, Star, ArrowRight].map((Icon, i) => (
              <Icon key={i} className="ds-icon w-8 h-8" />
            ))}
          </div>
        </Block>

        {/* TARJETAS SOBRIAS */}
        <Block title="Tarjetas sobrias — contenido funcional">
          <div className="grid sm:grid-cols-2 gap-6">
            <div className="ds-card">
              <span className="ds-eyebrow mb-2 block">.ds-card</span>
              <h3 className="ds-card-title text-foreground mt-2 mb-2">Tarjeta estándar</h3>
              <p className="ds-body">Fondo card, borde, radio rounded-2xl. Para specs, info, bloques neutros.</p>
            </div>
            <div className="ds-card-hover text-center group">
              <Percent className="ds-icon w-8 h-8 mb-4 mx-auto transition-transform duration-500 group-hover:scale-110" />
              <div className="text-5xl font-light text-champagne mb-2">10%</div>
              <p className="ds-body">.ds-card-hover — efecto sutil al pasar el cursor.</p>
            </div>
          </div>
        </Block>

        {/* TARJETAS INMERSIVAS */}
        <Block title="Tarjetas inmersivas — momentos fuertes (con alineación normada)">
          <p className="ds-body mb-6">
            Imagen de fondo + overlay + ligero zoom + sombra dorada al pasar el cursor.
            La alineación es OBLIGATORIA: misma altura por fila, zona de cifra reservada,
            nota anclada abajo. Las cifras y títulos quedan alineados entre tarjetas.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 items-stretch">
            <FeatureCard icon={Percent} figure="10%" unit="" title="Del valor del vehículo" desc="Precio de entrada claro y único. Sin letra pequeña." />
            <FeatureCard icon={CalendarDays} figure="4" unit="semanas (3 estándar + 1 premium)" title="Por participación al año" desc="¿Quieres más tiempo? Adquiere más participaciones." note="✓ Incluido sin coste adicional" />
            <FeatureCard icon={Users} figure="÷10" unit="" title="Gastos compartidos" desc="Seguro, mantenimiento y garaje entre los 10 socios." note="✓ Gestión incluida en la cuota" />
          </div>
        </Block>

        {/* REGLAS */}
        <Block title="Reglas — qué hacer / qué evitar">
          <div className="grid sm:grid-cols-2 gap-6">
            <div className="ds-card">
              <h3 className="ds-card-title text-champagne mb-4">Hacer</h3>
              <ul className="space-y-2 ds-body list-disc pl-5">
                <li>Usar las clases <code>.ds-*</code> para títulos, pastillas y tarjetas.</li>
                <li>Un solo eyebrow champagne por sección.</li>
                <li>Champagne con moderación: cifras, pictos, CTA.</li>
                <li>Tarjetas con radio <code>rounded-2xl</code> y misma altura por fila.</li>
                <li>Alinear las zonas de las tarjetas (cifra, título, nota).</li>
              </ul>
            </div>
            <div className="ds-card">
              <h3 className="ds-card-title text-destructive mb-4">Evitar</h3>
              <ul className="space-y-2 ds-body list-disc pl-5">
                <li>Colores fijos (#bda095, rgba…) fuera de overlays.</li>
                <li>Crear nuevos estilos de pastilla o de título.</li>
                <li><code>font-black</code> en los títulos.</li>
                <li>Tarjetas de distinta altura en una misma fila.</li>
                <li>Saturar de champagne (pierde su valor).</li>
              </ul>
            </div>
          </div>
        </Block>

      </div>
    </div>
  );
};

export default DesignSystem;
