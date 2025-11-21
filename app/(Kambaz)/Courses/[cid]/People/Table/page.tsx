/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useEffect, useState } from "react";
import { Table, Button, FormControl, FormSelect } from "react-bootstrap";
import { FaUserCircle } from "react-icons/fa";
import { FaPen, FaTrash } from "react-icons/fa6";
import { useSelector } from "react-redux";
import { RootState } from "../../../../store";
import * as usersClient from "../../../../Users/client";

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
  params: { cid: string };
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

export default function PeopleTable({ params }: PeopleTableProps) {
  const courseId = params.cid;
  const { currentUser } = useSelector((state: RootState) => state.accountReducer);
  const isFaculty =
    (currentUser as any)?.role?.toUpperCase().trim() === "FACULTY";

  const [people, setPeople] = useState<User[]>([]);
  const [form, setForm] = useState<any>(emptyUser);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const loadPeople = async () => {
    try {
      setError(null);
      const data = await usersClient.findPeopleForCourse(courseId);
      setPeople(data);
    } catch (e) {
      setError("Unable to load people at the moment.");
    }
  };

  useEffect(() => {
    loadPeople();
  }, [courseId]);

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
    if (!isFaculty) return;
    try {
      const payload = buildPayload();
      if (editingId) {
        const updated = await usersClient.updateUserInCourse(
          courseId,
          editingId,
          payload
        );
        setPeople(
          people.map((user) => (user._id === editingId ? updated : user))
        );
      } else {
        const newUser = await usersClient.createUserForCourse(
          courseId,
          payload
        );
        setPeople([...people, newUser]);
      }
      resetForm();
    } catch (e) {
      setError("Unable to save user changes.");
    }
  };

  const handleDelete = async (userId: string) => {
    if (!isFaculty) return;
    try {
      await usersClient.deleteUserFromCourse(courseId, userId);
      setPeople(people.filter((user) => user._id !== userId));
      if (editingId === userId) {
        resetForm();
      }
    } catch (e) {
      setError("Unable to delete user.");
    }
  };

  return (
    <div id="wd-people-table">
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
            {isFaculty && <th>Actions</th>}
          </tr>
        </thead>
        <tbody>
          {people.map((user) => (
            <tr key={user._id}>
              <td className="wd-full-name text-nowrap">
                <FaUserCircle className="me-2 fs-1 text-secondary" />
                <span className="wd-first-name">{user.firstName}</span>{" "}
                <span className="wd-last-name">{user.lastName}</span>
              </td>
              <td className="wd-login-id">{user.loginId}</td>
              <td className="wd-section">{user.section}</td>
              <td className="wd-role">{(user.role || "").toUpperCase()}</td>
              <td className="wd-last-activity">{user.lastActivity || "N/A"}</td>
              <td className="wd-total-activity">{user.totalActivity || "N/A"}</td>
              {isFaculty && (
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

      {isFaculty && (
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
