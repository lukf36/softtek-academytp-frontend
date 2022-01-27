import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar/Navbar';
import Header from '../components/Header/Header';
import { Stack, TextField } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import useFetchPost from '../hooks/useFetchPost';
import { useNavigate } from 'react-router-dom';
import URL from '../contants';

const SignupPage = () => {
  let navigate = useNavigate();

  const [newCliente, setNewCliente] = useState({
    username: '',
    password: '',
    repeatPassword: '',
    tipoCliente: '',
    nombre: '',
    apellido: '',
    razonSocial: '',
    cuit: '',
    dni: '',
  });

  const [newClienteError, setNewClienteError] = useState({
    username: '',
    password: '',
    repeatPassword: '',
    tipoCliente: '',
    nombre: '',
    apellido: '',
    razonSocial: '',
    cuit: '',
    dni: '',
  });

  const [passwordHelperText, setPasswordHelperText] = useState('');

  const { call, sending, data } = useFetchPost(`${URL}/auth/signupcli`);

  const handleRegister = () => {
    call({
      username: newCliente.username,
      password: newCliente.password,
      tipoCliente: newCliente.tipoCliente,
      nombre: newCliente.nombre,
      apellido: newCliente.apellido,
      razonSocial: newCliente.razonSocial,
      cuit: newCliente.cuit,
      dni: newCliente.dni,
    });
  };

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setNewCliente({
      ...newCliente,
      [name]: value,
    });
  };

  useEffect(() => {
    if (newCliente.password !== newCliente.repeatPassword) {
      setPasswordHelperText('Las contracenias no coinciden');
    } else {
      setPasswordHelperText('');
    }
  }, [newCliente.password, newCliente.repeatPassword]);

  useEffect(() => {
    if (data?.message === 'User registered successfully!') {
      navigate('/');
    } else {
      setNewClienteError({ ...data });
    }
  }, [data, navigate]);

  useEffect(() => {
    if (newCliente.tipoCliente === 'PARTICULAR') {
      setNewCliente((prevNewCliente) => {
        return {
          ...prevNewCliente,
          razonSocial: 'undefined',
          cuit: 'undefined',
          dni: '',
          apellido: '',
        };
      });
    }
    if (newCliente.tipoCliente === 'EMPRESA') {
      setNewCliente((prevNewCliente) => {
        return {
          ...prevNewCliente,
          dni: 'undefined',
          apellido: 'undefined',
          razonSocial: '',
          cuit: '',
        };
      });
    }
  }, [newCliente.tipoCliente, setNewCliente]);

  return (
    <div className="w-full">
      <Header />
      <Navbar pageName="Signup" />
      <div className="flex justify-center items-center py-20">
        <Stack direction="column" spacing={2}>
          <TextField
            className="w-96"
            name="username"
            id="username-basic"
            label="Username"
            variant="outlined"
            value={newCliente.username}
            onChange={handleChange}
            size="small"
            disabled={sending}
            error={newClienteError.username}
            helperText={newClienteError.username}
          />
          <TextField
            type="password"
            className="w-96"
            name="password"
            id="password-basic"
            label="Password"
            variant="outlined"
            value={newCliente.password}
            onChange={handleChange}
            size="small"
            disabled={sending}
            error={newClienteError.password}
            helperText={newClienteError.password}
          />
          <TextField
            type="password"
            className="w-96"
            name="repeatPassword"
            id="repeatPassword-basic"
            label="Repetir Password"
            variant="outlined"
            value={newCliente.repeatPassword}
            onChange={handleChange}
            size="small"
            disabled={sending}
            error={newCliente.password !== newCliente.repeatPassword}
            helperText={passwordHelperText}
          />
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label" size="small">
              Tipo Cliente
            </InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              name="tipoCliente"
              value={newCliente.tipoCliente}
              label="Tipo Cliente"
              onChange={handleChange}
              size="small"
              disabled={sending}
              error={newClienteError.tipoCliente}
              helperText={newClienteError.tipoCliente}
            >
              <MenuItem value={'PARTICULAR'}>Particular</MenuItem>
              <MenuItem value={'EMPRESA'}>Empresa</MenuItem>
            </Select>
          </FormControl>
          <TextField
            className="w-96"
            name="nombre"
            id="nombre-basic"
            label="Nombre"
            variant="outlined"
            value={newCliente.nombre}
            onChange={handleChange}
            size="small"
            disabled={sending}
            error={newClienteError.nombre}
            helperText={newClienteError.nombre}
          />
          {newCliente.tipoCliente === 'PARTICULAR' && (
            <>
              <TextField
                className="w-96"
                name="apellido"
                id="apellido-basic"
                label="Apellido"
                variant="outlined"
                value={newCliente.apellido}
                onChange={handleChange}
                size="small"
                disabled={sending}
                error={newClienteError.apellido}
                helperText={newClienteError.apellido}
              />
              <TextField
                className="w-96"
                name="dni"
                id="dni-basic"
                label="DNI"
                variant="outlined"
                value={newCliente.dni}
                onChange={handleChange}
                size="small"
                disabled={sending}
                error={newClienteError.dni}
                helperText={newClienteError.dni}
              />
            </>
          )}
          {newCliente.tipoCliente === 'EMPRESA' && (
            <>
              <TextField
                className="w-96"
                name="razonSocial"
                id="razonSocial-basic"
                label="Razon Social"
                variant="outlined"
                value={newCliente.razonSocial}
                onChange={handleChange}
                size="small"
                disabled={sending}
                error={newClienteError.razonSocial}
                helperText={newClienteError.razonSocial}
              />
              <TextField
                className="w-96"
                name="cuit"
                id="cuit-basic"
                label="CUIT"
                variant="outlined"
                value={newCliente.cuit}
                onChange={handleChange}
                size="small"
                disabled={sending}
                error={newClienteError.cuit}
                helperText={newClienteError.cuit}
              />
            </>
          )}
          <LoadingButton
            variant="contained"
            loading={sending}
            onClick={handleRegister}
          >
            Registrarse
          </LoadingButton>
        </Stack>
      </div>
    </div>
  );
};

export default SignupPage;
