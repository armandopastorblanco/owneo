import { supabase } from "@/integrations/supabase/client";
import { parseStorageObjectRef } from "@/lib/storageObject";

const toAbsoluteSignedUrl = (signedUrl: string | null | undefined): string | null => {
  if (!signedUrl) return null;
  if (/^https?:\/\//i.test(signedUrl)) return signedUrl;

  const baseUrl = import.meta.env.VITE_SUPABASE_URL;
  if (!baseUrl) return signedUrl;

  return `${baseUrl.replace(/\/$/, "")}/${signedUrl.replace(/^\//, "")}`;
};

/**
 * Genera una signed URL para un archivo del bucket privado.
 * Acepta tanto URLs públicas completas como paths directos del bucket.
 */
export const getSignedUrl = async (
  fileUrl: string,
  expiresIn: number = 300,
  options?: { carId?: string | null }
): Promise<string | null> => {
  try {
    if (!fileUrl) return null;

    const ref = parseStorageObjectRef(fileUrl);
    if (!ref) return null;

    const { data: functionData, error: functionError } = await supabase.functions.invoke("document-signed-url", {
      body: {
        fileUrl,
        expiresIn,
        carId: options?.carId ?? null,
      },
    });

    if (!functionError && functionData?.signedUrl) {
      return toAbsoluteSignedUrl(functionData.signedUrl);
    }

    const { data, error } = await supabase.storage
      .from(ref.bucket)
      .createSignedUrl(ref.filePath, expiresIn);

    if (error || !data) return null;
    return toAbsoluteSignedUrl(data.signedUrl);
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
