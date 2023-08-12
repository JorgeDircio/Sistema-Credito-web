import React from 'react'
import { useNavigate } from 'react-router';
import { TextField, Button, Box, Typography } from '@mui/material'
import Key from '@mui/icons-material/Key';
import InputAdornment from '@mui/material/InputAdornment';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import AuthLayout from '../../layout/AuthLayout';


const formStyles = {
  display: 'flex',
  flexDirection: 'column',
  gap: '24px', // Ajusta el espacio entre los elementos
};

export default function ResetPassword() {
//donde estas sacando el token
//lo escribo en la ruta, ese debe de llegar la url en el correo, para simular, lo escribo directamente
//aqui como lo obtienes de la ruta
//Todavia no lo obtengo, porque no me salia la imagen
  const navigate = useNavigate();

  // Definir el esquema de validación con Yup
  const validationSchema = Yup.object({
    password: Yup.string().required('La contraseña es requerida'),
    confirmPassword: Yup.string().required('La contraseña es requerida'),
  });

  // Función para manejar el envío del formulario
  const handleSubmit = (values, { setStatus }) => {
    // Lógica para enviar los datos del formulario
    if (values.password !== values.confirmPassword) {
      setStatus('Las contraseñas no coinciden');

    }
    if (values.password === values.confirmPassword) {
      navigate("/");
    }
  };

  return (
    <>
      <Box mb={3}>
        <Typography variant="h5" align="center">
          Cambiar contraseña
        </Typography>
      </Box>
      <Formik
        initialValues={{
          password: '',
          confirmPassword: '',
        }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ status }) => (
          <Form style={formStyles} sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <Field
              name="password"
              render={({ field }) => (
                <TextField
                  {...field}
                  type="password"
                  label="Nueva Contraseña"
                  variant="outlined"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Key />
                      </InputAdornment>
                    ),
                  }}
                />
              )}
            />
            <ErrorMessage name="password" component="div" style={{ color: 'red' }} />

            <Field
              name="confirmPassword"
              render={({ field }) => (
                <TextField
                  {...field}
                  type="password"
                  label="Confirmar Contraseña"
                  variant="outlined"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Key />
                      </InputAdornment>
                    ),
                  }}
                />
              )}
            />
            <ErrorMessage name="confirmPassword" component="div" style={{ color: 'red' }} />

            {status && <div style={{ color: 'red' }}>{status}</div>}
            <Button type="submit" variant="contained" color="primary">
              Cambiar
            </Button>
          </Form>
        )}

      </Formik>
    </>
  )
}