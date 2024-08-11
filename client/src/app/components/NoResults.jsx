import React from 'react';
import { Typography } from '@mui/material';

const NoResults = ({query}) => (
  <>
  query?(
  <Typography variant="body1" sx={{ padding: '16px' }}>
    No user found.
  </Typography>):(
  <Typography variant="body1" sx={{ padding: '16px' }}>
    please insert user data
  </Typography>)
  </>
);

export default NoResults;
