import { useState, useCallback } from 'react';
import { useAppContext } from '../context/useAppContext';

const useFetchDelete = () => {
  const [sending, setSending] = useState(false);
  const [data, setData] = useState(undefined);
  const [error, setError] = useState('');

  const { getAccessToken } = useAppContext();

  const call = useCallback(async (url) => {
    setSending(true);
    setData(undefined);
    setError('');
    try {
      const res = await fetch(url, {
        method: 'DELETE',
        headers: getAccessToken(),
      });
      const payload = await res.json();
      if (payload) {
        setData(payload);
      }
    } catch (err) {
      setError('No se pudo conectar al servidor servidor.');
    } finally {
      setSending(false);
    }
  }, [getAccessToken]);

  return { sending, data, error, call };
};

export default useFetchDelete;
