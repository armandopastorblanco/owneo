import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, Calendar as CalendarIcon, Info, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Calendar } from "@/components/ui/calendar";
import { Badge } from "@/components/ui/badge";
import { format, addDays, isWithinInterval, differenceInDays, startOfDay } from "date-fns";
import { es } from "date-fns/locale";
import { DateRange } from "react-day-picker";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

// Double credit periods (July, August, Christmas)
const isDoubleCredit = (date: Date) => {
  const month = date.getMonth();
  const day = date.getDate();
  
  // July (6) and August (7)
  if (month === 6 || month === 7) return true;
  
  // Christmas holidays (Dec 20 - Jan 6)
  if (month === 11 && day >= 20) return true;
  if (month === 0 && day <= 6) return true;
  
  return false;
};

const MIN_DAYS = 7;
const MAX_DAYS = 14;

// ============ OPTION 1: Range Selection with Visual Indicators ============
const CalendarOption1 = () => {
  const [range, setRange] = useState<DateRange | undefined>();
  
  const handleSelect = (newRange: DateRange | undefined) => {
    if (!newRange?.from) {
      setRange(undefined);
      return;
    }
    
    if (newRange.from && !newRange.to) {
      setRange(newRange);
      return;
    }
    
    if (newRange.from && newRange.to) {
      const days = differenceInDays(newRange.to, newRange.from) + 1;
      
      if (days < MIN_DAYS) {
        toast.error(`Mínimo ${MIN_DAYS} días de reserva`);
        return;
      }
      if (days > MAX_DAYS) {
        toast.error(`Máximo ${MAX_DAYS} días de reserva`);
        return;
      }
      
      setRange(newRange);
    }
  };

  const calculateCredits = () => {
    if (!range?.from || !range?.to) return 0;
    let credits = 0;
    let current = range.from;
    while (current <= range.to) {
      credits += isDoubleCredit(current) ? 2 : 1;
      current = addDays(current, 1);
    }
    return credits;
  };

  return (
    <Card className="border-border bg-card">
      <CardHeader>
        <CardTitle className="text-lg text-foreground">Opción 1: Selección por Rango</CardTitle>
        <CardDescription>Selecciona fecha inicio y fin. Indicadores visuales de temporada alta.</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col items-center gap-4">
          <Calendar
            mode="range"
            selected={range}
            onSelect={handleSelect}
            locale={es}
            numberOfMonths={1}
            disabled={(date) => date < startOfDay(new Date())}
            modifiers={{
              doubleCredit: (date) => isDoubleCredit(date)
            }}
            modifiersStyles={{
              doubleCredit: { 
                backgroundColor: "hsl(var(--primary) / 0.15)",
                fontWeight: "bold"
              }
            }}
            className="rounded-md border border-border pointer-events-auto"
          />
          <div className="w-full space-y-3">
            <div className="flex items-center gap-2 text-sm">
              <div className="w-4 h-4 rounded bg-primary/15 border border-primary/30" />
              <span className="text-muted-foreground">Temporada alta (2x créditos)</span>
            </div>
            {range?.from && range?.to && (
              <div className="p-3 rounded-lg bg-muted/50 space-y-2">
                <p className="text-sm">
                  <span className="text-muted-foreground">Período:</span>{" "}
                  <span className="font-medium">{format(range.from, "d MMM")} - {format(range.to, "d MMM, yyyy")}</span>
                </p>
                <p className="text-sm">
                  <span className="text-muted-foreground">Días:</span>{" "}
                  <span className="font-medium">{differenceInDays(range.to, range.from) + 1}</span>
                </p>
                <p className="text-sm">
                  <span className="text-muted-foreground">Créditos:</span>{" "}
                  <span className="font-bold text-primary">{calculateCredits()}</span>
                </p>
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

// ============ OPTION 2: Week-Based Selection ============
const CalendarOption2 = () => {
  const [selectedWeeks, setSelectedWeeks] = useState<number>(1);
  const [startDate, setStartDate] = useState<Date | undefined>();

  const handleDateSelect = (date: Date | undefined) => {
    setStartDate(date);
  };

  const endDate = startDate ? addDays(startDate, selectedWeeks * 7 - 1) : undefined;

  const calculateCredits = () => {
    if (!startDate) return 0;
    let credits = 0;
    let current = startDate;
    const end = addDays(startDate, selectedWeeks * 7 - 1);
    while (current <= end) {
      credits += isDoubleCredit(current) ? 2 : 1;
      current = addDays(current, 1);
    }
    return credits;
  };

  return (
    <Card className="border-border bg-card">
      <CardHeader>
        <CardTitle className="text-lg text-foreground">Opción 2: Selección por Semanas</CardTitle>
        <CardDescription>Elige 1 o 2 semanas y luego la fecha de inicio.</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col items-center gap-4">
          <div className="flex gap-2 w-full">
            <Button
              variant={selectedWeeks === 1 ? "default" : "outline"}
              className="flex-1"
              onClick={() => setSelectedWeeks(1)}
            >
              1 Semana
            </Button>
            <Button
              variant={selectedWeeks === 2 ? "default" : "outline"}
              className="flex-1"
              onClick={() => setSelectedWeeks(2)}
            >
              2 Semanas
            </Button>
          </div>
          <Calendar
            mode="single"
            selected={startDate}
            onSelect={handleDateSelect}
            locale={es}
            disabled={(date) => date < startOfDay(new Date())}
            modifiers={{
              doubleCredit: (date) => isDoubleCredit(date),
              inRange: (date) => 
                startDate && endDate 
                  ? isWithinInterval(date, { start: startDate, end: endDate })
                  : false
            }}
            modifiersStyles={{
              doubleCredit: { 
                backgroundColor: "hsl(var(--primary) / 0.15)"
              },
              inRange: {
                backgroundColor: "hsl(var(--primary))",
                color: "hsl(var(--primary-foreground))"
              }
            }}
            className="rounded-md border border-border pointer-events-auto"
          />
          {startDate && (
            <div className="w-full p-3 rounded-lg bg-muted/50 space-y-2">
              <p className="text-sm">
                <span className="text-muted-foreground">Período:</span>{" "}
                <span className="font-medium">{format(startDate, "d MMM")} - {format(endDate!, "d MMM, yyyy")}</span>
              </p>
              <p className="text-sm">
                <span className="text-muted-foreground">Duración:</span>{" "}
                <span className="font-medium">{selectedWeeks} semana{selectedWeeks > 1 ? "s" : ""}</span>
              </p>
              <p className="text-sm">
                <span className="text-muted-foreground">Créditos:</span>{" "}
                <span className="font-bold text-primary">{calculateCredits()}</span>
              </p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

// ============ OPTION 3: Compact with Badges ============
const CalendarOption3 = () => {
  const [range, setRange] = useState<DateRange | undefined>();
  
  const handleSelect = (newRange: DateRange | undefined) => {
    if (!newRange?.from) {
      setRange(undefined);
      return;
    }
    
    if (newRange.from && newRange.to) {
      const days = differenceInDays(newRange.to, newRange.from) + 1;
      if (days < MIN_DAYS || days > MAX_DAYS) {
        if (days < MIN_DAYS) toast.error(`Mínimo ${MIN_DAYS} días`);
        if (days > MAX_DAYS) toast.error(`Máximo ${MAX_DAYS} días`);
        return;
      }
    }
    setRange(newRange);
  };

  const calculateCredits = () => {
    if (!range?.from || !range?.to) return { normal: 0, double: 0, total: 0 };
    let normal = 0, double = 0;
    let current = range.from;
    while (current <= range.to) {
      if (isDoubleCredit(current)) double++;
      else normal++;
      current = addDays(current, 1);
    }
    return { normal, double, total: normal + double * 2 };
  };

  const credits = calculateCredits();

  return (
    <Card className="border-border bg-card">
      <CardHeader>
        <CardTitle className="text-lg text-foreground">Opción 3: Vista Compacta con Desglose</CardTitle>
        <CardDescription>Desglose detallado de créditos con badges informativos.</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col items-center gap-4">
          <div className="flex flex-wrap gap-2 w-full justify-center">
            <Badge variant="outline" className="text-xs">
              <Info className="w-3 h-3 mr-1" />
              Mín. 7 días
            </Badge>
            <Badge variant="outline" className="text-xs">
              <Info className="w-3 h-3 mr-1" />
              Máx. 14 días
            </Badge>
            <Badge className="bg-primary/20 text-primary text-xs">
              Jul-Ago & Navidad = 2x
            </Badge>
          </div>
          <Calendar
            mode="range"
            selected={range}
            onSelect={handleSelect}
            locale={es}
            disabled={(date) => date < startOfDay(new Date())}
            modifiers={{
              doubleCredit: (date) => isDoubleCredit(date)
            }}
            modifiersStyles={{
              doubleCredit: { 
                border: "2px solid hsl(var(--primary))",
                borderRadius: "4px"
              }
            }}
            className="rounded-md border border-border pointer-events-auto"
          />
          {range?.from && range?.to && (
            <div className="w-full grid grid-cols-3 gap-2 text-center">
              <div className="p-2 rounded bg-muted/50">
                <p className="text-xs text-muted-foreground">Normal</p>
                <p className="font-bold text-foreground">{credits.normal}</p>
              </div>
              <div className="p-2 rounded bg-primary/10">
                <p className="text-xs text-muted-foreground">Alta (x2)</p>
                <p className="font-bold text-primary">{credits.double}</p>
              </div>
              <div className="p-2 rounded bg-primary/20">
                <p className="text-xs text-muted-foreground">Total</p>
                <p className="font-bold text-primary text-lg">{credits.total}</p>
              </div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

// ============ OPTION 4: Two-Month View ============
const CalendarOption4 = () => {
  const [range, setRange] = useState<DateRange | undefined>();
  
  const handleSelect = (newRange: DateRange | undefined) => {
    if (!newRange?.from) {
      setRange(undefined);
      return;
    }
    
    if (newRange.from && newRange.to) {
      const days = differenceInDays(newRange.to, newRange.from) + 1;
      if (days < MIN_DAYS || days > MAX_DAYS) {
        toast.error(`Reserva: ${MIN_DAYS}-${MAX_DAYS} días`);
        return;
      }
    }
    setRange(newRange);
  };

  const calculateCredits = () => {
    if (!range?.from || !range?.to) return 0;
    let credits = 0;
    let current = range.from;
    while (current <= range.to) {
      credits += isDoubleCredit(current) ? 2 : 1;
      current = addDays(current, 1);
    }
    return credits;
  };

  return (
    <Card className="border-border bg-card">
      <CardHeader>
        <CardTitle className="text-lg text-foreground">Opción 4: Vista Dos Meses</CardTitle>
        <CardDescription>Visualización amplia con dos meses para mejor planificación.</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col items-center gap-4">
          <Calendar
            mode="range"
            selected={range}
            onSelect={handleSelect}
            locale={es}
            numberOfMonths={2}
            disabled={(date) => date < startOfDay(new Date())}
            modifiers={{
              doubleCredit: (date) => isDoubleCredit(date)
            }}
            modifiersStyles={{
              doubleCredit: { 
                backgroundColor: "hsl(var(--primary) / 0.2)",
                fontWeight: "600"
              }
            }}
            className="rounded-md border border-border pointer-events-auto"
          />
          <div className="w-full flex items-center justify-between p-3 rounded-lg bg-muted/50">
            <div className="flex items-center gap-2">
              <AlertCircle className="w-4 h-4 text-primary" />
              <span className="text-sm text-muted-foreground">
                {range?.from && range?.to 
                  ? `${differenceInDays(range.to, range.from) + 1} días seleccionados`
                  : "Selecciona un rango de 7-14 días"
                }
              </span>
            </div>
            {range?.from && range?.to && (
              <Badge className="bg-primary text-primary-foreground">
                {calculateCredits()} créditos
              </Badge>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

// ============ MAIN PAGE ============
const CalendarShowcase = () => {
  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link to="/dashboard" className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors">
            <ArrowLeft className="w-5 h-5" />
            <span>Volver al Panel</span>
          </Link>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="max-w-5xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-foreground mb-2">Opciones de Calendario</h1>
            <p className="text-muted-foreground">
              Explora diferentes diseños de calendario con las siguientes restricciones:
            </p>
            <div className="flex flex-wrap gap-3 mt-4">
              <Badge variant="outline" className="text-sm py-1.5 px-3">
                <CalendarIcon className="w-4 h-4 mr-2" />
                Mínimo: 1 semana (7 días)
              </Badge>
              <Badge variant="outline" className="text-sm py-1.5 px-3">
                <CalendarIcon className="w-4 h-4 mr-2" />
                Máximo: 2 semanas (14 días)
              </Badge>
              <Badge className="bg-primary/20 text-primary text-sm py-1.5 px-3">
                2x Créditos: Julio, Agosto y Navidades
              </Badge>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <CalendarOption1 />
            <CalendarOption2 />
            <CalendarOption3 />
            <CalendarOption4 />
          </div>
        </div>
      </main>
    </div>
  );
};

export default CalendarShowcase;
