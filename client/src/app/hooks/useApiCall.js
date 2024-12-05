import { useState, useCallback, useEffect } from 'react';
import axios from 'axios';

const useApiCall = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const makeApiCall = useCallback(async (url, options = {}) => {
    setLoading(true);
    setError(null);

    try {
      const response = await axios(url, { timeout: 15000, ...options });
      setData(response.data);
    } catch (err) {
      if (err.response) {
        // The request was made and the server responded with a status code outside the range of 2xx
        console.error('Server responded with an error:', err.response.data);
        setError(err.response.data);
      } else if (err.request) {
        // The request was made but no response was received
        console.error('No response received:', err.request);
        setError('No response received. Please check your network connection.');
        window.alert('No response received. Please check your network connection.');
      } else {
        // Something happened in setting up the request that triggered an Error
        console.error('Error in setting up request:', err.message);
        setError('An error occurred. Please try again later.');
      }
    } finally {
      setLoading(false);
    }
  }, []);

  return { data, loading, error, makeApiCall };
};

export default useApiCall;
