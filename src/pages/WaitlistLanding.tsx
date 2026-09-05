import { useRef, useState } from "react";
import { Helmet } from "react-helmet-async";
import { CheckCircle2, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { supabase } from "@/integrations/supabase/client";
import i18n from "@/i18n";

const CIUDADES = ["Barcelona", "Madrid", "Marbella", "Valencia", "Ibiza", "Alicante", "Otra"];

const WaitlistLanding = () => {
  const formRef = useRef<HTMLDivElement>(null);
  const [nombre, setNombre] = useState("");
  const [email, setEmail] = useState("");
  const [ciudad, setCiudad] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [enviado, setEnviado] = useState(false);

  const scrollToForm = () => {
    formRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!email.includes("@")) {
      setError("Por favor, introduce un email válido.");
      return;
    }

    setLoading(true);
    try {
      const { error: invokeError } = await supabase.functions.invoke("join-waitlist", {
        body: { nombre, email, ciudad, source: "landing", language: i18n.language === "en" ? "en" : "es" },
      });
      if (invokeError) throw invokeError;
      setEnviado(true);
    } catch (err) {
      console.error(err);
      setError("No hemos podido registrar tu solicitud. Por favor, inténtalo de nuevo en unos minutos.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Helmet>
        <title>Lista de espera · Owneo — El lujo que se comparte</title>
        <meta
          name="description"
          content="Únete a la lista de espera de Owneo. Accede a supercoches premium con solo el 10% de su valor. Plazas limitadas en pre-lanzamiento."
        />
        <meta name="robots" content="index,follow" />
      </Helmet>

      <main className="min-h-screen bg-background text-foreground">
        {/* HERO + FORM */}
        <section
          ref={formRef}
          className="relative flex min-h-screen items-center justify-center px-6 py-20 sm:py-28"
        >
          <div className="mx-auto w-full max-w-2xl text-center">
            <span className="ds-eyebrow-pill">Pre-lanzamiento · Plazas limitadas</span>

            <h1 className="ds-display mt-8 text-foreground">
              El lujo que se <span className="text-champagne">comparte</span>
            </h1>

            <p className="ds-lead mx-auto mt-8 max-w-xl">
              Sé de los primeros en acceder a una nueva forma de disfrutar supercoches.
              Sin propiedad, sin compromisos, solo experiencia.
            </p>

            {enviado ? (
              <div className="ds-card mx-auto mt-12 max-w-md text-center">
                <div className="flex justify-center">
                  <CheckCircle2 className="ds-icon h-12 w-12" />
                </div>
                <h2 className="ds-h3 mt-6">Estás dentro</h2>
                <p className="ds-body mt-4">
                  Te avisaremos en cuanto abramos plazas en tu ciudad. Gracias por confiar en Owneo.
                </p>
              </div>
            ) : (
              <form
                onSubmit={handleSubmit}
                className="ds-card mx-auto mt-12 max-w-md space-y-5 text-left"
              >
                <div className="space-y-2">
                  <Label htmlFor="nombre">Nombre</Label>
                  <Input
                    id="nombre"
                    value={nombre}
                    onChange={(e) => setNombre(e.target.value)}
                    placeholder="Tu nombre"
                    maxLength={100}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">
                    Email <span className="text-champagne">*</span>
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="tu@email.com"
                    maxLength={255}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="ciudad">Ciudad de interés</Label>
                  <Select value={ciudad} onValueChange={setCiudad}>
                    <SelectTrigger id="ciudad">
                      <SelectValue placeholder="Selecciona una ciudad" />
                    </SelectTrigger>
                    <SelectContent>
                      {CIUDADES.map((c) => (
                        <SelectItem key={c} value={c}>
                          {c}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {error && (
                  <p className="text-sm text-destructive" role="alert">
                    {error}
                  </p>
                )}

                <Button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-champagne text-background hover:bg-champagne/90"
                >
                  {loading ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" />
                      Enviando…
                    </>
                  ) : (
                    "Quiero acceso prioritario"
                  )}
                </Button>

                <p className="text-xs text-muted-foreground text-center">
                  Sin spam. Solo recibirás un aviso cuando abramos plazas.
                </p>
              </form>
            )}
          </div>
        </section>

        {/* EL MODELO */}
        <section className="px-6 py-20 sm:py-28 border-t border-border">
          <div className="mx-auto max-w-5xl text-center">
            <span className="ds-eyebrow-pill">El modelo</span>
            <h2 className="ds-h1 mt-8">Una nueva forma de poseer</h2>
            <p className="ds-lead mx-auto mt-6 max-w-2xl">
              Compartido entre 10 socios. Pensado para quienes valoran la experiencia
              por encima de la propiedad.
            </p>

            <div className="mt-14 grid gap-6 sm:grid-cols-3">
              {[
                { figure: "10%", unit: "del valor del vehículo", note: "Tu participación" },
                { figure: "4", unit: "semanas garantizadas al año", note: "Disponibilidad real" },
                { figure: "÷10", unit: "gastos compartidos", note: "Seguro, mantenimiento, garaje" },
              ].map((item) => (
                <div key={item.figure} className="ds-card-hover text-center">
                  <div className="ds-feature-figure">
                    <p className="text-5xl font-extralight tracking-wider text-champagne">
                      {item.figure}
                    </p>
                    <p className="ds-body mt-3">{item.unit}</p>
                  </div>
                  <p className="ds-feature-note text-xs uppercase tracking-[0.2em] text-muted-foreground">
                    {item.note}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* COMPARATIVA */}
        <section className="px-6 py-20 sm:py-28 border-t border-border">
          <div className="mx-auto max-w-4xl text-center">
            <span className="ds-eyebrow-pill">Comparativa</span>
            <h2 className="ds-h2 mt-8">Ferrari Roma · 3 años de uso</h2>

            <div className="mt-12 grid gap-6 sm:grid-cols-2">
              <div className="ds-card text-center">
                <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
                  Comprándolo
                </p>
                <p className="mt-6 text-4xl font-extralight tracking-wider line-through text-muted-foreground">
                  ~240.500 €
                </p>
                <p className="ds-body mt-4">Coste total estimado en 3 años</p>
              </div>

              <div className="ds-card border-champagne/60 text-center">
                <p className="text-xs uppercase tracking-[0.2em] text-champagne">
                  Con Owneo
                </p>
                <p className="mt-6 text-4xl font-extralight tracking-wider text-foreground">
                  ~26.400 €
                </p>
                <p className="ds-body mt-4">Misma experiencia, una décima parte del coste</p>
              </div>
            </div>

            <p className="ds-body mx-auto mt-10 max-w-2xl">
              Misma emoción. Mismo coche. Sin depreciación, sin trámites, sin sorpresas.
            </p>
          </div>
        </section>

        {/* CTA FINAL */}
        <section className="px-6 py-20 sm:py-28 border-t border-border">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="ds-h1">¿Listo para entrar?</h2>
            <p className="ds-lead mt-6">
              Las plazas son limitadas y se asignan por orden de llegada.
            </p>
            <Button
              onClick={scrollToForm}
              className="mt-10 bg-champagne text-background hover:bg-champagne/90"
              size="lg"
            >
              Quiero acceso prioritario
            </Button>
          </div>
        </section>
      </main>
    </>
  );
};

export default WaitlistLanding;
