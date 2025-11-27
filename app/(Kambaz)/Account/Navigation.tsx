/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Nav, NavItem, NavLink } from "react-bootstrap";
import { useSelector } from "react-redux";
import { RootState } from "../store";

export default function AccountNavigation() {
  const { currentUser } = useSelector((state: RootState) => state.accountReducer);
  const pathname = usePathname();

  const isAdmin =
    currentUser &&
    (currentUser as any)?.role?.toUpperCase().trim() === "ADMIN";

  return (
    <Nav variant="pills">
      {/* Always show profile if logged in */}
      {currentUser && (
        <NavItem>
          <NavLink
            as={Link}
            href="/Account/Profile"
            active={
              pathname === "/Account/Profile" ||
              pathname.startsWith("/Account/Profile/")
            }
          >
            Profile
          </NavLink>
        </NavItem>
      )}

      {/* Show Users ONLY for ADMIN */}
      {isAdmin && (
        <NavItem>
          <NavLink
            as={Link}
            href="/Account/Users"
            active={
              pathname === "/Account/Users" ||
              pathname.startsWith("/Account/Users/")
            }
          >
            Users
          </NavLink>
        </NavItem>
      )}

      {/* If not logged in, show Signin + Signup */}
      {!currentUser && (
        <>
          <NavItem>
            <NavLink
              as={Link}
              href="/Account/Signin"
              active={pathname === "/Account/Signin"}
            >
              Signin
            </NavLink>
          </NavItem>

          <NavItem>
            <NavLink
              as={Link}
              href="/Account/Signup"
              active={pathname === "/Account/Signup"}
            >
              Signup
            </NavLink>
          </NavItem>
        </>
      )}
    </Nav>
  );
}
