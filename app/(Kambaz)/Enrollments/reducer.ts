/* eslint-disable @typescript-eslint/no-explicit-any */
import { createSlice } from "@reduxjs/toolkit";
import { enrollments } from "../Database";
import { v4 as uuidv4 } from "uuid";

// Load enrollments from localStorage if available
const loadEnrollmentsFromStorage = () => {
  if (typeof window !== "undefined") {
    const stored = localStorage.getItem("enrollments");
    if (stored) {
      try {
        return JSON.parse(stored);
      } catch (e) {
        return enrollments;
      }
    }
  }
  return enrollments;
};

// Save enrollments to localStorage
const saveEnrollmentsToStorage = (enrollments: any[]) => {
  if (typeof window !== "undefined") {
    localStorage.setItem("enrollments", JSON.stringify(enrollments));
  }
};

const initialState = {
  enrollments: loadEnrollmentsFromStorage(),
};

const enrollmentsSlice = createSlice({
  name: "enrollments",
  initialState,
  reducers: {
    enrollUser: (state, { payload: { userId, courseId } }) => {
      // Check if enrollment already exists
      const existingEnrollment = state.enrollments.find(
        (e: any) => e.user === userId && e.course === courseId
      );
      if (!existingEnrollment) {
        const newEnrollment: any = {
          _id: uuidv4(),
          user: userId,
          course: courseId,
        };
        state.enrollments = [...state.enrollments, newEnrollment] as any;
        saveEnrollmentsToStorage(state.enrollments);
      }
    },
    unenrollUser: (state, { payload: { userId, courseId } }) => {
      state.enrollments = state.enrollments.filter(
        (e: any) => !(e.user === userId && e.course === courseId)
      );
      saveEnrollmentsToStorage(state.enrollments);
    },
    loadEnrollments: (state) => {
      state.enrollments = loadEnrollmentsFromStorage();
    },
  },
});

export const { enrollUser, unenrollUser, loadEnrollments } = enrollmentsSlice.actions;
export default enrollmentsSlice.reducer;

