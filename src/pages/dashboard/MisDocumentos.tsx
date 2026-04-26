import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { Link } from "react-router-dom";
import { ArrowLeft, Upload, CheckCircle2, Clock, XCircle, FileText, Download, ExternalLink } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Skeleton } from "@/components/ui/skeleton";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { toast } from "sonner";
import { useDocumentTypes, useParticipantDocuments, uploadParticipantDocument } from "@/hooks/useDocuments";
import { format } from "date-fns";
import { es } from "date-fns/locale";

const MisDocumentos = () => {
  const { user } = useAuth();
  const { data: types = [], isLoading: lt } = useDocumentTypes();
  const { data: docs = [], isLoading: ld, refetch } = useParticipantDocuments(user?.id);

  const required = types.filter((t) => t.is_required);
  const validatedRequired = required.filter((t) =>
    docs.find((d) => d.document_type_id === t.id && d.status === "validated")
  ).length;

  const [uploadingId, setUploadingId] = useState<string | null>(null);
  const onFile = async (typeId: string, f: File) => {
    if (!user) return;
    if (f.size > 10 * 1024 * 1024) return toast.error("Máx. 10MB");
    setUploadingId(typeId);
    try {
      await uploadParticipantDocument({ userId: user.id, documentTypeId: typeId, file: f, uploadedBy: "user" });
      toast.success("Documento subido. En revisión.");
      refetch();
    } catch (e: any) { toast.error(e.message); }
    setUploadingId(null);
  };

  return (
    <div className="min-h-screen bg-background py-8 px-4">
      <div className="max-w-4xl mx-auto space-y-6">
        <Link to="/dashboard" className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground">
          <ArrowLeft className="h-4 w-4 mr-1" /> Volver al panel
        </Link>

        <div>
          <h1 className="text-3xl font-bold">Mis documentos</h1>
          <p className="text-muted-foreground mt-1">Gestiona tu documentación KYC y contractual.</p>
        </div>

        <Card><CardContent className="p-4">
          <div className="flex justify-between text-sm mb-2">
            <span>Documentos obligatorios validados</span>
            <span className="font-semibold">{validatedRequired}/{required.length}</span>
          </div>
          <Progress value={required.length ? (validatedRequired / required.length) * 100 : 0} />
        </CardContent></Card>

        <Alert>
          <AlertDescription>
            Tus documentos serán revisados por nuestro equipo en un plazo de 48 horas.
          </AlertDescription>
        </Alert>

        {lt || ld ? <Skeleton className="h-64" /> : (
          <div className="space-y-3">
            {types.map((t) => {
              const doc = docs.find((d) => d.document_type_id === t.id);
              const status = doc?.status || "none";
              return (
                <Card key={t.id}><CardContent className="p-4">
                  <div className="flex items-start justify-between gap-4 flex-wrap">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <FileText className="h-4 w-4 text-muted-foreground" />
                        <h3 className="font-medium">{t.name}</h3>
                        <Badge variant="outline" className="text-xs">
                          {t.is_required ? "Obligatorio" : "Opcional"}
                        </Badge>
                      </div>
                      {t.description && <p className="text-xs text-muted-foreground mt-1">{t.description}</p>}
                    </div>
                    <StatusBadge status={status} />
                  </div>

                  <div className="mt-4">
                    {status === "validated" && doc && (
                      <div className="flex items-center gap-2 text-sm">
                        <CheckCircle2 className="h-4 w-4 text-emerald-300" />
                        <span className="text-muted-foreground">{doc.file_name}</span>
                        <Button variant="ghost" size="sm" asChild>
                          <a href={doc.file_url} target="_blank" rel="noreferrer"><ExternalLink className="h-3 w-3" /></a>
                        </Button>
                      </div>
                    )}
                    {status === "pending" && (
                      <p className="text-sm text-amber-300">En revisión por nuestro equipo.</p>
                    )}
                    {status === "rejected" && doc && (
                      <div className="space-y-2">
                        <Alert variant="destructive">
                          <AlertDescription>
                            <strong>Motivo del rechazo:</strong> {doc.notes || "Sin detalles"}
                          </AlertDescription>
                        </Alert>
                        <UploadButton id={t.id} onFile={onFile} loading={uploadingId === t.id} label="Volver a subir" />
                      </div>
                    )}
                    {status === "none" && (
                      <UploadButton id={t.id} onFile={onFile} loading={uploadingId === t.id} />
                    )}
                  </div>
                </CardContent></Card>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

const StatusBadge = ({ status }: { status: string }) => {
  const map: any = {
    validated: { cls: "bg-emerald-500/20 text-emerald-300", icon: CheckCircle2, label: "Validado" },
    pending: { cls: "bg-amber-500/20 text-amber-300", icon: Clock, label: "En revisión" },
    rejected: { cls: "bg-destructive/20 text-destructive", icon: XCircle, label: "Rechazado" },
    none: { cls: "bg-muted text-muted-foreground", icon: Upload, label: "Sin subir" },
  };
  const c = map[status];
  const Icon = c.icon;
  return <Badge className={c.cls}><Icon className="h-3 w-3 mr-1" />{c.label}</Badge>;
};

const UploadButton = ({ id, onFile, loading, label = "Subir documento" }: any) => (
  <label className="block border-2 border-dashed border-border rounded-lg p-4 text-center cursor-pointer hover:border-primary/40">
    <input type="file" className="hidden" accept=".pdf,.jpg,.jpeg,.png,.webp"
      onChange={(e) => e.target.files?.[0] && onFile(id, e.target.files[0])} />
    <Upload className="h-5 w-5 mx-auto text-muted-foreground mb-1" />
    <p className="text-sm">{loading ? "Subiendo…" : label}</p>
    <p className="text-xs text-muted-foreground mt-1">PDF, JPG, PNG · máx. 10MB</p>
  </label>
);

export default MisDocumentos;
