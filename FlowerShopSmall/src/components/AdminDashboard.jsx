import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useFlowers } from '../hooks/useFlowers';
import { flowerAPI } from '../services/api';

const AdminDashboard = () => {
  const { flowers, loading, error, refetch } = useFlowers();
  const [deleteLoading, setDeleteLoading] = useState(null);

  const handleDelete = async (flowerId, flowerName) => {
    if (!window.confirm(`Are you sure you want to delete "${flowerName}"?`)) {
      return;
    }

    setDeleteLoading(flowerId);
    try {
      await flowerAPI.deleteFlower(flowerId);
      refetch(); // Refresh the list
    } catch (err) {
      alert('Failed to delete flower: ' + (err.response?.data?.message || err.message));
    } finally {
      setDeleteLoading(null);
    }
  };

  if (loading) {
    return (
      <div className="container mt-4">
        <div className="text-center">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
          <p className="mt-2">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-100" 
    style={{ minHeight: '100vh', 
    background: 'linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%)',
        paddingTop: '130px' // Added padding to push content down
        
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
          <li className="breadcrumb-item active fw-semibold" aria-current="page">
            Admin Dashboard
          </li>
        </ol>
      </nav>

      <div className="d-flex flex-column flex-md-row justify-content-between align-items-start align-items-md-center mb-4 gap-3">
        <div>
          <h1 className="mb-1">
            <i className="fas fa-tachometer-alt me-2 text-primary"></i>
            Admin Dashboard
          </h1>
          <p className="text-muted mb-0">Manage your flower inventory and orders</p>
        </div>
        <Link to="/admin/flowers/new" className="btn btn-primary px-4">
          <i className="fas fa-plus me-2"></i>
          Add New Flower
        </Link>
      </div>

      {error && (
        <div className="alert alert-danger" role="alert">
          {error}
        </div>
      )}

      <div className="row g-3 mb-4">
        <div className="col-6 col-md-3">
          <div className="card text-center border-0 shadow-sm" 
          style={{ 
            borderRadius: '15px'
            
           }}>
            <div className="card-body p-3">
              <h6 className="card-title text-muted mb-2">Total Flowers</h6>
              <h3 className="text-primary fw-bold">{flowers.length}</h3>
            </div>
          </div>
        </div>
        <div className="col-6 col-md-3">
          <div className="card text-center border-0 shadow-sm" 
          style={{ 
            borderRadius: '15px' 
            }}>
            <div className="card-body p-3">
              <h6 className="card-title text-muted mb-2">In Stock</h6>
              <h3 className="text-success fw-bold">
                {flowers.filter(f => f.stock > 0).length}
              </h3>
            </div>
          </div>
        </div>
        <div className="col-6 col-md-3">
          <div className="card text-center border-0 shadow-sm" 
          style={{ 
            borderRadius: '15px' 
            }}>
              
            <div className="card-body p-3">
              <h6 className="card-title text-muted mb-2">Out of Stock</h6>
              <h3 className="text-danger fw-bold">
                {flowers.filter(f => f.stock === 0).length}
              </h3>
            </div>
          </div>
        </div>
        <div className="col-6 col-md-3">
          <div className="card text-center border-0 shadow-sm" style={{ borderRadius: '15px' }}>
            <div className="card-body p-3">
              <h6 className="card-title text-muted mb-2">Total Stock</h6>
              <h3 className="text-info fw-bold">
                {flowers.reduce((sum, f) => sum + f.stock, 0)}
              </h3>
            </div>
          </div>
        </div>
      </div>

      <div className="card">
        <div className="card-header">
          <h5 className="mb-0">Manage Flowers</h5>
        </div>
        <div className="card-body">
          {flowers.length === 0 ? (
            <div className="text-center py-4">
              <p className="text-muted">No flowers added yet.</p>
              <Link to="/admin/flowers/new" className="btn btn-primary">
                Add Your First Flower
              </Link>
            </div>
          ) : (
            <div className="table-responsive">
              <table className="table table-hover table-sm">
                <thead className="table-light">
                  <tr>
                    <th className="d-none d-md-table-cell">Image</th>
                    <th>Name</th>
                    <th>Price</th>
                    <th className="d-none d-sm-table-cell">Stock</th>
                    <th>Status</th>
                    <th className="text-center">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {flowers.map((flower) => (
                    <tr key={flower.id}> {/* Changed from flower._id to flower.id */}
                      <td className="d-none d-md-table-cell">
                        <img
                          src={flower.imageUrl}
                          alt={flower.name}
                          style={{ width: '50px', height: '50px', objectFit: 'cover' }}
                          className="rounded"
                        />
                      </td>
                      <td>
                        <div className="d-flex align-items-center">
                          <img
                            src={flower.imageUrl}
                            alt={flower.name}
                            style={{ width: '40px', height: '40px', objectFit: 'cover' }}
                            className="rounded me-2 d-md-none"
                          />
                          <div>
                            <strong className="d-block">{flower.name}</strong>
                            <small className="text-muted d-none d-sm-block">{flower.description}</small>
                          </div>
                        </div>
                      </td>
                      <td className="fw-bold">${flower.price}</td>
                      <td className="d-none d-sm-table-cell">{flower.stock}</td>
                      <td>
                        <span className={`badge ${flower.stock > 0 ? 'bg-success' : 'bg-danger'}`}>
                          <span className="d-none d-sm-inline">{flower.stock > 0 ? 'In Stock' : 'Out of Stock'}</span>
                          <span className="d-sm-none">{flower.stock > 0 ? 'In' : 'Out'}</span>
                        </span>
                      </td>
                      <td className="text-center">
                        <div className="btn-group btn-group-sm">
                          <Link
                            to={`/admin/flowers/${flower.id}/edit`} // Changed from flower._id to flower.id
                            className="btn btn-outline-primary btn-sm"
                            title="Edit flower"
                          >
                            <i className="fas fa-edit"></i>
                            <span className="d-none d-md-inline ms-1">Edit</span>
                          </Link>
                          <button
                            className="btn btn-outline-danger btn-sm"
                            onClick={() => handleDelete(flower.id, flower.name)} // Changed from flower._id to flower.id
                            disabled={deleteLoading === flower.id} // Changed from flower._id to flower.id
                            title="Delete flower"
                          >
                            <i className="fas fa-trash"></i>
                            <span className="d-none d-md-inline ms-1">
                              {deleteLoading === flower.id ? 'Deleting...' : 'Delete'}
                            </span>
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
    </div>
  );
};

export default AdminDashboard;
