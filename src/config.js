import axios from "axios";
export const axiosInstance = axios.create({
  baseURL: "https://aeemovies.onrender.com/api/",
});
