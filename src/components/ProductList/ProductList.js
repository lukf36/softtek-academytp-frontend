import React, { useState, useEffect } from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import { DataGrid } from '@mui/x-data-grid';
import Stack from '@mui/material/Stack';
import Tooltip from '@mui/material/Tooltip';
import useFetch from '../../hooks/useFetch';
import useFetchDelete from '../../hooks/useFetchDelete';
import { FaShoppingCart, FaEdit, FaTrash, FaDollarSign } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import DeleteDialog from '../DeleteDialog/DeleteDialog';
import { useAppContext } from '../../context/useAppContext';

const ProductList = () => {
  let navigate = useNavigate();

  const { addProductToCart } = useAppContext();

  const [pageStatus, setPageStatus] = useState({
    page: 0,
    pageSize: 5,
    totalCount: 5,
  });

  const [idToDelete, setIdToDelete] = useState(undefined);

  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

  const { data, sending, error } = useFetch(
    `http://localhost:8080/api/producto?pageNo=${pageStatus.page}&pageSize=${pageStatus.pageSize}`
  );

  const countRequest = useFetch('http://localhost:8080/api/producto/count');

  const delRequest = useFetchDelete();

  const [products, setProducts] = useState([]);

  const columns = [
    { field: 'id', headerName: 'ID', width: 90, editable: false },
    {
      field: 'nombre',
      headerName: 'Nombre',
      width: 150,
      editable: false,
      flex: 1,
      renderCell: (params) => (
        <div className="flex items-center">
          <p>{params.row.nombre}</p>
          {params.row.hasPromocion && (
            <FaDollarSign className="pl-2" size={20} color="#023e8a" />
          )}
        </div>
      ),
    },
    {
      field: 'precio',
      headerName: 'Precio',
      width: 150,
      editable: false,
      flex: 1,
    },
    {
      field: 'stock',
      headerName: 'Stock',
      width: 150,
      editable: false,
      flex: 1,
    },
    {
      field: 'acciones',
      headerName: 'Acciones',
      width: 150,
      editable: false,
      flex: 1,
      renderCell: (params) => (
        <Stack spacing={2} direction="row">
          <Tooltip title="Agregar al carrito" placement="top">
            <button type="button" onClick={() => handleAddToCart(params.row)}>
              <FaShoppingCart size={25} color="#023e8a" />
            </button>
          </Tooltip>
          <Tooltip title="Editar" placement="top">
            <button
              type="button"
              onClick={() => navigate(`/editproduct/${params.id}`)}
            >
              <FaEdit size={25} color="#023e8a" />
            </button>
          </Tooltip>
          <Tooltip title="Borrar" placement="top">
            <button
              type="button"
              onClick={() => handleDeleteProduct(params.id)}
            >
              <FaTrash size={25} color="#023e8a" />
            </button>
          </Tooltip>
        </Stack>
      ),
    },
  ];

  const handleAddToCart = (p) => {
    addProductToCart(p);
  };

  const handleDeleteProduct = (productId) => {
    setIsDeleteDialogOpen(true);
    setIdToDelete(productId);
  };

  const handleDeleteProductById = (productId) => {
    delRequest.call(`http://localhost:8080/api/producto/${productId}`);
  };

  const handlePageChange = (page) => {
    setPageStatus({ ...pageStatus, page: page });
  };

  const handlePageSizeChange = (pageSize) => {
    setPageStatus({ ...pageStatus, pageSize: pageSize });
  };

  useEffect(() => {
    if (data?.length > 0) {
      setProducts(data);
    }
  }, [data]);

  useEffect(() => {
    if (delRequest.data) {
      setProducts((oldProducts) =>
        oldProducts.filter((p) => p.id !== delRequest.data)
      );
    }
  }, [delRequest.data]);

  useEffect(() => {
    const count = countRequest.data;
    if (count !== pageStatus.totalCount) {
      setPageStatus((prevPageStatus) => {
        return { ...prevPageStatus, totalCount: count };
      });
    }
  }, [countRequest.data, pageStatus.totalCount]);

  if (sending) {
    return (
      <div className="flex items-center justify-center">
        <CircularProgress />
      </div>
    );
  } else if (error) {
    return (
      <div className="flex items-center justify-center">
        <p className="text-red-700 font-bold">{error}</p>
      </div>
    );
  } else {
    return (
      <div className="w-full h-96 px-10 flex items-center justify-center">
        <DeleteDialog
          open={isDeleteDialogOpen}
          setOpen={setIsDeleteDialogOpen}
          id={idToDelete}
          handleDelete={handleDeleteProductById}
        />
        <DataGrid
          loading={sending}
          pagination
          rows={products}
          columns={columns}
          pageSize={5}
          page={pageStatus.page}
          rowCount={pageStatus.totalCount}
          rowsPerPageOptions={[5]}
          paginationMode="server"
          onPageChange={handlePageChange}
          onPageSizeChange={handlePageSizeChange}
        />
      </div>
    );
  }
};

export default ProductList;
