import React, { useState, useEffect } from 'react';
import useFetch from '../../hooks/useFetch';
import Tooltip from '@mui/material/Tooltip';
import { FaTrash } from 'react-icons/fa';
import CircularProgress from '@mui/material/CircularProgress';
import { DataGrid } from '@mui/x-data-grid';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import { LoadingButton } from '@mui/lab';
import useFetchPost from '../../hooks/useFetchPost';
import useFetchDelete from '../../hooks/useFetchDelete';

const CategoryList = () => {
  const [categorias, setCategorias] = useState([]);
  const [newCategoria, setNewCategoria] = useState('');
  const [newCategoriaError, setNewCategoriaError] = useState('');

  const { data, sending, error } = useFetch(
    `http://localhost:8080/api/categoria`
  );

  const createCatRequest = useFetchPost('http://localhost:8080/api/categoria');

  const delCatRequest = useFetchDelete();

  const columns = [
    { field: 'id', headerName: 'ID', width: 20, editable: false },
    {
      field: 'nombre',
      headerName: 'Nombre',
      width: 100,
      editable: false,
      flex: 1,
    },
    {
      field: 'acciones',
      headerName: 'Acciones',
      width: 100,
      editable: false,
      flex: 1,
      renderCell: (params) => (
        <Tooltip title="Borrar categoria" placement="top">
          <button
            type="button"
            onClick={() =>
              delCatRequest.call(
                `http://localhost:8080/api/categoria/${params.id}`
              )
            }
          >
            <FaTrash size={25} color="#023e8a" />
          </button>
        </Tooltip>
      ),
    },
  ];

  const handleCreate = () => {
    createCatRequest.call({
      nombre: newCategoria,
    });
  };

  useEffect(() => {
    if (delCatRequest.data) {
      setCategorias((oldCategorias) =>
        oldCategorias.filter((p) => p.id !== delCatRequest.data)
      );
    }
  }, [delCatRequest.data]);

  useEffect(() => {
    if (data?.length > 0) {
      setCategorias(data);
    }
  }, [data]);

  useEffect(() => {
    if (createCatRequest.status === 400) {
      setNewCategoriaError(createCatRequest.data.nombre);
    }
    if (createCatRequest.status === 200 && createCatRequest.data) {
      console.log("data", createCatRequest.data)
      createCatRequest.setChecked();
      setCategorias((prevCategorias) => [
        ...prevCategorias,
        createCatRequest.data,
      ]);
    }
  }, [createCatRequest]);

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
    return (
      <div>
        <div className="pt-10 flex justify-center">
          <Stack spacing={2} direction="row">
            <TextField
              name="nombre"
              id="outlined-basic"
              label="Nombre"
              variant="outlined"
              value={newCategoria}
              onChange={(e) => setNewCategoria(e.target.value)}
              size="small"
              disabled={createCatRequest.sending}
              error={newCategoriaError.nombre}
              helperText={newCategoriaError.nombre}
            />
            <LoadingButton
              variant="contained"
              loading={createCatRequest.sending}
              onClick={handleCreate}
            >
              Agregar
            </LoadingButton>
          </Stack>
        </div>
        <div className="w-full h-96 px-10 py-10 flex items-center justify-center">
          <DataGrid
            loading={sending}
            pagination
            rows={categorias}
            columns={columns}
            pageSize={5}
            rowsPerPageOptions={[5]}
          />
        </div>
      </div>
    );
  }
};

export default CategoryList;
