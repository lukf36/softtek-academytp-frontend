import React from 'react';
import Slide from '@mui/material/Slide';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const DeleteDialog = ({ open, setOpen, id, handleDelete }) => {
  const handleNo = () => {
    setOpen(false);
  };

  const handleSi = () => {
    setOpen(false);
    handleDelete(id);
  };

  return (
    <Dialog
      open={open}
      TransitionComponent={Transition}
      keepMounted
      onClose={handleNo}
      aria-describedby="alert-dialog-slide-description"
    >
      <DialogTitle>Estas seguro?</DialogTitle>
      <DialogActions>
        <Button onClick={handleNo}>NO</Button>
        <Button onClick={handleSi}>SI</Button>
      </DialogActions>
    </Dialog>
  );
};

export default DeleteDialog;
