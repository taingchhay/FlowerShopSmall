import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      setLoading(false);
      return;
    }

    setTimeout(() => {
      const userToken = `user_${Date.now()}`;
      const userData = {
        email: formData.email,
        name: formData.name,
        role: 'user'
      };

      login(userToken, 'user', userData);
      alert('Registration successful! You are now logged in and can order flowers.');
      navigate('/');
      setLoading(false);
    }, 1000);
  };

  return (
    <div className="d-flex align-items-center justify-content-center min-vh-100"
      style={{ 
        background: 'linear-gradient(135deg, #f5f5f5 0%, #e0e0e0 100%)',
        
      }}
    >
      <div className="container px-3" 
      style={{ 
        maxWidth: '350px',
        marginTop: '4rem' //margintop make box balance

       }}>
        <div className="card border-0 shadow-sm">
          <div className="card-body p-3">
            <div className="text-center mb-1">
              <h2 className="h5 fw-bold mb-4">Create Account</h2>
            </div>

            {error && (
              <div className="alert alert-danger py-2 mb-3 small" role="alert">
                <i className="fas fa-exclamation-triangle me-2"></i>
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label htmlFor="name" className="form-label small fw-medium">
                  Full Name
                </label>
                <input
                  type="text"
                  className="form-control form-control-sm"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  placeholder="Enter your full name"
                />
              </div>

              <div className="mb-3">
                <label htmlFor="email" className="form-label small fw-medium">
                  Email Address
                </label>
                <input
                  type="email"
                  className="form-control form-control-sm"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  placeholder="Enter your email"
                />
              </div>

              <div className="mb-3">
                <label htmlFor="password" className="form-label small fw-medium">
                  Password
                </label>
                <input
                  type="password"
                  className="form-control form-control-sm"
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  placeholder="Create a password"
                />
              </div>

              <div className="mb-4">
                <label htmlFor="confirmPassword" className="form-label small fw-medium">
                  Confirm Password
                </label>
                <input
                  type="password"
                  className="form-control form-control-sm"
                  id="confirmPassword"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  required
                  placeholder="Confirm your password"
                />
              </div>
              <div className="d-grid mb-3">
                <button 
                  type="submit" 
                  className="btn btn-primary btn-sm py-2"
                  disabled={loading}
                >
                  {loading ? (
                    <>
                      <span className="spinner-border spinner-border-sm me-2" role="status"></span>
                      Creating
                    </>
                  ) : (
                    'Create Account'
                  )}
                </button>
              </div>
            </form>

            <div className="text-center small">
              <Link
                to="/login"
                className="btn btn-link text-decoration-none p-0"
              >
                Sign In Instead
              </Link>
              <div className="mt-2">

              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;