import { jwtDecode } from "jwt-decode";

function setToken(token) {
  localStorage.setItem("Access_Token", token);
}

function getToken() {
  return localStorage.getItem("Access_Token");
}

function removeToken() {
  localStorage.removeItem("Access_Token");
}

function getRole() {
  const token = getToken();
  if (token && typeof token === "string") {
    try {
      const decodeToken = jwtDecode(token);
      const username = decodeToken.username;

      if (username === "admin") {
        return "admin";
      } else {
        return "user";
      }
    } catch (error) {
      console.error("Invalid token:", error);
      return "guest";
    }
  }
}

export default {
  setToken,
  getToken,
  removeToken,
  getRole,
};
