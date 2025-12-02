/* eslint-disable @typescript-eslint/no-explicit-any */
import * as client from "./client";
import { useEffect, useState } from "react";
import { setCurrentUser } from "./reducer";
import { useDispatch } from "react-redux";
export default function Session({ children }: { children: any }) {
  const [pending, setPending] = useState(true);
  const dispatch = useDispatch();
  const fetchProfile = async () => {
    try {
      const currentUser = await client.profile();
      dispatch(setCurrentUser(currentUser));
    } catch (err: any) {
      // 401 is expected when user is not logged in - this is normal
      if (err.response?.status === 401) {
        // User is not authenticated, clear any stale user data
        dispatch(setCurrentUser(null));
      } else {
        // Only log non-401 errors
        console.error("Profile fetch error:", err);
      }
    } finally {
      setPending(false);
    }
  };
  useEffect(() => {
    fetchProfile();
  }, []);
  if (!pending) {
    return children;
  }
  return null; // Return null while pending
}
