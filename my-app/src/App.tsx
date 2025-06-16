import { useState, useEffect } from "react";
import { createClient, Session } from "@supabase/supabase-js";
import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import LoginPage from "./pages/LoginPage";

export const supabase = createClient(
  "https://kmsaywphzhkstdkvzisx.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imttc2F5d3Boemhrc3Rka3Z6aXN4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTAwNjI5OTEsImV4cCI6MjA2NTYzODk5MX0.dD1czGLn9DavHh75a6MtXryJGbjlwNF0AsM2vUVfHMo"
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
    return <div>Logged in!</div>;
  }
}

export default App;
