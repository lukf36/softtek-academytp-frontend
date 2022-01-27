import { useState, useCallback } from 'react';
import { useAppContext } from '../context/useAppContext';

const useFetchCall = (url) => {
  const [sending, setSending] = useState(false);
  const [data, setData] = useState(null);
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
  }, [url]);

  return { sending, data, error, call, status };
};

export default useFetchCall;
