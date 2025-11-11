/* eslint-disable @typescript-eslint/no-explicit-any */
import courses from "./courses.json";
import modules from "./modules.json";
import assignments from "./assignments.json";
import users from "./users.json";
import enrollments from "./enrollments.json";

export interface Course {
  _id: string;
  name: string;
  number: string;
  startDate: string;
  endDate: string;
  department: string;
  credits: number;
  description: string;
  image?: string;
  author?: string;
}

export interface Module {
  editing: any;
  _id: string;
  name: string;
  course: string;
  lessons?: Lesson[];
}

export interface Lesson {
  _id: string;
  name: string;
}

export interface Assignment {
  _id: string;
  title: string;
  course: string;
  description: string;
  "Not available until": string;
  "Due": string;
  points: number;
}

export interface User {
  _id: string;
  firstName: string;
  lastName: string;
  loginId: string;
  section: string;
  role: string;
  lastActivity: string;
  totalActivity: string;
}

export interface Enrollment {
  _id: string;
  user: string;
  course: string;
}

export { courses, modules, assignments, users, enrollments };