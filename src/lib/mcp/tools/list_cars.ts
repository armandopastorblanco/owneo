import { createClient } from "@supabase/supabase-js";
import { defineTool } from "@lovable.dev/mcp-js";
import { z } from "zod";

export default defineTool({
  name: "list_cars",
  title: "List supercars",
  description:
    "List Owneo's active supercar catalog with brand, model, year, city, participation price and remaining participations.",
  inputSchema: {
    city_slug: z
      .string()
      .optional()
      .describe("Optional city slug filter (e.g. madrid, barcelona)."),
    limit: z.number().int().min(1).max(50).optional().describe("Max rows (default 20)."),
  },
  annotations: { readOnlyHint: true, idempotentHint: true, openWorldHint: false },
  handler: async ({ city_slug, limit }) => {
    const supabase = createClient(
      process.env.SUPABASE_URL!,
      process.env.SUPABASE_PUBLISHABLE_KEY!,
      { auth: { persistSession: false, autoRefreshToken: false } },
    );
    let query = supabase
      .from("cars")
      .select("id, slug, name, brand, model, year, price, category, status, max_participations, locations(name, slug)")
      .eq("status", "active")
      .limit(limit ?? 20);
    const { data, error } = await query;
    if (error) return { content: [{ type: "text", text: error.message }], isError: true };
    const rows = (data ?? []).filter((r: any) =>
      city_slug ? r.locations?.slug === city_slug : true,
    );
    return {
      content: [{ type: "text", text: JSON.stringify(rows) }],
      structuredContent: { cars: rows },
    };
  },
});
