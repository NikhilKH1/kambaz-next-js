import Link from "next/link";

export default function Signin() {
  return (
    <div id="wd-signin-screen">
      <h3>Sign in</h3>
      <input
        placeholder="username"
        className="wd-username"
        defaultValue="nikhil123"
      />{" "}
      <br />
      <input
        placeholder="password"
        type="password"
        className="wd-password"
        defaultValue="password123"
      />{" "}
      <br />
      <Link id="wd-signin-btn" href="/Dashboard">
        Sign in
      </Link>{" "}
      <br />
      <Link href="Signup" id="wd-signup-link">
        Sign up
      </Link>
    </div>
  );
}
