import React from 'react';
import useFetch from '../../hooks/useFetch';
import CircularProgress from '@mui/material/CircularProgress';
import URL from '../../contants';
const ProductDetails = ({ productId }) => {
  const { data, sending, error } = useFetch(
    `${URL}/producto/${productId}`
  );

  if (sending) {
    return (
      <div className="flex items-center justify-center">
        <CircularProgress />
      </div>
    );
  } else if (error) {
    return (
      <div className="flex items-center justify-center">
        <p className="text-red-700 font-bold">{error}</p>
      </div>
    );
  } else {
    const { nombre, precio, stock } = data;
    return (
      <div className="w-full h-96 px-10 pt-10 flex items-center justify-center">
        <div>
          <p>Nombre: {nombre}</p>
          <p>Precio: {precio}</p>
          <p>Stock: {stock}</p>
        </div>
      </div>
    );
  }
};

export default ProductDetails;
