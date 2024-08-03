import React from 'react';
import { ListItemButton, Stack, ListItemAvatar, ListItemText, Avatar, Typography, Box } from '@mui/material';
import MailIcon from '@mui/icons-material/Mail';
import PhoneIcon from '@mui/icons-material/Phone';
import PaymentIcon from '@mui/icons-material/Payment';
import { useTheme } from '@mui/material/styles';

const CustomerListItem = ({ customer }) => {
  const theme = useTheme();

  return (
    <ListItemButton
      sx={{
        ...theme.components.MuiCard?.styleOverrides?.root,
        marginBottom: '10px',
        // width: '100%', // Make the width responsive
        width: '40rem',
        display: 'flex',
        flexDirection: 'column',
        padding: '16px',
        borderRadius: theme.shape.borderRadius, // Use theme border radius if available
      }}
    >
      <Stack direction="row" spacing={2} alignItems="center" justifyContent="space-between">
        <Box sx={{ display: 'flex', alignItems: 'center', flex: 1 }}>
          <ListItemAvatar>
            <Avatar>{customer.customerName[0]}</Avatar>
          </ListItemAvatar>
          <Box sx={{ ml: 2 }}>
            <Typography variant="h6">{customer.customerName}</Typography>
            <Typography variant="body2" color="text.primary" display="flex" alignItems="center">
              <MailIcon sx={{ verticalAlign: 'middle', mr: '5px' }} />
              {customer.email}
            </Typography>
            <Typography variant="body2" color="text.primary" display="flex" alignItems="center">
              <PhoneIcon sx={{ verticalAlign: 'middle', mr: '5px' }} />
              {customer.phoneNumber}
            </Typography>
          </Box>
        </Box>
        <Box sx={{ flex: 1 }}>
          <Typography variant="body2" color="text.primary">
            <PaymentIcon sx={{ verticalAlign: 'middle', mr: 1 }} />
            {customer.paymentInfo.paymentMethod}
          </Typography>
          <Typography>Due Amount: {customer.paymentInfo.dueAmount} RS</Typography>
        </Box>
        <Box sx={{ flex: 1.2 }}>
          <Typography variant="body2">Date of Travel: {customer.ticketInfo.dateOfTraveling}</Typography>
          <Typography variant="body2">Date of Issue: {customer.ticketInfo.dateOfIssue}</Typography>
        </Box>
      </Stack>
    </ListItemButton>
  );
};

export default CustomerListItem;
