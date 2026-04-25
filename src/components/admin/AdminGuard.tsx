import { useAuth } from "@/contexts/AuthContext";
import { Navigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

const AdminGuard = ({ children }: { children: React.ReactNode }) => {
  const { user, loading: authLoading } = useAuth();

  const { data: isSuperadmin, isLoading: roleLoading } = useQuery({
    queryKey: ["is-superadmin", user?.id],
    queryFn: async () => {
      if (!user) return false;

      // Check 1: profiles.role
      const { data: profile } = await supabase
        .from("profiles")
        .select("role")
        .eq("id", user.id)
        .maybeSingle();

      if ((profile as { role?: string } | null)?.role === "superadmin") return true;

      // Check 2: user_roles table
      const { data: roleRow } = await supabase
        .from("user_roles")
        .select("role")
        .eq("user_id", user.id)
        .eq("role", "superadmin")
        .maybeSingle();

      return !!roleRow;
    },
    enabled: !!user,
  });

  if (authLoading || roleLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-champagne border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!user) return <Navigate to="/login" replace />;
  if (!isSuperadmin) return <Navigate to="/unauthorized" replace />;

  return <>{children}</>;
};

export default AdminGuard;
