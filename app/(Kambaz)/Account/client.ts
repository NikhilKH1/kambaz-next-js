/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "axios";

export const HTTP_SERVER =
  process.env.NEXT_PUBLIC_HTTP_SERVER || "http://localhost:4000";

// Log in development to help debug
if (typeof window !== "undefined" && process.env.NODE_ENV !== "production") {
  console.log("Frontend HTTP_SERVER:", HTTP_SERVER);
}

const axiosWithCredentials = axios.create({
  baseURL: HTTP_SERVER,
  withCredentials: true,
  timeout: 10000, // 10 second timeout
});

// Add request interceptor for debugging
axiosWithCredentials.interceptors.request.use(
  (config) => {
    if (typeof window !== "undefined" && process.env.NODE_ENV !== "production") {
      console.log("API Request:", config.method?.toUpperCase(), config.url);
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add response interceptor for error handling
axiosWithCredentials.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      // Server responded with error
      console.error("API Error:", error.response.status, error.response.data);
    } else if (error.request) {
      // Request made but no response
      console.error("Network Error: No response from server", HTTP_SERVER);
    } else {
      // Something else happened
      console.error("Request Error:", error.message);
    }
    return Promise.reject(error);
  }
);
export const USERS_API = "/api/users";
export const findAllUsers = async () => {
  const response = await axiosWithCredentials.get(USERS_API);
  return response.data;
};

export const createUser = async (user: any) => {
  const response = await axiosWithCredentials.post(`${USERS_API}`, user);
  return response.data;
};


export const deleteUser = async (userId: string) => {
  const response = await axiosWithCredentials.delete(`${USERS_API}/${userId}`);
  return response.data;
};


export const findUsersByRole = async (role: string) => {
  const response = await axiosWithCredentials.get(`${USERS_API}?role=${role}`);
  return response.data;
};

export const findUsersByPartialName = async (name: string) => {
  const response = await axiosWithCredentials.get(`${USERS_API}?name=${name}`);
  return response.data;
};

export const findUserById = async (id: string) => {
  const response = await axiosWithCredentials.get(`${USERS_API}/${id}`);
  return response.data;
};


export const signin = async (credentials: any) => {
  try {
    const response = await axiosWithCredentials.post(
      `${USERS_API}/signin`,
      credentials
    );
    return response.data;
  } catch (error: any) {
    // Re-throw with a more descriptive error message
    if (error.response) {
      throw new Error(error.response.data?.message || "Invalid username or password");
    }
    throw error;
  }
};

export const signup = async (user: any) => {
  const response = await axiosWithCredentials.post(
    `${USERS_API}/signup`,
    user
  );
  return response.data;
};

export const updateUser = async (user: any) => {
  const response = await axiosWithCredentials.put(`${USERS_API}/${user._id}`, user);
  return response.data;
};

export const profile = async () => {
  try {
    const response = await axiosWithCredentials.post(`${USERS_API}/profile`);
    return response.data;
  } catch (error: any) {
    // Re-throw to let caller handle (401 is expected when not logged in)
    throw error;
  }
};

export const signout = async () => {
  const response = await axiosWithCredentials.post(`${USERS_API}/signout`);
  return response.data;
};