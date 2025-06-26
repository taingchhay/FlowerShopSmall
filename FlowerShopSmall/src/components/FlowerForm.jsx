import React, { useState, useEffect } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { flowerAPI } from '../services/api';

const FlowerForm = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const isEdit = Boolean(id);

  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    imageUrl: '',
    stock: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (isEdit) {
      fetchFlower();
    }
  }, [id, isEdit]);

  const fetchFlower = async () => {
    try {
      setLoading(true);
      const response = await flowerAPI.getFlowerById(id);
      const flower = response.data;
      setFormData({
        name: flower.name,
        description: flower.description,
        price: flower.price.toString(),
        imageUrl: flower.imageUrl,
        stock: flower.stock.toString()
      });
    } catch (err) {
      setError('Failed to fetch flower details');
    } finally {
      setLoading(false);
    }
  };

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
      const flowerData = {
        ...formData,
        price: parseFloat(formData.price),
        stock: parseInt(formData.stock)
      };

      if (isEdit) {
        await flowerAPI.updateFlower(id, flowerData);
      } else {
        await flowerAPI.createFlower(flowerData);
      }

      navigate('/admin/dashboard');
    } catch (err) {
      setError(err.response?.data?.message || `Failed to ${isEdit ? 'update' : 'create'} flower`);
    } finally {
      setLoading(false);
    }
  };

  if (loading && isEdit) {
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

  return (
    <div className="w-100" 
    style={{ 
      minHeight: '100vh', 
      background: 'linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%)' 
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
              {isEdit ? 'Edit Flower' : 'Add Flower'}
            </li>
          </ol>
        </nav>

        <div className="w-100 d-flex align-items-center justify-content-center">
          <div className="col-md-100">
            <div className="card border-0 shadow-sm" 
            style={{ 
              borderRadius: '15px',
              minHeight: '10vh',
              marginTop: '4rem',
              maxWidth: '500px'
             
            }}>
              <div className="card-header bg-primary text-white border-0" 
              
              style={{ 
                borderRadius: '15px 15px 0 0',
                }}>
                <h3 className="mb-0">
                  <i className={`fas ${isEdit ? 'fa-edit' : 'fa-plus'} me-2`}></i>
                  {isEdit ? 'Edit Flower' : 'Add New Flower'}
                </h3>
                <small className="opacity-75">
                  {isEdit ? 'Update flower information' : 'Add a new flower to your inventory'}
                </small>
              </div>

            <div className="card-body">
              {error && (
                <div className="alert alert-danger" role="alert">
                  {error}
                </div>
              )}

              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label htmlFor="name" className="form-label">Flower Name</label>
                  <input
                    type="text"
                    className="form-control"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    placeholder="e.g., Red Rose"
                  />
                </div>

                <div className="mb-1">
                  <label htmlFor="description" className="form-label">Description</label>
                  <textarea
                    className="form-control"
                    id="description"
                    name="description"
                    rows="3"
                    value={formData.description}
                    onChange={handleChange}
                    required
                    placeholder="Describe the flower..."
                  ></textarea>
                </div>

                <div className="row">
                  <div className="col-md-6">
                    <div className="mb-3">
                      <label htmlFor="price" className="form-label">Price ($)</label>
                      <input
                        type="number"
                        step="0.01"
                        min="0"
                        className="form-control"
                        id="price"
                        name="price"
                        value={formData.price}
                        onChange={handleChange}
                        required
                        placeholder="0.00"
                      />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="mb-3">
                      <label htmlFor="stock" className="form-label">Stock Quantity</label>
                      <input
                        type="number"
                        min="0"
                        className="form-control"
                        id="stock"
                        name="stock"
                        value={formData.stock}
                        onChange={handleChange}
                        required
                        placeholder="0"
                      />
                    </div>
                  </div>
                </div>

                <div className="mb-3">
                  <label htmlFor="imageUrl" className="form-label">Image URL</label>
                  <input
                    type="url"
                    className="form-control"
                    id="imageUrl"
                    name="imageUrl"
                    value={formData.imageUrl}
                    onChange={handleChange}
                    required
                    placeholder="https://example.com/flower-image.jpg"
                  />
                  <div className="form-text">
                    Provide a direct link to the flower image
                  </div>
                </div>

                {formData.imageUrl && (
                  <div className="mb-3">
                    <label className="form-label">Image Preview</label>
                    <div>
                      <img 
                        src={formData.imageUrl} 
                        alt="Preview"
                        style={{ 
                          maxWidth: '150px', 
                          maxHeight: '150px', 
                          objectFit: 'cover' 
                        }}
                        className="rounded border"
                        onError={(e) => {
                          e.target.style.display = 'none';
                        }}
                      />
                    </div>
                  </div>
                )}

                <div className="d-flex gap-2">
                  <button 
                    type="submit" 
                    className="btn btn-primary"
                    disabled={loading}
                  >
                    {loading ? 'Saving...' : (isEdit ? 'Update Flower' : 'Add Flower')}
                  </button>
                  <button 
                    type="button" 
                    className="btn btn-secondary"
                    onClick={() => navigate('/admin/dashboard')}
                    disabled={loading}
                  >
                    Cancel
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

export default FlowerForm;
