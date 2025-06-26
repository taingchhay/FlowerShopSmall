import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
  console.log('🔥🔥🔥 NAVBAR COMPONENT IS RENDERING! 🔥🔥🔥');

  let isAuthenticated = false;
  let logout = () => {};
  let user = null;
  let userType = null;

  try {
    const auth = useAuth();
    isAuthenticated = auth.isAuthenticated;
    logout = auth.logout;
    user = auth.user;
    userType = auth.userType;
    console.log('✅ Auth context working, isAuthenticated:', isAuthenticated, 'userType:', userType);
  } catch (error) {
    console.error('❌ Auth context error:', error);
  }

  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  // Alert to make sure component is running
  if (typeof window !== 'undefined') {
    console.log('🚨 NAVBAR: Component is definitely running!');
  }

  // Add a visible alert to test if component is working
  React.useEffect(() => {
    console.log('🎯 Navbar useEffect running!');
    // Uncomment the line below to test if component is loading
    // alert('NAVBAR IS WORKING! You should see the pink header above.');
  }, []);

  // Simple test navbar that WILL be visible
  return (
    <div
      style={{
        background: 'linear-gradient(135deg, #c44569, #ff6b9d)', 
        color: 'white',
        padding: '20px',
        fontSize: '18px',
        fontWeight: 'bold',
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 99998,
        width: '100%',
        boxShadow: '0 4px 8px rgba(0,0,0,0.3)'
      }}
    >
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        maxWidth: '1200px',
        margin: '0 auto'
      }}>
        <div style={{ fontSize: '24px' }}>
          🌸 FLOWER SHOP
        </div>

        <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
          <Link
            to="/"
            style={{
              color: 'black',
              textDecoration: 'none',
              backgroundColor: 'rgb(255, 255, 255)',
              padding: '7px 16px',
              borderRadius: '25px',
              border: '3px solid white',
              fontSize: '14px'
            }}
          >
            HOME
          </Link>

          {!isAuthenticated && (
            <>
              <Link
                to="/login"
                style={{
                  color: 'black',
                  backgroundColor: 'white',
                  textDecoration: 'none',
                  padding: '8px 16px',
                  borderRadius: '25px',
                  border: '2px solid white',
                  fontSize: '14px'
                }}
              >
                LOGIN
              </Link>

              <Link
                to="/register"
                style={{
                  color: 'black',
                  textDecoration: 'none',
                  backgroundColor: 'rgb(255, 255, 255)',
                  padding: '8px 16px',
                  borderRadius: '25px',
                  border: '2px solid white',
                  fontSize: '14px'
                }}
              >
                REGISTER
              </Link>

              <Link
                to="/admin/login"
                style={{
                  color: 'black',
                  textDecoration: 'none',
                  backgroundColor: 'rgb(255, 255, 255)',
                  padding: '8px 16px',
                  borderRadius: '25px',
                  fontSize: '14px'
                }}
              >
                ADMIN
              </Link>
            </>
          )}

          {isAuthenticated && userType === 'user' && (
            <>
           {/*  <div
                style={{
                  color: 'black',
                  backgroundColor: 'white',
                  padding: '8px 16px',
                  borderRadius: '25px',
                  border: '2px solid white',
                  fontSize: '14px'
                }}
              >
                Welcome {user?.name || user?.email}
              </div> */}

              <button
                onClick={handleLogout}
                style={{
                  color: 'black',
                  backgroundColor: 'white',
                  border: '2px solid white',
                  padding: '8px 16px',
                  borderRadius: '25px',
                  cursor: 'pointer',
                  fontWeight: 'bold',
                  fontSize: '14px'
                }}
              >
                LOGOUT
              </button>
            </>
          )}

            {isAuthenticated && userType === 'user' && (
            <>
             <div
                style={{
                  color: 'white',
                  padding:'4px 16px',
                  paddingLeft: '20px',
                  fontSize: '100%'
                }}
              >
                HOLA🌸{user?.name || user?.email}
              </div> 
              </>
          )}

          {isAuthenticated && userType === 'admin' && (
            <>
              <Link
                to="/admin/dashboard"
                style={{
                  color: 'black',
                  textDecoration: 'none',
                  backgroundColor: 'white',
                  padding: '8px 16px',
                  borderRadius: '25px',
                  border: '2px solid white',
                  fontSize: '14px'
                }}
              >
              DASHBOARD
              </Link>

              <Link
                to="/admin/orders"
                style={{
                  color: 'black',
                  textDecoration: 'none',
                  backgroundColor: 'white',
                  padding: '8px 16px',
                  borderRadius: '25px',
                  border: '2px solid white',
                  fontSize: '14px'
                }}
              >
              ORDERS
              </Link>

              <button
                onClick={handleLogout}
                style={{
                  color: 'black',
                  backgroundColor: 'white',
                  border: '2px solid white',
                  padding: '8px 16px',
                  borderRadius: '25px',
                  cursor: 'pointer',
                  fontSize: '14px'
                }}
              >
              LOGOUT
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );

  // Original Bootstrap navbar (commented out for debugging)
  /*
  return (
    <nav
      className="navbar navbar-expand-lg navbar-light bg-white shadow sticky-top"
      style={{
        zIndex: 1030,
        minHeight: '70px',
        borderBottom: '2px solid #ff6b9d'
      }}
    >
      <div className="container-fluid px-3">
        <Link
          className="navbar-brand fw-bold text-primary"
          to="/"
          style={{
            fontSize: '1.5rem',
            color: '#ff6b9d !important'
          }}
        >
          <span className="me-2">🌸</span>
          Flower Shop
        </Link>

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

        </div>
      </div>
    </nav>
    */
};

export default Navbar;
