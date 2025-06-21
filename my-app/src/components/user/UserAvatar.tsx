import { supabase } from "../../App";
import { Session } from "@supabase/supabase-js";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../styles/components/user/UserAvatar.css";

function UserAvatar() {
  const navigate = useNavigate();
  const [session, setSession] = useState<Session | null>(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      console.log("Initial session:", session);
      setSession(session);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => subscription.unsubscribe();
  }, []);

  return (
    <div className="avatar-container">
      <button className="avatar-click-box" onClick={() => navigate("/profile")}>
        <div className="profile-picture-container">
          <img
            src="/images/default_user_image.png"
            alt="User Avatar"
            className="user-image"
          />
        </div>
        <div className="name-container">
          <div>Firstname La</div>
          <div>@userName</div>
        </div>
      </button>
    </div>
  );
}

export default UserAvatar;
