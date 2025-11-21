/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "axios";

const HTTP_SERVER =
  process.env.NEXT_PUBLIC_HTTP_SERVER || "http://localhost:4000";
const api = axios.create({
  baseURL: HTTP_SERVER,
  withCredentials: true,
});

export const findPeopleForCourse = async (courseId: string) => {
  const response = await api.get(`/api/courses/${courseId}/people`);
  return response.data;
};

export const createUserForCourse = async (
  courseId: string,
  user: any
) => {
  const response = await api.post(`/api/courses/${courseId}/people`, user);
  return response.data;
};

export const updateUserInCourse = async (
  courseId: string,
  userId: string,
  updates: any
) => {
  const response = await api.put(
    `/api/courses/${courseId}/people/${userId}`,
    updates
  );
  return response.data;
};

export const deleteUserFromCourse = async (
  courseId: string,
  userId: string
) => {
  await api.delete(`/api/courses/${courseId}/people/${userId}`);
};

