import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/EditUserProfile.css"; // optional, for your styling

function EditUserProfile() {
  const navigate = useNavigate();

  const [name, setName] = useState("FirstName LastName");
  const [username, setUsername] = useState("username");
  const [bio, setBio] = useState("hi this is my bio...");
  const [profilePic, setProfilePic] = useState(
    "/images/default_user_image.png"
  );

  const handleSave = () => {
    // TODO: Implement save logic (e.g., update to backend)
    console.log({ name, username, bio, profilePic });
    navigate("/profile"); // Go back to profile after saving
  };

  const handleCancel = () => {
    navigate("/profile"); // Go back without saving
  };

  return (
    <div className="edit-profile-page">
      <h2>Edit Your Profile</h2>

      <div className="edit-profile-form">
        <div className="edit-profile-picture-section">
          <img
            src={profilePic}
            alt="Profile"
            className="edit-profile-picture"
          />
          <input
            type="file"
            accept="image/*"
            onChange={(e) => {
              if (e.target.files && e.target.files[0]) {
                const url = URL.createObjectURL(e.target.files[0]);
                setProfilePic(url);
              }
            }}
          />
        </div>

        <label>
          Name:
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </label>

        <label>
          Username:
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </label>

        <label>
          Bio:
          <textarea
            rows={4}
            value={bio}
            onChange={(e) => setBio(e.target.value)}
          />
        </label>

        <div className="edit-profile-buttons">
          <button onClick={handleSave}>Save</button>
          <button onClick={handleCancel} className="cancel-button">
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}

export default EditUserProfile;
