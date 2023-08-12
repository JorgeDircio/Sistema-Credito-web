import React from 'react'
import { useNavigate } from 'react-router';
import { TextField, Button, Box, Typography, IconButton  } from '@mui/material'
import ContactMail from '@mui/icons-material/ContactMail';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import InputAdornment from '@mui/material/InputAdornment';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import AuthLayout from '../../layout/AuthLayout';


const formStyles = {
  display: 'flex',
  flexDirection: 'column',
  gap: '24px', // Ajusta el espacio entre los elementos
};

export default function ForgotPassword() {
  const [isLoggedIn, setIsLoggedIn] = React.useState(false);

  const navigate = useNavigate();

  // Definir el esquema de validación con Yup
  const validationSchema = Yup.object({
    email: Yup.string().email('Ingrese un email válido').required('El email es requerido'),
  });

  // Función para manejar el envío del formulario
  const handleSubmit = (values, { setStatus }) => {
    // Lógica para enviar los datos del formulario
    if (values.email !== 'test@test.com' || values.password !== '123') {
      setStatus('Datos incorrectos, por favor intente de nuevo.');

    }
    if (values.email === 'test@test.com' && values.password === '123') {
      navigate("/dashboard");
    }
  };

  return (
    <>
      <Box display='flex' mb={3}>
        <IconButton onClick={() => history.back()}>
          <ArrowBackIcon />
        </IconButton>
        <Typography ml={2} variant="h5" align="center">
          Recuperar contraseña
        </Typography>
      </Box>
      <Formik
        initialValues={{
          email: '',
        }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ }) => (
          <Form style={formStyles} sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <Field
              name="email"
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Email"
                  variant="outlined"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <ContactMail />
                      </InputAdornment>
                    ),
                  }}
                />
              )}
            />
            <ErrorMessage name="email" component="div" style={{ color: 'red' }} />

            <Button type="submit" variant="contained" color="primary">
              Recuperar Contraseña
            </Button>
          </Form>
        )}

      </Formik>
    </>
  )
}