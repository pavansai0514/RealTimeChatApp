import axios from "axios";

const API_URL = "http://localhost:5000/api/auth"; // Adjust based on your backend
  export const saveUserToSessionStorage = (user) => {
  sessionStorage.setItem("user", JSON.stringify(user)); // Serialize user data before storing
  console.log("User saved to sessionStorage:", user);
};

export const login = async (userData) => {
  try {
    const response = await axios.post(`${API_URL}/login`, userData);

    if (response.data.token) {
      localStorage.setItem("token", response.data.token); // Store JWT in localStorage
      console.log("Token stored:", response.data.token);
      console.log("user:",response.data.username);
      saveUserToSessionStorage(response.data.username);
      
    } else {
      console.error("Login failed:", response.data.message);
    }

    return response.data;
  } catch (error) {
    throw error.response?.data?.message || "Login failed";
  }
};

export const register = async (userData) => {
  try {
    const response = await axios.post(`${API_URL}/register`, userData);
    return response.data;
  } catch (error) {
    throw error.response?.data?.message || "Registration failed";
  }
};

// /src/services/authService.js
export const logout = () => {
  // Logic to log out and clear tokens from localStorage
  localStorage.removeItem('token');
};
