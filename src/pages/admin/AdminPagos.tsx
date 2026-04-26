import { useState, useMemo } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Skeleton } from "@/components/ui/skeleton";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";
import { format, differenceInDays } from "date-fns";
import { es } from "date-fns/locale";
import { CreditCard, Euro, Clock, CheckCircle, Copy, Plus, Download, Bell } from "lucide-react";

const PAYMENT_TYPES = [
  { v: "signal", label: "Señal", color: "bg-purple-500/15 text-purple-400 border-purple-500/30" },
  { v: "participation", label: "Participación", color: "bg-blue-500/15 text-blue-400 border-blue-500/30" },
  { v: "annual_fee", label: "Cuota anual", color: "bg-emerald-500/15 text-emerald-400 border-emerald-500/30" },
  { v: "extra_cost", label: "Coste extra", color: "bg-amber-500/15 text-amber-400 border-amber-500/30" },
];
const ptLabel = (v: string) => PAYMENT_TYPES.find(p => p.v === v)?.label || v;
const ptColor = (v: string) => PAYMENT_TYPES.find(p => p.v === v)?.color || "";

const AdminPagos = () => {
  const queryClient = useQueryClient();
  const [tab, setTab] = useState("all");
  const [typeFilter, setTypeFilter] = useState("all");
  const [createOpen, setCreateOpen] = useState(false);

  const { data: payments = [], isLoading } = useQuery({
    queryKey: ["admin-pagos"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("bank_reconciliation")
        .select("*, profiles:user_id(name,surname,email,iban), participation_requests:participation_request_id(car_id,num_participations,payment_amount,cars:car_id(id,name,remaining_participations,max_participations,status,participation_price)), extra_cost:extra_cost_type_id(name,category)" as any)
        .order("created_at", { ascending: false });
      if (error) throw error;
      return data || [];
    },
    refetchInterval: 30000,
  });

  const { data: users = [] } = useQuery({
    queryKey: ["admin-pagos-users"],
    queryFn: async () => {
      const { data } = await supabase.from("profiles").select("id,name,surname,email").order("name");
      return data || [];
    },
  });

  const { data: extraTypes = [] } = useQuery({
    queryKey: ["extra-cost-types"],
    queryFn: async () => {
      const { data } = await supabase.from("extra_cost_types" as any).select("*").eq("is_active", true).order("sort_order");
      return (data as any[]) || [];
    },
  });

  const { data: validatedParts = [] } = useQuery({
    queryKey: ["admin-validated-parts-for-pagos"],
    queryFn: async () => {
      const { data } = await supabase.from("validated_participations").select("id,user_id,car_id,participation_number,cars:car_id(id,name,participation_price)");
      return (data as any[]) || [];
    },
  });

  // Filtered list
  const filtered = useMemo(() => {
    return payments.filter((p: any) => {
      if (tab !== "all" && p.status !== tab) return false;
      if (typeFilter !== "all" && (p.payment_type || "participation") !== typeFilter) return false;
      return true;
    });
  }, [payments, tab, typeFilter]);

  // Summary
  const sum = (arr: any[]) => arr.reduce((s, p) => s + (Number(p.expected_amount) || 0), 0);
  const totalExpected = sum(payments);
  const totalValidated = sum(payments.filter((p: any) => p.status === "validated"));
  const totalPending = totalExpected - totalValidated;

  const breakdown = useMemo(() => {
    const acc: Record<string, { expected: number; validated: number; count: number }> = {};
    PAYMENT_TYPES.forEach(t => acc[t.v] = { expected: 0, validated: 0, count: 0 });
    payments.forEach((p: any) => {
      const t = p.payment_type || "participation";
      if (!acc[t]) acc[t] = { expected: 0, validated: 0, count: 0 };
      acc[t].expected += Number(p.expected_amount) || 0;
      if (p.status === "validated") acc[t].validated += Number(p.expected_amount) || 0;
      acc[t].count += 1;
    });
    return acc;
  }, [payments]);

  // Recordatorios cuota anual: due_date dentro de 14 días o vencida y no validada
  const reminders = useMemo(() => {
    const today = new Date();
    return payments.filter((p: any) => {
      if (p.payment_type !== "annual_fee") return false;
      if (p.status === "validated") return false;
      if (!p.due_date) return false;
      const days = differenceInDays(new Date(p.due_date), today);
      return days <= 14;
    });
  }, [payments]);

  // Mark as received
  const markReceivedMutation = useMutation({
    mutationFn: async (paymentId: string) => {
      const { error } = await supabase.from("bank_reconciliation").update({ status: "matched", matched_at: new Date().toISOString() }).eq("id", paymentId);
      if (error) throw error;
      await supabase.rpc("insert_audit_log", { _action: "pago_recibido", _target_table: "bank_reconciliation", _target_id: paymentId });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-pagos"] });
      toast.success("Pago marcado como recibido");
    },
    onError: () => toast.error("Error al actualizar"),
  });

  // Validate (full participation flow only when type=participation)
  const validateMutation = useMutation({
    mutationFn: async (payment: any) => {
      const ptype = payment.payment_type || "participation";

      if (ptype === "participation" && payment.participation_request_id) {
        const req = payment.participation_requests as any;
        const car = req?.cars as any;
        const numParts = req?.num_participations || 1;

        const { error: e1 } = await supabase.from("bank_reconciliation").update({ status: "validated" }).eq("id", payment.id);
        if (e1) throw e1;
        const { error: e2 } = await supabase.from("participation_requests").update({ payment_status: "validated" }).eq("id", payment.participation_request_id);
        if (e2) throw e2;

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

        const newRemaining = Math.max(0, (car?.remaining_participations || 10) - numParts);
        const updates: any = { remaining_participations: newRemaining };
        if (newRemaining === 0) updates.status = "complete";
        const { error: e4 } = await supabase.from("cars").update(updates).eq("id", req.car_id);
        if (e4) throw e4;
      } else {
        const { error } = await supabase.from("bank_reconciliation").update({ status: "validated" }).eq("id", payment.id);
        if (error) throw error;
      }

      await supabase.rpc("insert_audit_log", {
        _action: "pago_validado",
        _target_table: "bank_reconciliation",
        _target_id: payment.id,
        _details: { payment_type: ptype, amount: payment.expected_amount },
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-pagos"] });
      queryClient.invalidateQueries({ queryKey: ["admin-validated-parts"] });
      toast.success("Pago validado");
    },
    onError: (err: any) => toast.error(`Error: ${err.message}`),
  });

  const copyRef = (ref: string) => {
    navigator.clipboard.writeText(ref);
    toast.success("Referencia copiada");
  };

  const statusBadge = (status: string) => {
    if (status === "validated") return <Badge variant="default">Validado</Badge>;
    if (status === "matched") return <Badge className="bg-blue-500/20 text-blue-400 border-blue-500/30">Recibido</Badge>;
    if (status === "failed") return <Badge variant="destructive">Fallido</Badge>;
    return <Badge variant="secondary">Pendiente</Badge>;
  };

  // Export CSV
  const exportCSV = () => {
    const rows = [["Referencia", "Tipo", "Participante", "Email", "Vehículo", "Importe", "Estado", "Fecha creación", "Fecha límite", "Descripción"]];
    filtered.forEach((p: any) => {
      const profile = p.profiles as any;
      const car = (p.participation_requests as any)?.cars;
      rows.push([
        p.reference_code || "",
        ptLabel(p.payment_type || "participation"),
        `${profile?.name || ""} ${profile?.surname || ""}`.trim(),
        profile?.email || "",
        car?.name || "",
        String(p.expected_amount || 0),
        p.status,
        p.created_at ? format(new Date(p.created_at), "yyyy-MM-dd") : "",
        p.due_date || "",
        (p.description || "").replace(/"/g, '""'),
      ]);
    });
    const csv = rows.map(r => r.map(c => `"${c}"`).join(",")).join("\n");
    const blob = new Blob(["\ufeff" + csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `pagos-${format(new Date(), "yyyyMMdd-HHmm")}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h1 className="text-2xl font-bold text-foreground flex items-center gap-2">
          <CreditCard className="h-6 w-6" /> Gestión de Pagos
        </h1>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" onClick={exportCSV}><Download className="h-4 w-4 mr-1" /> Exportar CSV</Button>
          <Button size="sm" onClick={() => setCreateOpen(true)}><Plus className="h-4 w-4 mr-1" /> Nuevo pago</Button>
        </div>
      </div>

      {/* Recordatorios */}
      {reminders.length > 0 && (
        <Card className="border-amber-500/40 bg-amber-500/5">
          <CardContent className="pt-4 pb-4">
            <div className="flex items-start gap-3">
              <Bell className="h-5 w-5 text-amber-400 mt-0.5" />
              <div className="flex-1">
                <p className="font-medium text-amber-300">Recordatorios cuota anual ({reminders.length})</p>
                <ul className="mt-2 space-y-1 text-sm text-muted-foreground">
                  {reminders.slice(0, 5).map((r: any) => (
                    <li key={r.id}>
                      <span className="text-foreground">{r.profiles?.name} {r.profiles?.surname}</span>
                      {" · "}€{Number(r.expected_amount).toLocaleString()}
                      {" · vence "}{format(new Date(r.due_date), "dd MMM yyyy", { locale: es })}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Resumen general */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Card><CardContent className="pt-6"><div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-full bg-muted flex items-center justify-center"><Euro className="h-5 w-5 text-muted-foreground" /></div>
          <div><p className="text-sm text-muted-foreground">Total Esperado</p><p className="text-2xl font-bold text-foreground">€{totalExpected.toLocaleString()}</p></div>
        </div></CardContent></Card>
        <Card><CardContent className="pt-6"><div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-full bg-green-500/20 flex items-center justify-center"><CheckCircle className="h-5 w-5 text-green-500" /></div>
          <div><p className="text-sm text-muted-foreground">Total Validado</p><p className="text-2xl font-bold text-green-500">€{totalValidated.toLocaleString()}</p></div>
        </div></CardContent></Card>
        <Card><CardContent className="pt-6"><div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-full bg-orange-500/20 flex items-center justify-center"><Clock className="h-5 w-5 text-orange-500" /></div>
          <div><p className="text-sm text-muted-foreground">En Espera</p><p className="text-2xl font-bold text-orange-500">€{totalPending.toLocaleString()}</p></div>
        </div></CardContent></Card>
      </div>

      {/* Desglose por tipo */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {PAYMENT_TYPES.map((t) => (
          <Card key={t.v}>
            <CardContent className="pt-4 pb-4">
              <Badge variant="outline" className={t.color}>{t.label}</Badge>
              <p className="text-xl font-bold text-foreground mt-2">€{breakdown[t.v].expected.toLocaleString()}</p>
              <p className="text-xs text-muted-foreground">
                Validado: <span className="text-green-500">€{breakdown[t.v].validated.toLocaleString()}</span> · {breakdown[t.v].count} pago(s)
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="flex flex-wrap items-center gap-3">
        <Tabs value={tab} onValueChange={setTab} className="flex-1">
          <TabsList>
            <TabsTrigger value="all">Todos ({payments.length})</TabsTrigger>
            <TabsTrigger value="pending">Pendientes ({payments.filter((p: any) => p.status === "pending").length})</TabsTrigger>
            <TabsTrigger value="matched">Recibidos ({payments.filter((p: any) => p.status === "matched").length})</TabsTrigger>
            <TabsTrigger value="validated">Validados ({payments.filter((p: any) => p.status === "validated").length})</TabsTrigger>
          </TabsList>
        </Tabs>
        <Select value={typeFilter} onValueChange={setTypeFilter}>
          <SelectTrigger className="w-[180px]"><SelectValue placeholder="Tipo de pago" /></SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Todos los tipos</SelectItem>
            {PAYMENT_TYPES.map(t => <SelectItem key={t.v} value={t.v}>{t.label}</SelectItem>)}
          </SelectContent>
        </Select>
      </div>

      <div className="mt-2">
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
                  <TableHead>Tipo</TableHead>
                  <TableHead>Participante</TableHead>
                  <TableHead className="hidden md:table-cell">Vehículo / Concepto</TableHead>
                  <TableHead>Montante</TableHead>
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
                  const ptype = p.payment_type || "participation";
                  const concept = car?.name || (p.extra_cost as any)?.name || p.description || "—";
                  return (
                    <TableRow key={p.id}>
                      <TableCell>
                        <button onClick={() => copyRef(p.reference_code || "")} className="flex items-center gap-1 font-mono text-sm text-primary hover:underline">
                          {p.reference_code || "—"}<Copy className="h-3 w-3" />
                        </button>
                      </TableCell>
                      <TableCell><Badge variant="outline" className={ptColor(ptype)}>{ptLabel(ptype)}</Badge></TableCell>
                      <TableCell>
                        <div className="font-medium text-foreground">{profile?.name} {profile?.surname}</div>
                        <div className="text-xs text-muted-foreground">{profile?.email}</div>
                      </TableCell>
                      <TableCell className="hidden md:table-cell text-foreground">
                        {concept}
                        {p.due_date && <div className="text-xs text-muted-foreground">Vence: {format(new Date(p.due_date), "dd MMM yyyy", { locale: es })}</div>}
                      </TableCell>
                      <TableCell className="font-semibold text-foreground">€{Number(p.expected_amount || 0).toLocaleString()}</TableCell>
                      <TableCell>{statusBadge(p.status)}</TableCell>
                      <TableCell className="hidden md:table-cell text-muted-foreground text-sm">
                        {format(new Date(p.created_at), "dd MMM yy", { locale: es })}
                      </TableCell>
                      <TableCell>
                        {p.status === "pending" && (
                          <Button size="sm" variant="outline" onClick={() => markReceivedMutation.mutate(p.id)} disabled={markReceivedMutation.isPending}>
                            Marcar recibido
                          </Button>
                        )}
                        {p.status === "matched" && (
                          <Button size="sm" className="bg-green-600 hover:bg-green-700 text-white" onClick={() => validateMutation.mutate(p)} disabled={validateMutation.isPending}>
                            <CheckCircle className="h-4 w-4 mr-1" /> Validar
                          </Button>
                        )}
                        {p.status === "validated" && (
                          <span className="text-xs text-green-500 flex items-center gap-1"><CheckCircle className="h-3 w-3" /> Completado</span>
                        )}
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </Card>
        )}
      </div>

      <CreatePaymentDialog
        open={createOpen}
        onOpenChange={setCreateOpen}
        users={users}
        extraTypes={extraTypes}
        validatedParts={validatedParts}
        onCreated={() => queryClient.invalidateQueries({ queryKey: ["admin-pagos"] })}
      />
    </div>
  );
};

// =============================================================
// Create Payment Dialog
// =============================================================
const CreatePaymentDialog = ({ open, onOpenChange, users, extraTypes, validatedParts, onCreated }: any) => {
  const [paymentType, setPaymentType] = useState("signal");
  const [userId, setUserId] = useState("");
  const [participationId, setParticipationId] = useState("");
  const [extraCostTypeId, setExtraCostTypeId] = useState("");
  const [amount, setAmount] = useState("");
  const [description, setDescription] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [requestId, setRequestId] = useState("");
  const [saving, setSaving] = useState(false);

  // Reset on open
  useMemo(() => {
    if (open) {
      setPaymentType("signal"); setUserId(""); setParticipationId(""); setExtraCostTypeId("");
      setAmount(""); setDescription(""); setDueDate(""); setRequestId("");
    }
  }, [open]);

  const userParts = validatedParts.filter((vp: any) => vp.user_id === userId);

  // Auto-calc señal 10%
  const handleSignalAutoCalc = (partId: string) => {
    setParticipationId(partId);
    const vp = validatedParts.find((p: any) => p.id === partId);
    const price = vp?.cars?.participation_price;
    if (price) setAmount((Number(price) * 0.1).toFixed(2));
  };

  const handleParticipationAutoCalc = (partId: string) => {
    setParticipationId(partId);
    const vp = validatedParts.find((p: any) => p.id === partId);
    const price = vp?.cars?.participation_price;
    if (price) setAmount((Number(price) * 0.9).toFixed(2));
  };

  const handleExtraCostSelect = (id: string) => {
    setExtraCostTypeId(id);
    const ec = extraTypes.find((e: any) => e.id === id);
    if (ec?.default_amount && !amount) setAmount(String(ec.default_amount));
    if (ec?.name && !description) setDescription(ec.name);
  };

  const submit = async () => {
    if (!userId) return toast.error("Selecciona un usuario");
    if (!amount || Number(amount) <= 0) return toast.error("Importe inválido");

    setSaving(true);
    try {
      const profile = users.find((u: any) => u.id === userId);
      const payload: any = {
        user_id: userId,
        payment_type: paymentType,
        expected_amount: Number(amount),
        status: "pending",
        description: description || null,
        iban_user: profile?.iban || null,
      };

      if (paymentType === "annual_fee" && dueDate) payload.due_date = dueDate;
      if (paymentType === "extra_cost" && extraCostTypeId) payload.extra_cost_type_id = extraCostTypeId;

      // Link to participation_request if signal/participation and a participation selected
      if ((paymentType === "signal" || paymentType === "participation") && participationId) {
        const vp = validatedParts.find((p: any) => p.id === participationId);
        // Try to find latest participation_request for this user/car
        const { data: reqs } = await supabase
          .from("participation_requests")
          .select("id")
          .eq("user_id", userId)
          .eq("car_id", vp?.car_id)
          .order("created_at", { ascending: false })
          .limit(1);
        if (reqs && reqs.length > 0) payload.participation_request_id = reqs[0].id;
      }

      const { error } = await supabase.from("bank_reconciliation").insert(payload);
      if (error) throw error;

      await supabase.rpc("insert_audit_log", {
        _action: "pago_creado_manual",
        _target_table: "bank_reconciliation",
        _details: { payment_type: paymentType, amount: Number(amount), user_id: userId },
      });

      toast.success("Pago creado");
      onCreated?.();
      onOpenChange(false);
    } catch (err: any) {
      toast.error(err.message);
    } finally {
      setSaving(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle>Nuevo pago manual</DialogTitle>
          <DialogDescription>Crea un pago de señal, participación, cuota anual o coste extra.</DialogDescription>
        </DialogHeader>

        <div className="space-y-3">
          <div>
            <Label>Tipo de pago *</Label>
            <Select value={paymentType} onValueChange={(v) => { setPaymentType(v); setAmount(""); setParticipationId(""); }}>
              <SelectTrigger><SelectValue /></SelectTrigger>
              <SelectContent>{PAYMENT_TYPES.map(t => <SelectItem key={t.v} value={t.v}>{t.label}</SelectItem>)}</SelectContent>
            </Select>
          </div>

          <div>
            <Label>Usuario *</Label>
            <Select value={userId} onValueChange={(v) => { setUserId(v); setParticipationId(""); }}>
              <SelectTrigger><SelectValue placeholder="Selecciona usuario" /></SelectTrigger>
              <SelectContent>
                {users.map((u: any) => (
                  <SelectItem key={u.id} value={u.id}>{u.name} {u.surname} — {u.email}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {(paymentType === "signal" || paymentType === "participation") && userId && (
            <div>
              <Label>Participación / Vehículo</Label>
              <Select value={participationId} onValueChange={paymentType === "signal" ? handleSignalAutoCalc : handleParticipationAutoCalc}>
                <SelectTrigger><SelectValue placeholder={userParts.length ? "Selecciona vehículo" : "El usuario no tiene participaciones validadas — el importe debe ser manual"} /></SelectTrigger>
                <SelectContent>
                  {userParts.map((vp: any) => (
                    <SelectItem key={vp.id} value={vp.id}>{vp.cars?.name} #{vp.participation_number} — €{vp.cars?.participation_price}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {paymentType === "signal" && participationId && <p className="text-xs text-muted-foreground mt-1">Calculado automáticamente al 10% del precio de participación.</p>}
              {paymentType === "participation" && participationId && <p className="text-xs text-muted-foreground mt-1">Calculado automáticamente al 90% restante (señal ya descontada).</p>}
            </div>
          )}

          {paymentType === "extra_cost" && (
            <div>
              <Label>Tipo de coste extra</Label>
              <Select value={extraCostTypeId} onValueChange={handleExtraCostSelect}>
                <SelectTrigger><SelectValue placeholder="Selecciona tipo" /></SelectTrigger>
                <SelectContent>
                  {extraTypes.map((e: any) => (
                    <SelectItem key={e.id} value={e.id}>[{e.category}] {e.name}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          )}

          {paymentType === "annual_fee" && (
            <div>
              <Label>Fecha límite (recordatorio)</Label>
              <Input type="date" value={dueDate} onChange={(e) => setDueDate(e.target.value)} />
              <p className="text-xs text-muted-foreground mt-1">Se mostrará un recordatorio 14 días antes del vencimiento.</p>
            </div>
          )}

          <div>
            <Label>Importe (€) *</Label>
            <Input type="number" step="0.01" value={amount} onChange={(e) => setAmount(e.target.value)} />
          </div>

          <div>
            <Label>Descripción</Label>
            <Textarea value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Concepto, referencia, observaciones..." />
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>Cancelar</Button>
          <Button onClick={submit} disabled={saving}>{saving ? "Guardando..." : "Crear pago"}</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default AdminPagos;
