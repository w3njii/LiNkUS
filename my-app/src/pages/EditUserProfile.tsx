import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../App";
import "../styles/EditUserProfile.css";

function EditUserProfile() {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [bio, setBio] = useState("");
  const [formError, setFormError] = useState("");

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!name || !username) {
      if (!name && !username) {
        setFormError("Please Enter a Name and Username");
      } else if (!name) {
        setFormError("Please Enter a Name");
      } else if (!username) {
        setFormError("Please Enter a Username");
      }
      return;
    }

    const { data, error } = await supabase
      .from("profiles")
      .insert([{ username }]);

    if (error) {
      console.log(error);
      setFormError("Please fill in the fields correctly")
    }

    if (data) {
      console.log(data);
      setFormError("");
    }
  };

  const handleCancel = () => {
    navigate("/profile", { replace: true });;
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
          <button type="submit" onClick={handleSave} className="save-button">
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
