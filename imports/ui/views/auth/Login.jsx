import React from 'react'
import { useNavigate } from 'react-router';
import { TextField, Button, Link, Box, Typography } from '@mui/material'
import ContactMail from '@mui/icons-material/ContactMail';
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

 const Login=()=> {
  const [isLoggedIn, setIsLoggedIn] = React.useState(false);

  const navigate = useNavigate();

  // Definir el esquema de validación con Yup
  const validationSchema = Yup.object({
    email: Yup.string().email('Ingrese un email válido').required('El email es requerido'),
    password: Yup.string().required('La contraseña es requerida'),
  });

  // Función para manejar el envío del formulario
  const handleSubmit = (values, { setStatus }) => {
    // Lógica para enviar los datos del formulario
    if (values.email !== 'test@test.com' || values.password !== '123') {
      setStatus('Datos incorrectos, por favor intente de nuevo.');

    }
    if (values.email === 'test@test.com' && values.password === '123') {
      Meteor.call('user.prueba', {name: 'jorge', age: 28},(error, result) => {
        if (error) {
          console.error('Error al llamar al método:', error);
        } else {
          console.log('Resultado de la llamada al endpoint:', result);
        }
      });
    }
  };

  return (
    <>
      <Box mb={3}>
        <Typography variant="h5" align="center">
          Iniciar Sesión
        </Typography>
      </Box>
      <Formik
        initialValues={{
          email: '',
          password: '',
        }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ status }) => (
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

            <Field
              name="password"
              render={({ field }) => (
                <TextField
                  {...field}
                  type="password"
                  label="Contraseña"
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
            {status && <div style={{ color: 'red' }}>{status}</div>}
            <Button type="submit" variant="contained" color="primary">
              Entrar
            </Button>
            <Box display='flex' justifyContent='flex-end'>
              <Link
                underline='hover'
                component="button"
                variant="body2"
                onClick={() => {
                  navigate("/forgot-password");
                }}
              >¿Olvidé mi contraseña?</Link>
            </Box>
          </Form>
        )}

      </Formik>
    </>
  )
}

export default Login