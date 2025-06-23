import { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  useNavigate,
} from "react-router-dom";
import { createClient, Session } from "@supabase/supabase-js";
import { useAutoLogoutTimer } from "./hooks/useAutoLogoutTimer";
import LoginPage from "./pages/LoginPage";
import Main from "./pages/Main";
import UserProfile from "./pages/UserProfile";
import EditUserProfile from "./pages/EditUserProfile";

export const supabase = createClient(
  "https://xejmdpqfbuuolvtrmxbw.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inhlam1kcHFmYnV1b2x2dHJteGJ3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTA0MTQ3MDgsImV4cCI6MjA2NTk5MDcwOH0.U6JZcf9jN8WUeICaFBKzCdPMayvypzRlbQuT_F8LSRI"
);

function AppWrapper() {
  const [session, setSession] = useState<Session | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    let firstLoad = true;

    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      firstLoad = false;
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event, session) => {
      setSession(session);

      if (event === "SIGNED_IN" && firstLoad) {
        navigate("/");
      }

      if (event === "SIGNED_OUT") {
        navigate("/login");
      }
    });

    return () => subscription.unsubscribe();
  }, [navigate]);
  

  useAutoLogoutTimer(session);

  return (
    <Routes>
      {!session ? (
        <>
          <Route path="/login" element={<LoginPage />} />
          <Route path="*" element={<Navigate to="/login" replace />} />
        </>
      ) : (
        <>
          <Route path="*" element={<Main />} />
          <Route path="/home" element={<Main />} />
          <Route path="/profile" element={<UserProfile />} />
          <Route
            path="/profile/edituserprofile"
            element={<EditUserProfile />}
          />
        </>
      )}
    </Routes>
  );
}

function App() {
  return (
    <Router>
      <AppWrapper />
    </Router>
  );
}

export default App;
