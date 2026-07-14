import { auth, defineMcp } from "@lovable.dev/mcp-js";
import listCarsTool from "./tools/list_cars";
import getCarTool from "./tools/get_car";
import listLocationsTool from "./tools/list_locations";
import listMyParticipationsTool from "./tools/list_my_participations";
import listMyReservationsTool from "./tools/list_my_reservations";

// The OAuth issuer must be the direct Supabase host (not the .lovable.cloud proxy).
// VITE_SUPABASE_PROJECT_ID is inlined at build time so this stays import-safe.
const projectRef = import.meta.env.VITE_SUPABASE_PROJECT_ID ?? "project-ref-unset";

export default defineMcp({
  name: "owneo-mcp",
  title: "Owneo",
  version: "0.1.0",
  instructions:
    "Owneo is a luxury supercar co-sharing platform in Spain (10% participations, 4 weeks/year per share). Use `list_cars`, `get_car`, and `list_locations` for the public catalog. Use `list_my_participations` and `list_my_reservations` to read the signed-in user's own data (RLS-scoped).",
  auth: auth.oauth.issuer({
    issuer: `https://${projectRef}.supabase.co/auth/v1`,
    acceptedAudiences: "authenticated",
  }),
  tools: [
    listCarsTool,
    getCarTool,
    listLocationsTool,
    listMyParticipationsTool,
    listMyReservationsTool,
  ],
});
