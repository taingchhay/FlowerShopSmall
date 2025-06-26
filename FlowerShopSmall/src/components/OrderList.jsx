import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { orderAPI } from '../services/api';

const OrderList = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      setLoading(true);
      const response = await orderAPI.getAllOrders();
      setOrders(response.data);
      setError('');
    } catch (err) {
      setError('Failed to fetch orders');
      console.error('Error fetching orders:', err);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (loading) {
    return (
      <div className="container mt-4">
        <div className="text-center">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
          <p className="mt-2">Loading orders...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-100" 
    style={{ 
      minHeight: '100vh', 
      background: 'linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%)',
      marginTop:  '10rem',
      }}>
      <div className="container-fluid px-3 px-sm-4 py-3 py-md-4">
      {/* Breadcrumb */}
      <nav aria-label="breadcrumb" className="mb-3">
        <ol className="breadcrumb bg-white rounded-pill px-4 py-2 shadow-sm">
          <li className="breadcrumb-item">
            <Link to="/" className="text-decoration-none fw-semibold">
              <i className="fas fa-home me-1"></i>
              Store
            </Link>
          </li>
          <li className="breadcrumb-item">
            <Link to="/admin/dashboard" className="text-decoration-none fw-semibold">
              Dashboard
            </Link>
          </li>
          <li className="breadcrumb-item active fw-semibold" aria-current="page">
            Orders
          </li>
        </ol>
      </nav>

      <div className="d-flex flex-column flex-md-row justify-content-between align-items-start align-items-md-center mb-4 gap-3">
        <div>
          <h1 className="mb-1">
            <i className="fas fa-shopping-bag me-2 text-primary"></i>
            Customer Orders
          </h1>
          <p className="text-muted mb-0">View and manage customer orders</p>
        </div>
        <button
          className="btn btn-outline-primary px-4"
          onClick={fetchOrders}
        >
          <i className="fas fa-sync-alt me-2"></i>
          Refresh
        </button>
      </div>

      {error && (
        <div className="alert alert-danger" role="alert">
          {error}
        </div>
      )}

      {orders.length === 0 ? (
        <div className="text-center py-5">
          <div className="text-muted">
            <i className="fas fa-shopping-cart fa-3x mb-3"></i>
            <h4>No Orders Yet</h4>
            <p>Customer orders will appear here when they make purchases.</p>
          </div>
        </div>
      ) : (
        <>
          <div className="row g-3 mb-4">
            <div className="col-6 col-md-3">
              <div className="card text-center border-0 shadow-sm" style={{ borderRadius: '15px' }}>
                <div className="card-body p-3">
                  <h6 className="card-title text-muted mb-2">Total Orders</h6>
                  <h3 className="text-primary fw-bold">{orders.length}</h3>
                </div>
              </div>
            </div>
            <div className="col-6 col-md-3">
              <div className="card text-center border-0 shadow-sm" style={{ borderRadius: '15px' }}>
                <div className="card-body p-3">
                  <h6 className="card-title text-muted mb-2">Total Revenue</h6>
                  <h3 className="text-success fw-bold">
                    ${orders.reduce((sum, order) => sum + order.totalPrice, 0).toFixed(2)}
                  </h3>
                </div>
              </div>
            </div>
            <div className="col-6 col-md-3">
              <div className="card text-center border-0 shadow-sm" style={{ borderRadius: '15px' }}>
                <div className="card-body p-3">
                  <h6 className="card-title text-muted mb-2">Items Sold</h6>
                  <h3 className="text-info fw-bold">
                    {orders.reduce((sum, order) => sum + order.quantity, 0)}
                  </h3>
                </div>
              </div>
            </div>
            <div className="col-6 col-md-3">
              <div className="card text-center border-0 shadow-sm" style={{ borderRadius: '15px' }}>
                <div className="card-body p-3">
                  <h6 className="card-title text-muted mb-2">Avg Order</h6>
                  <h3 className="text-warning fw-bold">
                    ${orders.length > 0 ? (orders.reduce((sum, order) => sum + order.totalPrice, 0) / orders.length).toFixed(2) : '0.00'}
                  </h3>
                </div>
              </div>
            </div>
          </div>

          <div className="card">
            <div className="card-header">
              <h5 className="mb-0">Order Details</h5>
            </div>
            <div className="card-body">
              <div className="table-responsive">
                <table className="table table-hover">
                  <thead>
                    <tr>
                      <th>Order Date</th>
                      <th>Customer</th>
                      <th>Flower</th>
                      <th>Quantity</th>
                      <th>Total Price</th>
                      <th>Delivery Address</th>
                    </tr>
                  </thead>
                  <tbody>
                    {orders.map((order) => (
                      <tr key={order._id}>
                        <td>
                          <small>{formatDate(order.orderDate)}</small>
                        </td>
                        <td>
                          <strong>{order.userName}</strong>
                        </td>
                        <td>
                          <div className="d-flex align-items-center">
                            {order.flowerId && (
                              <>
                                <img 
                                  src={order.flowerId.imageUrl} 
                                  alt={order.flowerId.name}
                                  style={{ width: '40px', height: '40px', objectFit: 'cover' }}
                                  className="rounded me-2"
                                />
                                <div>
                                  <strong>{order.flowerId.name}</strong>
                                  <br />
                                  <small className="text-muted">${order.flowerId.price} each</small>
                                </div>
                              </>
                            )}
                          </div>
                        </td>
                        <td>
                          <span className="badge bg-primary">{order.quantity}</span>
                        </td>
                        <td>
                          <strong>${order.totalPrice.toFixed(2)}</strong>
                        </td>
                        <td>
                          <small className="text-muted">{order.userAddress}</small>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </>
      )}
      </div>
    </div>
  );
};

export default OrderList;
