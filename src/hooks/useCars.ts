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
  specifications: Record<string, string>;
  features: string[];
  availableIn: string[];
  maxParticipations: number;
  remainingParticipations: number;
  participationPrice: number;
  promotion: CarPromotion | null;
  status: string;
}

function mapDbCarToCar(row: Tables<"cars">): Car {
  const numPrice = Number(row.price);
  const priceFormatted = `€${numPrice.toLocaleString("en-US")}`;
  const rawPromo = (row as unknown as Record<string, unknown>).promotion as CarPromotion | null;
  return {
    id: row.id,
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
    specifications: (row.specifications as Record<string, string>) || {},
    features: row.features || [],
    availableIn: row.available_in || [],
    maxParticipations: row.max_participations || 10,
    remainingParticipations: row.remaining_participations ?? 10,
    participationPrice: Number(row.participation_price) || Math.round(numPrice * 0.1),
    promotion: rawPromo?.is_active ? rawPromo : null,
    status: row.status || "active",
  };
}

export function useCars() {
  return useQuery({
    queryKey: ["cars"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("cars")
        .select("*")
        .eq("is_active", true)
        .order("name");
      if (error) throw error;
      return data.map(mapDbCarToCar);
    },
  });
}

export function useCar(id: string | undefined) {
  return useQuery({
    queryKey: ["car", id],
    queryFn: async () => {
      if (!id) return null;
      const { data, error } = await supabase
        .from("cars")
        .select("*")
        .eq("id", id)
        .eq("is_active", true)
        .maybeSingle();
      if (error) throw error;
      return data ? mapDbCarToCar(data) : null;
    },
    enabled: !!id,
  });
}
