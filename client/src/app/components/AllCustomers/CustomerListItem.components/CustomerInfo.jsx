import React from 'react';
import { Stack, ListItemAvatar, Avatar, Box, Typography } from '@mui/material';
import ConfirmationNumberIcon from '@mui/icons-material/ConfirmationNumber';
import PhoneIcon from '@mui/icons-material/Phone';

const CustomerInfo = ({ customer }) => (
  <Stack direction="row" spacing={2} alignItems="center">
    <ListItemAvatar>
      <Avatar>{customer.customerName[0]}</Avatar>
    </ListItemAvatar>
    <Box sx={{ flex: 1 }}>
      <Typography variant="h6" noWrap>
        {customer.customerName}
      </Typography>
      <Typography variant="body2" color="text.primary" display="flex" alignItems="center" noWrap>
        <ConfirmationNumberIcon sx={{ verticalAlign: 'middle', mr: 1 }} />
        {customer.ticketInfo.PNRNo}
      </Typography>
      <Typography variant="body2" color="text.primary" display="flex" alignItems="center" noWrap>
        <PhoneIcon sx={{ verticalAlign: 'middle', mr: 1 }} />
        {customer.phoneNumber}
      </Typography>
    </Box>
  </Stack>
);

export default CustomerInfo;
