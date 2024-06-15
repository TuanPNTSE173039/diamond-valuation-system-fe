import { axiosInstance } from "./config/axiosInstance.js";

const login = async (username, password) => {
  const response = await axiosInstance.post("/auth/login", {
    username,
    password,
  });
  // check the response status code oke or not
  // If not, throw an error
  if (response.status !== 200) {
    throw new Error("Error logging in");
  }

  // If oke
  // Store user data in local storage
  localStorage.setItem("auth", JSON.stringify(response.data));

  return response.data;
};

const logout = () => {
  localStorage.removeItem("auth");
};

const getCurrentUser = () => {
  return JSON.parse(localStorage.getItem("auth"))?.userInformation;
};

const getCurrentToken = () => {
  return JSON.parse(localStorage.getItem("auth"))?.userToken;
};

const AuthService = {
  login,
  logout,
  getCurrentUser,
  getCurrentToken,
};

export default AuthService;
