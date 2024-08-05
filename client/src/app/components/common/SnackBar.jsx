import React from 'react';
import { Snackbar, Alert } from '@mui/material';

const SnackBar = ({ message, open, onClose }) => (
  <Snackbar open={open} autoHideDuration={6000} onClose={onClose}>
    <Alert onClose={onClose} severity={message.includes('success') ? 'success' : 'error'}>
      {message}
    </Alert>
  </Snackbar>
);

export default SnackBar;
