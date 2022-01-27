import React, { useEffect } from 'react';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Typography from '@mui/material/Typography';
import { useAppContext } from '../../context/useAppContext';
import { FaTrash } from 'react-icons/fa';
import { Stack } from '@mui/material';
import { Button } from '@mui/material';
import useFetchPost from '../../hooks/useFetchPost';
import { useNavigate } from 'react-router-dom';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

const Cart = () => {
  let navigate = useNavigate();

  const { data, call } = useFetchPost(
    'http://localhost:8080/api/orden/generarorden'
  );

  const {
    closeCartModal,
    isCartModalOpen,
    productsInCart,
    removeProuctFromCart,
    user,
    clearCart,
  } = useAppContext();

  const handleSendOrden = () => {
    const pedidos = productsInCart.map((p) => {
      return {
        idProdicto: p.id,
        cantidad: p.cantidad,
      };
    });
    call({ clienteId: user.id, detalles: pedidos });
  };

  useEffect(() => {
    if (data?.id) {
      clearCart();
      navigate('/');
    }
  }, [data, navigate, clearCart]);

  return (
    <Modal
      open={isCartModalOpen}
      onClose={closeCartModal}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 500,
      }}
    >
      <Fade in={isCartModalOpen}>
        <Box sx={style}>
          <Typography
            id="transition-modal-title"
            variant="h6"
            component="h2"
            className="pb-2"
          >
            Detalle del carrito
          </Typography>
          {productsInCart.map((p) => {
            return (
              <div key={p.id} className="flex items-center py-2">
                <p>
                  {p.nombre}, cantidad: {p.cantidad}
                </p>
                <button
                  className="pl-5"
                  type="button"
                  onClick={() => removeProuctFromCart(p)}
                >
                  <FaTrash size={20} color="#023e8a" />
                </button>
              </div>
            );
          })}
          <Stack className="pt-5" direction="row" spacing={2}>
            <Button variant="contained" onClick={handleSendOrden}>
              Enviar compra
            </Button>
            <Button variant="text">Limpiar carrito</Button>
          </Stack>
        </Box>
      </Fade>
    </Modal>
  );
};

export default Cart;
