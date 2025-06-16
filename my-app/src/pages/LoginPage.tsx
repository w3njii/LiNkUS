import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import { supabase } from "../App";

function LoginPage() {
  return (
    <>
      <h1
        style={{
          textAlign: "center",
        }}
      >
        Welcome to LiNkUS!
      </h1>
      <Auth
        supabaseClient={supabase}
        providers={[]}
      ></Auth>
    </>
  );
}

export default LoginPage;
