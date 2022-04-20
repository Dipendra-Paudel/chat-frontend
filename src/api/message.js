import axios from "axios";

export const getMessages = async (user, lastMessageTime) => {
  const response = {};

  await axios
    .post("/api/chat", { user, lastMessageTime })
    .then((res) => {
      const { status, data, error } = res.data;

      if (status === "success") {
        response.messages = data.messages;
        response.status = "success";
      } else {
        response.error = error;
      }
    })
    .catch((error) => {
      if (error.response) {
        const { data } = error.response;

        if (typeof data === "string") {
          response.error = data;
        } else {
          response.error =
            data?.message || "Something went wrong. Please try again later";
        }
      }
    });

  return response;
};
