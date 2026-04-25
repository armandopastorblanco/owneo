import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Eye, EyeOff, Mail, Lock, User } from "lucide-react";

const Registro = () => {
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { toast } = useToast();
  const redirectParam = new URLSearchParams(location.search).get("redirect");
  const loginHref = redirectParam ? `/login?redirect=${encodeURIComponent(redirectParam)}` : "/login";

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      toast({ title: "Error", description: "Las contraseñas no coinciden", variant: "destructive" });
      return;
    }
    if (password.length < 6) {
      toast({ title: "Error", description: "La contraseña debe tener al menos 6 caracteres", variant: "destructive" });
      return;
    }

    setLoading(true);
    const { error } = await supabase.auth.signUp({
      email: email.trim(),
      password,
      options: {
        emailRedirectTo: window.location.origin,
        data: { name: name.trim(), surname: surname.trim() },
      },
    });

    if (error) {
      toast({ title: "Error al registrarse", description: error.message, variant: "destructive" });
    } else {
      // Update profile with name/surname
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        await supabase.from("profiles").update({
          name: name.trim(),
          surname: surname.trim(),
        }).eq("id", user.id);
      }
      toast({
        title: "Cuenta creada",
        description: "Revisa tu email para confirmar tu cuenta",
      });
      navigate(loginHref);
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      <div className="flex items-center justify-center px-6 py-24 md:py-32">
        <div className="w-full max-w-md">
          <div className="text-center mb-10">
            <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-3">Crear Cuenta</h1>
            <p className="text-muted-foreground">Únete a Owneo y accede al mundo de la copropiedad de supercoches</p>
          </div>

          <form onSubmit={handleRegister} className="space-y-5">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name">Nombre</Label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    id="name"
                    type="text"
                    placeholder="Juan"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="pl-10 bg-card border-border/50"
                    required
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="surname">Apellido</Label>
                <Input
                  id="surname"
                  type="text"
                  placeholder="García"
                  value={surname}
                  onChange={(e) => setSurname(e.target.value)}
                  className="bg-card border-border/50"
                  required
                />
              </div>
            </div>

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
                  placeholder="Mínimo 6 caracteres"
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

            <div className="space-y-2">
              <Label htmlFor="confirmPassword">Confirmar Contraseña</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  id="confirmPassword"
                  type={showPassword ? "text" : "password"}
                  placeholder="Repite tu contraseña"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="pl-10 bg-card border-border/50"
                  required
                  minLength={6}
                />
              </div>
            </div>

            <Button type="submit" className="w-full bg-champagne text-champagne-foreground hover:bg-champagne/90" disabled={loading}>
              {loading ? "Creando cuenta..." : "Crear Cuenta"}
            </Button>
          </form>

          <p className="text-center text-sm text-muted-foreground mt-8">
            ¿Ya tienes cuenta?{" "}
            <Link to={loginHref} className="text-champagne hover:underline font-medium">
              Iniciar sesión
            </Link>
          </p>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Registro;
