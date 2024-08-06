import React from 'react';
import { Snackbar, Button, IconButton, useTheme } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

export default function CustomSnackbar({ onCloseSB, onUNDO, openSB, severity, message }) {
  const theme = useTheme();

  // Determine the background color based on the severity
  const getBackgroundColor = (severity) => {
    switch (severity) {
      case 'success':
        return theme.palette.success.main;
      case 'error':
        return theme.palette.error.main;
      case 'warning':
        return theme.palette.warning.main;
      case 'info':
      default:
        return theme.palette.info.main;
    }
  };

  return (
    <Snackbar
      open={openSB}
      autoHideDuration={6000}
      onClose={onCloseSB}
      message={message}
      action={
        <>
          <Button color="inherit" size="small" onClick={onUNDO}>
            UNDO
          </Button>
          <IconButton
            size="small"
            aria-label="close"
            color="inherit"
            onClick={onCloseSB}
          >
            <CloseIcon fontSize="small" />
          </IconButton>
        </>
      }
      ContentProps={{
        sx: {
          backgroundColor: getBackgroundColor(severity),
          color: theme.palette.common.white,
        },
      }}
    />
  );
}
