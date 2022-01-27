import React, { useState, useEffect } from 'react';
import Header from '../components/Header/Header';
import Navbar from '../components/Navbar/Navbar';
import EmpleadosList from '../components/Empleados/EmpleadosList';
import EmpleadosCreate from '../components/Empleados/EmpleadosCreate';
import useFetchPost from '../hooks/useFetchPost';

const initEmpleado = {
  username: '',
  password: '',
  nombre: '',
  apellido: '',
  supervisor: undefined,
};

const EmpleadosPage = () => {
  const [newEmpleado, setNewEmpleado] = useState({ ...initEmpleado });

  const [newEmpleadoError, setNewEmpleadoError] = useState({ ...initEmpleado });

  const { sending, data, call, status } = useFetchPost(
    'http://localhost:8080/api/auth/signupemp'
  );

  const handleCreate = () => {
    setNewEmpleadoError({ ...initEmpleado });
    call({
      username: newEmpleado.username,
      password: newEmpleado.password,
      nombre: newEmpleado.nombre,
      apellido: newEmpleado.apellido,
      supervisor: newEmpleado.supervisor,
    });
  };

  const handleSupervisorSelection = (supervisor) => {
    setNewEmpleado({
      ...newEmpleado,
      supervisor: supervisor,
    });
  };

  useEffect(() => {
    if (status === 200) {
      setNewEmpleado({ ...initEmpleado });
      setNewEmpleadoError({ ...initEmpleado });
    } else if (status === 400 || status === 401) {
      setNewEmpleadoError({ ...data });
    }
  }, [data, status]);

  return (
    <div className="w-full">
      <Header />
      <Navbar pageName="Empleados" />
      <EmpleadosCreate
        newEmpleado={newEmpleado}
        setNewEmpleado={setNewEmpleado}
        newEmpleadoError={newEmpleadoError}
        setNewEmpleadoError={setNewEmpleadoError}
        sending={sending}
        handleCreate={handleCreate}
      />
      <EmpleadosList
        dataNewEmpleado={data}
        handleSupervisorSelection={handleSupervisorSelection}
      />
    </div>
  );
};

export default EmpleadosPage;
