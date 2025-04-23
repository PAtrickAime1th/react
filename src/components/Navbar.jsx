import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Navbar() {
  const [loggedIn, setLoggedIn] = useState(!!localStorage.getItem("token"));
  const navigate = useNavigate();

  // Handle logout functionality
  const handleLogout = () => {
    localStorage.removeItem("token"); // Remove JWT token from localStorage
    setLoggedIn(false); // Update loggedIn state
    navigate("/login"); // Redirect to login page
  };

  // Effect to check if token exists on initial page load
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setLoggedIn(true);
    }
  }, []);

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light px-3">
      <Link className="navbar-brand" to="/">QuizApp</Link>
      <div className="navbar-nav">
        {/* If logged in, show Logout link, else show Login and Signup */}
        {loggedIn ? (
          <button className="nav-link btn btn-link" onClick={handleLogout}>
            Logout
          </button>
        ) : (
          <>
            <Link className="nav-link" to="/login">Login</Link>
            <Link className="nav-link" to="/signup">Signup</Link>
          </>
        )}
      </div>
    </nav>
  );
}
