import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

export interface DocumentType {
  id: string;
  name: string;
  description: string | null;
  is_required: boolean;
  applies_to: string;
  sort_order: number;
  is_active: boolean;
}

export interface ParticipantDocument {
  id: string;
  user_id: string;
  document_type_id: string;
  file_url: string;
  file_name: string | null;
  file_size: number | null;
  status: "pending" | "validated" | "rejected";
  notes: string | null;
  reviewed_by: string | null;
  reviewed_at: string | null;
  uploaded_by: "admin" | "user";
  created_at: string;
  updated_at: string;
}

export function useDocumentTypes(includeInactive = false) {
  return useQuery({
    queryKey: ["document_types", includeInactive],
    queryFn: async () => {
      let q = supabase.from("document_types" as any).select("*").order("sort_order");
      if (!includeInactive) q = q.eq("is_active", true);
      const { data, error } = await q;
      if (error) throw error;
      return (data || []) as unknown as DocumentType[];
    },
  });
}

export function useParticipantDocuments(userId?: string) {
  return useQuery({
    queryKey: ["participant_documents", userId],
    queryFn: async () => {
      if (!userId) return [];
      const { data, error } = await supabase
        .from("participant_documents" as any)
        .select("*")
        .eq("user_id", userId)
        .order("created_at", { ascending: false });
      if (error) throw error;
      return (data || []) as unknown as ParticipantDocument[];
    },
    enabled: !!userId,
  });
}

export function useAllParticipantDocuments() {
  return useQuery({
    queryKey: ["participant_documents", "all"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("participant_documents" as any)
        .select("*");
      if (error) throw error;
      return (data || []) as unknown as ParticipantDocument[];
    },
  });
}

export async function uploadParticipantDocument(params: {
  userId: string;
  documentTypeId: string;
  file: File;
  uploadedBy: "admin" | "user";
}) {
  const { userId, documentTypeId, file, uploadedBy } = params;
  const ext = file.name.split(".").pop() || "bin";
  const safeName = file.name.replace(/[^a-zA-Z0-9._-]/g, "_");
  const path = `kyc/${userId}/${documentTypeId}-${Date.now()}-${safeName}`;
  const { error: upErr } = await supabase.storage
    .from("documents")
    .upload(path, file, { upsert: false });
  if (upErr) throw upErr;
  const { error: insErr } = await supabase.from("participant_documents" as any).insert({
    user_id: userId,
    document_type_id: documentTypeId,
    file_url: path,
    file_name: file.name,
    file_size: file.size,
    status: "pending",
    uploaded_by: uploadedBy,
  });
  if (insErr) throw insErr;
}

export function useUpdateDocumentStatus() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (params: { id: string; status: string; notes?: string | null }) => {
      const { error } = await supabase
        .from("participant_documents" as any)
        .update({
          status: params.status,
          notes: params.notes ?? null,
          reviewed_at: new Date().toISOString(),
        })
        .eq("id", params.id);
      if (error) throw error;
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["participant_documents"] });
      toast.success("Estado actualizado");
    },
    onError: (e: any) => toast.error(e.message),
  });
}

export function getDocStatus(
  userId: string,
  types: DocumentType[],
  docs: ParticipantDocument[]
): "completo" | "pendiente" | "incompleto" {
  const required = types.filter((t) => t.is_required && t.is_active);
  const userDocs = docs.filter((d) => d.user_id === userId);
  let validated = 0;
  let pending = 0;
  for (const t of required) {
    const d = userDocs.find((x) => x.document_type_id === t.id);
    if (d?.status === "validated") validated++;
    else if (d?.status === "pending") pending++;
  }
  if (validated === required.length) return "completo";
  if (pending > 0) return "pendiente";
  return "incompleto";
}
