import React from 'react';
import Navbar from '../components/Navbar/Navbar';
import Header from '../components/Header/Header';
import CategoryList from '../components/CategoryList/CategoryList';

const CategoryPage = () => {
  return (
    <div className="w-full">
      <Header />
      <Navbar pageName="Categorias" />
      <CategoryList />
    </div>
  );
};

export default CategoryPage;
