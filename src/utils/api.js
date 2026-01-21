import axios from "axios";
import { base_url } from "./base_url";
// import { store } from "../apps/store.js";
// import { refreshToken, logout } from "../services/authService/authSlice.js";

const api = axios.create({
  baseURL: base_url,
  withCredentials: true,
});

api.interceptors.request.use((config) => {
  const user = JSON.parse(localStorage.getItem("user"));
  const token = user?.accessToken;

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

// /* Refresh on 401 */
// api.interceptors.response.use(
//   (res) => res,
//   async (err) => {
//     const originalRequest = err.config;

//     if (err.response?.status === 401 && !originalRequest._retry) {
//       originalRequest._retry = true;

//       try {
//         const result = await store.dispatch(refreshToken()).unwrap();
//         originalRequest.headers.Authorization = `Bearer ${result}`;
//         return api(originalRequest);
//       } catch (err) {
//         store.dispatch(logout());
//         console.log(err);
//       }
//     }

//     return Promise.reject(err);
//   },
// );

export default api;
