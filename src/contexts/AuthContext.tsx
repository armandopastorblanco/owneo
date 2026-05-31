import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import { supabase } from "@/integrations/supabase/client";
import type { User, Session } from "@supabase/supabase-js";

interface AuthContextType {
  user: User | null;
  session: Session | null;
  loading: boolean;
  role: string | null;
  isAdmin: boolean;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  session: null,
  loading: true,
  role: null,
  isAdmin: false,
  signOut: async () => {},
});

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);
  const [role, setRole] = useState<string | null>(null);

  const fetchRole = async (userId: string) => {
    const { data } = await supabase
      .from("profiles")
      .select("role")
      .eq("id", userId)
      .maybeSingle();
    setRole(data?.role ?? null);
  };

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        setSession(session);
        setUser(session?.user ?? null);
        if (session?.user) {
          fetchRole(session.user.id);
          // Send welcome email once per user on first sign-in
          if (event === "SIGNED_IN" && session.user.email) {
            const flagKey = `owneo_welcome_sent_${session.user.id}`;
            if (!localStorage.getItem(flagKey)) {
              localStorage.setItem(flagKey, "1");
              const createdAt = session.user.created_at ? new Date(session.user.created_at).getTime() : 0;
              // Only send if account was created in the last 10 minutes (avoid sending on re-login of old users)
              if (createdAt && Date.now() - createdAt < 10 * 60 * 1000) {
                const name = (session.user.user_metadata as any)?.first_name || "";
                supabase.functions.invoke("send-welcome-email", {
                  body: { email: session.user.email, name },
                }).catch((err) => console.error("welcome email error", err));
              }
            }
          }
        } else {
          setRole(null);
        }
        setLoading(false);
      }
    );

    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
      if (session?.user) {
        fetchRole(session.user.id);
      }
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  const signOut = async () => {
    await supabase.auth.signOut();
    setRole(null);
  };

  const isAdmin = role === "admin" || role === "superadmin";

  // Auto-subscribe admins to push notifications once their role is known
  useEffect(() => {
    if (!isAdmin || !user) return;
    const flagKey = `owneo_push_subscribed_${user.id}`;
    if (sessionStorage.getItem(flagKey)) return;
    sessionStorage.setItem(flagKey, "1");
    import("@/lib/pushNotifications").then(({ subscribeAdminToPush }) => {
      subscribeAdminToPush().catch((err) => console.error("admin push subscribe failed", err));
    });
  }, [isAdmin, user?.id]);

  return (
    <AuthContext.Provider value={{ user, session, loading, role, isAdmin, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};
