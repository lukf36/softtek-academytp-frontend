import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar/Navbar';
import Header from '../components/Header/Header';
import { Stack, TextField } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import useFetchPost from '../hooks/useFetchPost';
import { useAppContext } from '../context/useAppContext';
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
  let navigate = useNavigate();

  const { setUser, user } = useAppContext();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const { sending, data, call, status, setChecked } = useFetchPost(
    'http://localhost:8080/api/auth/signin'
  );

  const handleLogin = () => {
    setError('');
    call({
      username: username,
      password: password,
    });
  };

  useEffect(() => {
    if (user) navigate('/');
  }, [user, navigate]);

  useEffect(() => {
    if (status === 200) {
      if (data) {
        setUser(data);
        setChecked();
      } else {
        setError('Usuario o contracena incorrectos');
      }
    } else if (status === 400 || status === 401) {
      setError('Usuario o contracena incorrectos');
    }
  }, [data, status, setUser, setChecked]);

  return (
    <div className="w-full">
      <Header />
      <Navbar pageName="Login" />
      <div className="flex justify-center items-center pt-20">
        <Stack direction="column" spacing={2}>
          <TextField
            className="w-96"
            name="username"
            label="Username"
            variant="outlined"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            size="small"
            disabled={sending}
            error={error !== ''}
            helperText={error}
          />
          <TextField
            type="password"
            className="w-96"
            name="password"
            label="Password"
            variant="outlined"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            size="small"
            disabled={sending}
            error={error !== ''}
            helperText={error}
          />
          <LoadingButton
            variant="contained"
            loading={sending}
            onClick={handleLogin}
          >
            Ingresar
          </LoadingButton>
        </Stack>
      </div>
    </div>
  );
};

export default LoginPage;
