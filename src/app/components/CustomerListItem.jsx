import React from 'react';
import { ListItemButton, Stack, ListItemAvatar, Avatar, Typography, Box, IconButton } from '@mui/material';
import MailIcon from '@mui/icons-material/Mail';
import PhoneIcon from '@mui/icons-material/Phone';
import PaymentIcon from '@mui/icons-material/Payment';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import CustomerDetails from './CustomerDetails';
import { useTheme } from '@mui/material/styles';

const CustomerListItem = ({ customer, onEdit, onDelete }) => {
  const theme = useTheme();

  return (
    <ListItemButton
      sx={{
        backgroundColor: theme.palette.background.paper,
        marginBottom: theme.spacing(2),
        width: '100%',
        maxWidth: '40rem',
        padding: theme.spacing(2),
        borderRadius: theme.shape.borderRadius,
        display: 'flex',
        flexDirection: 'column',
        [theme.breakpoints.up('sm')]: {
          flexDirection: 'row',
        },
      }}
    >
      <Stack direction="row" spacing={2} alignItems="center" flex={1}>
        <ListItemAvatar>
          <Avatar>{customer.customerName[0]}</Avatar>
        </ListItemAvatar>
        <Box sx={{ ml: 2, flex: 1 }}>
          <Typography variant="h6">{customer.customerName}</Typography>
          <Typography variant="body2" color="text.primary" display="flex" alignItems="center">
            <MailIcon sx={{ verticalAlign: 'middle', mr: theme.spacing(1) }} />
            {customer.email}
          </Typography>
          <Typography variant="body2" color="text.primary" display="flex" alignItems="center">
            <PhoneIcon sx={{ verticalAlign: 'middle', mr: theme.spacing(1) }} />
            {customer.phoneNumber}
          </Typography>
        </Box>
      </Stack>

      {/* Customer Details Section */}
      <CustomerDetails customer={customer} />

      {/* Action Buttons */}
      <Stack
        direction="row"
        spacing={1}
        sx={{
          mt: { xs: 2, sm: 0 }, // Margin top for mobile devices
          ml: 'auto', // Align to the right
          [theme.breakpoints.down('sm')]: {
            justifyContent: 'center', // Center the buttons on mobile
            mt: 2,
          },
        }}
      >
        <IconButton
          edge="end"
          aria-label="edit"
          onClick={onEdit}
          sx={{
            color: theme.palette.text.primary,
            '&:hover': {
              backgroundColor: theme.palette.action.hover,
            },
          }}
        >
          <EditIcon />
        </IconButton>
        <IconButton
          edge="end"
          aria-label="delete"
          onClick={onDelete}
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
    </ListItemButton>
  );
};

export default CustomerListItem;
