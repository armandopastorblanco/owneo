export interface StorageObjectRef {
  bucket: string;
  filePath: string;
}

const STORAGE_MARKERS = [
  "/storage/v1/object/public/",
  "/storage/v1/object/sign/",
  "/storage/v1/object/authenticated/",
];

export const parseStorageObjectRef = (
  fileRef: string,
  defaultBucket = "documents"
): StorageObjectRef | null => {
  if (!fileRef) return null;

  const trimmed = fileRef.trim();
  if (!trimmed) return null;

  for (const marker of STORAGE_MARKERS) {
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