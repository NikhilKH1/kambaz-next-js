/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { ReactNode, useState } from "react";

import CourseNavigation from "./Navigation";
import { FaAlignJustify } from "react-icons/fa";
import { useSelector } from "react-redux";
import { useParams } from "next/navigation";
import { RootState } from "../../store";
export default function CoursesLayout({ children }: { children: ReactNode }) {
  const params = useParams();
  const cid = params?.cid as string;
  const { courses } = useSelector((state: RootState) => state.coursesReducer);
  const course = courses.find((course: any) => course._id === cid);
  const [sidebarVisible, setSidebarVisible] = useState(true);
 return (
<div id="wd-courses">
  <h2 className="text-danger">
      <FaAlignJustify 
        className="me-4 fs-4 mb-1" 
        style={{ cursor: 'pointer' }}
        onClick={() => setSidebarVisible(!sidebarVisible)}
      />
      {course?.name}
  </h2> <hr />
  <div className="d-flex">
    {cid && (
      <div className={sidebarVisible ? "d-none d-md-block" : "d-none"}>
        <CourseNavigation cid={cid} />
      </div>
    )}
    <div className="flex-fill">
      {children}
    </div></div>
</div>

);}