import React, { useState } from 'react';
import { Stack, IconButton, Dialog, DialogContent, DialogTitle, Button } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { Link } from 'react-router-dom';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import VisibilityIcon from '@mui/icons-material/Visibility';
import DisplayCustomerData from '../../DisplayCustomerData';

const CustomerActionButtons = ({ customer, onDeleteClick }) => {
  const theme = useTheme();
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <Stack direction="row" spacing={1} sx={{ mt: 2, ml: 'auto', justifyContent: 'flex-end' }}>
        <IconButton
          edge="end"
          aria-label="view"
          onClick={handleClickOpen}
          sx={{
            color: theme.palette.info.main,
            '&:hover': {
              backgroundColor: theme.palette.action.hover,
            },
          }}
        >
          <VisibilityIcon />
        </IconButton>
        <Link to='/add-or-edit-customer-data' state={customer}>
          <IconButton
            edge="end"
            aria-label="edit"
            sx={{
              color: theme.palette.text.primary,
              '&:hover': {
                backgroundColor: theme.palette.action.hover,
              },
            }}
          >
            <EditIcon />
          </IconButton>
        </Link>
        <IconButton
          edge="end"
          aria-label="delete"
          onClick={onDeleteClick}
          sx={{
            color: theme.palette.error.main,
            '&:hover': {
              backgroundColor: theme.palette.error.light,
            },
          }}
        >
          <DeleteIcon />
        </IconButton>
      </Stack>

      {/* Dialog for displaying customer data */}
      <Dialog open={open} onClose={handleClose} maxWidth="md" fullWidth>
        <DialogTitle>Customer Details</DialogTitle>
        <DialogContent>
          <DisplayCustomerData customer={customer} />
          <Button onClick={handleClose} sx={{ mt: 2 }}>
            Close
          </Button>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default CustomerActionButtons;
