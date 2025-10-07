import Link from "next/link";

export default function Signup() {
  return (
    <div id="wd-signup-screen" className="p-4" style={{ maxWidth: "400px", margin: "auto" }}>
      <h3 className="mb-3">Signup</h3>

      <input
        placeholder="Username"
        className="form-control mb-2 wd-username"
        defaultValue="nikhil123"
      />

      <input
        placeholder="Password"
        type="password"
        className="form-control mb-2 wd-password"
        defaultValue="password123"
      />

      <Link
        href="/Account/Profile"
        id="wd-signup-btn"
        className="btn btn-primary w-100 mb-3"
      >
        Signup
      </Link>

      <div className="text-center">
        <Link href="/Account/Signin" id="wd-signin-link" className="text-decoration-none">
          Signin
        </Link>
      </div>
    </div>
  );
}
