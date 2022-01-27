import React, { useState, useEffect } from 'react';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import { LoadingButton } from '@mui/lab';
import Header from '../components/Header/Header';
import useFetchPost from '../hooks/useFetchPost';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar/Navbar';
import { useAppContext } from '../context/useAppContext';
import URL from '../contants';

const ProductCreate = () => {
  let navigate = useNavigate();

  const { accesible } = useAppContext();

  useEffect(() => {
    const roles = ['ROLE_EMPLEADO', 'ROLE_ADMIN'];
    if (!accesible(roles)) {
      navigate('/');
    }
  }, [accesible, navigate]);

  const [newProduct, setNewProduct] = useState({
    nombre: '',
    precio: undefined,
    stock: undefined,
  });

  const [newProductError, setNewProductError] = useState({
    nombre: undefined,
    precio: undefined,
    stock: undefined,
  });

  const { call, sending, error, data, status } = useFetchPost(
    `${URL}/api/producto`
  );

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setNewProduct({
      ...newProduct,
      [name]: value,
    });
  };

  const handleCreate = () => {
    call({
      nombre: newProduct.nombre,
      precio: newProduct.precio,
      stock: newProduct.stock,
    });
  };

  useEffect(() => {
    if (status === 400) {
      setNewProductError({ ...data });
    }
    if (data?.id) {
      navigate('/');
    }
  }, [error, status, navigate, data]);

  return (
    <div className="w-full">
      <Header />
      <Navbar pageName="Crear Producto" />
      <div className="flex items-center justify-center py-10">
        <div className="w-96">
          <h1 className="font-bold text-lg text-blue-700 py-5">
            Crear un nuevo producto
          </h1>
          <Stack spacing={4} direction="column">
            <TextField
              name="nombre"
              id="outlined-basic"
              label="Nombre"
              variant="outlined"
              value={newProduct.nombre}
              onChange={handleChange}
              size="small"
              disabled={sending}
              error={newProductError.nombre}
              helperText={newProductError.nombre}
            />
            <TextField
              name="precio"
              id="outlined-basic"
              label="Precio"
              variant="outlined"
              type="number"
              value={newProduct.precio}
              onChange={handleChange}
              size="small"
              disabled={sending}
              error={newProductError.precio}
              helperText={newProductError.precio}
            />
            <TextField
              name="stock"
              id="outlined-basic"
              label="Stock"
              variant="outlined"
              type="number"
              value={newProduct.stock}
              onChange={handleChange}
              size="small"
              disabled={sending}
              error={newProductError.stock}
              helperText={newProductError.stock}
            />
            <Stack spacing={2} direction="column">
              <LoadingButton
                variant="contained"
                loading={sending}
                onClick={handleCreate}
              >
                Crear
              </LoadingButton>
            </Stack>
          </Stack>
        </div>
      </div>
    </div>
  );
};

export default ProductCreate;
