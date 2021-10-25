import { createContext, useContext, useReducer } from "react";

const AppContext = createContext();

const initialState = {
  signupForm: {
    name: "",
    email: "",
    password: "",
  },
  signinForm: {
    email: "",
    password: "",
  },
  currentUser: {
    name: "",
    email: "",
  },
};

function reducer(state, action) {
  switch (action.type) {
    case "signUpFormChange":
      const changedPropSignUp = {};

      changedPropSignUp[action.field] = action.payload;

      return {
        ...state,
        signupForm: { ...state.signupForm, ...changedPropSignUp },
      };
    case "signInFormChange":
      const changedPropSignIn = {};

      changedPropSignIn[action.field] = action.payload;

      return {
        ...state,
        signinForm: { ...state.signinForm, ...changedPropSignIn },
      };
    case "loginUser": {
      return {
        ...state,
        currentUser: {
          ...state.currentUser,
          name: action.payload.name,
          email: action.payload.email,
        },
      };
    }
    case "resetForms":
      return {
        ...state,
        signupForm: {
          name: "",
          email: "",
          password: "",
        },
        signinForm: {
          email: "",
          password: "",
        },
      };
    default:
      throw new Error("case is impossible");
  }
}

export const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const value = [state, dispatch];
  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export const useAppContext = () => {
  const context = useContext(AppContext);

  if (!context) {
    throw Error("Context should be used within AppContext");
  }

  return context;
};

export const useSubmitFormContentCheck = () => {
  const [state] = useAppContext();

  const allValues = Object.values(state.signupForm);

  const formIsNotEmpty = allValues.find((el) => el !== "");

  return [formIsNotEmpty ? formIsNotEmpty : false];
};

export const useCheckCurrentUser = () => {
  const [state] = useAppContext();

  const allValues = Object.values(state.currentUser);

  const isAuthorized = !allValues.some((el) => el === "");

  return [isAuthorized];
};

export default AppContext;
