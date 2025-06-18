import HomeButton from "./HomeButton";
import LogoutButton from "./LogoutButton";
import "../styles/SideBar.css";

function SideBar() {
    return (
      <div className="buttons-container">
        <div className="navigation-buttons">
          <HomeButton />
        </div>
        <div className="logout-container">
          <LogoutButton />
        </div>
      </div>
    );
}

export default SideBar;