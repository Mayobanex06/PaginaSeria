import { apiPost } from "../api.js";

export function registerUser(data) {
  return apiPost("/register", data);
}

export function loginUser(data) {
  return apiPost("/login", data);
}
