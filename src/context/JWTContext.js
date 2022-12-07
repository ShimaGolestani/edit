import axios from "axios";
import jwtDecode from "jwt-decode";
import React from "react";
import { useEffect } from "react";
import { useReducer } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import Signin from "../components/signin/Signin";
import axiosInstance from "../config/axios";
import { Token } from "../Constants/LocalStorageConstants";

const JWTContext = React.createContext({
  username: null,
  isValid: false,
  TokenValidator: () => {},
  signOut: () => {},
  SetUser: () => {},
});

const handler = {
  ISVALID: (state, action) => {
    return {
      ...state,
      isValid: action.payload,
    };
  },
  SETUSER: (state, action) => {
    return {
      ...state,
      username: action.payload,
    };
  },
};

const initial = {
  isValid: false,
  username: null,
};

const Reducer = (state, action) =>
  handler[action.type] ? handler[action.type](state, action) : state;

const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(Reducer, initial);
  useEffect(() => {
    const token = localStorage.getItem(Token);

    const user = localStorage.getItem("username");
    if (user) {
      SetUser(user);
    }
    TokenValidator(token);
  }, []);
  const SetUser = (username) => {
    dispatch({ type: "SETUSER", payload: username });
  };
  const TokenValidator = (accessToken) => {
    if (!accessToken) {
      dispatch({ type: "ISVALID", payload: false });
      return false;
    }

    const decodedJWT = jwtDecode(JSON.parse(accessToken).token);
    const currentTime = Date.now() / 10000;
    if (decodedJWT.exp > currentTime) {
      dispatch({ type: "ISVALID", payload: true });
      axiosInstance.defaults.headers.common.Authorization = `${
        JSON.parse(accessToken).token
      }`;

      return true;
    }
    if (decodedJWT.exp < currentTime) {
      requestRefreshToken(JSON.parse(accessToken).refresh_token);
      dispatch({ type: "ISVALID", payload: false });
      return false;
    }
  };
  const requestRefreshToken = async (refreshToken) => {
    const { data, status } = await axios.get(
      "http://192.168.130.195:7080/api/v1/user/refresh_token"
    );
    if (status < 300) {
      const Token = localStorage.getItem(Token);
      if (Token) {
        const { refresh_token } = JSON.parse(Token);
        const newToken = { refresh_token, data };
        localStorage.setItem(Token, JSON.stringify(newToken));
        axiosInstance.defaults.headers.common.Authorization = `${data.token}`;
        dispatch({ type: "ISVALID", payload: true });
      }
    }
  };
  const signOut = () => {
    dispatch({ type: "ISVALID", payload: false });
    localStorage.removeItem("accessToken");
    localStorage.removeItem(Token);
  };

  return (
    <JWTContext.Provider value={{ ...state, TokenValidator, signOut, SetUser }}>
      {children}
    </JWTContext.Provider>
  );
};

export { AuthProvider, JWTContext };
