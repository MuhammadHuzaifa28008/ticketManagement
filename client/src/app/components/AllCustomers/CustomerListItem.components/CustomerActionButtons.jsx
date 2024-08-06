import React from 'react';
import { Stack, IconButton } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { Link } from 'react-router-dom';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

const CustomerActionButtons = ({ customer, onDeleteClick }) => {
  const theme = useTheme();
  return (
    <Stack direction="row" spacing={1} sx={{ mt: 2, ml: 'auto', justifyContent: 'flex-end' }}>
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
  );
};

export default CustomerActionButtons;
