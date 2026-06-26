import axios from "axios";

export const getErrorMessage = (err: unknown): string => {
  if (axios.isAxiosError(err)) {
    const msg = err.response?.data?.message;
    if (msg) return Array.isArray(msg) ? msg.join(", ") : String(msg);
    if (err.message === "Network Error")
      return "Unable to connect to the server. Please try again.";
    return err.message;
  }
  return String(err);
};
