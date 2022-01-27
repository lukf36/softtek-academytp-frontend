import React, { useEffect } from 'react';
import Navbar from '../components/Navbar/Navbar';
import Header from '../components/Header/Header';
import CategoryList from '../components/CategoryList/CategoryList';
import { useAppContext } from '../context/useAppContext';
import { useNavigate } from 'react-router-dom';

const CategoryPage = () => {
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
      <Navbar pageName="Categorias" />
      <CategoryList />
    </div>
  );
};

export default CategoryPage;
