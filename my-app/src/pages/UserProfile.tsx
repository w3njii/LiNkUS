import "../styles/UserProfile.css";
import SideBar from "../components/sidebar/SideBar";

function UserProfile() {
  return (
    <div className="profile-content">
      <div className="sidebar-container">
        <SideBar />
      </div>
      <div className="user-profile-container">
        <div className="user-profile-top-content">
          <div className="profile-picture-container-user-profile">
            <img
              src="/images/default_user_image.png"
              alt="Profile Picture"
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
              <span style={{ fontWeight: "500"}}> links </span>
            </div>
          </div>
        </div>
        <div className="user-profile-bottom-content">
          this is the bottom
        </div>
      </div>
    </div>
  );
}

export default UserProfile;
