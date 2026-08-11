import { useQuery } from "@tanstack/react-query";
import { z } from "zod";
import { supabase } from "@/integrations/supabase/client";
import { resolveCarImage } from "@/lib/resolveCarImage";
import type { Tables } from "@/integrations/supabase/types";

export const CarPromotionSchema = z.object({
  type: z.enum(["direct", "volume"]),
  discount_percent: z.number(),
  min_participations: z.number().optional(),
  start_date: z.string(),
  end_date: z.string(),
  badge_text: z.string(),
  is_active: z.boolean(),
});

export type CarPromotion = z.infer<typeof CarPromotionSchema>;

export interface Car {
  id: string;
  slug: string;
  name: string;
  brand: string;
  model: string;
  year: number;
  price: string;
  numericPrice: number;
  image: string;
  gallery?: string[];
  category: string;
  description: string;
  luxuryDescription: string;
  description_en: string;
  category_en: string;
  luxury_description_en: string;
  specifications: Record<string, string>;
  features: string[];
  availableIn: string[];
  locationId: string | null;
  cityName: string | null;
  citySlug: string | null;
  maxParticipations: number;
  remainingParticipations: number;
  participationPrice: number;
  promotion: CarPromotion | null;
  status: string;
  annual_fee_percent: number;
  annual_fee_override: number | null;
  participation_duration_years: number;
  weeks_per_participation: number;
  km_per_participation: number;
  luxury_description_override: string | null;
  consultation_enabled: boolean;
}

// Row + jointure locations (name, slug)
type CarRowWithLocation = Tables<"cars"> & {
  locations?: { name: string | null; slug: string | null } | null;
};

function mapDbCarToCar(row: CarRowWithLocation): Car {
  const numPrice = Number(row.price);
  const priceFormatted = `€${numPrice.toLocaleString("en-US")}`;
  const promoParsed = CarPromotionSchema.safeParse(row.promotion);
  const rawPromo = promoParsed.success ? promoParsed.data : null;
  return {
    id: row.id,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    slug: (row as any).slug ?? "",
    name: row.name,
    brand: row.brand,
    model: row.model,
    year: row.year,
    price: priceFormatted,
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
    features: row.features || [],
    availableIn: row.available_in || [],
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    locationId: (row as any).location_id ?? null,
    cityName: row.locations?.name ?? null,
    citySlug: row.locations?.slug ?? null,
    maxParticipations: row.max_participations || 10,
    remainingParticipations: row.remaining_participations ?? 10,
    participationPrice: Number(row.participation_price) || Math.round(numPrice * 0.1),
    promotion: rawPromo?.is_active ? rawPromo : null,
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

/**
 * Toutes les voitures actives (une ligne = un véhicule = une ville).
 * Inclut le nom/slug de la ville via jointure sur locations.
 */
export function useCars() {
  return useQuery({
    queryKey: ["cars"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("cars")
        .select("*, locations(name, slug)")
        .eq("is_active", true)
        .order("name");
      if (error) throw error;
      return (data as unknown as CarRowWithLocation[]).map(mapDbCarToCar);
    },
  });
}

/**
 * Représentation "modèle" pour la page Nuestra Gama :
 * chaque modèle apparaît UNE seule fois, avec l'agrégation
 * du nombre de villes et des places restantes cumulées.
 */
export interface CarModel extends Car {
  cityCount: number;          // nombre de villes où le modèle existe
  totalRemaining: number;     // places restantes cumulées (toutes villes)
  totalMax: number;           // places max cumulées (toutes villes)
  cities: { name: string | null; slug: string | null }[];
}

function buildModels(cars: Car[]): CarModel[] {
  const groups = new Map<string, Car[]>();
  for (const car of cars) {
    // Clé de regroupement : marque + modèle (insensible à la casse)
    const key = `${car.brand}__${car.model}`.toLowerCase().trim();
    const arr = groups.get(key);
    if (arr) arr.push(car);
    else groups.set(key, [car]);
  }

  const models: CarModel[] = [];
  for (const arr of groups.values()) {
    // On choisit comme "vitrine" la fiche avec le plus de places dispo
    // (à défaut la première), pour montrer une carte attractive.
    const sorted = [...arr].sort(
      (a, b) => (b.remainingParticipations ?? 0) - (a.remainingParticipations ?? 0)
    );
    const base = sorted[0];
    const totalRemaining = arr.reduce((s, c) => s + (c.remainingParticipations ?? 0), 0);
    const totalMax = arr.reduce((s, c) => s + (c.maxParticipations ?? 0), 0);
    const cities = arr.map((c) => ({ name: c.cityName, slug: c.citySlug }));

    models.push({
      ...base,
      cityCount: arr.length,
      totalRemaining,
      totalMax,
      cities,
    });
  }
  return models;
}

/**
 * Hook dédié à la page Nuestra Gama : déduplique par modèle.
 */
export function useCarModels() {
  const query = useCars();
  return {
    ...query,
    data: query.data ? buildModels(query.data) : [],
  };
}

export function useCar(idOrSlug: string | undefined, opts?: { bySlug?: boolean }) {
  const bySlug = opts?.bySlug ?? false;
  return useQuery({
    queryKey: ["car", bySlug ? "slug" : "id", idOrSlug],
    queryFn: async () => {
      if (!idOrSlug) return null;
      const q = supabase.from("cars").select("*, locations(name, slug)").eq("is_active", true);
      const { data, error } = await (bySlug
        ? q.eq("slug", idOrSlug).maybeSingle()
        : q.eq("id", idOrSlug).maybeSingle());
      if (error) throw error;
      return data ? mapDbCarToCar(data as unknown as CarRowWithLocation) : null;
    },
    enabled: !!idOrSlug,
  });
}
