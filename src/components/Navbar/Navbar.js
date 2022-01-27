import React from 'react';
import { Stack } from '@mui/material';
import { Link } from 'react-router-dom';
import { useAppContext } from '../../context/useAppContext';

const Navbar = ({ pageName }) => {
  const { accesible } = useAppContext();

  const navbarLinks = [
    {
      id: 0,
      nombre: 'Home',
      link: '/',
      role: ['ROLE_CLIENTE'],
    },
    {
      id: 1,
      nombre: 'Crear Producto',
      link: '/createproduct',
      role: ['ROLE_EMPLEADO', 'ROLE_ADMIN'],
    },
    {
      id: 2,
      nombre: 'Categorias',
      link: '/categorias',
      role: ['ROLE_EMPLEADO', 'ROLE_ADMIN'],
    },
    {
      id: 3,
      nombre: 'Proveedores',
      link: '/proveedores',
      role: ['ROLE_EMPLEADO', 'ROLE_ADMIN'],
    },
    {
      id: 4,
      nombre: 'Crear Proveedor',
      link: '/createproveedores',
      role: ['ROLE_EMPLEADO', 'ROLE_ADMIN'],
    },
    {
      id: 5,
      nombre: 'Promociones',
      link: '/promociones',
      role: ['ROLE_CLIENTE'],
    },
    {
      id: 6,
      nombre: 'Crear Promocion',
      link: '/createpromocion',
      role: ['ROLE_EMPLEADO', 'ROLE_ADMIN'],
    },
    {
      id: 7,
      nombre: 'Empleados',
      link: '/empleados',
      role: ['ROLE_ADMIN'],
    },
  ];

  return (
    <div className="w-full flex justify-center items-center pt-10">
      <Stack spacing={2} direction="row">
        {navbarLinks.map(({ id, nombre, link, role }) => {
          if (accesible(role)) {
            return (
              <Link key={id} to={link}>
                <p
                  className={`hover:underline ${
                    pageName === nombre && 'font-bold text-blue-700'
                  }`}
                >
                  {nombre}
                </p>
              </Link>
            );
          } else {
            return <></>;
          }
        })}
      </Stack>
    </div>
  );
};

export default Navbar;
