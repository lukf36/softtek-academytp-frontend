import React, { useState, useEffect } from 'react';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import { LoadingButton } from '@mui/lab';
import useFetchPost from '../../hooks/useFetchPost';
import { useNavigate } from 'react-router-dom';
import URL from '../../contants';
const ProductEdit = ({ product }) => {
  let navigate = useNavigate();

  const [editProduct, setEditProduct] = useState({ ...product });

  const [edutProductError, setEditProductError] = useState({
    nombre: undefined,
    precio: undefined,
    stock: undefined,
  });

  const { call, sending, data, status } = useFetchPost(
    `${URL}/producto`
  );

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setEditProduct({
      ...editProduct,
      [name]: value,
    });
  };

  const handleEdit = () => {
    call({
      id: editProduct.id,
      nombre: editProduct.nombre,
      precio: editProduct.precio,
      stock: editProduct.stock,
    });
  };

  useEffect(() => {
    if (status === 400) {
      setEditProductError({ ...data });
    } else if (status === 200) {
      navigate('/');
    }
  }, [data, navigate, status]);

  return (
    <div className="flex items-center justify-center py-10">
      <div className="w-96">
        <h1 className="font-bold text-lg text-blue-700 py-5">
          Editar Producto
        </h1>
        <Stack spacing={4} direction="column">
          <TextField
            name="nombre"
            id="outlined-basic"
            label="Nombre"
            variant="outlined"
            value={editProduct.nombre}
            onChange={handleChange}
            size="small"
            disabled={sending}
            error={edutProductError.nombre}
            helperText={edutProductError.nombre}
          />
          <TextField
            name="precio"
            id="outlined-basic"
            label="Precio"
            variant="outlined"
            type="number"
            value={editProduct.precio}
            onChange={handleChange}
            size="small"
            disabled={sending}
            error={edutProductError.precio}
            helperText={edutProductError.precio}
          />
          <TextField
            name="stock"
            id="outlined-basic"
            label="Stock"
            variant="outlined"
            type="number"
            value={editProduct.stock}
            onChange={handleChange}
            size="small"
            disabled={sending}
            error={edutProductError.stock}
            helperText={edutProductError.stock}
          />
          <Stack spacing={2} direction="column">
            <LoadingButton
              variant="contained"
              loading={sending}
              onClick={handleEdit}
            >
              Editar
            </LoadingButton>
          </Stack>
        </Stack>
      </div>
    </div>
  );
};

export default ProductEdit;
