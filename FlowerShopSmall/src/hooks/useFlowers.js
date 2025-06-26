import { useState, useEffect } from 'react';
import { flowerAPI } from '../services/api';

export const useFlowers = () => {
  const [flowers, setFlowers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchFlowers = async () => {
    try {
      setLoading(true);
      const response = await flowerAPI.getAllFlowers();
      console.log(response.data);
      setFlowers(response.data);
      setError(null);
    } catch (err) {
      setError('Failed to fetch flowers');
      console.error('Error fetching flowers:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFlowers();
  }, []);

  return { flowers, loading, error, refetch: fetchFlowers };
};

export const useFlower = (id) => {
  const [flower, setFlower] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchFlower = async () => {
      if (!id) return;
      
      try {
        setLoading(true);
        const response = await flowerAPI.getFlowerById(id);
        setFlower(response.data);
        setError(null);
      } catch (err) {
        setError('Failed to fetch flower details');
        console.error('Error fetching flower:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchFlower();
  }, [id]);

  return { flower, loading, error };
};
