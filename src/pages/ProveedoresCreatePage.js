import React, { useState, useEffect } from 'react';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import { LoadingButton } from '@mui/lab';
import Header from '../components/Header/Header';
import useFetchPost from '../hooks/useFetchPost';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar/Navbar';
import { DataGrid } from '@mui/x-data-grid';
import useFetch from '../hooks/useFetch';

const ProveedoresCreatePage = () => {
  let navigate = useNavigate();

  const [categorias, setCategorias] = useState([]);

  const [newProveedor, setNewProveedor] = useState({
    nombre: '',
    direccion: '',
    categorias: [],
  });

  const { sending, call, data } = useFetchPost(
    'http://localhost:8080/api/proveedor'
  );

  const catRequest = useFetch('http://localhost:8080/api/categoria');

  const columns = [
    { field: 'id', headerName: 'ID', width: 20, editable: false },
    {
      field: 'nombre',
      headerName: 'Nombre',
      width: 100,
      editable: false,
      flex: 1,
    },
  ];

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setNewProveedor({
      ...newProveedor,
      [name]: value,
    });
  };

  const handleSelectionChange = (selectionArr) => {
    const cats = categorias.filter((cat) => selectionArr.includes(cat.id));
    setNewProveedor({
      ...newProveedor,
      categorias: cats,
    });
  };

  const handleCreate = () => {
    call({
      nombre: newProveedor.nombre,
      direccion: newProveedor.direccion,
      categorias: newProveedor.categorias,
    });
  };

  useEffect(() => {
    if (catRequest.data?.length > 0) {
      setCategorias(catRequest.data);
    }
  }, [catRequest.data]);

  useEffect(() => {
    if (data?.id) {
      navigate('/proveedores');
    }
  }, [data, navigate]);

  return (
    <div className="w-full">
      <Header />
      <Navbar pageName="Crear Proveedor" />
      <div className="flex items-center justify-center py-10">
        <div className="w-96">
          <h1 className="font-bold text-lg text-blue-700 py-5">
            Crear un nuevo proveedor
          </h1>
          <Stack spacing={4} direction="column">
            <TextField
              name="nombre"
              id="outlined-basic"
              label="Nombre"
              variant="outlined"
              value={newProveedor.nombre}
              onChange={handleChange}
              size="small"
              disabled={sending}
            />
            <TextField
              name="direccion"
              id="outlined-basic"
              label="Direccion"
              variant="outlined"
              value={newProveedor.precio}
              onChange={handleChange}
              size="small"
              disabled={sending}
            />
            <div className="w-96 h-96">
              <DataGrid
                checkboxSelection
                loading={sending}
                pagination
                rows={categorias}
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

export default ProveedoresCreatePage;
