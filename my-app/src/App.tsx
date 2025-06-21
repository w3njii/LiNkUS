import { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { createClient, Session } from "@supabase/supabase-js";
import LoginPage from "./pages/LoginPage";
import Main from "./pages/Main";
import UserProfile from "./pages/UserProfile";

export const supabase = createClient(
  "https://xejmdpqfbuuolvtrmxbw.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inhlam1kcHFmYnV1b2x2dHJteGJ3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTA0MTQ3MDgsImV4cCI6MjA2NTk5MDcwOH0.U6JZcf9jN8WUeICaFBKzCdPMayvypzRlbQuT_F8LSRI"
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
    return (
      <Router>
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/profile" element={<UserProfile />} />
          <Route path="/home" element={<Main />} />
        </Routes>
      </Router>
    );
  }
}

export default App;
