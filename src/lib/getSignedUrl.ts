import { supabase } from "@/integrations/supabase/client";

/**
 * Genera una signed URL para un archivo del bucket privado.
 * Acepta tanto URLs públicas completas como paths directos del bucket.
 */
export const getSignedUrl = async (
  fileUrl: string,
  expiresIn: number = 300
): Promise<string | null> => {
  try {
    if (!fileUrl) return null;

    let bucket = "documents";
    let filePath = fileUrl;

    // URL pública estándar de Supabase
    const publicMarker = "/storage/v1/object/public/";
    const signMarker = "/storage/v1/object/sign/";
    if (fileUrl.includes(publicMarker)) {
      const after = fileUrl.split(publicMarker)[1];
      const parts = after.split("/");
      bucket = parts[0];
      filePath = decodeURIComponent(parts.slice(1).join("/"));
    } else if (fileUrl.includes(signMarker)) {
      const after = fileUrl.split(signMarker)[1].split("?")[0];
      const parts = after.split("/");
      bucket = parts[0];
      filePath = decodeURIComponent(parts.slice(1).join("/"));
    }

    const { data, error } = await supabase.storage
      .from(bucket)
      .createSignedUrl(filePath, expiresIn);

    if (error || !data) return null;
    return data.signedUrl;
  } catch {
    return null;
  }
};

export const getSignedUrls = async (
  fileUrls: string[],
  expiresIn: number = 300
): Promise<Record<string, string>> => {
  const results: Record<string, string> = {};
  await Promise.all(
    fileUrls.map(async (url) => {
      const signed = await getSignedUrl(url, expiresIn);
      if (signed) results[url] = signed;
    })
  );
  return results;
};
