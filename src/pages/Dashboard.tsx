import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, Car, FileText, MapPin, Phone, Calendar as CalendarIcon, CreditCard } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar } from "@/components/ui/calendar";
import { Badge } from "@/components/ui/badge";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { format } from "date-fns";

// Mock user data
import ferrariPortofino from "@/assets/cars/ferrari-portofino.jpg";

const mockUserData = {
  name: "Carlos Méndez",
  email: "carlos.mendez@example.com",
  credits: 30,
  vehicle: {
    id: "ferrari-portofino",
    name: "Ferrari Portofino",
    brand: "Ferrari",
    model: "Portofino",
    year: 2024,
    color: "Rosso Corsa",
    licensePlate: "1234 ABC",
    image: ferrariPortofino,
    location: {
      address: "Marina Port Vell, Barcelona",
      coordinates: { lat: 41.3749, lng: 2.1844 }
    }
  },
  bookedDates: [
    new Date(2025, 11, 10),
    new Date(2025, 11, 11),
    new Date(2025, 11, 12),
    new Date(2025, 11, 20),
    new Date(2025, 11, 21),
  ]
};

const Dashboard = () => {
  const [selectedDates, setSelectedDates] = useState<Date[]>(mockUserData.bookedDates);
  const [calendarOpen, setCalendarOpen] = useState(false);

  const handleDateSelect = (date: Date | undefined) => {
    if (!date) return;
    
    const dateExists = selectedDates.some(
      (d) => d.toDateString() === date.toDateString()
    );

    if (dateExists) {
      setSelectedDates(selectedDates.filter((d) => d.toDateString() !== date.toDateString()));
    } else {
      setSelectedDates([...selectedDates, date]);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors">
            <ArrowLeft className="w-5 h-5" />
            <span>Volver al Inicio</span>
          </Link>
          <div className="flex items-center gap-4">
            <span className="text-sm text-muted-foreground">Bienvenido,</span>
            <span className="font-semibold text-foreground">{mockUserData.name}</span>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold mb-8 text-foreground">Mi Panel</h1>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Left Column - Vehicle Details */}
          <div className="lg:col-span-2 space-y-6">
            {/* Vehicle Card */}
            <Card className="overflow-hidden border-border bg-card">
              <CardHeader className="pb-4">
                <CardTitle className="flex items-center gap-2 text-foreground">
                  <Car className="w-5 h-5 text-primary" />
                  Mi Vehículo
                </CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                <div className="grid md:grid-cols-2">
                  <div className="aspect-[4/3] overflow-hidden">
                    <img
                      src={mockUserData.vehicle.image}
                      alt={mockUserData.vehicle.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="p-6 flex flex-col justify-center space-y-4">
                    <div>
                      <p className="text-sm text-muted-foreground">Vehículo</p>
                      <p className="text-2xl font-bold text-foreground">{mockUserData.vehicle.name}</p>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm text-muted-foreground">Año</p>
                        <p className="font-semibold text-foreground">{mockUserData.vehicle.year}</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Color</p>
                        <p className="font-semibold text-foreground">{mockUserData.vehicle.color}</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Matrícula</p>
                        <p className="font-semibold text-foreground">{mockUserData.vehicle.licensePlate}</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Marca</p>
                        <p className="font-semibold text-foreground">{mockUserData.vehicle.brand}</p>
                      </div>
                    </div>
                    <Link to={`/car/${mockUserData.vehicle.id}`}>
                      <Button variant="outline" className="w-full mt-2">
                        Ver Detalles Completos
                      </Button>
                    </Link>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Booking Calendar */}
            <Card className="border-border bg-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-foreground">
                  <CalendarIcon className="w-5 h-5 text-primary" />
                  Reservar Días de Uso
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col items-center">
                  <Calendar
                    mode="multiple"
                    selected={selectedDates}
                    onSelect={(dates) => dates && setSelectedDates(dates)}
                    className="rounded-md border border-border pointer-events-auto"
                    modifiers={{
                      booked: selectedDates
                    }}
                    modifiersStyles={{
                      booked: { backgroundColor: "hsl(var(--primary))", color: "hsl(var(--primary-foreground))" }
                    }}
                  />
                  <div className="mt-4 w-full">
                    <p className="text-sm text-muted-foreground mb-2">Fechas seleccionadas:</p>
                    <div className="flex flex-wrap gap-2">
                      {selectedDates.length > 0 ? (
                        selectedDates.sort((a, b) => a.getTime() - b.getTime()).map((date, i) => (
                          <Badge key={i} variant="secondary" className="bg-primary/20 text-primary">
                            {format(date, "d MMM, yyyy")}
                          </Badge>
                        ))
                      ) : (
                        <span className="text-muted-foreground text-sm">No hay fechas seleccionadas</span>
                      )}
                    </div>
                  </div>
                  <Button className="w-full mt-4 bg-primary hover:bg-primary/90 text-primary-foreground">
                    Confirmar Reserva
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Vehicle Location */}
            <Card className="border-border bg-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-foreground">
                  <MapPin className="w-5 h-5 text-primary" />
                  Ubicación del Vehículo
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="aspect-[16/9] bg-muted rounded-lg overflow-hidden relative">
                  {/* Mock map placeholder */}
                  <div className="absolute inset-0 bg-gradient-to-br from-muted to-background flex items-center justify-center">
                    <div className="text-center">
                      <MapPin className="w-12 h-12 text-primary mx-auto mb-3" />
                      <p className="text-lg font-semibold text-foreground">{mockUserData.vehicle.location.address}</p>
                      <p className="text-sm text-muted-foreground mt-1">
                        Coordenadas: {mockUserData.vehicle.location.coordinates.lat}, {mockUserData.vehicle.location.coordinates.lng}
                      </p>
                    </div>
                  </div>
                </div>
                <Button className="w-full mt-4 bg-primary hover:bg-primary/90 text-primary-foreground">
                  Cómo Llegar
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Right Column - Quick Actions & Credits */}
          <div className="space-y-6">
            {/* Credits Card */}
            <Card className="border-border bg-gradient-to-br from-primary/20 to-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-foreground">
                  <CreditCard className="w-5 h-5 text-primary" />
                  Mis Créditos
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center py-6">
                  <div className="text-6xl font-bold text-primary mb-2">{mockUserData.credits}</div>
                  <p className="text-muted-foreground">créditos disponibles</p>
                  <div className="mt-4 w-full bg-muted rounded-full h-3">
                    <div 
                      className="bg-primary h-3 rounded-full transition-all duration-500"
                      style={{ width: `${(mockUserData.credits / 30) * 100}%` }}
                    />
                  </div>
                  <p className="text-xs text-muted-foreground mt-2">1 crédito = 1 día de uso</p>
                </div>
              </CardContent>
            </Card>

            {/* Vehicle Documents CTA */}
            <Card className="border-border bg-card hover:border-primary/50 transition-colors cursor-pointer group">
              <CardContent className="p-6">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-full bg-primary/20 flex items-center justify-center group-hover:bg-primary/30 transition-colors">
                    <FileText className="w-7 h-7 text-primary" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-foreground">Documentos del Vehículo</h3>
                    <p className="text-sm text-muted-foreground">Seguro, registro, historial de servicio</p>
                  </div>
                </div>
                <Button className="w-full mt-4" variant="outline">
                  Acceder a Documentos
                </Button>
              </CardContent>
            </Card>

            {/* Concierge CTA */}
            <Card className="border-border bg-card hover:border-primary/50 transition-colors cursor-pointer group">
              <CardContent className="p-6">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-full bg-primary/20 flex items-center justify-center group-hover:bg-primary/30 transition-colors">
                    <Phone className="w-7 h-7 text-primary" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-foreground">Servicio de Conserjería</h3>
                    <p className="text-sm text-muted-foreground">Asistencia premium 24/7</p>
                  </div>
                </div>
                <Button className="w-full mt-4 bg-primary hover:bg-primary/90 text-primary-foreground">
                  Contactar Conserjería
                </Button>
              </CardContent>
            </Card>

            {/* Quick Stats */}
            <Card className="border-border bg-card">
              <CardHeader>
                <CardTitle className="text-foreground text-lg">Este Mes</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Días Reservados</span>
                  <span className="font-semibold text-foreground">{selectedDates.length}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Créditos Usados</span>
                  <span className="font-semibold text-foreground">0</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Próxima Reserva</span>
                  <span className="font-semibold text-primary">
                    {selectedDates.length > 0 
                      ? format(selectedDates.sort((a, b) => a.getTime() - b.getTime())[0], "d MMM")
                      : "Ninguna"
                    }
                  </span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;