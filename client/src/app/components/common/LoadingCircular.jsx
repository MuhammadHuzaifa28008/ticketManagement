import React from 'react';
import { CircularProgress, Box } from '@mui/material';

const LoadingCircular = () => (
  <Box display="flex" justifyContent="center" alignItems="center" height="100%">
    <CircularProgress />
  </Box>
);

export default LoadingCircular;
