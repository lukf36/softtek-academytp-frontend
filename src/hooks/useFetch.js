import { useEffect, useState, useCallback } from 'react';
import { useAppContext } from '../context/useAppContext';

const useFetch = (url) => {
  const [sending, setSending] = useState(true);
  const [data, setData] = useState(undefined);
  const [error, setError] = useState('');
  const [status, setStatus] = useState(undefined);

  const { getAccessToken } = useAppContext();

  const call = useCallback(async () => {
    setSending(true);
    setData(null);
    setError('');
    setStatus(undefined);
    try {
      const res = await fetch(url, { headers: getAccessToken() });
      const payload = await res.json();
      setStatus(res.status);
      if (payload) {
        setData(payload);
      }
    } catch (err) {
      setError('No se pudo obtener los datos del servidor.');
    } finally {
      setSending(false);
    }
  }, [url, getAccessToken]);

  useEffect(() => {
    call();
  }, [url, call]);

  return { sending, data, error, status };
};

export default useFetch;
