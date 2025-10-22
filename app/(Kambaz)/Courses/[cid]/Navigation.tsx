'use client';

import Link from "next/link";
import { usePathname } from "next/navigation";

interface CourseNavigationProps {
  cid: string;
}

export default function CourseNavigation({ cid }: CourseNavigationProps) {
  const links = ["Home", "Modules", "Piazza", "Zoom", "Assignments", "Quizzes", "Grades", "People"];
  const pathname = usePathname();

  return (
    <div id="wd-courses-navigation" className="wd list-group fs-5 rounded-0">
      {links.map((link) => {
        const href = link === "People" 
          ? `/Courses/${cid}/${link}/Table` 
          : `/Courses/${cid}/${link}`;
        const isActive = pathname === href;
        
        return (
          <Link 
            key={link}
            href={href}
            id={`wd-course-${link.toLowerCase()}-link`}
            className={`list-group-item border-0 ${isActive ? 'active' : 'text-danger'}`}
          >
            {link}
          </Link>
        );
      })}
    </div>
  );
}
