import React from "react";
import Slider from "../components/Slider";
import { Link } from "react-router-dom";

import {
  useSubmitFormContentCheck,
  useCheckCurrentUser,
} from "../contexts/AppContext";

import { useAppContext } from "../contexts/AppContext";

export default function Home() {
  const [state, dispatch] = useAppContext();
  const [formIsNotEmpty] = useSubmitFormContentCheck();

  const [isAuthorized] = useCheckCurrentUser();

  function logout(e) {
    e.preventDefault();
    localStorage.setItem(
      "currentUser",
      JSON.stringify({ email: "", password: "" })
    );
    dispatch({ type: "loginUser", payload: { email: "", password: "" } });
  }

  return (
    <div className="container-fullscreen">
      <div className="user-info-placeholder">
        {!isAuthorized ? (
          <>
            <Link to="/signin" className="signin-signup-btn">
              Sign In
            </Link>
            <Link to="/signup" className="signin-signup-btn">
              {formIsNotEmpty && "Resume"} Sign Up
            </Link>
          </>
        ) : (
          <>
            <p className="user-welcome">Hello, {`${state.currentUser.name}`}</p>
            <Link to="/#" className="exit-icon" onClick={logout}>
              Ex
            </Link>
          </>
        )}
      </div>
      <Slider />
      <Link to="/browse" className="browse-btn">
        Browse
      </Link>
    </div>
  );
}
