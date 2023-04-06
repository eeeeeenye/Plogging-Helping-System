export { default as StartScreen } from './StartScreen'
export { default as LoginScreen } from './LoginScreen'
export { default as RegisterScreen } from './RegisterScreen'
export { default as ResetPasswordScreen } from './ResetPasswordScreen'
export { default as Dashboard } from './Dashboard'

import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import BottomNav from "./BottomNav";
import { BrowserRouter } from "react-router-dom";
ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <BottomNav /> // bottom nav가 항상 떠있도록 index.js에서 호출
      <App /> // bottom nav에 따라 바뀌는 본문
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById("root")
);
