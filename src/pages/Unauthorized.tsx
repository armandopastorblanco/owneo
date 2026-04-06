import { useNavigate } from "react-router-dom";
import { ShieldX } from "lucide-react";
import { Button } from "@/components/ui/button";

const Unauthorized = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-6">
      <div className="text-center max-w-md space-y-6">
        <ShieldX className="mx-auto h-16 w-16 text-destructive" />
        <h1 className="text-2xl font-bold text-foreground">Acceso denegado</h1>
        <p className="text-muted-foreground">
          No tienes permisos para acceder a esta sección. Si crees que se trata de un error, contacta con el administrador.
        </p>
        <Button onClick={() => navigate("/")} variant="outline">
          Volver al inicio
        </Button>
      </div>
    </div>
  );
};

export default Unauthorized;
