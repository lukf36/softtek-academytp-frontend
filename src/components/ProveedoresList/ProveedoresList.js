import React, { useState, useEffect } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import Stack from '@mui/material/Stack';
import Tooltip from '@mui/material/Tooltip';
import useFetch from '../../hooks/useFetch';
import useFetchDelete from '../../hooks/useFetchDelete';
import { FaTrash, FaEdit } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import CircularProgress from '@mui/material/CircularProgress';

const ProveedoresList = () => {
  let navigate = useNavigate();

  const [proveedores, setProveedores] = useState([]);

  const { data, sending, error } = useFetch(
    `http://localhost:8080/api/proveedor`
  );

  const delRequest = useFetchDelete();

  const columns = [
    { field: 'id', headerName: 'ID', width: 90, editable: false },
    {
      field: 'nombre',
      headerName: 'Nombre',
      width: 150,
      editable: false,
      flex: 1,
    },
    {
      field: 'direccion',
      headerName: 'Direccion',
      width: 150,
      editable: false,
      flex: 1,
    },
    {
      field: 'acciones',
      headerName: 'Acciones',
      width: 150,
      editable: false,
      flex: 1,
      renderCell: (params) => (
        <Stack spacing={2} direction="row">
          <Tooltip title="Editar" placement="top">
            <button type="button" onClick={() => navigate(`/`)}>
              <FaEdit size={25} color="#023e8a" />
            </button>
          </Tooltip>
          <Tooltip title="Borrar" placement="top">
            <button
              type="button"
              onClick={() => handleDeleteProveedor(params.id)}
            >
              <FaTrash size={25} color="#023e8a" />
            </button>
          </Tooltip>
        </Stack>
      ),
    },
  ];

  const handleDeleteProveedor = (id) => {
    delRequest.call(`http://localhost:8080/api/proveedor/${id}`);
  };

  useEffect(() => {
    if (delRequest.data) {
      setProveedores((prevProveedores) =>
        prevProveedores.filter((p) => p.id !== delRequest.data)
      );
    }
  }, [delRequest.data]);

  useEffect(() => {
    if (data?.length > 0) {
      setProveedores(data);
    }
  }, [data]);

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
      <div className="w-full pt-10 h-96 px-10 flex items-center justify-center">
        <DataGrid
          loading={sending}
          pagination
          rows={proveedores}
          columns={columns}
          pageSize={5}
          rowsPerPageOptions={[5]}
        />
      </div>
    );
  }
};

export default ProveedoresList;
