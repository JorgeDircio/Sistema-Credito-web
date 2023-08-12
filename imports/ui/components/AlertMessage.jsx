import React from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Alert from '@mui/material/Alert';
import IconButton from '@mui/material/IconButton';
import Collapse from '@mui/material/Collapse';
import Button from '@mui/material/Button';
import CloseIcon from '@mui/icons-material/Close';
import AlertTitle from '@mui/material/AlertTitle';

export default function AlertMessage({type, text, title, size, timeOut}) {
  const [open, setOpen] = React.useState(true);

  const openTime = () => {
    setTimeout(() => {
      setOpen(false);
    }, timeOut);
  };

  React.useEffect(() => {
    openTime();
  }, []);


  return (
    <Box sx={{ width: `${size}%` }}>
      <Collapse in={open}>
        <Alert
          severity={type}
          action={
            <IconButton
              aria-label="close"
              color="inherit"
              size="small"
              onClick={() => {
                setOpen(false);
              }}
            >
              <CloseIcon fontSize="inherit" />
            </IconButton>
          }
          sx={{ mb: 2 }}
        >
          <AlertTitle>{title}</AlertTitle>
          {text}
        </Alert>
      </Collapse>
    </Box>
  );
}

AlertMessage.defaultProps = {
  type: 'success',
  text: '',
  title: '',
  size: '50%',
  timeOut: 3000,
}

AlertMessage.propTypes = {
  type: PropTypes.string,
  text: PropTypes.string,
  title: PropTypes.string,
  size: PropTypes.string,
  timeOut: PropTypes.number,
}
