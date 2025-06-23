import { useEffect } from "react";
import { supabase } from "../App";
import { Session } from "@supabase/supabase-js";

const AUTO_LOGOUT_MS = 1000 * 60 * 50;

export function useAutoLogoutTimer(session: Session | null) {
  useEffect(() => {
    if (!session) return;

    let timer: NodeJS.Timeout;

    const resetTimer = () => {
      clearTimeout(timer);
      timer = setTimeout(async () => {
        await supabase.auth.signOut();
        alert("You have been logged out due to inactivity.");
        window.location.reload(); 
      }, AUTO_LOGOUT_MS);
    };

    const activityEvents = ["mousemove", "mousedown", "keydown", "scroll", "touchstart"];
    activityEvents.forEach((event) => window.addEventListener(event, resetTimer));

    resetTimer(); 

    return () => {
      clearTimeout(timer);
      activityEvents.forEach((event) => window.removeEventListener(event, resetTimer));
    };
  }, [session]);
}
