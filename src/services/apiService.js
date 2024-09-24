import axios from "axios";

const baseURL =
  process.env.NODE_ENV === "production"
    ? process.env.REACT_APP_PROD_API_URL
    : process.env.REACT_APP_DEV_API_URL;

const api = axios.create({
  baseURL: baseURL,
  headers: {
    "Content-Type": "application/json",
  },
});

export const getFoodItems = (data) => api.get("/food-items", data);
export const getStatistics = (data) => api.get("/dashboard", data);
export const postPersonalInfo = (data) => api.post("/create-diet-plan", data);
export const postFeedback = (data) => api.post("/feedback", data);
