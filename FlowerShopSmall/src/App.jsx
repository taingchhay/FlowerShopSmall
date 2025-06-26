import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { initViewport, cleanupViewport } from './utils/viewport';
import Navbar from './components/Navbar';
import FlowerList from './components/FlowerList';
import FlowerDetails from './components/FlowerDetails';
import AdminLogin from './components/AdminLogin';
import AdminDashboard from './components/AdminDashboard';
import FlowerForm from './components/FlowerForm';
import OrderList from './components/OrderList';
import ProtectedRoute from './components/ProtectedRoute';
import ResponsiveDebug from './components/ResponsiveDebug';
import Register from './components/Register';
import UserLogin from './components/UserLogin';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import './App.css';

function App() {
  useEffect(() => {
    // Initialize viewport handling for mobile
    initViewport();

    // Cleanup on unmount
    return () => {
      cleanupViewport();
    };
  }, []);

  return (
    <AuthProvider>
      <Router>
        <div className="App">
          {/* <TestNavbar /> */}
          <Navbar />
          
          <Routes>
            {/* Public Routes */}
            <Route path="/flowers/:id" element={<FlowerDetails />} />
            <Route path="/login" element={<UserLogin />} />
            <Route path="/register" element={<Register />} />
            <Route path="/admin/login" element={<AdminLogin />} />
            <Route path="/" element={<FlowerList />} />

            {/* Protected Admin Routes */}
            <Route
              path="/admin/dashboard"
              element={
                <ProtectedRoute>
                  <AdminDashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/flowers/new"
              element={
                <ProtectedRoute>
                  <FlowerForm />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/flowers/:id/edit"
              element={
                <ProtectedRoute>
                  <FlowerForm />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/orders"
              element={
                <ProtectedRoute>
                  <OrderList />
                </ProtectedRoute>
              }
            />
          </Routes>
          <ResponsiveDebug />
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
