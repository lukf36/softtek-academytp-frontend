import React, { useEffect } from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import useFetch from '../hooks/useFetch';
import { useParams } from 'react-router-dom';
import ProductEdit from '../components/ProductEdit/ProductEdit';
import Header from '../components/Header/Header';
import Navbar from '../components/Navbar/Navbar';
import { useAppContext } from '../context/useAppContext';
import { useNavigate } from 'react-router-dom';

const ProductEditPage = () => {
  let { productId } = useParams();
  
  let navigate = useNavigate();

  const { accesible } = useAppContext();

  useEffect(() => {
    const roles = ['ROLE_EMPLEADO', 'ROLE_ADMIN'];
    if (!accesible(roles)) {
      navigate('/');
    }
  }, [accesible, navigate]);

  const { data, sending, error } = useFetch(
    `http://localhost:8080/api/producto/${productId}`
  );

  if (sending) {
    return (
      <div className='inline'>
        <Header />
        <div className="flex items-center justify-center">
          <CircularProgress />
        </div>
      </div>
    );
  } else if (error) {
    return (
      <div className="flex items-center justify-center">
        <Header />
        <p className="text-red-700 font-bold">{error}</p>
      </div>
    );
  } else {
    return (
      <div className="w-full">
        <Header />
        <Navbar pageName="Editar Producto" />
        <ProductEdit product={data} />
      </div>
    );
  }
};

export default ProductEditPage;
