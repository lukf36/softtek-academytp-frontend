import React from 'react';
import Header from '../components/Header/Header';
import Navbar from '../components/Navbar/Navbar';
import { useAppContext } from '../context/useAppContext';

const MisOrdenesPage = () => {
  const { user } = useAppContext();

  return (
    <>
      <Header />
      <Navbar />
      <div className='flex items-center justify-center pt-10 px-10'>
        {user.ordenes.map((o) => {
          return 
        })}
      </div>
    </>
  );
};

export default MisOrdenesPage;
