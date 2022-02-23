import axios from "axios";

export const getMessages = async (
  user,
  page = 1,
  limit = 10,
  lastMessageId
) => {
  const response = {};

  await axios
    .post("/api/chat", { user, page, limit, lastMessageId })
    .then((res) => {
      const { status, data, error } = res.data;

      if (status === "success") {
        response.messages = data.messages;
        response.status = "success";
        response.nextPage = data.nextPage;
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
            data?.message || "Somwthing went wrong. Please try again later";
        }
      }
    });

  return response;
};
