import React, { useState } from 'react';
import { orderAPI } from '../services/api';

const OrderForm = ({ flower, onClose }) => {
  const [formData, setFormData] = useState({
    userName: '',
    userAddress: '',
    quantity: 1
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'quantity' ? parseInt(value) : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const orderData = {
        flowerId: flower._id,
        ...formData
      };

      await orderAPI.createOrder(orderData);
      setSuccess(true);
      
      // Close modal after 2 seconds
      setTimeout(() => {
        onClose();
      }, 2000);
      
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to place order');
    } finally {
      setLoading(false);
    }
  };

  const totalPrice = (flower.price * formData.quantity).toFixed(2);

  return (
    <div
      className="modal show d-block"
      style={{
        backgroundColor: 'rgba(0,0,0,0.6)',
        backdropFilter: 'blur(5px)',
        animation: 'fadeIn 0.3s ease'
      }}
    >
      <div className="modal-dialog modal-dialog-centered modal-lg mx-1 mx-sm-2 mx-md-auto">
        <div
          className="modal-content border-0 shadow-lg"
          style={{
            borderRadius: '15px',
            animation: 'slideUp 0.3s ease'
          }}
        >
          <div className="modal-header border-0 pb-0" style={{ background: 'linear-gradient(135deg, #ff6b9d 0%, #c44569 100%)' }}>
            <div className="text-white">
              <h4 className="modal-title fw-bold mb-1">
                <i className="fas fa-shopping-cart me-2"></i>
                Order {flower.name}
              </h4>
              <small className="opacity-75">Complete your purchase below</small>
            </div>
            <button
              type="button"
              className="btn-close btn-close-white"
              onClick={onClose}
            ></button>
          </div>
          
          {success ? (
            <div className="modal-body text-center py-5">
              <div className="mb-4" style={{ animation: 'bounceIn 0.6s ease' }}>
                <div
                  className="rounded-circle d-inline-flex align-items-center justify-content-center mb-3"
                  style={{
                    width: '80px',
                    height: '80px',
                    background: 'linear-gradient(135deg, #28a745, #20c997)',
                    color: 'white'
                  }}
                >
                  <i className="fas fa-check fa-2x"></i>
                </div>
              </div>
              <h3 className="text-success fw-bold mb-3">Order Placed Successfully! 🎉</h3>
              <p className="text-muted mb-4">
                Thank you for your order! We'll prepare your beautiful flowers and deliver them soon.
              </p>
              <div className="alert alert-info border-0" style={{ borderRadius: '15px' }}>
                <i className="fas fa-info-circle me-2"></i>
                You'll receive a confirmation email shortly with tracking details.
              </div>
            </div>
          ) : (
            <>
              <div className="modal-body p-4">
                {/* Product Preview */}
                <div className="card border-0 mb-4" style={{ background: 'linear-gradient(135deg, #ffeef8 0%, #f0f8ff 100%)', borderRadius: '15px' }}>
                  <div className="card-body p-3">
                    <div className="row align-items-center g-3">
                      <div className="col-4 col-sm-3">
                        <img
                          src={flower.imageUrl}
                          alt={flower.name}
                          className="img-fluid rounded-3 shadow-sm"
                          style={{ aspectRatio: '1/1', objectFit: 'cover' }}
                        />
                      </div>
                      <div className="col-8 col-sm-9">
                        <h5 className="fw-bold text-primary mb-2 h6 h-sm-5">{flower.name}</h5>
                        <p className="text-muted small mb-2 d-none d-sm-block">{flower.description}</p>
                        <div className="d-flex flex-column flex-sm-row justify-content-between align-items-start align-items-sm-center gap-2">
                          <span className="h6 h-sm-5 text-success fw-bold mb-0">${flower.price}</span>
                          <span className="badge bg-info px-2 px-sm-3 py-1 py-sm-2 small">
                            <i className="fas fa-box me-1"></i>
                            {flower.stock} available
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {error && (
                  <div className="alert alert-danger" role="alert">
                    {error}
                  </div>
                )}

                <form onSubmit={handleSubmit}>
                  <div className="mb-3">
                    <label htmlFor="userName" className="form-label fw-semibold">
                      <i className="fas fa-user me-2 text-muted"></i>
                      Your Name
                    </label>
                    <input
                      type="text"
                      className="form-control form-control-lg"
                      id="userName"
                      name="userName"
                      value={formData.userName}
                      onChange={handleChange}
                      required
                      placeholder="Enter your full name"
                      style={{ borderRadius: '10px' }}
                    />
                  </div>

                  <div className="mb-3">
                    <label htmlFor="userAddress" className="form-label fw-semibold">
                      <i className="fas fa-map-marker-alt me-2 text-muted"></i>
                      Delivery Address
                    </label>
                    <textarea
                      className="form-control form-control-lg"
                      id="userAddress"
                      name="userAddress"
                      rows="3"
                      value={formData.userAddress}
                      onChange={handleChange}
                      required
                      placeholder="Enter your complete delivery address"
                      style={{ borderRadius: '10px' }}
                    ></textarea>
                  </div>

                  <div className="mb-3">
                    <label htmlFor="quantity" className="form-label fw-semibold">
                      <i className="fas fa-shopping-cart me-2 text-muted"></i>
                      Quantity
                    </label>
                    <input
                      type="number"
                      className="form-control form-control-lg"
                      id="quantity"
                      name="quantity"
                      min="1"
                      max={flower.stock}
                      value={formData.quantity}
                      onChange={handleChange}
                      required
                      style={{
                        borderRadius: '10px' 
                      }}
                    />
                  </div>

                  <div className="mb-3 p-3 bg-light rounded">
                    <div className="d-flex justify-content-between">
                      <span>Total Price:</span>
                      <strong>${totalPrice}</strong>
                    </div>
                  </div>

                  <div className="d-grid gap-2 d-md-flex justify-content-md-end">
                    <button 
                      type="button" 
                      className="btn btn-secondary me-md-2" 
                      onClick={onClose}
                      disabled={loading}
                    >
                      Cancel
                    </button>
                    <button 
                      type="submit" 
                      className="btn btn-primary"
                      disabled={loading}
                    >
                      {loading ? 'Placing Order...' : 'Place Order'}
                    </button>
                  </div>
                </form>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default OrderForm;
