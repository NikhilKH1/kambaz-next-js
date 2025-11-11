/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import React from "react";
import { usePathname, useParams } from "next/navigation";
import { useSelector } from "react-redux";
import { RootState } from "../../store";

export default function Breadcrumb({
  course: courseProp,
}: {
  course: { name: string; _id: string } | undefined;
}) {
  const pathname = usePathname();
  const params = useParams();
  const cid = params?.cid as string;
  
  // Get course from Redux if not provided as prop
  const { courses } = useSelector((state: RootState) => state.coursesReducer);
  const course = courseProp || courses.find((c: any) => c._id === cid);

  const segments = pathname.split("/").filter(Boolean);

  const displaySegments = segments.map((seg, index) => {
    // Replace course ID with course name - check both course._id and cid from params
    if ((course && seg === course._id) || seg === cid) {
      return course?.name || seg;
    }
    // Capitalize the first letter of other segments (like "Home", "Assignments", etc.)
    if (index > 0 && seg !== "Courses") {
      return seg.charAt(0).toUpperCase() + seg.slice(1);
    }
    return seg;
  });

  return <span>{displaySegments.join(" > ")}</span>;
}