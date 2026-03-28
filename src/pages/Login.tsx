import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Eye, EyeOff, Mail, Lock } from "lucide-react";
import PWAInstallPrompt from "@/components/PWAInstallPrompt";
import { usePWAInstall } from "@/hooks/usePWAInstall";

const Login = () => {
  const pwa = usePWAInstall();
  const { user } = useAuth();

  useEffect(() => {
    pwa.triggerPrompt();
  }, []);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { toast } = useToast();

  const from = (location.state as { from?: { pathname: string } })?.from?.pathname || "/dashboard";

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim() || !password.trim()) return;

    setLoading(true);
    const { error } = await supabase.auth.signInWithPassword({ email: email.trim(), password });

    if (error) {
      toast({
        title: "Error al iniciar sesión",
        description: error.message === "Invalid login credentials"
          ? "Email o contraseña incorrectos"
          : error.message,
        variant: "destructive",
      });
    } else {
      toast({ title: "Bienvenido", description: "Has iniciado sesión correctamente" });
      navigate(from, { replace: true });
    }
    setLoading(false);
  };

  const handleForgotPassword = async () => {
    if (!email.trim()) {
      toast({ title: "Introduce tu email", description: "Necesitamos tu email para enviar el enlace de recuperación", variant: "destructive" });
      return;
    }
    setLoading(true);
    const { error } = await supabase.auth.resetPasswordForEmail(email.trim(), {
      redirectTo: `${window.location.origin}/reset-password`,
    });
    if (error) {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    } else {
      toast({ title: "Email enviado", description: "Revisa tu bandeja de entrada para restablecer tu contraseña" });
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      <div className="flex items-center justify-center px-6 py-24 md:py-32">
        <div className="w-full max-w-md">
          <div className="text-center mb-10">
            <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-3">Iniciar Sesión</h1>
            <p className="text-muted-foreground">Accede a tu cuenta para gestionar tus participaciones</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-5">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  id="email"
                  type="email"
                  placeholder="tu@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="pl-10 bg-card border-border/50"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Contraseña</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="pl-10 pr-10 bg-card border-border/50"
                  required
                  minLength={6}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <div className="flex justify-end">
              <button
                type="button"
                onClick={handleForgotPassword}
                className="text-sm text-champagne hover:underline"
              >
                ¿Olvidaste tu contraseña?
              </button>
            </div>

            <Button type="submit" className="w-full bg-champagne text-champagne-foreground hover:bg-champagne/90" disabled={loading}>
              {loading ? "Cargando..." : "Iniciar Sesión"}
            </Button>
          </form>

          <p className="text-center text-sm text-muted-foreground mt-8">
            ¿No tienes cuenta?{" "}
            <Link to="/registro" className="text-champagne hover:underline font-medium">
              Crear cuenta
            </Link>
          </p>
        </div>
      </div>
      <Footer />
      <PWAInstallPrompt
        show={pwa.showPrompt}
        isIOS={pwa.isIOS}
        canInstallNatively={pwa.canInstallNatively}
        onInstall={pwa.install}
        onDismiss={pwa.dismiss}
      />
    </div>
  );
};

export default Login;
