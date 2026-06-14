import axios from "axios";
const client = axios.create({
  baseURL:
    import.meta.env.NODE_ENVIRONMENT === "development"
      ? import.meta.env.VITE_BASE_URL
      : "/api",
  withCredentials: true,
});
export default client;
