import { useNavigate } from "react-router-dom";
import SideBar from "../components/sidebar/SideBar";
import "../styles/UserProfile.css";

function UserProfile() {
  const navigate = useNavigate();

  return (
    <div className="profile-content">
      <div className="sidebar-container">
        <SideBar />
      </div>
      <div className="user-profile-container">
        <div className="user-profile-edit-profile-container">
          <button
            className="user-profile-edit-profile-button"
            onClick={() => navigate("/profile/edituserprofile")}
          >
            Edit Profile
          </button>
        </div>
        <div className="user-profile-top-content">
          <div className="profile-picture-container-user-profile">
            <img
              src="/images/default_user_image.png"
              alt="Profile"
              className="user-profile-picture"
            />
          </div>
          <div className="user-profile-info-container">
            <div className="user-profile-name-container">
              FirstName LastName
            </div>
            <div className="user-profile-username-container">@username</div>
            <div className="user-profile-links-number">
              <span style={{ fontWeight: "750" }}>15 </span>
              <span style={{ fontWeight: "500" }}> links </span>
            </div>
            <div className="user-profile-bio">
              hi this is my bio, my fav mod from cs is is1108 and i love prof
              lee boon kee, i aspire to be the most ethical cs student in nus by
              using the FISH model for all my projects. how many shrimps do u
              have to eat before you make ur skin turn pink? eat too much and
              you'll get sick, shrimps are pretty rich. i wonder what happens if
              the text overflows
            </div>
          </div>
        </div>
        <div className="user-profile-bottom-content">this is the bottom</div>
      </div>
    </div>
  );
}

export default UserProfile;
