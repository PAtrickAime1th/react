import React from 'react';
import { Link } from 'react-router-dom';

function Navbar() {
  const token = localStorage.getItem('token');  // Check if the user is logged in

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">QuizApp</Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav me-auto">
            <li className="nav-item">
              <Link className="nav-link" to="/home">Home</Link>
            </li>
            {!token && (
              <>
                <li className="nav-item">
                  <Link className="nav-link" to="/signup">Sign Up</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/">Login</Link>
                </li>
              </>
            )}
            {token && (
              <>
                <li className="nav-item">
                  <Link className="nav-link" to="/quizzes">Quizzes</Link>
                </li>
                <li className="nav-item">
                  <button
                    className="nav-link btn btn-link"
                    onClick={() => { 
                      localStorage.removeItem('token'); 
                      window.location.href = '/login'; 
                    }}
                  >
                    Logout
                  </button>
                </li>
              </>
            )}
          </ul>
          <div className="d-none d-lg-block ms-3">
            <span className="navbar-text">
              <strong>Support:</strong> +1 (234) 567-8901
            </span>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;