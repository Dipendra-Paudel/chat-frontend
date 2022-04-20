import axios from "axios";

// Verify User Token
export const verifyToken = async () => {
  const clientResult = {};

  await axios
    .post("/api/user/verify-jwt")
    .then((res) => {
      const { status, user } = res.data;
      clientResult.status = status;
      status === "success" && (clientResult.user = user);
    })
    .catch(() => {});

  return clientResult;
};

// Login User
export const login = async (data) => {
  let clientResult = {};

  await axios
    .post("/api/user/login", data)
    .then((res) => {
      const result = res.data;
      const { status, error, user, token } = result;

      // Handle all errors
      if (status !== "success") {
        clientResult.error = error;
      } else {
        clientResult.status = "success";
        clientResult.user = user;
        localStorage.setItem("token", token);
      }
    })
    .catch((error) => {
      if (error.response) {
        const { data } = error.response;

        if (typeof data === "string") {
          clientResult.error = data;
        } else {
          clientResult.error =
            data?.message || "Something went wrong. Please try again later";
        }
      }
    });

  return clientResult;
};

// Register User
export const register = async (data) => {
  const clientResult = {};

  await axios
    .post("/api/user/register", data)
    .then((res) => {
      const result = res.data;
      const { status, errors, message, user, token } = result;
      if (status !== "success") {
        errors && (clientResult.errors = errors);
        message && (clientResult.error = message);
      } else {
        clientResult.status = "success";
        clientResult.user = user;
        localStorage.setItem("token", token);
      }
    })
    .catch((error) => {
      if (error.response) {
        const { data } = error.response;

        if (typeof data === "string") {
          clientResult.message = data;
        } else {
          clientResult.message =
            data?.message || "Something went wrong. Please try again later";
        }
      }
    });

  return clientResult;
};
