import axios from "axios";

export const getConnectedUsers = async () => {
  const response = {};

  await axios
    .post("/api/chat/users")
    .then((res) => {
      const { status, data } = res.data;
      if (status === "success") {
        response.status = "success";
        response.users = data.users;
      }
    })
    .catch(() => {});

  return response;
};

export const searchUsers = async (user, page = 1) => {
  let response = {};

  await axios
    .get(`/api/user/search?user=${user}&page=${page}`)
    .then((res) => {
      const { status, data } = res.data;
      if (status === "success") {
        response = {
          status: "success",
          ...data,
        };
      }
    })
    .catch(() => {});

  return response;
};
