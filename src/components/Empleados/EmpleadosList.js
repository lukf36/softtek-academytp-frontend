import React, { useState, useEffect } from 'react';
import useFetch from '../../hooks/useFetch';
import { DataGrid } from '@mui/x-data-grid';
import CircularProgress from '@mui/material/CircularProgress';
import Tooltip from '@mui/material/Tooltip';
import { FaTrash } from 'react-icons/fa';
import useFetchDelete from '../../hooks/useFetchDelete';
import URL from '../../contants'
const EmpleadosList = ({ dataNewEmpleado, handleSupervisorSelection }) => {
  const [empleados, setEmpleados] = useState([]);

  const { data, sending, error } = useFetch(
    `${URL}/empleado`
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
      field: 'apellido',
      headerName: 'Apellido',
      width: 150,
      editable: false,
      flex: 1,
    },
    {
      field: 'supervisor',
      headerName: 'ID Supervisor',
      width: 150,
      editable: false,
      flex: 1,
      renderCell: (params) => <p>{params.row.supervisor?.id}</p>,
    },
    {
      field: 'isAdmin',
      headerName: 'Administrador',
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
        <Tooltip title="Borrar" placement="top">
          <button type="button" onClick={() => handleDeleteEmpleado(params.id)}>
            <FaTrash size={25} color="#023e8a" />
          </button>
        </Tooltip>
      ),
    },
  ];

  const handleDeleteEmpleado = (id) => {
    delRequest.call(`${URL}/empleado/${id}`);
  };

  const handleSelectionChanged = (selection) => {
    const empl = empleados.filter((e) => selection.includes(e.id))[0];
    handleSupervisorSelection(empl);
  };

  useEffect(() => {
    if (delRequest.data) {
      setEmpleados((prevEmpleados) =>
        prevEmpleados.filter((e) => e.id !== delRequest.data)
      );
    }
  }, [delRequest.data]);

  useEffect(() => {
    if (data?.length > 0) {
      setEmpleados(data);
    }
  }, [data]);

  useEffect(() => {
    if (dataNewEmpleado?.id) {
      setEmpleados((prevEmpleados) => [...prevEmpleados, dataNewEmpleado]);
    }
  }, [dataNewEmpleado]);

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
          rows={empleados}
          columns={columns}
          pageSize={5}
          rowsPerPageOptions={[5]}
          onSelectionModelChange={handleSelectionChanged}
        />
      </div>
    );
  }
};

export default EmpleadosList;
