import React from 'react';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import { LoadingButton } from '@mui/lab';

const EmpleadosCreate = ({
  newEmpleado,
  setNewEmpleado,
  sending,
  handleCreate,
  newEmpleadoError,
  setNewEmpleadoError
}) => {
  const { username, password, nombre, apellido } = newEmpleado;

  return (
    <div className="w-full pt-10 flex items-center justify-center">
      <Stack direction="row" spacing={2}>
        <TextField
          name="username"
          id="outlined-basic"
          label="Username"
          variant="outlined"
          value={username}
          onChange={(e) =>
            setNewEmpleado({ ...newEmpleado, username: e.target.value })
          }
          size="small"
          disabled={sending}
          error={newEmpleadoError.username}
          helperText={newEmpleadoError.username}
        />
        <TextField
          name="password"
          id="outlined-basic"
          label="Password"
          variant="outlined"
          value={password}
          onChange={(e) =>
            setNewEmpleado({ ...newEmpleado, password: e.target.value })
          }
          size="small"
          disabled={sending}
          error={newEmpleadoError.password}
          helperText={newEmpleadoError.password}
        />
        <TextField
          name="nombre"
          id="outlined-basic"
          label="Nombre"
          variant="outlined"
          value={nombre}
          onChange={(e) =>
            setNewEmpleado({ ...newEmpleado, nombre: e.target.value })
          }
          size="small"
          disabled={sending}
          error={newEmpleadoError.nombre}
          helperText={newEmpleadoError.nombre}
        />
        <TextField
          name="apellido"
          id="outlined-basic"
          label="Apellido"
          variant="outlined"
          value={apellido}
          onChange={(e) =>
            setNewEmpleado({ ...newEmpleado, apellido: e.target.value })
          }
          size="small"
          disabled={sending}
          error={newEmpleadoError.apellido}
          helperText={newEmpleadoError.apellido}
        />
        <LoadingButton
          variant="contained"
          loading={sending}
          onClick={handleCreate}
        >
          Crear empleado
        </LoadingButton>
      </Stack>
    </div>
  );
};

export default EmpleadosCreate;
