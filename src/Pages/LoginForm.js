import React from "react";
import { Login } from "react-admin";

import LoginForm from "../Components/LoginForm";

const LoginPage = (props) => (
  <Login {...props}>
    <LoginForm />
  </Login>
);

export default LoginPage;
