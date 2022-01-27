import { useState, useCallback } from 'react';
import { useAppContext } from '../context/useAppContext';

const useFetchPost = (url) => {
  const [sending, setSending] = useState(false);
  const [data, setData] = useState(undefined);
  const [error, setError] = useState(undefined);
  const [status, setStatus] = useState(undefined);

  const { getAuthorization } = useAppContext();

  const setChecked = () => setStatus(undefined);

  const call = useCallback(
    async (body) => {
      try {
        setSending(true);
        setData(undefined);
        setError(undefined);
        setStatus(undefined);
        console.log(getAuthorization());
        const res = await fetch(url, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': getAuthorization()
          },
          body: JSON.stringify(body),
        });
        setStatus(res.status);
        const payload = await res.json();
        if (payload) {
          setData(payload);
        }
      } catch (err) {
        setError('No se pudo conectar al servidor servidor.');
      } finally {
        setSending(false);
      }
    },
    [url, getAuthorization]
  );

  return { sending, data, error, call, setChecked, status };
};

export default useFetchPost;
