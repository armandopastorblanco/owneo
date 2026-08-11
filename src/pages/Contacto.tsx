import { useTranslation } from "react-i18next";
import { useState } from "react";
import { Helmet } from "react-helmet-async";
import { toast } from "sonner";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { supabase } from "@/integrations/supabase/client";

const initialForm = {
  name: "",
  email: "",
  phone: "",
  subject: "",
  car_name: "",
  message: "",
};

export default function Contacto() {
  const { t } = useTranslation();
  const [form, setForm] = useState(initialForm);
  const [accepted, setAccepted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const update = (k: keyof typeof initialForm) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
      setForm((f) => ({ ...f, [k]: e.target.value }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.subject || !form.message) {
      toast.error("Completa todos los campos obligatorios.");
      return;
    }
    if (!accepted) {
      toast.error("Debes aceptar la política de privacidad.");
      return;
    }
    setSubmitting(true);
    try {
      const { error } = await supabase.from("consultation_requests").insert({
        name: form.name,
        email: form.email,
        phone: form.phone || null,
        message: form.message,
        car_name: form.car_name || null,
        subject: form.subject,
        source: "contacto",
        status: "pending",
      } as any);
      if (error) throw error;

      supabase.functions
        .invoke("send-contact-notification", {
          body: {
            name: form.name,
            email: form.email,
            phone: form.phone || null,
            subject: form.subject,
            message: form.message,
            car_name: form.car_name || null,
          },
        })
        .catch((err) => console.error("send-contact-notification:", err));

      toast.success(t("contact.success"));
      setForm(initialForm);
      setAccepted(false);
    } catch (err: any) {
      toast.error(err.message || "No se pudo enviar el mensaje.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>Contacto | Owneo</title>
        <meta name="description" content="¿Tienes alguna pregunta sobre Owneo? Contacta con nuestro equipo y te responderemos lo antes posible." />
        <link rel="canonical" href="https://www.owneo.es/contacto" />
        <meta property="og:title" content="Contacto | Owneo" />
        <meta property="og:description" content="¿Tienes alguna pregunta sobre Owneo? Contacta con nuestro equipo y te responderemos lo antes posible." />
        <meta property="og:url" content="https://www.owneo.es/contacto" />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="Owneo" />
        <meta property="og:locale" content="es_ES" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@owneo" />
      </Helmet>
      <Navbar />
      <main className="container mx-auto px-6 pt-32 pb-20 max-w-3xl">
        <header className="mb-10 text-center">
          <h1 className="text-4xl md:text-5xl font-extralight tracking-tight text-foreground mb-4">
            {t("contact.title")}
          </h1>
          <p className="text-muted-foreground">
            ¿Tienes alguna pregunta? Escríbenos y nuestro equipo te responderá lo antes posible.
          </p>
        </header>

        <form
          onSubmit={handleSubmit}
          className="bg-card border border-border/40 rounded-lg p-6 md:p-8 space-y-5"
        >
          <div className="grid md:grid-cols-2 gap-5">
            <div className="space-y-2">
              <Label htmlFor="name">{t("contact.name")} *</Label>
              <Input id="name" value={form.name} onChange={update("name")} required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">{t("contact.email")} *</Label>
              <Input id="email" type="email" value={form.email} onChange={update("email")} required />
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-5">
            <div className="space-y-2">
              <Label htmlFor="phone">Teléfono</Label>
              <Input id="phone" type="tel" value={form.phone} onChange={update("phone")} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="subject">{t("contact.subject")} *</Label>
              <Input id="subject" value={form.subject} onChange={update("subject")} required />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="car_name">Vehículo de interés</Label>
            <Input
              id="car_name"
              value={form.car_name}
              onChange={update("car_name")}
              placeholder="¿Tienes algún vehículo en mente? (opcional)"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="message">{t("contact.message")} *</Label>
            <Textarea id="message" rows={4} value={form.message} onChange={update("message")} required />
          </div>

          <div className="flex items-start gap-3">
            <Checkbox
              id="privacy"
              checked={accepted}
              onCheckedChange={(v) => setAccepted(v === true)}
            />
            <Label htmlFor="privacy" className="text-sm text-muted-foreground leading-snug">
              Acepto la{" "}
              <a href="/politica-de-privacidad" className="text-champagne hover:underline">
                política de privacidad
              </a>
              .
            </Label>
          </div>

          <Button type="submit" disabled={submitting} className="w-full md:w-auto">
            {submitting ? "Enviando..." : t("contact.send")}
          </Button>
        </form>
      </main>
      <Footer />
    </div>
  );
}
