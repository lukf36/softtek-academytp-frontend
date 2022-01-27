import React from 'react';
import Header from '../components/Header/Header';
import ProductList from '../components/ProductList/ProductList';
import SearchBox from '../components/SearchBox/SearchBox';
import Navbar from '../components/Navbar/Navbar';

const HomePage = () => {
  return (
    <div className="w-full">
      <Header />
      <Navbar pageName='Home' />
      <SearchBox />
      <ProductList />
    </div>
  );
};

export default HomePage;
