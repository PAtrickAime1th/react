import React, { useState } from "react";
import API from "../api";
import { Link } from "react-router-dom";  // Import Link from react-router-dom

export default function Signup() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      await API.post("/signup", { username, password });
      alert("Signup success!");
    } catch {
      alert("Signup failed");
    }
  };

  return (
    <div className="container mt-5">
      <h2>Signup</h2>
      <form onSubmit={handleSignup}>
        <input
          className="form-control mb-2"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="password"
          className="form-control mb-2"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button className="btn btn-success w-100">Sign Up</button>
      </form>

      {/* Link to Login page */}
      <div className="mt-3">
        <p>
          Already have an account?{" "}
          <Link to="/login" className="text-primary">Login here</Link>
        </p>
      </div>
    </div>
  );
}
