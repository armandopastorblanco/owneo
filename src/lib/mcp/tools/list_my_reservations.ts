import { createClient } from "@supabase/supabase-js";
import { defineTool, type ToolContext } from "@lovable.dev/mcp-js";
import { z } from "zod";

function supabaseForUser(ctx: ToolContext) {
  return createClient(process.env.SUPABASE_URL!, process.env.SUPABASE_PUBLISHABLE_KEY!, {
    global: { headers: { Authorization: `Bearer ${ctx.getToken()}` } },
    auth: { persistSession: false, autoRefreshToken: false },
  });
}

export default defineTool({
  name: "list_my_reservations",
  title: "List my reservations",
  description:
    "List the signed-in user's Owneo reservations (dates, car, status, credits used). Optionally filter by status.",
  inputSchema: {
    status: z
      .enum(["pending", "confirmed", "cancelled", "completed"])
      .optional()
      .describe("Optional reservation status filter."),
  },
  annotations: { readOnlyHint: true, idempotentHint: true, openWorldHint: false },
  handler: async ({ status }, ctx) => {
    if (!ctx.isAuthenticated())
      return { content: [{ type: "text", text: "Not authenticated" }], isError: true };
    let query = supabaseForUser(ctx)
      .from("reservations")
      .select(
        "id, start_date, end_date, status, reservation_type, credits_used, standard_credits_used, premium_credits_used, cars(slug, brand, model)",
      )
      .eq("user_id", ctx.getUserId()!)
      .order("start_date", { ascending: false });
    if (status) query = query.eq("status", status);
    const { data, error } = await query;
    if (error) return { content: [{ type: "text", text: error.message }], isError: true };
    return {
      content: [{ type: "text", text: JSON.stringify(data) }],
      structuredContent: { reservations: data },
    };
  },
});
