import "../../styles/components/user/UserAvatar.css";

function UserAvatar() {
  return (
    <div className="avatar-container">
      <a className="avatar-click-box" href="../App">
        <div className="profile-picture-container">
          <img src="/images/default_user_image.png" alt="User Avatar" className="user-image"/>
        </div>
        <div className="name-container">
            <div>Name</div>
            <div>@userName</div>
        </div>
      </a>
    </div>
  );
}

export default UserAvatar;
