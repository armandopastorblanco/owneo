import { createClient } from "https://esm.sh/@supabase/supabase-js@2.57.4";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const parseStorageObjectRef = (fileRef: string, defaultBucket = "documents") => {
  if (!fileRef) return null;

  const trimmed = fileRef.trim();
  if (!trimmed) return null;

  const markers = [
    "/storage/v1/object/public/",
    "/storage/v1/object/sign/",
    "/storage/v1/object/authenticated/",
  ];

  for (const marker of markers) {
    if (trimmed.includes(marker)) {
      const afterMarker = trimmed.split(marker)[1]?.split("?")[0];
      if (!afterMarker) return null;

      const [bucket, ...rest] = afterMarker.split("/");
      const filePath = decodeURIComponent(rest.join("/"));
      if (!bucket || !filePath) return null;
      return { bucket, filePath };
    }
  }

  if (/^https?:\/\//i.test(trimmed)) return null;

  const normalized = trimmed.replace(/^\/+/, "");
  if (!normalized) return null;

  if (normalized.startsWith(`${defaultBucket}/`)) {
    return {
      bucket: defaultBucket,
      filePath: decodeURIComponent(normalized.slice(defaultBucket.length + 1)),
    };
  }

  return {
    bucket: defaultBucket,
    filePath: decodeURIComponent(normalized),
  };
};

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const authHeader = req.headers.get("Authorization");
    if (!authHeader) {
      return new Response(JSON.stringify({ error: "No autenticado" }), {
        status: 401,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const serviceRoleKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;

    const serviceClient = createClient(supabaseUrl, serviceRoleKey);

    const token = authHeader.replace(/^Bearer\s+/i, "").trim();
    const { data: userData, error: userError } = await serviceClient.auth.getUser(token);
    if (userError || !userData.user) {
      return new Response(JSON.stringify({ error: "Sesión no válida" }), {
        status: 401,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const body = await req.json();
    const fileUrl = typeof body?.fileUrl === "string" ? body.fileUrl : "";
    const expiresIn = Math.min(Math.max(Number(body?.expiresIn ?? 300), 60), 3600);
    const carId = typeof body?.carId === "string" ? body.carId : null;

    const ref = parseStorageObjectRef(fileUrl);
    if (!ref || ref.bucket !== "documents") {
      return new Response(JSON.stringify({ error: "Referencia de archivo no válida" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const userId = userData.user.id;

    const { data: roleRows } = await serviceClient
      .from("user_roles")
      .select("role")
      .eq("user_id", userId);

    const roles = new Set((roleRows || []).map((row: any) => row.role));
    const isAdmin = roles.has("superadmin") || roles.has("city_manager");

    let authorized = false;

    if (isAdmin) {
      authorized = true;
    } else if (carId) {
      const { data: accessRow } = await serviceClient
        .from("validated_participations")
        .select("id")
        .eq("user_id", userId)
        .eq("car_id", carId)
        .limit(1)
        .maybeSingle();

      authorized = !!accessRow;
    } else {
      const { data: ownDoc } = await serviceClient
        .from("participant_documents")
        .select("id")
        .eq("user_id", userId)
        .eq("file_url", fileUrl)
        .limit(1)
        .maybeSingle();

      if (ownDoc) {
        authorized = true;
      } else {
        const { data: ownDocByPath } = await serviceClient
          .from("participant_documents")
          .select("id")
          .eq("user_id", userId)
          .eq("file_url", ref.filePath)
          .limit(1)
          .maybeSingle();

        authorized = !!ownDocByPath;
      }
    }

    if (!authorized) {
      return new Response(JSON.stringify({ error: "No tienes acceso a este documento" }), {
        status: 403,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const { data, error } = await serviceClient.storage
      .from(ref.bucket)
      .createSignedUrl(ref.filePath, expiresIn);

    if (error || !data?.signedUrl) {
      return new Response(JSON.stringify({ error: error?.message || "No se pudo firmar el documento" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    return new Response(JSON.stringify({ signedUrl: data.signedUrl }), {
      status: 200,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: error instanceof Error ? error.message : "Error inesperado" }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
