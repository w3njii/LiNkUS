import { Session } from "@supabase/supabase-js";
import { useEffect, useState } from "react";
import { supabase } from "../App";  
import MessageSidebar from "../components/message/MessageSidebar";
import MessageInput from "../components/message/MessageInput";
// import UserPanel from "../components/layout/UserPanel";
import UserProfile from "./UserProfile";
import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";
// import "./Main.css";
// import Events from "./Events";
import SideBar from "../components/sidebar/SideBar";    

interface MainProps {
  user: Session["user"];
}

const handleLogout = async () => { 
  const confirm = window.confirm("Are you sure you want to log out?");
  if (!confirm) return;

  const { error } = await supabase.auth.signOut();
  if (error) {
    console.error("Error logging out:", error.message);
  } else {
    console.log("Logged out successfully");
  }
}

function Message({ user }: MainProps) {
  console.log("Message component is rendering");

  const [selectedFriend, setSelectedFriend] = useState<string>("");
  const navigate = useNavigate();

  useEffect(() => {
    console.log("Message sees selectedFriend update:", selectedFriend);
  }, [selectedFriend]);

  return (
    <div style={{ display: "flex", height: "100vh" }}>
      <div className="sidebar-container">
        <SideBar />
      </div>
      <div style={{ left: "50px", width: "50%" }}>
        <MessageSidebar onSelectFriend={setSelectedFriend} />
      </div>
      <div style={{ width: "200%" }}>
        <MessageInput recipientId={selectedFriend} />
      </div>
      {/* <UserPanel /> */}
    </div>
  );
}

export default Message;