import Link from "next/link";

export default function Signin() {
  return (
    <div id="wd-signin-screen" className="p-4" style={{ maxWidth: "400px", margin: "auto" }}>
      <h3 className="mb-3">Signin</h3>

      <input
        placeholder="Username"
        className="form-control mb-2 wd-username"
        defaultValue="nikhil123"
      />

      <input
        placeholder="Password"
        type="password"
        className="form-control mb-3 wd-password"
        defaultValue="password123"
      />

      <Link
        id="wd-signin-btn"
        href="/Account/Profile"
        className="btn btn-primary w-100 mb-3"
      >
        Sign in
      </Link>

      <div className="text-center">
        <Link href="/Account/Signup" id="wd-signup-link" className="text-decoration-none">
          Sign up
        </Link>
      </div>
    </div>
  );
}
