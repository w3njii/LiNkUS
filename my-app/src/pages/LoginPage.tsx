import { Auth } from "@supabase/auth-ui-react";
import { supabase } from "../App";
import "../styles/LoginPage.css";

function LoginPage() {

  return (
    <>
      <div className="login-container">
        <img
          src="/images/linkus_logo_transparent.png"
          alt="linkus logo"
          className="logo"
        />
        <div className="box">
          <h1 className="login-text">Sign In</h1>
          <div className="auth">
            <Auth
              supabaseClient={supabase}
              providers={["google", "github", "facebook"]}
            ></Auth>
          </div>
        </div>
      </div>
    </>
  );
}

export default LoginPage;

