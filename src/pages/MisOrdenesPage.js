import React, { useEffect, useState } from 'react';
import Header from '../components/Header/Header';
import Navbar from '../components/Navbar/Navbar';
import { useAppContext } from '../context/useAppContext';
import { useNavigate } from 'react-router-dom';
import useFetch from '../hooks/useFetch';
import { Stack } from '@mui/material';
import URL from '../contants'

const MisOrdenesPage = () => {
  let navigate = useNavigate();

  const [ordenes, setOrdenes] = useState([]);
  console.log(ordenes);
  const { user, accesible } = useAppContext();

  const { data } = useFetch(
    `${URL}/cliente/${user?.id}/ordenes`
  );

  useEffect(() => {
    if (!user) {
      navigate('/');
    }
  }, [user, navigate]);

  useEffect(() => {
    const roles = ['ROLE_CLIENTE'];
    if (!accesible(roles)) {
      navigate('/');
    }
  }, [accesible, navigate]);

  useEffect(() => {
    if (data?.length > 0) {
      setOrdenes(data);
    }
  }, [data]);

  return (
    <>
      <Header />
      <Navbar />
      <div className="flex items-center justify-center pt-10 px-10">
        <Stack direction="column" spacing={5}>
          {ordenes.map(
            ({ id, fechaEntrega, fechaGeneracion, detalleOrden }) => {
              return (
                <div
                  key={id}
                  className="flex items-center justify-center pt-10"
                >
                  <Stack direction='column' spacing={4}>
                    <h1 className="text-lg font-bold text-blue-500">
                      Orden {id} generada el {fechaGeneracion}
                    </h1>
                    {detalleOrden.map(({ cantidad, producto }) => {
                      return (
                        <Stack key={producto.id} direction="column" spacing={2}>
                          <p>Producto: {producto.nombre}</p>
                          <p>Cantidad: {cantidad}</p>
                          <p>Precio por unidad: {producto.precio}</p>
                        </Stack>
                      );
                    })}
                  </Stack>
                </div>
              );
            }
          )}
        </Stack>
      </div>
    </>
  );
};

export default MisOrdenesPage;
