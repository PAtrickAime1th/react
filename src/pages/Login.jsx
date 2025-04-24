import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';  // useNavigate in React Router v6+

function Login() {
  const [form, setForm] = useState({ username: '', password: '' });
  const [msg, setMsg] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();  // useNavigate in React Router v6+

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMsg('');
    try {
      const response = await axios.post('http://localhost:5000/api/auth/login', form);
      localStorage.setItem('token', response.data.token);  // Store JWT token
      setMsg('✅ Login successful!');
      navigate('/dashboard');  // Redirect to dashboard or other page after login
    } catch (err) {
      setMsg(err.response?.data?.error || '❌ Invalid credentials');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mt-5" style={{ maxWidth: '400px' }}>
      <h3 className="mb-4 text-center">Login</h3>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Username</label>
          <input
            type="text"
            name="username"
            className="form-control"
            placeholder="Enter your username"
            value={form.username}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Password</label>
          <input
            type="password"
            name="password"
            className="form-control"
            placeholder="Enter your password"
            value={form.password}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary w-100" disabled={loading}>
          {loading ? 'Logging in...' : 'Login'}
        </button>
      </form>
      {msg && (
        <div className="alert alert-info mt-3 text-center" role="alert">
          {msg}
        </div>
      )}
      <div className="mt-3 text-center">
        <p>Don't have an account? <a href="/signup">Sign up here</a></p>
      </div>
    </div>
  );
}

export default Login;
