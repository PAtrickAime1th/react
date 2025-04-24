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
          <a
            href="login"
            className="btn btn-dark btn-lg mt-4 animate__animated animate__zoomIn"
          >
            Start Quiz
          </a>
        </div>
  
        <footer className="mt-auto mb-3 text-muted">
          &copy; 
        </footer>
      </div>
    );
  }
  
  export default Home;
  