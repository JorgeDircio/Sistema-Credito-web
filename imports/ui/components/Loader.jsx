import React from 'react';
import LinearProgress from '@mui/material/LinearProgress';
import Box from '@mui/material/Box';

export default function Loader({size}) {
  return (
    <>
      <Box sx={{ width: `${size}%` }}>
        <LinearProgress />
      </Box>
    </>
  )
}
