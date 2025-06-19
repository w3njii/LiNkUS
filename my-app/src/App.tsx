import { useState, useEffect } from "react";
import { createClient, Session } from "@supabase/supabase-js";
import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import LoginPage from "./pages/LoginPage";
import Main from "./pages/Main";

export const supabase = createClient(
  "https://xytvpdkxrzbiykufavpy.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inh5dHZwZGt4cnpiaXlrdWZhdnB5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDg2NzAzNDYsImV4cCI6MjA2NDI0NjM0Nn0.l0R2Xpm32XnrZSKTgBNG6yaD8a1F2jXPAD5c9a4hKzY"
);

function App() {
  const [session, setSession] = useState<Session | null>(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => subscription.unsubscribe();
  }, []);

  if (!session) {
    return <LoginPage />;
  } else {
    return <Main user={session.user} />;
  }
}

export default App;
