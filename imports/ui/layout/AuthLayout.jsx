import React from 'react'
import { Outlet } from 'react-router';
import { Grid, Paper } from '@mui/material'
import {useNavigate} from "react-router-dom"

const styles = {
  backgroundImage: 'url("./images/fondo.jpg")',
  backgroundSize: 'cover',
  backgroundRepeat: 'no-repeat',
  backgroundPosition: 'center',
  height: '100vh',
};
const rootStyles = {
  height: '100vh',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
};

const paperStyles = {
  padding: '32px',
  maxWidth: 500,
  width: '90%',
};
//trata de usar funciones fechas
export default function AuthLayout() {
  return (
    <Grid container>
      <Grid item md={6} xs={12} style={{ ...styles }}></Grid>
      <Grid item md={6} xs={12}>
        <Grid container style={rootStyles}>
          <Paper elevation={3} style={paperStyles}>
            <Outlet />
          </Paper>
        </Grid>
      </Grid>
    </Grid>
  );
}
