import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../App";
import "../styles/EditUserProfile.css";

function EditUserProfile() {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [bio, setBio] = useState("");
  const [formError, setFormError] = useState("");

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
            setBio(data.bio);
          }
      }
  
      fetchProfile();
    }, []);

  const handleSave = async (e: React.FormEvent) => {
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user) return;
    e.preventDefault();

    if (!name || !username) {
      setFormError(
        !name && !username
          ? "Please Enter a Name and Username"
          : !name
          ? "Please Enter a Name"
          : "Please Enter a Username"
      );
      return;
    }

    if (!isValidUsername(username)) {
      setFormError(
        "Username can only contain letters, numbers, and underscores (no spaces or symbols)"
      );
      return;
    }

    const { data, error } = await supabase
      .from("profiles")
      .update({ name, username, bio })
      .eq("user_id", user.id)
      .select()

    if (error) {
      console.log(error);
      setFormError("Please fill in the fields correctly")
    }

    if (data) {
      console.log(data);
      setFormError("");
      navigate("/profile", { replace: true });
    }
  };

  const handleCancel = () => {
    navigate("/profile", { replace: true });;
  };

  const isValidUsername = (username: string) => {
    return /^[a-zA-Z0-9_]+$/.test(username);
  };

  return (
    <form className="edit-profile-page">
      <h2>Edit Your Profile</h2>

      <div className="edit-profile-form">
        <div className="edit-profile-picture-section">
          <img
            src="/images/default_user_image.png"
            alt="Profile"
            className="edit-profile-picture"
          />
          <input
            type="file"
            accept="image/*"
            onChange={(e) => {
              if (e.target.files && e.target.files[0]) {
                const url = URL.createObjectURL(e.target.files[0]);
              }
            }}
          />
        </div>

        <label htmlFor="name">
          Name:
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </label>

        <label htmlFor="username">
          Username:
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </label>

        <label htmlFor="bio">
          Bio:
          <textarea
            rows={4}
            id="bio"
            value={bio}
            onChange={(e) => setBio(e.target.value)}
          />
        </label>

        <div className="edit-profile-buttons">
          <button type="button" className="save-button" onClick={handleSave}>
            Save
          </button>
          <button
            type="button"
            onClick={handleCancel}
            className="cancel-button"
          >
            Cancel
          </button>
        </div>
      </div>
      {formError && <p className="form-save-error">{formError}</p>}
    </form>
  );
}

export default EditUserProfile;
