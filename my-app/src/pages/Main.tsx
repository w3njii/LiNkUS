import { Session } from "@supabase/supabase-js";
import { useEffect, useState } from "react";
import { supabase } from "../App";

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
};

function Main({ user }: MainProps) {

  return (
    <div>
      <button id="logout" onClick={handleLogout}>
        Logout
      </button>
      <div>
        hello there 
      </div>
    </div>
  );
}

export default Main;
