/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import * as client from "../client";
import Link from "next/link";
import { redirect } from "next/dist/client/components/navigation";
import { setCurrentUser } from "../reducer";
import { useDispatch } from "react-redux";
import { useState } from "react";
import * as db from "../../Database";
import { FormControl, Button } from "react-bootstrap";

export default function Signin() {
  const [credentials, setCredentials] = useState<any>({});
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const signin = async () => {
    if (!credentials.username || !credentials.password) {
      setError("Please enter both username and password");
      return;
    }
    try {
      setError(null);
      setLoading(true);
      const user = await client.signin(credentials);
      if (!user) {
        setError("Invalid username or password");
        return;
      }
      dispatch(setCurrentUser(user));
      redirect("/Dashboard");
    } catch (err: any) {
      console.error("Signin error:", err);
      setError(err.message || "Unable to sign in. Please try again.");
    } finally {
      setLoading(false);
    }
  };
 
  return (
    <div id="wd-signin-screen">
      <h1>Sign in</h1>
      {error && (
        <div className="alert alert-danger" role="alert">
          {error}
        </div>
      )}
      <FormControl 
        value={credentials.username || ""}
        onChange={(e) => setCredentials({ ...credentials, username: e.target.value })}
        className="mb-2" 
        placeholder="username" 
        id="wd-username"
        disabled={loading}
      />
      <FormControl 
        value={credentials.password || ""}
        onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
        className="mb-2" 
        placeholder="password" 
        type="password" 
        id="wd-password"
        disabled={loading}
        onKeyPress={(e) => {
          if (e.key === "Enter") {
            signin();
          }
        }}
      />
      <Button 
        onClick={signin} 
        id="wd-signin-btn" 
        className="w-100"
        disabled={loading}
      >
        {loading ? "Signing in..." : "Sign in"}
      </Button>
      <Link id="wd-signup-link" href="/Account/Signup"> Sign up </Link>
    </div>
);}
