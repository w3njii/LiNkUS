import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import { supabase } from "../App";
import "../styles/LoginPage.css";

function LoginPage() {
  return (
    <>
      <div className="login-container">
        <div className="box">
          <h1 className="linkus">LiNkUS</h1>
          <div className="auth">
            <Auth supabaseClient={supabase} providers={["google", "github", "facebook"]}></Auth>
          </div>
        </div>
      </div>
    </>
  );
}

export default LoginPage;
