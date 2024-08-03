import React from 'react';
import { Box, Typography } from '@mui/material';
import PaymentIcon from '@mui/icons-material/Payment';
import PaidIcon from '@mui/icons-material/Paid';
import FlightIcon from '@mui/icons-material/Flight';
import ConfirmationNumberIcon from '@mui/icons-material/ConfirmationNumber';
import { useTheme } from '@mui/material/styles';
import formatDate from '../utils/formatDate'

const CustomerDetails = ({ customer }) => {
  const theme = useTheme();

  // Determine the color and icon based on payment status
  const paymentStatus = customer.paymentInfo.dueAmount > 0 ? 'due' : 'paid';
  const paymentColor = paymentStatus === 'due' ? theme.palette.error.main : theme.palette.success.main;
  const PaymentStatusIcon = paymentStatus === 'due' ? PaymentIcon : PaidIcon;

  return (
    <Box sx={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
      <Box sx={{ flex: 1 }}>
        <Typography variant="body2" color="text.primary" sx={{ display: 'flex', alignItems: 'center' }}>
          <PaymentStatusIcon sx={{ verticalAlign: 'middle', mr: theme.spacing(1), color: paymentColor }} />
          <span style={{ color: paymentColor }}>
            {paymentStatus === 'due' && <>{customer.paymentInfo.dueAmount} RS </>}
          </span>
        </Typography>
      </Box>
      <Box sx={{ flex: 1 }}>
        <Typography variant="body2" color="text.primary" sx={{ display: 'flex', alignItems: 'center' }}>
          <FlightIcon sx={{ verticalAlign: 'middle', mr: theme.spacing(1), color: theme.palette.info.main }} />
           {formatDate(customer.ticketInfo.dateOfTraveling)}
        </Typography>
        <Typography variant="body2" color="text.primary" sx={{ display: 'flex', alignItems: 'center' }}>
          <ConfirmationNumberIcon sx={{ verticalAlign: 'middle', mr: theme.spacing(1), color: theme.palette.secondary.main }} />
           {formatDate(customer.ticketInfo.dateOfIssue)}
        </Typography>
      </Box>
    </Box>
  );
};

export default CustomerDetails;
