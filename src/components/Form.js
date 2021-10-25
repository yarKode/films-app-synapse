import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Redirect } from "react-router";
import { useCheckCurrentUser } from "../contexts/AppContext";

import { useAppContext } from "../contexts/AppContext";

import { addUser, loginUSer } from "../userDB";

import validator from "email-validator";

export default function Form({ formType }) {
  const [state, dispatch] = useAppContext();

  const [isAuthorized] = useCheckCurrentUser();

  const [emailErr, setEmailErr] = useState(null);
  const [passErr, setPassErr] = useState(null);
  const [nameErr, setNameErr] = useState(null);
  const [genErr, setGenErr] = useState(null);
  const [submitErr, setSubmitErr] = useState(null);

  function passChecker(str) {
    const arrFromStr = str.split("");

    if (str.length < 6) {
      setPassErr((prev) => true);
      return;
    }

    const arrContaineNum = arrFromStr.some(
      (el) => typeof Number(el) === "number"
    );

    if (!arrContaineNum) {
      setPassErr((prev) => true);
      return;
    }

    const arrContainUpper = arrFromStr.some((el) => el !== el.toLowerCase());

    if (!arrContainUpper) {
      setPassErr((prev) => true);
      return;
    }

    const format = /[ `!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;
    const containSymb = format.test(str);

    if (!containSymb) {
      setPassErr((prev) => true);
      return;
    }

    setPassErr((prev) => false);
  }

  function handleFieldChange(e) {
    setGenErr((prev) => false);
    setSubmitErr((prev) => false);
    dispatch({
      type: formType === "signup" ? "signUpFormChange" : "signInFormChange",
      field: e.target.name,
      payload: e.target.value.trim(),
    });

    if (e.target.name === "password") {
      passChecker(e.target.value);
    }

    if (e.target.name === "email") {
      setEmailErr((prev) => !validator.validate(e.target.value));
    }

    if (e.target.name === "name") {
      setNameErr((prev) => !Boolean(e.target.value));
    }
  }

  function handleDataSubmit(e) {
    e.preventDefault();

    if (emailErr || passErr || nameErr) {
      setGenErr((prev) => true);
      return;
    }

    if (formType === "signup") {
      if (
        state.signupForm.name === "" ||
        state.signupForm.email === "" ||
        state.signupForm.password === ""
      ) {
        setGenErr((prev) => true);
        return;
      }
      try {
        const newUser = addUser(state.signupForm);

        if (newUser) {
          dispatch({ type: "loginUser", payload: newUser });
          dispatch({
            type: "resetForms",
          });
        }
      } catch (err) {
        setSubmitErr((prev) => err.message);
      }
    }

    if (formType === "signin") {
      if (state.signinForm.email === "" || state.signinForm.password === "") {
        setGenErr((prev) => true);
        return;
      }

      try {
        const loggedUser = loginUSer(state.signinForm);
        if (loggedUser) {
          dispatch({ type: "loginUser", payload: loggedUser });
          dispatch({
            type: "resetForms",
          });
          localStorage.setItem(
            "currentUser",
            JSON.stringify({ name: loggedUser.name, email: loggedUser.email })
          );
        }
      } catch (err) {
        setSubmitErr((prev) => err.message);
      }
    }
  }
  return (
    <div className="form-container">
      {isAuthorized && <Redirect to="/" />}
      <form className="signup-form" action="">
        {genErr && (
          <p className="gen-form-error">
            Please check if your Password is correct, Email valid and Name
            specified
          </p>
        )}
        {submitErr && <p className="gen-form-error">{`${submitErr}`}</p>}
        {formType === "signup" && (
          <>
            <label htmlFor="name">Name:</label>
            <input
              type="text"
              required
              name="name"
              id="name"
              value={state.signupForm.name}
              onChange={handleFieldChange}
            />
          </>
        )}
        <label htmlFor="email">Email:</label>
        <input
          type="text"
          name="email"
          id="email"
          onChange={handleFieldChange}
          value={
            formType === "signup"
              ? state.signupForm.email
              : state.signinForm.email
          }
          required
        />
        {emailErr && <p className="form-error">Email should be valid</p>}
        <label htmlFor="password">Password:</label>
        <input
          type="text"
          required
          name="password"
          id="password"
          value={
            formType === "signup"
              ? state.signupForm.password
              : state.signinForm.password
          }
          onChange={handleFieldChange}
        />
        {passErr && (
          <p className="form-error">
            Password should be 6 symbols at least, contain Capital letter,
            number and symbol
          </p>
        )}
        <button onClick={handleDataSubmit}>Submit</button>
      </form>
      <Link to="/" className="back-home">
        Back Home
      </Link>
    </div>
  );
}
