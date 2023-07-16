import axios from "axios";
import { isDevelopment } from "./helpers";

export const axiosInstance = axios.create({
  baseURL: isDevelopment()
    ? "http://127.0.0.1:3010/api/"
    : "https://aeemovies.onrender.com/api/",
  withCredentials: true,
});
