"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function CoursesPage() {
  const router = useRouter();
  
  useEffect(() => {
    router.push("/Dashboard");
  }, [router]);

  return null;
}

