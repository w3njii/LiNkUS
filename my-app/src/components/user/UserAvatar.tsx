import { useNavigate } from "react-router-dom";
import "../../styles/components/user/UserAvatar.css";

function UserAvatar() {
  const navigate = useNavigate();

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
          <div>Firstname</div>
          <div>@userName</div>
        </div>
      </button>
    </div>
  );
}

export default UserAvatar;
