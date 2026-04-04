import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { resolveAssetPath } from "@/lib/assetMap";
import type { Tables } from "@/integrations/supabase/types";

export interface Car {
  id: string;
  name: string;
  brand: string;
  model: string;
  year: number;
  price: string;
  image: string;
  gallery?: string[];
  category: string;
  description: string;
  luxuryDescription: string;
  specifications: Record<string, string>;
  features: string[];
  availableIn: string[];
}

function mapDbCarToCar(row: Tables<"cars">): Car {
  const priceFormatted = `€${Number(row.price).toLocaleString("en-US")}`;
  return {
    id: row.id,
    name: row.name,
    brand: row.brand,
    model: row.model,
    year: row.year,
    price: priceFormatted,
    image: resolveAssetPath(row.image_url),
    gallery: row.gallery?.map(resolveAssetPath),
    category: row.category || "",
    description: row.description || "",
    luxuryDescription: row.luxury_description || "",
    specifications: (row.specifications as Record<string, string>) || {},
    features: row.features || [],
    availableIn: row.available_in || [],
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
