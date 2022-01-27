import React, { useState, useEffect } from 'react';
import Header from '../components/Header/Header';
import Navbar from '../components/Navbar/Navbar';
import EmpleadosList from '../components/Empleados/EmpleadosList';
import EmpleadosCreate from '../components/Empleados/EmpleadosCreate';
import useFetchPost from '../hooks/useFetchPost';
import { useAppContext } from '../context/useAppContext';
import { useNavigate } from 'react-router-dom';

const initEmpleado = {
  username: '',
  password: '',
  nombre: '',
  apellido: '',
  supervisor: undefined,
};

const EmpleadosPage = () => {
  let navigate = useNavigate();

  const [newEmpleado, setNewEmpleado] = useState({ ...initEmpleado });

  const [newEmpleadoError, setNewEmpleadoError] = useState({ ...initEmpleado });

  const { accesible } = useAppContext();

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

  useEffect(() => {
    const roles = ['ROLE_ADMIN'];
    if (!accesible(roles)) {
      navigate('/');
    }
  }, [accesible, navigate]);

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
