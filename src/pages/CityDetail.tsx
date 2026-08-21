import { useParams, Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { resolveAssetPath } from "@/lib/assetMap";
import { resolveCarImage } from "@/lib/resolveCarImage";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CarCard from "@/components/CarCard";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { ArrowLeft } from "lucide-react";
import type { Car } from "@/hooks/useCars";
import type { Tables } from "@/integrations/supabase/types";

type CarRow = Tables<"cars"> & {
  locations?: { name: string | null; slug: string | null } | null;
};

function mapRowToCar(row: CarRow): Car {
  const numPrice = Number(row.price);
  return {
    id: row.id,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    slug: (row as any).slug ?? "",
    name: row.name,
    brand: row.brand,
    model: row.model,
    year: row.year,
    price: `€${numPrice.toLocaleString("en-US")}`,
    numericPrice: numPrice,
    image: resolveCarImage(row.image_url, row.brand),
    gallery: row.gallery?.map((p) => resolveCarImage(p, row.brand)),
    category: row.category || "",
    description: row.description || "",
    luxuryDescription: row.luxury_description || "",
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    description_en: (row as any).description_en || "",
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    category_en: (row as any).category_en || "",
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    luxury_description_en: (row as any).luxury_description_en || "",
    specifications: (row.specifications as Record<string, string>) || {},
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    specifications_en: ((row as any).specifications_en as Record<string, string>) || {},
    features: row.features || [],
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    features_en: (row as any).features_en || [],
    availableIn: row.available_in || [],
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    locationId: (row as any).location_id ?? null,
    cityName: row.locations?.name ?? null,
    citySlug: row.locations?.slug ?? null,
    maxParticipations: row.max_participations || 10,
    remainingParticipations: row.remaining_participations ?? 10,
    participationPrice: Number(row.participation_price) || Math.round(numPrice * 0.1),
    promotion: null,
    status: row.status || "active",
    annual_fee_percent: Number(row.annual_fee_percent ?? 10),
    annual_fee_override: row.annual_fee_override != null ? Number(row.annual_fee_override) : null,
    participation_duration_years: row.participation_duration_years ?? 5,
    weeks_per_participation: row.weeks_per_participation ?? 4,
    km_per_participation: row.km_per_participation ?? 2000,
    luxury_description_override: row.luxury_description_override ?? null,
    consultation_enabled: row.consultation_enabled ?? true,
  };
}

const CityDetail = () => {
  const { t } = useTranslation();
  const params = useParams<{ slug?: string; cityId?: string }>();
  const slug = params.slug;
  const cityId = params.cityId;
  const key = slug ?? cityId;

  const { data: city, isLoading: cityLoading } = useQuery({
    queryKey: ["city-detail", key],
    enabled: !!key,
    queryFn: async () => {
      const q = supabase.from("locations").select("*");
      const { data, error } = await (slug
        ? q.eq("slug", slug).maybeSingle()
        : q.eq("id", cityId!).maybeSingle());
      if (error) throw error;
      return data;
    },
  });

  const { data: cars = [], isLoading: carsLoading } = useQuery({
    queryKey: ["city-cars", key, city?.id],
    enabled: !!key && !!city,
    queryFn: async () => {
      // Désormais : filtrage par location_id (un véhicule = une ville).
      const { data, error } = await supabase
        .from("cars")
        .select("*, locations(name, slug)")
        .eq("is_active", true)
        .eq("location_id", city!.id)
        .order("name");
      if (error) throw error;
      return (data as unknown as CarRow[]).map(mapRowToCar);
    },
  });

  if (cityLoading) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="pt-20 px-6 container mx-auto">
          <Skeleton className="h-[400px] w-full rounded-xl" />
        </div>
      </div>
    );
  }

  if (!city) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <main className="pt-24 pb-12 px-6 container mx-auto text-center">
          <h1 className="ds-h2 text-foreground mb-4">Ciudad no encontrada</h1>
          <p className="ds-lead mb-6">La ciudad que buscas no existe o ya no está disponible.</p>
          <Link to="/ubicaciones">
            <Button variant="outline">
              <ArrowLeft className="w-4 h-4 mr-2" /> {t("locations.back")}
            </Button>
          </Link>
        </main>
        <Footer />
      </div>
    );
  }

  const heroImage = resolveAssetPath(city.image_url);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero */}
      <section className="relative min-h-[400px] sm:min-h-[460px] flex items-end overflow-hidden">
        <div className="absolute inset-0">
          <img src={heroImage} alt={city.name} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/70 to-background/30" />
        </div>
        <div className="relative z-10 container mx-auto px-4 sm:px-6 pt-28 pb-10">
          <Link to="/ubicaciones" className="inline-flex items-center text-sm text-foreground/80 hover:text-foreground mb-4">
            <ArrowLeft className="w-4 h-4 mr-2" /> {t("locations.back")}
          </Link>
          <div className="mb-4">
            <span className="ds-eyebrow-pill">{t("locations.premium_location")}</span>
          </div>
          <h1 className="ds-h1 text-foreground mb-4">{city.name}</h1>
          {city.description && (
            <p className="ds-lead max-w-3xl">{city.description}</p>
          )}
        </div>
      </section>

      {/* Cars list */}
      <main className="py-12 px-4 sm:px-6">
        <div className="container mx-auto">
          <h2 className="ds-h2 text-foreground mb-8">
            {t("locations.vehicles_available_in")} {city.name}
          </h2>
          {carsLoading ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 auto-rows-fr">
              {Array.from({ length: 3 }).map((_, i) => (
                <Skeleton key={i} className="h-[400px] rounded-xl" />
              ))}
            </div>
          ) : cars.length === 0 ? (
            <div className="text-center py-16 border border-border rounded-xl">
              <p className="ds-body">
                No hay vehículos disponibles en esta ciudad por el momento.
              </p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 auto-rows-fr">
              {cars.map((car) => (
                <CarCard
                  key={car.id}
                  car={car}
                  pageSource="city_detail"
                  cityCountBadge={1}
                  linkOverride={car.slug ? `/coches/${car.slug}` : `/car/${car.id}`}
                />
              ))}
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default CityDetail;
