import React, { useState, useEffect } from 'react';
import useFetch from '../../hooks/useFetch';
import CircularProgress from '@mui/material/CircularProgress';
import { DataGrid } from '@mui/x-data-grid';
import Stack from '@mui/material/Stack';
import Tooltip from '@mui/material/Tooltip';
import { FaTrash } from 'react-icons/fa';
import useFetchDelete from '../../hooks/useFetchDelete';
import URL from '../../contants';
const PromocionesList = () => {
  const [promociones, setPromociones] = useState([]);

  const { data, sending, error } = useFetch(
    `${URL}/promocion`
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
      field: 'producto',
      headerName: 'Producto',
      width: 150,
      editable: false,
      flex: 1,
      renderCell: (params) => <p>{params.row.producto.nombre}</p>,
    },
    {
      field: 'fechaVigenciaDesde',
      headerName: 'Vigencia Desde',
      width: 150,
      editable: false,
      flex: 1,
    },
    {
      field: 'fechaVigenciaHasta',
      headerName: 'Vigencia Hasta',
      width: 150,
      editable: false,
      flex: 1,
    },
    {
      field: 'descuento',
      headerName: 'Descuento',
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
          <Tooltip title="Borrar" placement="top">
            <button
              type="button"
              onClick={() =>
                delRequest.call(
                  `${URL}/promocion/${params.id}`
                )
              }
            >
              <FaTrash size={25} color="#023e8a" />
            </button>
          </Tooltip>
        </Stack>
      ),
    },
  ];

  useEffect(() => {
    if (data?.length > 0) {
      setPromociones(data);
    }
  }, [data]);

  useEffect(() => {
    if (delRequest.data) {
      setPromociones((oldPromociones) =>
        oldPromociones.filter((p) => p.id !== delRequest.data)
      );
    }
  }, [delRequest.data]);

  if (sending) {
    return (
      <div className="flex items-center justify-center pt-10">
        <CircularProgress />
      </div>
    );
  } else if (error) {
    return (
      <div className="flex items-center justify-center">
        <p className="text-red-700 font-bold pt-10">{error}</p>
      </div>
    );
  } else {
    return (
      <div className="w-full pt-10 h-96 px-10 flex items-center justify-center">
        <DataGrid
          loading={sending}
          pagination
          rows={promociones}
          columns={columns}
          pageSize={5}
          rowsPerPageOptions={[5]}
        />
      </div>
    );
  }
};

export default PromocionesList;
