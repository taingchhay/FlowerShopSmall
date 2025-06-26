import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useFlowers } from '../hooks/useFlowers';
import { useResponsive } from '../hooks/useResponsive';
import OrderForm from './OrderForm';

const FlowerList = () => {
  const { flowers, loading, error } = useFlowers();
  const { isMobile, isSmallMobile } = useResponsive();
  const [selectedFlower, setSelectedFlower] = useState(null);
  const [showOrderForm, setShowOrderForm] = useState(false);

  const handleBuyNow = (flower) => {
    setSelectedFlower(flower);
    setShowOrderForm(true);
  };

  const handleCloseOrderForm = () => {
    setShowOrderForm(false);
    setSelectedFlower(null);
  };

  if (loading) {
    return (
      <div className="container mt-4">
        <div className="text-center">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading</span>
          </div>
          <p className="mt-2">Loading flowers</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mt-4">
        <div className="alert alert-danger" role="alert">
          {error}
        </div>
      </div>
    );
  }

  return (
    <div className="w-100"
      style={{ 
        background: 'linear-gradient(135deg, #ffeef8 0%, #f0f8ff 100%)',
        minHeight: '100vh',
        marginTop: '75rem',
        }}>
            {/* Hero Section */}
      <div className="hero-section py-3 py-sm-4 py-md-5 w-100"
      style={{ 
        background: 'linear-gradient(135deg,rgba(242, 242, 242, 0.88) 0%,rgb(255, 255, 255)',
        
        }}>
        <div className="container-fluid px-3 px-sm-4 text-center text-gray">
          <h1 className="display-6 display-sm-5 display-md-4 fw-bold mpinb-3">🌸 Beautiful Flowers</h1>
          <p className="lead mb-4 px-2">
            Discover our collection of fresh, beautiful flowers for every occasion
          </p>
          <div className="row justify-content-center">
            <div className="col-12 col-md-10 col-lg-8">
              <div className="d-flex flex-column flex-sm-row justify-content-center gap-2 gap-sm-3 gap-md-4 text-center">
                <div className="flex-fill">
                  <h3 className="h5 h-sm-4 h-md-3 fw-bold">{flowers.length}</h3>
                  <small className="d-block">Flower Types</small>
                </div>
                <div className="flex-fill">
                  <h3 className="h5 h-sm-4 h-md-3 fw-bold">{flowers.reduce((sum, f) => sum + f.stock, 0)}</h3>
                  <small className="d-block">In Stock</small>
                </div>
                <div className="flex-fill">
                  <h3 className="h5 h-sm-4 h-md-3 fw-bold">Fresh</h3>
                  <small className="d-block">Daily Delivery</small>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="container-fluid px-3 px-sm-4 py-4 py-md-5">
        {flowers.length === 0 ? (
          <div className="text-center py-5">
            <div className="mb-4">
              <i className="fas fa-seedling" 
              style={{ 
                fontSize: '4rem', 
                color: '#ff6b9d'

               }}></i>
            </div>
            <h3 className="text-muted">No flowers available at the moment</h3>
            <p className="text-muted">Check back soon for our beautiful collection!</p>
          </div>
        ) : (
          <div className="row g-3 g-md-4">
            {flowers.map((flower, index) => (
              <div key={flower._id} className="col-6 col-sm-6 col-md-4 col-lg-3">
                <div
                  className="card h-100 border-0 shadow-sm flower-card"
                  style={{
                    animationDelay: `${index * 0.1}s`,
                    borderRadius: '15px',
                    overflow: 'hidden',
                    transition: 'all 0.3s ease'
                  }}
                >
                  <div className="position-relative overflow-hidden">
                    <img
                      src={flower.imageUrl}
                      className="card-img-top flower-image"
                      alt={flower.name}
                      style={{
                        height: isSmallMobile ? '160px' : isMobile ? '180px' : '200px',
                        objectFit: 'cover',
                        transition: 'transform 0.3s ease'
                      }}
                    />
                    <div className="position-absolute top-0 end-0 m-2">
                      <span className={`badge ${flower.stock > 0 ? 'bg-success' : 'bg-danger'} px-2 py-1 small`}>
                        {flower.stock > 0 ? `${flower.stock}` : 'Out'}
                      </span>
                    </div>
                    {flower.stock <= 5 && flower.stock > 0 && (
                      <div className="position-absolute top-0 start-0 m-2">
                        <span className="badge bg-warning text-dark px-2 py-1 small">
                          <i className="fas fa-exclamation-triangle"></i>
                        </span>
                      </div>
                    )}
                  </div>

                  <div className="card-body d-flex flex-column p-3">
                    <div className="d-flex justify-content-between align-items-start mb-2">
                      <h6 className="card-title fw-bold mb-0 text-truncate me-2">{flower.name}</h6>
                      <span className="h6 text-primary fw-bold mb-0 flex-shrink-0">${flower.price}</span>
                    </div>

                    <p className="card-text text-muted small flex-grow-1 mb-3"
                       style={{
                         display: '-webkit-box',
                         WebkitLineClamp: '2',
                         WebkitBoxOrient: 'vertical',
                         overflow: 'hidden'
                       }}>
                      {flower.description}
                    </p>

                    <div className="mt-auto">
                      <div className="d-grid gap-2">
                        
                        {/* Mobile: Stack buttons vertically */}
                        <div className="d-block d-sm-none">
                          <Link
                            to={`/flowers/${flower._id}`}
                            className="btn btn-outline-primary btn-sm w-100 mb-2"
                            style={{ 
                              borderRadius: '20px',
                            }}
                          >
                            <i className="fas fa-eye me-1"></i>
                            Details
                          </Link>
                          <button
                            className="btn btn-primary btn-sm w-100"
                            onClick={() => handleBuyNow(flower)}
                            disabled={flower.stock === 0}
                            style={{ 
                              borderRadius: '20px' 
                            }}
                          >
                            <i className="fas fa-shopping-cart me-1"></i>
                            {flower.stock === 0 ? 'Sold Out' : 'Buy'}
                          </button>
                        </div>

                        {/* Desktop: Side by side buttons */}
                        <div className="d-none d-sm-block">
                          <div className="btn-group w-100" role="group">
                            <Link
                              to={`/flowers/${flower._id}`}
                              className="btn btn-outline-primary btn-sm"
                              style={{ borderRadius: '20px 0 0 20px'

                              }}
                            >
                              <i className="fas fa-eye me-1"></i>
                              Details
                            </Link>
                            <button
                              className="btn btn-primary btn-sm"
                              onClick={() => handleBuyNow(flower)}
                              disabled={flower.stock === 0}
                              
                              style={{ 
                                borderRadius: '0 20px 20px 0' 
                              }}
                            >
                              <i className="fas fa-shopping-cart me-1"></i>
                              {flower.stock === 0 ? 'Sold Out' : 'Buy Now'}
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
        

        {/* Order Form Modal */}
        {showOrderForm && selectedFlower && (
          <OrderForm
            flower={selectedFlower}
            onClose={handleCloseOrderForm}
          />
        )}
      </div>
    </div>
  );
};

export default FlowerList;
