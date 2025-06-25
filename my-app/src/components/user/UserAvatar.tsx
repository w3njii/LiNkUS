import { useNavigate } from "react-router-dom";
import { useState, useEffect } from 'react'
import { supabase } from "../../App";
import "../../styles/components/user/UserAvatar.css";

function UserAvatar() {
  const navigate = useNavigate();

    const [name, setName] = useState<String>("");
    const [username, setUsername] = useState<String>("");
    const [avatarUrl, setAvatarUrl] = useState<string>("");
  
    useEffect(() => {
      const fetchProfile = async () => {
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) return;
  
        const { data, error } = await supabase
          .from("profiles")
          .select("*")
          .eq("user_id", user.id)
          .single();
  
          if (error) {
            console.error("Failed to load profile:", error.message);
          } else if (data) {
            setName(data.name);
            setUsername(data.username);
            if (data.avatar_url) {
              setAvatarUrl(data.avatar_url);
            }
          }
      }
  
      fetchProfile();
    }, []);

  return (
    <div className="avatar-container">
      <button className="avatar-click-box" onClick={() => navigate("/profile")}>
        <div className="profile-picture-container">
          <img
            src={avatarUrl || "/images/default_user_image.png"}
            onError={(e) => {
              (e.target as HTMLImageElement).src =
                "/images/default_user_image.png";
            }}
            alt={`${username}'s profile picture`}
            className="user-image"
          />
        </div>
        <div className="name-container">
          <div>{name}</div>
          <div>@{username}</div>
        </div>
      </button>
    </div>
  );
}

export default UserAvatar;
