import { useState } from "react";
import { useTranslation } from "react-i18next";
import {
  ChevronDown, ChevronUp, Eye, Download, Loader2,
  Car, User, BadgeCheck, FileSignature, FileText, Landmark, CreditCard,
  Shield, ClipboardCheck, Banknote, Settings2, ScrollText, BookOpen,
  Home, File,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Tooltip, TooltipContent, TooltipProvider, TooltipTrigger,
} from "@/components/ui/tooltip";
import { getSignedUrl } from "@/lib/getSignedUrl";
import { toast } from "sonner";
import { Link } from "react-router-dom";


type Variant = "vehicle" | "user";

export interface DocItem {
  id: string;
  typeName: string;
  fileUrl?: string | null;
  fileName?: string | null;
  status?: "pending" | "validated" | "rejected" | null;
  notes?: string | null;
  uploaded?: boolean;
}

interface Props {
  variant: Variant;
  title: string;
  items: DocItem[];
  carId?: string | null;
  emptyText?: string;
  manageHref?: string; // for "Mis documentos"
}

const iconForType = (name: string) => {
  const n = (name || "").toLowerCase();
  if (n.includes("dni") || n.includes("pasaporte") || n.includes("identidad")) return BadgeCheck;
  if (n.includes("conducir") || n.includes("carnet")) return Car;
  if (n.includes("contrato")) return FileSignature;
  if (n.includes("banc") || n.includes("iban")) return Landmark;
  if (n.includes("tarjeta")) return CreditCard;
  if (n.includes("seguro")) return Shield;
  if (n.includes("itv")) return ClipboardCheck;
  if (n.includes("ingreso") || n.includes("nómina") || n.includes("nomina")) return Banknote;
  if (n.includes("ficha técnica") || n.includes("ficha tecnica")) return Settings2;
  if (n.includes("permiso") || n.includes("circulación") || n.includes("circulacion")) return ScrollText;
  if (n.includes("manual")) return BookOpen;
  if (n.includes("propiedad") || n.includes("domicilio")) return Home;
  return File;
};

const StatusBadge = ({ status, notes }: { status?: string | null; notes?: string | null }) => {
  const { t } = useTranslation();
  if (!status) return null;
  if (status === "pending")
    return <Badge className="bg-amber-500/15 text-amber-300 border-amber-500/30 text-[10px]">{t("dash.doc_status_pending")}</Badge>;
  if (status === "validated")
    return <Badge className="bg-emerald-500/15 text-emerald-300 border-emerald-500/30 text-[10px]">{t("dash.doc_status_validated")}</Badge>;
  if (status === "rejected") {
    const badge = (
      <Badge className="bg-destructive/20 text-destructive border-destructive/30 text-[10px] cursor-help">
        {t("dash.doc_status_rejected")}
      </Badge>
    );
    if (!notes) return badge;
    return (
      <TooltipProvider delayDuration={150}>
        <Tooltip>
          <TooltipTrigger asChild><span>{badge}</span></TooltipTrigger>
          <TooltipContent side="top" className="max-w-xs">
            <p className="text-xs">{notes}</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    );
  }
  return null;
};

const DocRow = ({
  item, variant, carId,
}: { item: DocItem; variant: Variant; carId?: string | null }) => {
  const { t } = useTranslation();
  const [viewing, setViewing] = useState(false);
  const [downloading, setDownloading] = useState(false);
  const TypeIcon = iconForType(item.typeName);

  const handleView = async () => {
    if (!item.fileUrl) return;
    setViewing(true);
    try {
      const url = await getSignedUrl(item.fileUrl, 300, { carId });
      if (url) window.open(url, "_blank", "noopener,noreferrer");
      else toast.error("No se pudo abrir el documento.");
    } finally { setViewing(false); }
  };
  const handleDownload = async () => {
    if (!item.fileUrl) return;
    setDownloading(true);
    try {
      const url = await getSignedUrl(item.fileUrl, 60, { carId });
      if (!url) { toast.error("No se pudo descargar el documento."); return; }
      const res = await fetch(url);
      if (!res.ok) throw new Error();
      const blob = await res.blob();
      const blobUrl = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = blobUrl;
      a.download = item.fileName || item.typeName || "documento";
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      setTimeout(() => URL.revokeObjectURL(blobUrl), 1000);
    } catch {
      toast.error("No se pudo descargar el documento.");
    } finally { setDownloading(false); }
  };

  const uploaded = !!item.fileUrl;

  return (
    <div
      className={`flex items-center gap-3 py-2.5 border-b border-border/20 last:border-b-0 ${
        !uploaded ? "opacity-50" : ""
      }`}
    >
      <TypeIcon className="h-4 w-4 text-muted-foreground shrink-0" />
      <span className="font-medium text-sm text-foreground flex-1 min-w-0 truncate">
        {item.typeName}
      </span>

      {variant === "user" && uploaded && (
        <StatusBadge status={item.status} notes={item.notes} />
      )}

      {uploaded ? (
        <div className="flex items-center gap-1 shrink-0">
          <Button variant="ghost" size="sm" className="h-8 px-2" onClick={handleView} disabled={viewing}>
            {viewing ? <Loader2 className="h-4 w-4 animate-spin" /> : <Eye className="h-4 w-4" />}
          </Button>
          <Button variant="ghost" size="sm" className="h-8 px-2" onClick={handleDownload} disabled={downloading}>
            {downloading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Download className="h-4 w-4" />}
          </Button>
        </div>
      ) : (
        <Badge variant="secondary" className="text-[10px] shrink-0">{t("dash.doc_pending")}</Badge>
      )}
    </div>
  );
};

const DocumentsBlock = ({ variant, title, items, carId, emptyText, manageHref }: Props) => {
  const { t } = useTranslation();
  const [open, setOpen] = useState(false);
  const HeaderIcon = variant === "vehicle" ? Car : User;

  return (
    <div className="rounded-xl border border-border bg-card overflow-hidden">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="w-full flex items-center gap-3 p-4 hover:bg-muted/20 transition-colors"
        aria-expanded={open}
      >
        <HeaderIcon className="h-5 w-5 text-foreground shrink-0" />
        <span className="font-semibold text-base text-foreground flex-1 text-left">{title}</span>
        <span className="text-xs text-muted-foreground mr-1">
          {items.filter((i) => i.fileUrl).length}{variant === "user" ? `/${items.length}` : ""}
        </span>
        {open ? <ChevronUp className="h-5 w-5 text-muted-foreground" /> : <ChevronDown className="h-5 w-5 text-muted-foreground" />}
      </button>

      <div
        className={`grid transition-all duration-300 ease-in-out ${
          open ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
        }`}
      >
        <div className="overflow-hidden">
          <div className="px-4 pb-4">
            {items.length === 0 ? (
              <p className="text-sm text-muted-foreground text-center py-4">
                {emptyText || t("dash.doc_empty")}
              </p>
            ) : (
              <div className="divide-y divide-border/20">
                {items.map((it) => (
                  <DocRow key={it.id} item={it} variant={variant} carId={carId} />
                ))}
              </div>
            )}
            {variant === "user" && manageHref && (
              <Link to={manageHref} className="block mt-3">
                <Button variant="outline" size="sm" className="w-full">{t("dash.doc_manage")}</Button>
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DocumentsBlock;
