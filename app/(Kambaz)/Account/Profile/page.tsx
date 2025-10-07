import Link from "next/link";

export default function Profile() {
  return (
    <div
      id="wd-profile-screen"
      className="p-4"
      style={{ maxWidth: "400px", margin: "auto" }}
    >
      <h3 className="mb-3">Profile</h3>

      <input
        defaultValue="alice"
        placeholder="Username"
        className="form-control mb-2 wd-username"
      />

      <input
        defaultValue="123"
        placeholder="Password"
        type="password"
        className="form-control mb-2 wd-password"
      />

      <input
        defaultValue="Alice"
        placeholder="First Name"
        id="wd-firstname"
        className="form-control mb-2"
      />

      <input
        defaultValue="Wonderland"
        placeholder="Last Name"
        id="wd-lastname"
        className="form-control mb-2"
      />

      <input
        defaultValue=""
        type="date"
        id="wd-dob"
        className="form-control mb-2"
      />

      <input
        defaultValue="alice@wonderland.com"
        type="email"
        id="wd-email"
        className="form-control mb-2"
      />

      <select
        defaultValue="USER"
        id="wd-role"
        className="form-select mb-3"
      >
        <option value="USER">User</option>
        <option value="ADMIN">Admin</option>
        <option value="FACULTY">Faculty</option>
        <option value="STUDENT">Student</option>
      </select>

      <Link
        href="/Account/Signin"
        id="wd-signout-link"
        className="btn btn-danger w-100"
      >
        Signout
      </Link>
    </div>
  );
}
