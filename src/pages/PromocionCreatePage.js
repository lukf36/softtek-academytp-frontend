import React, { useState, useEffect } from 'react';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import { LoadingButton } from '@mui/lab';
import Header from '../components/Header/Header';
import useFetchPost from '../hooks/useFetchPost';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar/Navbar';
import useFetch from '../hooks/useFetch';
import { DataGrid } from '@mui/x-data-grid';
import { useAppContext } from '../context/useAppContext';
import URL from '../contants';

const PromocionCreatePage = () => {
  let navigate = useNavigate();

  const { accesible } = useAppContext();

  useEffect(() => {
    const roles = ['ROLE_EMPLEADO', 'ROLE_ADMIN'];
    if (!accesible(roles)) {
      navigate('/');
    }
  }, [accesible, navigate]);

  const reqProduct = useFetch(`${URL}/producto`);

  const { sending, call, data } = useFetchPost(
    `${URL}/promocion`
  );

  const [productos, setProductos] = useState([]);

  const [newPromocion, setNewPromocion] = useState({
    nombre: '',
    producto: undefined,
    descuento: undefined,
    fechaVigenciaDesde: undefined,
    fechaVigenciaHasta: undefined,
  });

  const columns = [
    { field: 'id', headerName: 'ID', width: 90, editable: false },
    {
      field: 'nombre',
      headerName: 'Nombre',
      width: 150,
      editable: false,
      flex: 1,
    },
  ];

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setNewPromocion({
      ...newPromocion,
      [name]: value,
    });
  };

  const handleCreate = () => {
    call({
      nombre: newPromocion.nombre,
      producto: newPromocion.producto,
      descuento: newPromocion.descuento,
      fechaVigenciaDesde: newPromocion.fechaVigenciaDesde,
      fechaVigenciaHasta: newPromocion.fechaVigenciaHasta,
    });
  };

  const handleSelectionChange = (selection) => {
    const prod = productos.filter((p) => selection.includes(p.id))[0];
    setNewPromocion({
      ...newPromocion,
      producto: prod,
    });
  };

  useEffect(() => {
    if (reqProduct.data?.length > 0) {
      setProductos(reqProduct.data);
    }
  }, [reqProduct.data]);

  useEffect(() => {
    if (data?.id) {
      navigate('/promociones');
    }
  }, [data, navigate]);

  return (
    <div className="w-full">
      <Header />
      <Navbar pageName="Crear Promocion" />
      <div className="flex items-center justify-center py-10">
        <div className="w-96">
          <h1 className="font-bold text-lg text-blue-700 py-5">
            Crear una nueva promocion
          </h1>
          <Stack spacing={4} direction="column">
            <TextField
              name="nombre"
              id="outlined-basic"
              label="Nombre"
              variant="outlined"
              value={newPromocion.nombre}
              onChange={handleChange}
              size="small"
              disabled={sending}
            />
            <TextField
              type="number"
              name="descuento"
              id="outlined-basic"
              label="Descuento"
              variant="outlined"
              value={newPromocion.precio}
              onChange={handleChange}
              size="small"
              disabled={sending}
            />
            <TextField
              name="fechaVigenciaDesde"
              id="outlined-basic"
              label="Fecha vigencia desde"
              variant="outlined"
              value={newPromocion.fechaVigenciaDesde}
              onChange={handleChange}
              size="small"
              disabled={sending}
            />
            <TextField
              name="fechaVigenciaHasta"
              id="outlined-basic"
              label="Fecha vigencia hasta"
              variant="outlined"
              value={newPromocion.fechaVigenciaHasta}
              onChange={handleChange}
              size="small"
              disabled={sending}
            />
            <div className="h-96">
              <DataGrid
                loading={sending}
                pagination
                rows={productos}
                columns={columns}
                pageSize={5}
                rowsPerPageOptions={[5]}
                onSelectionModelChange={handleSelectionChange}
              />
            </div>
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

export default PromocionCreatePage;
