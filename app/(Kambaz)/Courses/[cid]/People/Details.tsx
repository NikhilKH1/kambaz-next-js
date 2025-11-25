/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { useEffect, useState } from "react";
import { FaCheck, FaUserCircle } from "react-icons/fa";
import { IoCloseSharp } from "react-icons/io5";
import { useRouter, usePathname } from "next/navigation";
import * as client from "../../../Account/client";
import { FaPencil } from "react-icons/fa6";
import { FormControl } from "react-bootstrap";

export default function PeopleDetails({ uid, onClose }: { uid: string | null; onClose: () => void; }) {
  const router = useRouter();
  const pathname = usePathname();
  const [user, setUser] = useState<any>({});
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");
  const [editing, setEditing] = useState(false);
  const [editingEmail, setEditingEmail] = useState(false);
  const [editingRole, setEditingRole] = useState(false);

  const fetchUser = async () => {
    if (!uid) return;
    const user = await client.findUserById(uid);
    setUser(user);
    setName(`${user.firstName || ""} ${user.lastName || ""}`.trim());
    setEmail(user.email || "");
    setRole(user.role || "");
  };
  useEffect(() => {
    if (uid) fetchUser();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [uid]);

  const deleteUser = async (uid: string) => {
    await client.deleteUser(uid);
    onClose();
  };

  const saveUser = async () => {
    const [firstName, lastName] = name.split(" ");
    const updatedUser = { ...user, firstName, lastName, email, role };
    await client.updateUser(updatedUser);
    setUser(updatedUser);
    setEditing(false);
    setEditingEmail(false);
    setEditingRole(false);
    onClose();
  };

  const saveEmail = async () => {
    const updatedUser = { ...user, email };
    await client.updateUser(updatedUser);
    setUser(updatedUser);
    setEditingEmail(false);
  };

  const saveRole = async () => {
    const updatedUser = { ...user, role };
    await client.updateUser(updatedUser);
    setUser(updatedUser);
    setEditingRole(false);
  };

  const handleKeyPress = (e: React.KeyboardEvent, saveFn: () => void) => {
    if (e.key === "Enter") {
      saveFn();
    }
  };

  const handleClose = () => {
    onClose();
    // Navigate back to Users screen if we're on the Users page
    if (pathname?.includes("/Account/Users")) {
      router.push("/Account/Users");
    }
  };
  
  if (!uid) return null;
  return (
    <div className="wd-people-details position-fixed top-0 end-0 bottom-0 bg-white p-4 shadow w-25">
      <button onClick={handleClose} className="btn position-fixed end-0 top-0 wd-close-details">
        <IoCloseSharp className="fs-1" /> </button>
      <div className="text-center mt-2"> <FaUserCircle className="text-secondary me-2 fs-1" /> </div><hr />
      
      {/* Name editing */}
      <div className="d-flex align-items-center mb-2">
        {editing ? (
          <>
            <FormControl
              className="text-danger fs-4 wd-name-input"
              value={name}
              onChange={(e) => setName(e.target.value)}
              onKeyPress={(e) => handleKeyPress(e, saveUser)}
            />
            <FaCheck
              className="text-danger ms-2 fs-5"
              style={{ cursor: "pointer" }}
              onClick={saveUser}
            />
          </>
        ) : (
          <>
            <div
              className="text-danger fs-4 wd-name"
              style={{ cursor: "pointer" }}
              onClick={() => setEditing(true)}
            >
              {user.firstName} {user.lastName}
            </div>
            <FaPencil
              className="text-danger ms-2 fs-5"
              style={{ cursor: "pointer" }}
              onClick={() => setEditing(true)}
            />
          </>
        )}
      </div>

      {/* Email editing */}
      <div className="mb-2">
        <b>Email:</b>{" "}
        {editingEmail ? (
          <div className="d-flex align-items-center">
            <FormControl
              type="email"
              className="wd-email-input"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              onKeyPress={(e) => handleKeyPress(e, saveEmail)}
            />
            <FaCheck
              className="text-danger ms-2 fs-5"
              style={{ cursor: "pointer" }}
              onClick={saveEmail}
            />
          </div>
        ) : (
          <div className="d-flex align-items-center">
            <span className="wd-email">{user.email || "N/A"}</span>
            <FaPencil
              className="text-danger ms-2 fs-5"
              style={{ cursor: "pointer" }}
              onClick={() => setEditingEmail(true)}
            />
          </div>
        )}
      </div>

      {/* Role editing */}
      <div className="mb-2">
        <b>Roles:</b>{" "}
        {editingRole ? (
          <div className="d-flex align-items-center">
            <select
              className="form-select wd-role-select"
              value={role}
              onChange={(e) => setRole(e.target.value)}
            >
              <option value="STUDENT">Student</option>
              <option value="TA">Assistant</option>
              <option value="FACULTY">Faculty</option>
              <option value="ADMIN">Administrator</option>
            </select>
            <FaCheck
              className="text-danger ms-2 fs-5"
              style={{ cursor: "pointer" }}
              onClick={saveRole}
            />
          </div>
        ) : (
          <div className="d-flex align-items-center">
            <span className="wd-roles">{user.role || "N/A"}</span>
            <FaPencil
              className="text-danger ms-2 fs-5"
              style={{ cursor: "pointer" }}
              onClick={() => setEditingRole(true)}
            />
          </div>
        )}
      </div>

      <b>Login ID:</b>        <span className="wd-login-id">      {user.loginId}      </span> <br />
      <b>Section:</b>         <span className="wd-section">       {user.section}      </span> <br />
      <b>Total Activity:</b>  <span className="wd-total-activity">{user.totalActivity}</span> 
      <hr />
      <button onClick={() => deleteUser(uid)} className="btn btn-danger float-end wd-delete" > Delete </button>
      <button onClick={onClose}
              className="btn btn-secondary float-end me-2 wd-cancel" > Cancel </button>
      
      </div>


  );
}
