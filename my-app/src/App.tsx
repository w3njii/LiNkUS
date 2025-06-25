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
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchSession = async () => {
      const { data, error } = await supabase.auth.getSession();
      if (error) {
        console.error("Error getting session:", error);
      }
      setSession(data.session);

      if (data.session?.user) {
        const { data: profile, error: profileError } = await supabase
          .from("profiles")
          .select("username")
          .eq("user_id", data.session.user.id)
          .single();

        if (profileError) {
          console.error("Failed to fetch profile:", profileError.message);
        } else if (!profile?.username) {
          navigate("/profile/edituserprofile");
        }
      }

      setLoading(false);
    };

    fetchSession();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, newSession) => {
      setSession(newSession);

      if (_event === "SIGNED_IN") {
        if (newSession?.user) {
          const checkProfile = async () => {
            const { data: profile, error } = await supabase
              .from("profiles")
              .select("username")
              .eq("user_id", newSession.user.id)
              .single();

            if (error) {
              console.error("Profile fetch error:", error.message);
              navigate("/"); 
            } else if (!profile?.username) {
              navigate("/profile/edituserprofile");
            } else {
              navigate("/");
            }
          };

          checkProfile();
        }
      }

      if (_event === "SIGNED_OUT") {
        navigate("/login");
      }
    });

    return () => subscription.unsubscribe();
  }, [navigate]);

  useAutoLogoutTimer(session);

  if (loading) {
    return <div>Loading...</div>;
  }

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
