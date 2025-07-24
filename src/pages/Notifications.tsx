import { useState, useEffect } from "react";
import SideBar from "../components/sidebar/SideBar";
import { supabase } from "../App";

function Notifications() {
  return (
    <div className="search-content">
      <div className="sidebar-container">
        <SideBar />
      </div>

      <div className="notifications-main"></div>
    </div>
  );
}

export default Notifications;
