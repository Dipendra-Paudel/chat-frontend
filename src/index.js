import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import axios from "axios";
import store from "./store/store";
import TokenValidation from "./TokenValidation";
import "./assets/css/tailwind.css";
import "./assets/css/styles.css";

const baseUrl = process.env.REACT_APP_API_BASE_URL;

const axiosInterceptor = () => {
  axios.interceptors.request.use(
    function (config) {
      // Do something before request is sent
      config.headers.Authorization = `Bearer ${localStorage.getItem("token")}`;
      return config;
    },
    function (error) {
      // Do something with request error
      return Promise.reject(error);
    }
  );

  axios.interceptors.response.use(
    function (response) {
      return response;
    },
    function (error) {
      if (error.response.status === 401) {
        localStorage.removeItem("token");
        window.location = "/login";
      }
      return Promise.reject(error.response.data);
    }
  );

  // Alter defaults after instance has been created
  axios.defaults.baseURL = baseUrl;
  axios.defaults.headers.common["Content-Type"] = "application/json";
  axios.defaults.timeout = 10000;
};

axiosInterceptor();

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <TokenValidation />
      </BrowserRouter>
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);
