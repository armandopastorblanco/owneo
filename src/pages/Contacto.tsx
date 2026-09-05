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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { supabase } from "@/integrations/supabase/client";
import { useLocations } from "@/hooks/useLocations";

const initialForm = {
  name: "",
  email: "",
  phone: "",
  subject: "",
  car_name: "",
  message: "",
  city: "",
};

export default function Contacto() {
  const { t, i18n } = useTranslation();
  const [form, setForm] = useState(initialForm);
  const { data: cities } = useLocations();
  const [accepted, setAccepted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const update = (k: keyof typeof initialForm) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
      setForm((f) => ({ ...f, [k]: e.target.value }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.subject || !form.message) {
      toast.error(t("contact.error_required"));
      return;
    }
    if (!accepted) {
      toast.error(t("contact.error_privacy"));
      return;
    }
    setSubmitting(true);
    try {
      // form.city guarda el id de la ciudad (value del desplegable); de ahí
      // derivamos el nombre para conservar el histórico en la columna de texto.
      const selectedCity = (cities ?? []).find((c) => c.id === form.city);
      const { error } = await supabase.from("consultation_requests").insert({
        name: form.name,
        email: form.email,
        phone: form.phone || null,
        message: form.message,
        car_name: form.car_name || null,
        subject: form.subject,
        city: selectedCity?.name || null,
        city_id: selectedCity?.id || null,
        language: i18n.language === "en" ? "en" : "es",
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
            city: selectedCity?.name || null,
            language: i18n.language === "en" ? "en" : "es",
          },
        })
        .catch((err) => console.error("send-contact-notification:", err));

      supabase.functions
        .invoke("sync-brevo-contact", {
          body: {
            name: form.name,
            email: form.email,
            phone: form.phone || null,
            subject: form.subject,
            message: form.message,
            car_name: form.car_name || null,
            city: selectedCity?.name || null,
            language: i18n.language === "en" ? "en" : "es",
            source: "contacto",
          },
        })
        .catch((err) => console.error("sync-brevo-contact:", err));

      toast.success(t("contact.success"));
      setForm(initialForm);
      setAccepted(false);
    } catch (err: any) {
      toast.error(err.message || t("contact.error_send"));
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
            {t("contact.subtitle")}
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
              <Label htmlFor="phone">{t("contact.phone")}</Label>
              <Input id="phone" type="tel" value={form.phone} onChange={update("phone")} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="subject">{t("contact.subject")} *</Label>
              <Input id="subject" value={form.subject} onChange={update("subject")} required />
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-5">
            <div className="space-y-2">
              <Label htmlFor="city">{t("contact.city")}</Label>
              <Select value={form.city} onValueChange={(v) => setForm((f) => ({ ...f, city: v }))}>
                <SelectTrigger id="city">
                  <SelectValue placeholder={t("contact.city_placeholder")} />
                </SelectTrigger>
                <SelectContent>
                  {(cities ?? []).map((c) => (
                    <SelectItem key={c.id} value={c.id}>
                      {c.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="car_name">{t("contact.car_interest")}</Label>
            <Input
              id="car_name"
              value={form.car_name}
              onChange={update("car_name")}
              placeholder={t("contact.car_placeholder")}
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
              {t("contact.privacy")}{" "}
              <a href={i18n.language === "en" ? "/en/privacy-policy" : "/politica-de-privacidad"} className="text-champagne hover:underline">
                {t("contact.privacy_link")}
              </a>
              .
            </Label>
          </div>

          <Button type="submit" disabled={submitting} className="w-full md:w-auto">
            {submitting ? t("contact.sending") : t("contact.send")}
          </Button>
        </form>
      </main>
      <Footer />
    </div>
  );
}
