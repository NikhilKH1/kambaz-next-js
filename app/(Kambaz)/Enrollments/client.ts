/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "axios";

export const HTTP_SERVER =
  process.env.NEXT_PUBLIC_HTTP_SERVER || "http://localhost:4000";

const axiosWithCredentials = axios.create({
  baseURL: HTTP_SERVER,
  withCredentials: true,
});

export const USERS_API = "/api/users";

export const fetchEnrollments = async (userId = "current") => {
  const response = await axiosWithCredentials.get(
    `${USERS_API}/${userId}/enrollments`
  );
  return response.data;
};

export const enrollInCourse = async (
  userId = "current",
  courseId: string
) => {
  const response = await axiosWithCredentials.post(
    `${USERS_API}/${userId}/enrollments`,
    { courseId }
  );
  return response.data;
};

export const unenrollFromCourse = async (
  userId = "current",
  courseId: string
) => {
  await axiosWithCredentials.delete(
    `${USERS_API}/${userId}/enrollments/${courseId}`
  );
};

