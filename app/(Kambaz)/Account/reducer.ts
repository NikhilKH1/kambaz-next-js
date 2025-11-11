/* eslint-disable @typescript-eslint/no-explicit-any */
import { createSlice } from "@reduxjs/toolkit";

// Load currentUser from localStorage if available
const loadCurrentUserFromStorage = () => {
  if (typeof window !== "undefined") {
    const stored = localStorage.getItem("currentUser");
    if (stored) {
      try {
        return JSON.parse(stored);
      } catch (e) {
        return null;
      }
    }
  }
  return null;
};

// Save currentUser to localStorage
const saveCurrentUserToStorage = (user: any) => {
  if (typeof window !== "undefined") {
    if (user) {
      localStorage.setItem("currentUser", JSON.stringify(user));
    } else {
      localStorage.removeItem("currentUser");
    }
  }
};

const initialState = {
  currentUser: loadCurrentUserFromStorage(),
};

const accountSlice = createSlice({
  name: "account",
  initialState,
  reducers: {
    setCurrentUser: (state, action) => {
      state.currentUser = action.payload;
      saveCurrentUserToStorage(action.payload);
    },
  },
});

export const { setCurrentUser } = accountSlice.actions;
export default accountSlice.reducer;