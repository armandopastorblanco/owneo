import { Percent, CalendarDays, Users, ArrowRight, MapPin, Star } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

/* Petit wrapper de section pour la doc */
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

        {/* En-tête */}
        <header className="mb-12">
          <span className="ds-eyebrow-pill mb-6">Design System</span>
          <h1 className="ds-h1 text-foreground mb-4">Owneo — Charte graphique</h1>
          <p className="ds-lead max-w-2xl">
            Référence unique des couleurs, typographies et composants du site.
            Tout nouvel élément doit réutiliser ces tokens et classes.
          </p>
        </header>

        {/* ─── COULEURS ─── */}
        <Block title="Couleurs">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <Swatch name="Champagne (accent)" varName="champagne" />
            <Swatch name="Background" varName="background" fg />
            <Swatch name="Card" varName="card" fg />
            <Swatch name="Muted" varName="muted" fg />
            <Swatch name="Primary (CTA)" varName="primary" />
            <Swatch name="Secondary" varName="secondary" fg />
            <Swatch name="Border" varName="border" fg />
            <Swatch name="Destructive" varName="destructive" />
          </div>
          <p className="ds-body mt-6">
            Accent unique : <span className="text-champagne">champagne</span>.
            Ne jamais coder une couleur en dur (pas de <code>text-white</code> /
            <code>bg-black</code> hors overlays) : passer par les tokens.
          </p>
        </Block>

        {/* ─── TYPOGRAPHIE ─── */}
        <Block title="Typographie — Encode Sans Expanded">
          <div className="space-y-6">
            <div>
              <span className="ds-eyebrow mb-2">.ds-display — hero</span>
              <p className="ds-display text-foreground">Vive lo Extraordinario</p>
            </div>
            <div>
              <span className="ds-eyebrow mb-2">.ds-h1 — titre de page</span>
              <p className="ds-h1 text-foreground">Nuestra colección</p>
            </div>
            <div>
              <span className="ds-eyebrow mb-2">.ds-h2 — titre de section</span>
              <p className="ds-h2 text-foreground">El lujo que se comparte</p>
            </div>
            <div>
              <span className="ds-eyebrow mb-2">.ds-h3 — sous-section</span>
              <p className="ds-h3 text-foreground">Nuestras ubicaciones</p>
            </div>
            <div>
              <span className="ds-eyebrow mb-2">.ds-card-title — titre de carte</span>
              <p className="ds-card-title text-foreground">Ferrari Roma</p>
            </div>
            <div>
              <span className="ds-eyebrow mb-2">.ds-lead — chapô</span>
              <p className="ds-lead">Una marca que redefine el acceso a los coches de alta gama.</p>
            </div>
            <div>
              <span className="ds-eyebrow mb-2">.ds-body — texte courant</span>
              <p className="ds-body">Seguro, mantenimiento y garaje se dividen entre los 10 socios.</p>
            </div>
          </div>
        </Block>

        {/* ─── BOUTONS ─── */}
        <Block title="Boutons">
          <div className="flex flex-wrap gap-4 items-center">
            <Button>Bouton primary</Button>
            <Button variant="secondary">Secondary</Button>
            <Button variant="outline">Outline</Button>
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

        {/* ─── PICTOS ─── */}
        <Block title="Pictogrammes">
          <p className="ds-body mb-6">
            Tout picto décoratif est en couleur d'accent via <code>.ds-icon</code>.
          </p>
          <div className="flex flex-wrap gap-8">
            {[Percent, CalendarDays, Users, MapPin, Star, ArrowRight].map((Icon, i) => (
              <Icon key={i} className="ds-icon w-8 h-8" />
            ))}
          </div>
        </Block>

        {/* ─── CARTES ─── */}
        <Block title="Cartes & blocs">
          <div className="grid sm:grid-cols-2 gap-6">
            {/* Carte standard */}
            <div className="ds-card">
              <span className="ds-eyebrow mb-2">.ds-card</span>
              <h3 className="ds-card-title text-foreground mt-2 mb-2">Carte standard</h3>
              <p className="ds-body">Fond card, bordure, rayon unifié rounded-2xl.</p>
            </div>

            {/* Carte métrique avec hover */}
            <div className="ds-card-hover text-center group">
              <Percent className="ds-icon w-8 h-8 mb-4 mx-auto transition-transform duration-500 group-hover:scale-110 group-hover:rotate-12" />
              <div className="text-5xl font-light text-champagne mb-2">10%</div>
              <div className="font-normal text-foreground mb-2">Del valor del vehículo</div>
              <p className="ds-body">.ds-card-hover — survole pour voir l'effet.</p>
            </div>
          </div>

          {/* Exemple de carte shadcn (cohérence) */}
          <div className="mt-6 max-w-sm">
            <Card className="overflow-hidden rounded-2xl bg-card border-border">
              <div className="aspect-[16/10] bg-muted" />
              <CardContent className="p-6">
                <span className="ds-eyebrow">Categoría</span>
                <h3 className="ds-card-title text-foreground mt-2 mb-2">Composant Card (shadcn)</h3>
                <p className="ds-body">Hérite du rayon via --radius.</p>
              </CardContent>
            </Card>
          </div>
        </Block>

        {/* ─── RÈGLES ─── */}
        <Block title="Règles d'usage">
          <ul className="space-y-3 ds-body list-disc pl-5">
            <li>Titres : utiliser <code>.ds-display / .ds-h1 / .ds-h2 / .ds-h3</code>, jamais de <code>text-4xl font-bold</code> à la main.</li>
            <li>Une seule couleur d'accent : le champagne. Pictos décoratifs en <code>.ds-icon</code>.</li>
            <li>Cartes : <code>.ds-card</code> ou <code>.ds-card-hover</code>, rayon <code>rounded-2xl</code> uniforme.</li>
            <li>Aucune couleur en dur (sauf overlays de dégradé sur média).</li>
            <li>Graisses : titres en <code>font-light / font-extralight</code> (look luxe épuré).</li>
          </ul>
        </Block>

      </div>
    </div>
  );
};

export default DesignSystem;
