import { toast } from "react-hot-toast";
import { API_URL } from "./constants";

export const makeApiRequests = async ({
  endpoint,
  requestBody,
  method = "POST",
  stringify = true,
  contentType = "application/json",
}) => {
  const token = JSON.parse(localStorage.getItem("user"))?.token;
  const headers = {
    "Content-Type": contentType,
    "auth-token": token ? `${token}` : undefined,
  };

  const response = await fetch(API_URL + endpoint, {
    method: method,
    body: requestBody
      ? stringify
        ? JSON.stringify(requestBody)
        : requestBody
      : undefined,
    headers,
  });

  const responseBody = await response.json();

  if (!responseBody.success) {
    toast.error(responseBody?.error);
    return;
  }

  return responseBody?.message;
};
