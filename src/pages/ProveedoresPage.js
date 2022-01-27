import React from 'react';
import Header from '../components/Header/Header';
import Navbar from '../components/Navbar/Navbar';
import ProveedoresList from '../components/ProveedoresList/ProveedoresList';

const ProveedoresPage = () => {
  return (
    <div className="w-full">
      <Header />
      <Navbar pageName="Proveedores" />
      <ProveedoresList />
    </div>
  );
};

export default ProveedoresPage;
