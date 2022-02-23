import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import LinearProgress from "@mui/material/LinearProgress";
import { LOGIN_USER } from "../../store/actions/actionTypes";
import { AuthButton } from "../../utils/Button";
import InputField from "../../utils/InputField";
import formValidator from "../../utils/formValidator";
import { login } from "../../api/auth";

const inputFields = [
  {
    type: "text",
    validation: "email",
    placeholder: "Email",
  },
  {
    type: "password",
    validation: "password",
    placeholder: "Password",
  },
];

export default function SignIn() {
  const dispatch = useDispatch();
  const [mounted, setMounted] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [data, setData] = useState({
    email: "",
    password: "",
    errors: {
      email: "",
      password: "",
    },
  });

  const handleChange = (event, validation) => {
    setData({
      ...data,
      [validation]: event.target.value,
    });
  };

  const handleLogin = async (event) => {
    event.preventDefault();
    if (!submitting) {
      let goAheadAndSubmit = true;
      for (let i = 0; i < inputFields.length; i++) {
        const { validation } = inputFields[i];
        let error = formValidator(data[validation], validation, false);

        // if there are errors and goAheadAndSubmit is true then make it false
        if (error && goAheadAndSubmit) {
          goAheadAndSubmit = false;
        }

        // set error to the data
        const { errors } = data;
        errors[validation] = error;
        setData((data) => ({
          ...data,
          errors,
        }));
      }

      if (goAheadAndSubmit) {
        setSubmitting(true);
        const dta = { ...data };
        delete dta.errors;

        const response = await login(dta);
        const { status, error, user } = response;
        if (mounted) {
          if (status === "success") {
            dispatch({ type: LOGIN_USER, payload: { user } });
            window.location = "/";
          } else {
            setData({
              ...data,
              errors: {
                ...data.errors,
                password: error,
              },
            });
            setSubmitting(false);
          }
        }
      }
    }
  };

  useEffect(() => () => setMounted(false), []);

  return (
    <div className="grid bg-blue-50 place-items-center min-h-screen py-10">
      <div className="relative">
        {submitting && <LinearProgress className="absolute top-1" />}

        <div className="bg-white border p-10 auth-container">
          <div className="text-center text-xl text-gray-700 uppercase">
            Login
          </div>
          <div>
            <form
              onSubmit={handleLogin}
              className="flex flex-col space-y-4 pt-4 pb-2"
            >
              {inputFields.map((field, index) => {
                const { validation, type, placeholder } = field;
                return (
                  <InputField
                    key={index}
                    type={type}
                    value={data[validation]}
                    placeholder={placeholder}
                    handleChange={(event) => handleChange(event, validation)}
                    error={data.errors[validation]}
                  />
                );
              })}

              <AuthButton label="Login" loading={submitting} />
            </form>
            <div className="text-blue-500 underline">
              <Link to="/register">Don't have an account? Register</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
