import React from 'react';
import { Backdrop, CircularProgress } from '@mui/material';

const LoadingBackdrop = ({ open }) => (
  <Backdrop open={open} sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
    <CircularProgress color="inherit" />
  </Backdrop>
);

export default LoadingBackdrop;
