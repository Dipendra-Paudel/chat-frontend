import React, { useState, useEffect, useRef } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
import { LOGIN_USER } from "./store/actions/actionTypes";
import { verifyToken } from "./api/auth";
import App from "./App";

const TokenValidation = () => {
  const [verifying, setVerifying] = useState(true);
  const { loggedIn } = useSelector((store) => store.auth);
  const dispatch = useRef();
  dispatch.current = useDispatch();

  useEffect(() => {
    const verifyLocalStorageToken = async () => {
      const { status, user } = await verifyToken();
      if (status === "success") {
        dispatch.current({ type: LOGIN_USER, payload: { user } });
      }
      setVerifying(false);
    };
    verifyLocalStorageToken();
  }, []);

  if (verifying) {
    return <div>Loading...</div>;
  }

  if (loggedIn) {
    return (
      <Routes>
        <Route exact path="/" element={<App />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    );
  }

  return (
    <Routes>
      <Route exact path="/login" element={<Login />} />
      <Route exact path="/register" element={<Register />} />
      <Route path="*" element={<Navigate to="/login" />} />
    </Routes>
  );
};

export default TokenValidation;
