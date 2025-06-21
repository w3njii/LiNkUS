import "../styles/Main.css";
import SideBar from "../components/sidebar/SideBar";

function Main() {
  return (
    <div className="main-content">
      <div className="sidebar-container">
        <SideBar />
      </div>
      <div className="center-container">
        <div className="events-container">
          <div className="box1">1</div>
        </div>

      </div>
      <div className="discover-container">
        <p>Discover Placeholder</p>
      </div>
    </div>
  );
}

export default Main;
