import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const UserLogin = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      if (formData.email && formData.password) {
        const userToken = `user_${Date.now()}`;
        const userData = {
          token: userToken,
          user: {
            email: formData.email,
            name: formData.email.split('@')[0],
            role: 'user'
          }
        };
        
        localStorage.setItem('userAuth', JSON.stringify(userData));
        login(userToken, 'user');
        navigate('/');
      } else {
        setError('Please enter both email and password');
      }
    } catch (err) {
      setError('Login failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div 
      className="w-100 d-flex align-items-center justify-content-center"
      style={{ 
        background: 'linear-gradient(135deg, #f5f5f5 0%, #e0e0e0 100%)',
        minHeight: '100vh',
        paddingTop: '5rem', // Added padding to push content down
        paddingBottom: '2rem'
      }}
    >
      <div 
        className="position-absolute w-100 h-100"
        style={{
          background: 'url("data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%23ffffff" fill-opacity="0.1"%3E%3Ccircle cx="30" cy="30" r="4"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")',
          opacity: 0.3
        }}
      ></div>

      <div className="container position-relative px-3">
        <div className="row justify-content-center">
          <div className="col-12 col-sm-8 col-md-6 col-lg-5 col-xl-4">
            <div 
              className="card border-0 shadow-sm"
              style={{ 
                borderRadius: '13px',
                background: 'rgba(255, 255, 255, 0.98)',
                marginTop: '3rem' // Added margin for better balance
              }}
            >
              <div className="card-body p-3 p-md-4">
                <div className="text-center mb-3">
                  <div 
                    className="rounded-circle d-inline-flex align-items-center justify-content-center mb-2"
                    style={{ 
                      width: '48px', 
                      height: '48px', 
                      background: 'linear-gradient(135deg,rgb(211, 211, 211),rgb(216, 216, 216))',
                      margin: '0 auto' // Center the icon
                    }}
                  >
                    <i className="fas fa-user text-white"></i>
                  </div>
                  <p className="text-muted small mb-3">Sign in to your account</p>
                </div>

                {error && (
                  <div className="alert alert-danger py-2 mb-3 small">
                    <i className="fas fa-exclamation-triangle me-2"></i>
                    {error}
                  </div>
                )}

                <form onSubmit={handleSubmit}>
                  <div className="mb-3">
                    <label className="form-label small fw-semibold">Email</label>
                    <input
                      type="email"
                      className="form-control border-0 shadow-sm py-2"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      placeholder="Your email"
                      style={{ background: 'rgba(248, 249, 250, 0.8)' }}
                    />
                  </div>

                  <div className="mb-3">
                    <label className="form-label small fw-semibold">Password</label>
                    <input
                      type="password"
                      className="form-control border-0 shadow-sm py-2"
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                      required
                      placeholder="Your password"
                      style={{ background: 'rgba(248, 249, 250, 0.8)' }}
                    />
                    <small className="text-muted d-block mt-3">
                      <i className="fas fa-info-circle me-1"></i>
                      Demo : Any credentials work
                    </small>
                  </div>

                  <button 
                    type="submit" 
                    className="btn btn-primary w-100 py-2 mb-3"
                    disabled={loading}
                    style={{ borderRadius: '8px' }}
                  >
                    {loading ? (
                      <>
                        <span className="spinner-border spinner-border-sm me-2"></span>
                        Signing In
                      </>
                    ) : (
                      <>
                        <i className="fas fa-sign-in-alt me-2"></i>
                        Sign In
                      </>
                    )}
                  </button>
                </form>

                <div className="text-center small mt-3">
                  <p className="text-muted mb-2">Don't have an account?</p>
                  <Link to="/register" className="text-decoration-none d-block mb-3">
                    Create Account
                  </Link>
                  
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserLogin;