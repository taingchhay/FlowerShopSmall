import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useFlower } from '../hooks/useFlowers';
import OrderForm from './OrderForm';

const FlowerDetails = () => {
  const { id } = useParams();
  const { flower, loading, error } = useFlower(id);
  const [showOrderForm, setShowOrderForm] = useState(false);

  const handleBuyNow = () => {
    setShowOrderForm(true);
  };

  const handleCloseOrderForm = () => {
    setShowOrderForm(false);
  };

  if (loading) {
    return (
      <div className="container mt-4">
        <div className="text-center">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
          <p className="mt-2">Loading flower details...</p>
        </div>
      </div>
    );
  }

  if (error || !flower) {
    return (
      <div className="container mt-4">
        <div className="alert alert-danger" role="alert">
          {error || 'Flower not found'}
        </div>
        <Link to="/" className="btn btn-primary">
          Back to Home
        </Link>
      </div>
    );
  }

  return (
    <div className="w-100" 
    style={{ 
      background: 'linear-gradient(135deg, #ffeef8 0%, #f0f8ff 100%)', 
      minHeight: '100vh' 
      }}>

      <div className="container-fluid px-3 px-sm-4 py-3 py-md-4">
        
        {/* Breadcrumb */}
        <nav aria-label="breadcrumb" className="mb-4">
          <ol className="breadcrumb bg-white rounded-pill px-4 py-2 shadow-sm">
            <li className="breadcrumb-item">
              <Link to="/" className="text-decoration-none fw-semibold">
                <i className="fas fa-home me-1"></i>
                Home
              </Link>
            </li>
            <li className="breadcrumb-item active fw-semibold" aria-current="page">
              {flower.name}
            </li>
          </ol>
        </nav>

        <div className="row g-4 g-lg-5">
          {/* Image Section */}
          <div className="col-12 col-lg-6">
            <div className="position-relative">
              <img
                src={flower.imageUrl}
                alt={flower.name}
                className="img-fluid rounded-4 shadow-lg"
                style={{
                  width: '100%',
                  height: window.innerWidth < 576 ? '250px' : window.innerWidth < 768 ? '300px' : '400px',
                  objectFit: 'cover',
                  animation: 'slideUp 0.6s ease'
                }}
              />
              <div className="position-absolute top-0 end-0 m-2 m-md-3">
                <span className={`badge px-2 px-md-3 py-1 py-md-2 ${flower.stock > 0 ? 'bg-success' : 'bg-danger'}`}>
                  {flower.stock > 0 ? `${flower.stock} in stock` : 'Sold out'}
                </span>
              </div>
              {flower.stock <= 5 && flower.stock > 0 && (
                <div className="position-absolute top-0 start-0 m-2 m-md-3">
                  <span className="badge bg-warning text-dark px-2 px-md-3 py-1 py-md-2">
                    <i className="fas fa-exclamation-triangle me-1"></i>
                    <span className="d-none d-sm-inline">Almost gone!</span>
                    <span className="d-sm-none">Low!</span>
                  </span>
                </div>
              )}
            </div>
          </div>

          {/* Details Section */}
          <div className="col-12 col-lg-6">
            <div className="h-100 d-flex flex-column" style={{ animation: 'slideUp 0.6s ease 0.2s both' }}>
              <div className="mb-3 mb-md-4">
                <h1 className="h2 h-md-1 fw-bold mb-3" style={{
                  background: 'linear-gradient(135deg, #ff6b9d, #c44569)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text'
                }}>
                  {flower.name}
                </h1>

                <div className="d-flex flex-column flex-sm-row align-items-start align-items-sm-center mb-4">
                  <span className="h3 h-md-2 fw-bold text-success me-3 mb-2 mb-sm-0">${flower.price}</span>
                  <div className="d-none d-sm-block vr me-3" style={{ height: '40px' }}></div>
                  <div>
                    <small className="text-muted d-block">Per flower</small>
                    <small className="text-success">
                      <i className="fas fa-truck me-1"></i>
                      Free delivery
                    </small>
                  </div>
                </div>
              </div>

              <div className="mb-4">
                <h5 className="fw-bold mb-3">
                  <i className="fas fa-info-circle me-2 text-primary"></i>
                  Description
                </h5>
                <p className="text-muted fs-6 lh-lg">{flower.description}</p>
              </div>

              <div className="mb-3 mb-md-4">
                <div className="card border-0 shadow-sm" style={{ borderRadius: '15px', background: 'linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%)' }}>
                  <div className="card-body p-3 p-md-4">
                    <div className="row text-center g-2">
                      <div className="col-4">
                        <i className="fas fa-leaf text-success fs-4 fs-md-3 mb-1 mb-md-2"></i>
                        <p className="small mb-0 fw-semibold">Fresh</p>
                        <small className="text-muted d-none d-sm-block">Daily picked</small>
                      </div>
                      <div className="col-4">
                        <i className="fas fa-heart text-danger fs-4 fs-md-3 mb-1 mb-md-2"></i>
                        <p className="small mb-0 fw-semibold">Quality</p>
                        <small className="text-muted d-none d-sm-block">Premium grade</small>
                      </div>
                      <div className="col-4">
                        <i className="fas fa-shipping-fast text-primary fs-4 fs-md-3 mb-1 mb-md-2"></i>
                        <p className="small mb-0 fw-semibold">Fast</p>
                        <small className="text-muted d-none d-sm-block">Same day</small>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-auto">
                <div className="d-grid gap-2 gap-md-3 d-md-flex">
                  <button
                    className="btn btn-primary btn-lg px-4 px-md-5 py-2 py-md-3 flex-fill"
                    onClick={handleBuyNow}
                    disabled={flower.stock === 0}
                    style={{
                      fontSize: '1rem',
                      fontWeight: '600',
                      borderRadius: '50px'
                    }}
                  >
                    <i className="fas fa-shopping-cart me-2"></i>
                    {flower.stock === 0 ? 'Sold Out' : 'Buy Now'}
                  </button>
                  <Link
                    to="/"
                    className="btn btn-outline-secondary btn-lg px-3 px-md-4 py-2 py-md-3"
                    style={{
                      fontSize: '1rem',
                      fontWeight: '600',
                      borderRadius: '50px'
                    }}
                  >
                    <i className="fas fa-arrow-left me-2"></i>
                    <span className="d-none d-sm-inline">Continue Shopping</span>
                    <span className="d-sm-none">Back</span>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Order Form Modal */}
        {showOrderForm && (
          <OrderForm
            flower={flower}
            onClose={handleCloseOrderForm}
          />
        )}
      </div>
    </div>
  );
};

export default FlowerDetails;
