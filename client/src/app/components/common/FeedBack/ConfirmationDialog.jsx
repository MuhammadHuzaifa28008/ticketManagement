import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
} from '@mui/material';

const ConfirmationDialog = ({ open, onClose, onConfirm, dueAmount }) => (
  <Dialog
    open={open}
    onClose={onClose}
    aria-labelledby="confirmation-dialog-title"
    aria-describedby="confirmation-dialog-description"
  >
    <DialogTitle id="confirmation-dialog-title">Delete Customer</DialogTitle>
    <DialogContent>
      <DialogContentText id="confirmation-dialog-description">
        This customer has a due amount of {dueAmount}. Are you sure you want to proceed with deletion?
      </DialogContentText>
    </DialogContent>
    <DialogActions>
      <Button onClick={onClose} color="primary">
        Cancel
      </Button>
      <Button onClick={onConfirm} color="primary" autoFocus>
        Confirm
      </Button>
    </DialogActions>
  </Dialog>
);

export default ConfirmationDialog;
