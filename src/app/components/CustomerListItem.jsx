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
      <Stack direction="row" spacing={2} alignItems="center" justifyContent="space-between" flex={1}>
        <Box sx={{ display: 'flex', alignItems: 'center', flex: 1 }}>
          <ListItemAvatar>
            <Avatar>{customer.customerName[0]}</Avatar>
          </ListItemAvatar>
          <Box sx={{ ml: 2 }}>
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
        </Box>
        {/* <Box sx={{ flex: 1 }}>
          <Typography variant="body2" color="text.primary">
            <PaymentIcon sx={{ verticalAlign: 'middle', mr: theme.spacing(1) }} />
            {customer.paymentInfo.paymentMethod}
          </Typography>
          <Typography>Due Amount: {customer.paymentInfo.dueAmount} RS</Typography>
        </Box>
        <Box sx={{ flex: 1 }}>
          <Typography variant="body2">Date of Travel: {customer.ticketInfo.dateOfTraveling}</Typography>
          <Typography variant="body2">Date of Issue: {customer.ticketInfo.dateOfIssue}</Typography>
        </Box> */}

        <CustomerDetails customer={ customer} />
      </Stack>
      <Stack direction="row" spacing={1} sx={{ mt: { xs: 2, sm: 0 }, ml: 'auto' }}>
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
