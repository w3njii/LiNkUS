import UserAvatar from "../user/UserAvatar";
import HomeButton from "./HomeButton";
import SearchButton from "./SearchButton";
import MessagesButton from "./MessagesButton";
import NotificationsButton from "./NotificationsButton";
import LogoutButton from "./LogoutButton";
import ButtonStyles from "../../styles/components/sidebar/SidebarButtons.module.css";
import "../../styles/components/sidebar/SideBar.css";

function SideBar() {
  return (
    <div className="buttons-container">
      <div className="profile-container">
        <UserAvatar />
      </div>
      <div className="navigation-buttons">
        <HomeButton className={ButtonStyles["sidebar-button"]} />
        <SearchButton className={ButtonStyles["sidebar-button"]} />
        <NotificationsButton className={ButtonStyles["sidebar-button"]} />
        <MessagesButton className={ButtonStyles["sidebar-button"]} />
      </div>
      <div className="logout-container">
        <LogoutButton />
      </div>
    </div>
  );
}

export default SideBar;
