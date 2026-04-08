import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Skeleton } from "@/components/ui/skeleton";
import { toast } from "sonner";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import { CreditCard, Euro, Clock, CheckCircle, AlertCircle, Copy } from "lucide-react";

const AdminPagos = () => {
  const queryClient = useQueryClient();
  const [tab, setTab] = useState("all");

  const { data: payments = [], isLoading } = useQuery({
    queryKey: ["admin-pagos"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("bank_reconciliation")
        .select("*, profiles:user_id(name,surname,email,iban), participation_requests:participation_request_id(car_id,num_participations,payment_amount,cars:car_id(id,name,remaining_participations,max_participations,status,participation_price))")
        .order("created_at", { ascending: false });
      if (error) throw error;
      return data || [];
    },
    refetchInterval: 30000,
  });

  // Summary
  const totalExpected = payments.reduce((s: number, p: any) => s + (Number(p.expected_amount) || 0), 0);
  const totalValidated = payments.filter((p: any) => p.status === "validated").reduce((s: number, p: any) => s + (Number(p.expected_amount) || 0), 0);
  const totalPending = totalExpected - totalValidated;

  // Mark as received
  const markReceivedMutation = useMutation({
    mutationFn: async (paymentId: string) => {
      const { error } = await supabase
        .from("bank_reconciliation")
        .update({ status: "matched", matched_at: new Date().toISOString() })
        .eq("id", paymentId);
      if (error) throw error;
      await supabase.rpc("insert_audit_log", {
        _action: "pago_recibido",
        _target_table: "bank_reconciliation",
        _target_id: paymentId,
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-pagos"] });
      toast.success("Pago marcado como recibido");
    },
    onError: () => toast.error("Error al actualizar"),
  });

  // Validate payment (full flow)
  const validateMutation = useMutation({
    mutationFn: async (payment: any) => {
      const req = payment.participation_requests as any;
      const car = req?.cars as any;
      const numParts = req?.num_participations || 1;

      // 1. Update bank_reconciliation
      const { error: e1 } = await supabase
        .from("bank_reconciliation")
        .update({ status: "validated" })
        .eq("id", payment.id);
      if (e1) throw e1;

      // 2. Update participation_request payment_status
      const { error: e2 } = await supabase
        .from("participation_requests")
        .update({ payment_status: "validated" })
        .eq("id", payment.participation_request_id);
      if (e2) throw e2;

      // 3. Create validated_participations
      const partEntries = Array.from({ length: numParts }, (_, i) => ({
        request_id: payment.participation_request_id,
        user_id: payment.user_id,
        car_id: req.car_id,
        participation_number: (car?.max_participations || 10) - (car?.remaining_participations || 10) + i + 1,
        credits_per_year: 28,
        credits_remaining: 28,
        credits_used_this_year: 0,
        credits_reset_date: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString().split("T")[0],
      }));

      const { error: e3 } = await supabase.from("validated_participations").insert(partEntries);
      if (e3) throw e3;

      // 4. Update car remaining_participations
      const newRemaining = Math.max(0, (car?.remaining_participations || 10) - numParts);
      const updates: any = { remaining_participations: newRemaining };
      if (newRemaining === 0) updates.status = "complete";

      const { error: e4 } = await supabase.from("cars").update(updates).eq("id", req.car_id);
      if (e4) throw e4;

      // 5. Audit log
      await supabase.rpc("insert_audit_log", {
        _action: "pago_validado_participacion_creada",
        _target_table: "bank_reconciliation",
        _target_id: payment.id,
        _details: {
          num_participations: numParts,
          amount: payment.expected_amount,
          car_id: req.car_id,
          remaining_after: newRemaining,
        },
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-pagos"] });
      queryClient.invalidateQueries({ queryKey: ["admin-validated-parts"] });
      toast.success("Pago validado — participación creada con éxito");
    },
    onError: (err) => toast.error(`Error: ${err.message}`),
  });

  const filtered = payments.filter((p: any) => tab === "all" || p.status === tab);

  const statusBadge = (status: string) => {
    if (status === "validated") return <Badge variant="default">Validado</Badge>;
    if (status === "matched") return <Badge className="bg-blue-500/20 text-blue-400 border-blue-500/30">Recibido</Badge>;
    if (status === "failed") return <Badge variant="destructive">Fallido</Badge>;
    return <Badge variant="secondary">Pendiente</Badge>;
  };

  const copyRef = (ref: string) => {
    navigator.clipboard.writeText(ref);
    toast.success("Referencia copiada");
  };

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-foreground flex items-center gap-2">
        <CreditCard className="h-6 w-6" /> Gestión de Pagos
      </h1>

      {/* Financial Summary */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-full bg-muted flex items-center justify-center">
                <Euro className="h-5 w-5 text-muted-foreground" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Total Esperado</p>
                <p className="text-2xl font-bold text-foreground">€{totalExpected.toLocaleString()}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-full bg-green-500/20 flex items-center justify-center">
                <CheckCircle className="h-5 w-5 text-green-500" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Total Validado</p>
                <p className="text-2xl font-bold text-green-500">€{totalValidated.toLocaleString()}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-full bg-orange-500/20 flex items-center justify-center">
                <Clock className="h-5 w-5 text-orange-500" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">En Espera</p>
                <p className="text-2xl font-bold text-orange-500">€{totalPending.toLocaleString()}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs value={tab} onValueChange={setTab}>
        <TabsList>
          <TabsTrigger value="all">Todos ({payments.length})</TabsTrigger>
          <TabsTrigger value="pending">Pendientes ({payments.filter((p: any) => p.status === "pending").length})</TabsTrigger>
          <TabsTrigger value="matched">Recibidos ({payments.filter((p: any) => p.status === "matched").length})</TabsTrigger>
          <TabsTrigger value="validated">Validados ({payments.filter((p: any) => p.status === "validated").length})</TabsTrigger>
        </TabsList>

        <TabsContent value={tab} className="mt-4">
          {isLoading ? (
            <div className="space-y-3">{[...Array(5)].map((_, i) => <Skeleton key={i} className="h-14 w-full" />)}</div>
          ) : filtered.length === 0 ? (
            <Card><CardContent className="py-12 text-center text-muted-foreground">No hay pagos en esta categoría</CardContent></Card>
          ) : (
            <Card>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Referencia</TableHead>
                    <TableHead>Participante</TableHead>
                    <TableHead className="hidden md:table-cell">Vehículo</TableHead>
                    <TableHead>Montante</TableHead>
                    <TableHead className="hidden lg:table-cell">IBAN</TableHead>
                    <TableHead>Estado</TableHead>
                    <TableHead className="hidden md:table-cell">Fecha</TableHead>
                    <TableHead>Acciones</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filtered.map((p: any) => {
                    const profile = p.profiles as any;
                    const req = p.participation_requests as any;
                    const car = req?.cars as any;
                    return (
                      <TableRow key={p.id}>
                        <TableCell>
                          <button onClick={() => copyRef(p.reference_code || "")} className="flex items-center gap-1 font-mono text-sm text-primary hover:underline">
                            {p.reference_code || "—"}
                            <Copy className="h-3 w-3" />
                          </button>
                        </TableCell>
                        <TableCell>
                          <div className="font-medium text-foreground">{profile?.name} {profile?.surname}</div>
                          <div className="text-xs text-muted-foreground">{profile?.email}</div>
                        </TableCell>
                        <TableCell className="hidden md:table-cell text-foreground">{car?.name || "—"}</TableCell>
                        <TableCell className="font-semibold text-foreground">€{Number(p.expected_amount || 0).toLocaleString()}</TableCell>
                        <TableCell className="hidden lg:table-cell text-muted-foreground text-xs font-mono">{profile?.iban || "—"}</TableCell>
                        <TableCell>{statusBadge(p.status)}</TableCell>
                        <TableCell className="hidden md:table-cell text-muted-foreground text-sm">
                          {format(new Date(p.created_at), "dd MMM yy", { locale: es })}
                        </TableCell>
                        <TableCell>
                          {p.status === "pending" && (
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => markReceivedMutation.mutate(p.id)}
                              disabled={markReceivedMutation.isPending}
                            >
                              Marcar recibido
                            </Button>
                          )}
                          {p.status === "matched" && (
                            <Button
                              size="sm"
                              className="bg-green-600 hover:bg-green-700 text-white"
                              onClick={() => validateMutation.mutate(p)}
                              disabled={validateMutation.isPending}
                            >
                              <CheckCircle className="h-4 w-4 mr-1" /> Validar pago
                            </Button>
                          )}
                          {p.status === "validated" && (
                            <span className="text-xs text-green-500 flex items-center gap-1">
                              <CheckCircle className="h-3 w-3" /> Completado
                            </span>
                          )}
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </Card>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AdminPagos;
