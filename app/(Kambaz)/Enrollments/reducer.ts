/* eslint-disable @typescript-eslint/no-explicit-any */
import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  enrollments: [] as any[],
};

const enrollmentsSlice = createSlice({
  name: "enrollments",
  initialState,
  reducers: {
    setEnrollments: (state, { payload }) => {
      state.enrollments = payload;
    },
    enrollUser: (state, { payload: enrollment }) => {
      const exists = state.enrollments.some(
        (e: any) =>
          e.user === (enrollment as any).user &&
          e.course === (enrollment as any).course
      );
      if (!exists) {
        state.enrollments = [...state.enrollments, enrollment] as any;
      }
    },
    unenrollUser: (state, { payload: { userId, courseId } }) => {
      state.enrollments = state.enrollments.filter(
        (e: any) => !(e.user === userId && e.course === courseId)
      );
    },
  },
});

export const { setEnrollments, enrollUser, unenrollUser } =
  enrollmentsSlice.actions;
export default enrollmentsSlice.reducer;

