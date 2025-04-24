import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';  // Import useNavigate

function Signup() {
  const [form, setForm] = useState({ username: '', password: '' });
  const [msg, setMsg] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();  // Initialize useNavigate hook

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMsg('');
    try {
      await axios.post('http://localhost:5000/api/auth/register', form);
      setMsg('✅ Registration successful. You can now log in!');
      setForm({ username: '', password: '' });
      setTimeout(() => {
        navigate('/login');  
      }, 2000);
    } catch (err) {
      setMsg(err.response?.data?.error || '❌ Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mt-5" style={{ maxWidth: '400px' }}>
      <h3 className="mb-4 text-center">Sign Up</h3>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Username</label>
          <input
            type="text"
            name="username"
            className="form-control"
            placeholder="Enter a username"
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
            placeholder="Enter a password"
            value={form.password}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary w-100" disabled={loading}>
          {loading ? 'Registering...' : 'Register'}
        </button>
      </form>
      {msg && (
        <div className="alert alert-info mt-3 text-center" role="alert">
          {msg}
        </div>
      )}
    </div>
  );
}

export default Signup;
