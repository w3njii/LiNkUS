import { Session } from "@supabase/supabase-js";
import { supabase } from "../App";
import "../styles/Main.css";
import SideBar from "../components/SideBar";

interface MainProps {
  user: Session["user"];
}

const handleLogout = async () => {
  const { error } = await supabase.auth.signOut();
  if (error) {
    console.error("Error logging out:", error.message);
  } else {
    console.log("Logged out successfully");
  }
};

function Main({ user }: MainProps) {
  return (
    <div className="main-content">
      <div className="sidebar-container">
        <SideBar />
      </div>
      <div className="center-container">
        <p>Center Placeholder</p>
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
