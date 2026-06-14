import { Percent, CalendarDays, Users, ArrowRight, MapPin, Star } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

/* Pequeño contenedor de sección para la documentación */
const Block = ({ title, children }: { title: string; children: React.ReactNode }) => (
  <section className="py-12 border-b border-border">
    <h2 className="ds-h3 text-foreground mb-8">{title}</h2>
    {children}
  </section>
);

const Swatch = ({ name, varName, fg }: { name: string; varName: string; fg?: boolean }) => (
  <div className="rounded-2xl overflow-hidden border border-border">
    <div
      className="h-24 flex items-end p-3"
      style={{ background: `hsl(var(--${varName}))` }}
    >
      <span className={`text-xs ${fg ? "text-foreground" : "text-background"}`}>
        hsl(var(--{varName}))
      </span>
    </div>
    <div className="p-3 bg-card">
      <p className="text-sm text-foreground">{name}</p>
    </div>
  </div>
);

const DesignSystem = () => {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="container mx-auto max-w-5xl px-4 sm:px-6 py-16">

        {/* Encabezado */}
        <header className="mb-12">
          <span className="ds-eyebrow-pill mb-6">Design System</span>
          <h1 className="ds-h1 text-foreground mb-4">Owneo — Guía de estilo</h1>
          <p className="ds-lead max-w-2xl">
            Referencia única de colores, tipografías y componentes del sitio.
            Todo nuevo elemento debe reutilizar estos tokens y clases.
          </p>
        </header>

        {/* ─── COLORES ─── */}
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
            Acento único: <span className="text-champagne">champagne</span>.
            Nunca codificar un color de forma fija (no usar <code>text-white</code> /
            <code>bg-black</code> salvo en overlays): usar siempre los tokens.
          </p>
        </Block>

        {/* ─── TIPOGRAFÍA ─── */}
        <Block title="Tipografía — Encode Sans Expanded">
          <div className="space-y-6">
            <div>
              <span className="ds-eyebrow mb-2">.ds-display — hero</span>
              <p className="ds-display text-foreground">Vive lo Extraordinario</p>
            </div>
            <div>
              <span className="ds-eyebrow mb-2">.ds-h1 — título de página</span>
              <p className="ds-h1 text-foreground">Nuestra colección</p>
            </div>
            <div>
              <span className="ds-eyebrow mb-2">.ds-h2 — título de sección</span>
              <p className="ds-h2 text-foreground">El lujo que se comparte</p>
            </div>
            <div>
              <span className="ds-eyebrow mb-2">.ds-h3 — subsección</span>
              <p className="ds-h3 text-foreground">Nuestras ubicaciones</p>
            </div>
            <div>
              <span className="ds-eyebrow mb-2">.ds-card-title — título de tarjeta</span>
              <p className="ds-card-title text-foreground">Ferrari Roma</p>
            </div>
            <div>
              <span className="ds-eyebrow mb-2">.ds-lead — entradilla</span>
              <p className="ds-lead">Una marca que redefine el acceso a los coches de alta gama.</p>
            </div>
            <div>
              <span className="ds-eyebrow mb-2">.ds-body — texto corriente</span>
              <p className="ds-body">Seguro, mantenimiento y garaje se dividen entre los 10 socios.</p>
            </div>
          </div>
        </Block>

        {/* ─── BOTONES ─── */}
        <Block title="Botones">
          <div className="flex flex-wrap gap-4 items-center">
            <Button>Botón primario</Button>
            <Button variant="secondary">Secundario</Button>
            <Button variant="outline">Contorno</Button>
            <Button
              variant="ghost"
              size="lg"
              className="border border-white/20 text-white/80 hover:text-white hover:bg-white/5 hover:border-white/40 text-xs font-light tracking-[0.2em] px-10 py-6 group"
            >
              DESCUBRIR
              <ArrowRight className="ml-3 w-4 h-4 transition-transform group-hover:translate-x-2" />
            </Button>
          </div>
        </Block>

        {/* ─── PICTOGRAMAS ─── */}
        <Block title="Pictogramas">
          <p className="ds-body mb-6">
            Todo pictograma decorativo va en color de acento mediante <code>.ds-icon</code>.
          </p>
          <div className="flex flex-wrap gap-8">
            {[Percent, CalendarDays, Users, MapPin, Star, ArrowRight].map((Icon, i) => (
              <Icon key={i} className="ds-icon w-8 h-8" />
            ))}
          </div>
        </Block>

        {/* ─── TARJETAS ─── */}
        <Block title="Tarjetas y bloques">
          <div className="grid sm:grid-cols-2 gap-6">
            {/* Tarjeta estándar */}
            <div className="ds-card">
              <span className="ds-eyebrow mb-2">.ds-card</span>
              <h3 className="ds-card-title text-foreground mt-2 mb-2">Tarjeta estándar</h3>
              <p className="ds-body">Fondo card, borde, radio unificado rounded-2xl.</p>
            </div>

            {/* Tarjeta de métrica con hover */}
            <div className="ds-card-hover text-center group">
              <Percent className="ds-icon w-8 h-8 mb-4 mx-auto transition-transform duration-500 group-hover:scale-110 group-hover:rotate-12" />
              <div className="text-5xl font-light text-champagne mb-2">10%</div>
              <div className="font-normal text-foreground mb-2">Del valor del vehículo</div>
              <p className="ds-body">.ds-card-hover — pasa el cursor para ver el efecto.</p>
            </div>
          </div>

          {/* Ejemplo de tarjeta shadcn (coherencia) */}
          <div className="mt-6 max-w-sm">
            <Card className="overflow-hidden rounded-2xl bg-card border-border">
              <div className="aspect-[16/10] bg-muted" />
              <CardContent className="p-6">
                <span className="ds-eyebrow">Categoría</span>
                <h3 className="ds-card-title text-foreground mt-2 mb-2">Componente Card (shadcn)</h3>
                <p className="ds-body">Hereda el radio mediante --radius.</p>
              </CardContent>
            </Card>
          </div>
        </Block>

        {/* ─── REGLAS ─── */}
        <Block title="Reglas de uso">
          <ul className="space-y-3 ds-body list-disc pl-5">
            <li>Títulos: usar <code>.ds-display / .ds-h1 / .ds-h2 / .ds-h3</code>, nunca <code>text-4xl font-bold</code> escrito a mano.</li>
            <li>Un único color de acento: el champagne. Pictogramas decorativos con <code>.ds-icon</code>.</li>
            <li>Tarjetas: <code>.ds-card</code> o <code>.ds-card-hover</code>, radio <code>rounded-2xl</code> uniforme.</li>
            <li>Ningún color codificado de forma fija (salvo overlays de degradado sobre imágenes).</li>
            <li>Grosores: títulos en <code>font-semibold / font-light</code> según el nivel.</li>
          </ul>
        </Block>

      </div>
    </div>
  );
};

export default DesignSystem;
