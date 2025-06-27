import "../styles/Main.css";
import SideBar from "../components/sidebar/SideBar";

function Main() {
  return (
    <div className="main-content">
      <div className="sidebar-container">
        <SideBar />
      </div>
      <div className="center-container">
        <div>Events {"(not implemented yet)"} </div>
        <div className="center-scroll-area">
          <div className="event-placeholder"> event </div>
          <div className="event-placeholder"> event </div>
          <div className="event-placeholder"> event </div>
          <div className="event-placeholder"> event </div>
          <div className="event-placeholder"> event </div>
          <div className="event-placeholder"> event </div>
          <div className="event-placeholder"> event </div>
          <div className="event-placeholder"> event </div>
        </div>
      </div>
      <div className="discover-container">
        <p>Discover {"(not implemented yet)"}</p>
        <div> </div>
      </div>
    </div>
  );
}

export default Main;
