import React from 'react';
import { Link } from 'react-router-dom';
import { useAppContext } from '../../context/useAppContext';

const Header = () => {
  const { user, clearUser, openCartModal } = useAppContext();

  return (
    <div className="w-full flex justify-between items-center p-5 bg-gray-800 shadow-strong text-white">
      <h1 className="font-bold">Softttek Academy TP - Retail System</h1>
      <div className="flex">
        {!user ? (
          <>
            <Link to="/login">
              <p className="hover:underline">Login</p>
            </Link>
            <Link to="/signup">
              <p className="hover:underline pl-5">Sign up</p>
            </Link>
          </>
        ) : (
          <>
            <p>Bienvenido {user.username}</p>
            <button type='button' onClick={() => openCartModal()}>
            <p className="hover:underline pl-5">Carrito</p>
            </button>
            <button type="button" onClick={() => clearUser()}>
              <p className="hover:underline text-red-500 pl-5">Sign out</p>
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default Header;
