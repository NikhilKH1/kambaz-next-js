import { Table } from "react-bootstrap";
import { FaUserCircle } from "react-icons/fa";
import { users, enrollments } from "../../../../Database";

interface User {
  _id: string;
  firstName: string;
  lastName: string;
  loginId: string;
  section: string;
  role: string;
  lastActivity: string;
  totalActivity: string;
}

interface Enrollment {
  _id: string;
  user: string;
  course: string;
}

interface PeopleTableProps {
  params: { cid: string };
}

export default function PeopleTable({ params }: PeopleTableProps) {
  // Get course ID from params
  const courseId = params.cid;
  
  // Find all enrollments for this course
  const courseEnrollments = enrollments.filter(
    (enrollment: Enrollment) => enrollment.course === courseId
  );
  
  // Get user IDs from enrollments
  const enrolledUserIds = courseEnrollments.map(
    (enrollment: Enrollment) => enrollment.user
  );
  
  // Get users who are enrolled in this course
  const enrolledUsers = users.filter((user: User) =>
    enrolledUserIds.includes(user._id)
  );

  return (
    <div id="wd-people-table">
      <Table striped bordered hover>
        <thead className="table-light">
          <tr>
            <th>Name</th>
            <th>Login ID</th>
            <th>Section</th>
            <th>Role</th>
            <th>Last Activity</th>
            <th>Total Activity</th>
          </tr>
        </thead>
        <tbody>
          {enrolledUsers.map((user: User) => (
            <tr key={user._id}>
              <td className="wd-full-name text-nowrap">
                <FaUserCircle className="me-2 fs-1 text-secondary" />
                <span className="wd-first-name">{user.firstName}</span>{" "}
                <span className="wd-last-name">{user.lastName}</span>
              </td>
              <td className="wd-login-id">{user.loginId}</td>
              <td className="wd-section">{user.section}</td>
              <td className="wd-role">{user.role.toUpperCase()}</td>
              <td className="wd-last-activity">{user.lastActivity}</td>
              <td className="wd-total-activity">{user.totalActivity}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
}
