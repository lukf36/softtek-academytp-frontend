import React, { useEffect } from 'react';
import Header from '../components/Header/Header';
import Navbar from '../components/Navbar/Navbar';
import ProveedoresList from '../components/ProveedoresList/ProveedoresList';
import { useAppContext } from '../context/useAppContext';
import { useNavigate } from 'react-router-dom';

const ProveedoresPage = () => {
  let navigate = useNavigate();

  const { accesible } = useAppContext();

  useEffect(() => {
    const roles = ['ROLE_EMPLEADO', 'ROLE_ADMIN'];
    if (!accesible(roles)) {
      navigate('/');
    }
  }, [accesible, navigate]);

  return (
    <div className="w-full">
      <Header />
      <Navbar pageName="Proveedores" />
      <ProveedoresList />
    </div>
  );
};

export default ProveedoresPage;
