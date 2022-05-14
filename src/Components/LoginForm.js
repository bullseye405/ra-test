import React, { useEffect } from "react";

import authProvider from "../utils/authProvider";
import Button from "@mui/material/Button";

const LoginForm = ({ classes }) => {
  const { login } = authProvider;
  useEffect(() => {
    console.log("login form rendered");
    const location = window.location.href;
    const url = new URL(window.location.href);
    const { searchParams } = url;
    const code = searchParams.get("code");
    const state = searchParams.get("state");

    // If code is present, we came back from the provider
    if (code && state) {
      console.log("oauth callback received");
      login({ location });
    }
  }, [login]);

  const handleLogin = () => {
    login(); // Do not provide code, just trigger the redirection
  };

  return (
    <div>
      <Button variant="contained" type="submit" color="primary" onClick={handleLogin}>
        Login
      </Button>
    </div>
  );
};

// const mapDispatchToProps = {
//   userLogin: userLoginAction,
// };

export default LoginForm;
