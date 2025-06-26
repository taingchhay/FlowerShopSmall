import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { adminAPI } from '../services/api';

const AdminLogin = () => {
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await adminAPI.login(password);
      login(response.data.token);
      navigate('/admin/dashboard');
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="w-100 d-flex align-items-center justify-content-center"
      style={{
        background: 'linear-gradient(135deg,rgb(234, 234, 234) 0%,rgb(255, 255, 255) 100%)',
        minHeight: 'calc(100vh)', // Account for navbar height
        paddingTop: '5rem',
        paddingBottom: '2rem',
        overflow: 'hidden', // Fix for double scrollbar
      }}
    >
      {/* Background decoration */}
      <div
        className="position-absolute w-100 h-100"
        style={{
          background: 'url("data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%23ffffff" fill-opacity="0.1"%3E%3Ccircle cx="30" cy="30" r="4"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")',
          opacity: 0.3,
        }}
      ></div>

      <div className="container position-relative px-3">
        <div className="row justify-content-center">
          <div className="col-12 col-sm-10 col-md-8 col-lg-5 col-xl-4"> {/* Reduced column size */}
            <div
              className="card border-0 shadow"
              style={{
                borderRadius: '10px',
                background: 'rgba(255, 255, 255, 0.95)',
              }}
            >
              <div className="card-body p-4">
                <div className="text-center mb-4">
                  <div
                    className="rounded-circle d-inline-flex align-items-center justify-content-center mb-3"
                    style={{
                      width: '50px',
                      height: '50px',
                      background: 'linear-gradient(135deg, #ff6b9d, #c44569)',
                      color: 'white'
                    }}
                  >
                    <i className="fas fa-user-shield fa-lg"></i>
                  </div>
                  <h2 className="h4 fw-bold mb-2">Admin Access</h2>
                  <p className="text-muted small">Enter your credentials to continue</p>
                </div>

                {error && (
                  <div
                    className="alert alert-danger border-0 rounded-3 mb-3"
                    role="alert"
                    style={{ background: 'rgba(220, 53, 69, 0.1)', color: '#dc3545' }}
                  >
                    <i className="fas fa-exclamation-triangle me-2"></i>
                    {error}
                  </div>
                )}

                <form onSubmit={handleSubmit}>
                  <div className="mb-4">
                    <label htmlFor="password" className="form-label fw-semibold small">
                      <i className="fas fa-lock me-2 text-muted"></i>
                      Password
                    </label>
                    <input
                      type="password"
                      className="form-control border-0 shadow-sm"
                      id="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                      placeholder="Enter admin password"
                      autoComplete="current-password"
                      style={{
                        borderRadius: '10px',
                        background: 'rgba(248, 249, 250, 0.8)',
                        padding: '0.75rem 1rem',
                      }}
                    />
                    <div className="form-text mt-2 small">
                      <i className="fas fa-info-circle me-1 text-primary"></i>
                      Demo password: <code>admin123</code>
                    </div>
                  </div>

                  <div className="d-grid mb-3">
                    <button
                      type="submit"
                      className="btn btn-primary py-2"
                      disabled={loading}
                      style={{
                        borderRadius: '10px',
                        fontWeight: '600',
                      }}
                    >
                      {loading ? (
                        <>
                          <span className="spinner-border spinner-border-sm me-2" role="status"></span>
                          Logging in...
                        </>
                      ) : (
                        <>
                          <i className="fas fa-sign-in-alt me-2"></i>
                          Login to Dashboard
                        </>
                      )}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;