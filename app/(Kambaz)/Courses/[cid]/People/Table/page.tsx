/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { Table, Button, FormControl, FormSelect } from "react-bootstrap";
import { FaUserCircle } from "react-icons/fa";
import { FaPen, FaTrash } from "react-icons/fa6";
import { useSelector } from "react-redux";
import { RootState } from "../../../../store";
import * as coursesClient from "../../../client";
import * as usersClient from "../../../../Users/client";
import PeopleDetails from "../Details";

interface User {
  _id: string;
  username: string;
  firstName: string;
  lastName: string;
  loginId: string;
  section: string;
  role: string;
  lastActivity?: string;
  totalActivity?: string;
  email?: string;
}

interface PeopleTableProps {
  users?: User[];
  fetchUsers?: () => void;
}

const emptyUser = {
  username: "",
  password: "",
  firstName: "",
  lastName: "",
  loginId: "",
  section: "",
  role: "STUDENT",
  email: "",
};

export default function PeopleTable({ users, fetchUsers }: PeopleTableProps) {
  const params = useParams();
  const courseId = params?.cid as string;
  const { currentUser } = useSelector((state: RootState) => state.accountReducer);
  const isFaculty =
    (currentUser as any)?.role?.toUpperCase().trim() === "FACULTY";
  const isAdmin =
    (currentUser as any)?.role?.toUpperCase().trim() === "ADMIN";

  // If users prop is provided, use it (for general users list)
  // Otherwise, fetch course-specific users
  const [people, setPeople] = useState<User[]>(users || []);
  const [form, setForm] = useState<any>(emptyUser);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [showDetails, setShowDetails] = useState(false);
  const [showUserId, setShowUserId] = useState<string | null>(null);

  const loadPeople = async () => {
    if (!courseId) return;
    try {
      setError(null);
      const data = await coursesClient.findUsersForCourse(courseId);
      setPeople(data || []);
    } catch (e: any) {
      console.error("Error loading people:", e);
      setError(e.response?.data?.message || "Unable to load people at the moment.");
    }
  };

  useEffect(() => {
    if (users !== undefined) {
      // If users prop is provided, use it directly
      setPeople(users);
    } else if (courseId) {
      // Otherwise, fetch course-specific users
      loadPeople();
    }
  }, [courseId, users]);

  const startEdit = (user: User) => {
    setEditingId(user._id);
    setForm({ ...user, password: "" });
  };

  const resetForm = () => {
    setEditingId(null);
    setForm(emptyUser);
  };

  const handleChange = (field: string, value: string) => {
    setForm({ ...form, [field]: value });
  };

  const buildPayload = () => {
    const payload = { ...form };
    if (!payload.password) {
      delete payload.password;
    }
    return payload;
  };

  const handleSave = async () => {
    if (!isFaculty && !isAdmin) return;
    if (!courseId) return; // Course-specific operations require courseId
    try {
      setError(null);
      const payload = buildPayload();
      if (editingId) {
        await usersClient.updateUserInCourse(
          courseId,
          editingId,
          payload
        );
      } else {
        await usersClient.createUserForCourse(
          courseId,
          payload
        );
      }
      resetForm();
      // Refresh the enrolled users list from the server
      await loadPeople();
      if (fetchUsers) {
        fetchUsers();
      }
    } catch (e) {
      setError("Unable to save user changes.");
    }
  };

  const handleDelete = async (userId: string) => {
    if (!isFaculty && !isAdmin) return;
    if (!courseId) return; // Course-specific operations require courseId
    try {
      setError(null);
      await usersClient.deleteUserFromCourse(courseId, userId);
      if (editingId === userId) {
        resetForm();
      }
      // Refresh the enrolled users list from the server
      await loadPeople();
      if (fetchUsers) {
        fetchUsers();
      }
    } catch (e) {
      setError("Unable to delete user.");
    }
  };

  const handleShowDetails = (userId: string) => {
    setShowUserId(userId);
    setShowDetails(true);
  };

  const handleCloseDetails = () => {
    setShowDetails(false);
    setShowUserId(null);
    if (fetchUsers) {
      fetchUsers();
    }
  };

  return (
    <div id="wd-people-table">
      {showDetails && (
        <PeopleDetails uid={showUserId} onClose={handleCloseDetails} />
      )}
      {error && (
        <div className="alert alert-warning" role="alert">
          {error}
        </div>
      )}
      <Table striped bordered hover>
        <thead className="table-light">
          <tr>
            <th>Name</th>
            <th>Login ID</th>
            <th>Section</th>
            <th>Role</th>
            <th>Last Activity</th>
            <th>Total Activity</th>
            {(isFaculty || isAdmin) && courseId && <th>Actions</th>}
          </tr>
        </thead>
        <tbody>
          {people.map((user) => (
            <tr key={user._id}>
              <td className="wd-full-name text-nowrap">
                <span
                  className="text-decoration-none"
                  style={{ cursor: "pointer" }}
                  onClick={() => handleShowDetails(user._id)}
                >
                  <FaUserCircle className="me-2 fs-1 text-secondary" />
                  <span className="wd-first-name">{user.firstName}</span>{" "}
                  <span className="wd-last-name">{user.lastName}</span>
                </span>
              </td>
              <td className="wd-login-id">{user.loginId}</td>
              <td className="wd-section">{user.section}</td>
              <td className="wd-role">{(user.role || "").toUpperCase()}</td>
              <td className="wd-last-activity">{user.lastActivity || "N/A"}</td>
              <td className="wd-total-activity">{user.totalActivity || "N/A"}</td>
              {(isFaculty || isAdmin) && courseId && (
                <td className="text-nowrap">
                  <Button
                    variant="link"
                    className="text-primary p-0 me-2"
                    onClick={() => startEdit(user)}
                  >
                    <FaPen />
                  </Button>
                  <Button
                    variant="link"
                    className="text-danger p-0"
                    onClick={() => handleDelete(user._id)}
                  >
                    <FaTrash />
                  </Button>
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </Table>

      {(isFaculty || isAdmin) && courseId && (
        <div className="mt-4 border rounded p-3 bg-light-subtle">
          <h5>{editingId ? "Edit User" : "Add User"}</h5>
          <div className="row g-2">
            <div className="col-md-6">
              <FormControl
                placeholder="First Name"
                value={form.firstName}
                onChange={(e) => handleChange("firstName", e.target.value)}
                className="mb-2"
              />
            </div>
            <div className="col-md-6">
              <FormControl
                placeholder="Last Name"
                value={form.lastName}
                onChange={(e) => handleChange("lastName", e.target.value)}
                className="mb-2"
              />
            </div>
            <div className="col-md-6">
              <FormControl
                placeholder="Username"
                value={form.username}
                onChange={(e) => handleChange("username", e.target.value)}
                className="mb-2"
              />
            </div>
            <div className="col-md-6">
              <FormControl
                placeholder="Password"
                type="password"
                value={form.password}
                onChange={(e) => handleChange("password", e.target.value)}
                className="mb-2"
              />
            </div>
            <div className="col-md-6">
              <FormControl
                placeholder="Login ID"
                value={form.loginId}
                onChange={(e) => handleChange("loginId", e.target.value)}
                className="mb-2"
              />
            </div>
            <div className="col-md-6">
              <FormControl
                placeholder="Section"
                value={form.section}
                onChange={(e) => handleChange("section", e.target.value)}
                className="mb-2"
              />
            </div>
            <div className="col-md-6">
              <FormControl
                placeholder="Email"
                value={form.email}
                onChange={(e) => handleChange("email", e.target.value)}
                className="mb-2"
              />
            </div>
            <div className="col-md-6">
              <FormSelect
                value={form.role}
                onChange={(e) => handleChange("role", e.target.value)}
                className="mb-2"
              >
                <option value="STUDENT">Student</option>
                <option value="TA">TA</option>
                <option value="FACULTY">Faculty</option>
                <option value="ADMIN">Admin</option>
              </FormSelect>
            </div>
          </div>
          <div className="d-flex gap-2">
            <Button variant="success" onClick={handleSave}>
              {editingId ? "Update User" : "Add User"}
            </Button>
            <Button variant="outline-secondary" onClick={resetForm}>
              Clear
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
