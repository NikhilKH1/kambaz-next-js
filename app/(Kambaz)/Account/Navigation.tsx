import Link from "next/link";

export default function AccountNavigation() {
  return (
    <div
      id="wd-account-navigation"
      className="d-flex align-items-start gap-2 mt-2"
    >
      <div
        style={{
          borderLeft: "2px solid black",
          height: "70px",
          marginRight: "8px",
        }}
      ></div>
      <div className="d-flex flex-column">
        <Link href="/Account/Signin" className="text-dark text-decoration-none mb-2">
          Signin
        </Link>
        <Link href="/Account/Signup" className="text-danger text-decoration-none mb-2">
          Signup
        </Link>
        <Link href="/Account/Profile" className="text-danger text-decoration-none">
          Profile
        </Link>
      </div>
    </div>
  );
}
