import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { resolveAssetPath } from "@/lib/assetMap";

export interface City {
  id: string;
  name: string;
  description: string;
  image: string;
}

export function useLocations() {
  return useQuery({
    queryKey: ["locations"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("locations")
        .select("*")
        .eq("is_active", true)
        .order("sort_order");
      if (error) throw error;
      return data.map((row): City => ({
        id: row.id,
        name: row.name,
        description: row.description || "",
        image: resolveAssetPath(row.image_url),
      }));
    },
  });
}
