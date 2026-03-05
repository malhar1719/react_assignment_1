import axios from 'axios';
import { useEffect, useState } from 'react';

export function useFetch(url) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const controller = new AbortController();

    async function fetchData() {
      setLoading(true);
      setError('');

      try {
        const response = await axios.get(url, { signal: controller.signal });
        setData(response.data);
      } catch (err) {
        if (err.code !== 'ERR_CANCELED') {
          setError(err.message || 'Something went wrong');
        }
      } finally {
        setLoading(false);
      }
    }

    fetchData();

    return () => controller.abort();
  }, [url]);

  return { data, loading, error };
}
