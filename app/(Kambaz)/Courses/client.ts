/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "axios";
const HTTP_SERVER =
  process.env.NEXT_PUBLIC_HTTP_SERVER || "http://localhost:4000";
const axiosWithCredentials = axios.create({
  baseURL: HTTP_SERVER,
  withCredentials: true,
});

const COURSES_API = "/api/courses";
const USERS_API = "/api/users";
const MODULES_API = "/api/modules";


export const updateModule = async (module: any) => {
  const { data } = await axios.put(
    `${HTTP_SERVER}${MODULES_API}/${module._id}`,
    module
  );
  return data;
};

export const deleteModule = async (moduleId: string) => {
  const response = await axios.delete(
    `${HTTP_SERVER}${MODULES_API}/${moduleId}`
  );
  return response.data;
};


export const fetchAllCourses = async () => {
  const { data } = await axiosWithCredentials.get(COURSES_API);
  return data;
};

export const createCourse = async (course: any) => {
  const { data } = await axiosWithCredentials.post(
    `${USERS_API}/current/courses`,
    course
  );
  return data;
};

export const updateCourse = async (course: any) => {
  const { data } = await axiosWithCredentials.put(
    `${COURSES_API}/${course._id}`,
    course
  );
  return data;
};
  
export const findModulesForCourse = async (courseId: string) => {
  const response = await axios.get(
    `${HTTP_SERVER}${COURSES_API}/${courseId}/modules`
  );
  return response.data;
};

export const createModuleForCourse = async (
  courseId: string,
  module: any
) => {
  const response = await axios.post(
    `${HTTP_SERVER}${COURSES_API}/${courseId}/modules`,
    module
  );
  return response.data;
};
  

  
export const findMyCourses = async () => {
  const { data } = await axiosWithCredentials.get(
    `${USERS_API}/current/courses`
  );
  return data;
};

export const deleteCourse = async (courseId: string) => {
  await axiosWithCredentials.delete(`${COURSES_API}/${courseId}`);
};

