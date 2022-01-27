import React from 'react';
import Header from '../components/Header/Header';
import ProductDetails from '../components/ProductDetails/ProductDetails';
import { useParams } from 'react-router-dom';

const ProductDetailsPage = () => {
  let { productId } = useParams();

  return (
    <div>
      <Header />
      <ProductDetails productId={productId} />
    </div>
  );
};

export default ProductDetailsPage;
