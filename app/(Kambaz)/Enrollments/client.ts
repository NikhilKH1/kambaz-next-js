/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "axios";

const HTTP_SERVER =
  process.env.NEXT_PUBLIC_HTTP_SERVER || "http://localhost:4000";
const USERS_API = "/api/users";

export const fetchEnrollments = async (userId = "current") => {
  const response = await axios.get(`${HTTP_SERVER}${USERS_API}/${userId}/enrollments`, {
    withCredentials: true,
  });
  return response.data;
};

export const enrollInCourse = async (
  userId = "current",
  courseId: string
) => {
  const response = await axios.post(
    `${HTTP_SERVER}${USERS_API}/${userId}/enrollments`,
    { courseId },
    { withCredentials: true }
  );
  return response.data;
};

export const unenrollFromCourse = async (
  userId = "current",
  courseId: string
) => {
  await axios.delete(
    `${HTTP_SERVER}${USERS_API}/${userId}/enrollments/${courseId}`,
    { withCredentials: true }
  );
};

