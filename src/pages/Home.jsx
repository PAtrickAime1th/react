import React from 'react';
import { Link } from 'react-router-dom';

function Home() {
  return (
    <div className="container d-flex flex-column justify-content-between min-vh-100 text-center bg-white text-black">
      <div className="mt-5">
        <h1 className="display-4 fw-bold mb-3 animate__animated animate__fadeInDown">
          Welcome to <span style={{ color: '#000' }}>Quiz Blitz</span>
        </h1>
        <p className="lead text-muted animate__animated animate__fadeInUp">
          Login to test your knowledge. Simple. Smart. Bold.
        </p>
        {/* Use Link component to create a button that navigates to the login page */}
        <Link
          to="/login"  // Change to your actual login route
          className="btn btn-dark btn-lg mt-4 animate__animated animate__zoomIn"
        >
          Start Quiz
        </Link>
      </div>

      <footer className="mt-auto mb-3 text-muted">
        © Quiz Blitz 2023
      </footer>
    </div>
  );
}

export default Home;