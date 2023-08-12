import React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import DeleteIcon from '@mui/icons-material/Delete';

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


export default function ModalRemove({openModal, typeElement, nameElement}) {
  const [isOpen, setIsOpen] = React.useState(openModal);
  const handleClose = () => setIsOpen(false);
  const message = () => {
    if (typeElement === 'usuario' || typeElement === 'cobrador' || typeElement === 'cliente') {
      return `¿Estas seguro que deseas eliminar al ${typeElement} `;
    }
    if (typeElement === 'credito' || typeElement === 'pago') {
      return `¿Estas seguro que deseas eliminar el ${typeElement} `;
    }
  };

  return (
    <>
      <Modal
        open={isOpen}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Eliminar {typeElement}
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            {message() + ' ' + nameElement} ?
          </Typography>
          <Box mt={2} sx={{ display: 'flex', justifyContent: 'flex-end' }}>
          <Button onClick={handleClose}>Cancelar</Button>
          <Button startIcon={<DeleteIcon />} variant="contained" color="error" onClick={handleClose}>Aceptar</Button>
          </Box>
        </Box>
      </Modal>
    </>
  )
}
