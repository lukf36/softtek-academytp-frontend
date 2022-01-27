import React from 'react';
import Header from '../components/Header/Header';
import Navbar from '../components/Navbar/Navbar';
import PromocionesList from '../components/Promociones/PromocionesList';

const PromocionesPage = () => {
  return (
    <div className="w-full">
      <Header />
      <Navbar pageName="Promociones" />
      <PromocionesList />
    </div>
  );
};

export default PromocionesPage;
