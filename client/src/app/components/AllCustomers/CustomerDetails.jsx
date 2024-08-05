import React from 'react';
import { Box, Typography, useMediaQuery } from '@mui/material';
import PaymentIcon from '@mui/icons-material/Payment';
import PaidIcon from '@mui/icons-material/Paid';
import FlightIcon from '@mui/icons-material/Flight';
import ConfirmationNumberIcon from '@mui/icons-material/ConfirmationNumber';
import { useTheme } from '@mui/material/styles';
import formatDate from '../../utils/formatDate';

const CustomerDetails = ({ customer }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm')); // Detect if the view is mobile

  // Determine the color and icon based on payment status
  const paymentStatus = customer.paymentInfo.dueAmount > 0 ? 'due' : 'paid';
  const paymentColor = paymentStatus === 'due' ? theme.palette.error.main : theme.palette.success.main;
  const PaymentStatusIcon = paymentStatus === 'due' ? PaymentIcon : PaidIcon;

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: isMobile ? 'column' : 'row', // Stack vertically on mobile
        justifyContent: 'space-between',
        width: '100%',
        ml: isMobile ? '0px': '10px',
        gap: theme.spacing(2), // Add spacing between items
        p: { xs: 2, sm: 1 }, // Add responsive padding
      }}
    >
              <Box sx={{ flex: 1, width: 'auto' }}>
        <Typography
          variant="body2"
          color="text.primary"
          sx={{
            display: 'flex',
            alignItems: 'center',
            mb: isMobile ? 1 : 0, // Margin bottom for mobile
            fontSize: isMobile ? '0.875rem' : '1rem', // Adjust font size for mobile
          }}
        >
          <FlightIcon sx={{ verticalAlign: 'middle', mr: theme.spacing(1), color: theme.palette.info.main }} />
          {formatDate(customer.ticketInfo.dateOfTraveling)}
        </Typography>
        <Typography
          variant="body2"
          color="text.primary"
          sx={{
            display: 'flex',
            alignItems: 'center',
            fontSize: isMobile ? '0.875rem' : '1rem', // Adjust font size for mobile
          }}
        >
          <ConfirmationNumberIcon sx={{ verticalAlign: 'middle', mr: theme.spacing(1), color: theme.palette.secondary.main }} />
          {formatDate(customer.ticketInfo.dateOfIssue)}
        </Typography>
      </Box>
      <Box sx={{ flex: 1 }}>
        <Typography
          variant="body2"
          color="text.primary"
          sx={{
            display: 'flex',
            flexDirection: isMobile ? 'row': 'column',
            alignItems: 'center',
            mb: isMobile ? 1 : 0, // Margin bottom for mobile
            fontSize: isMobile ? '0.875rem' : '1rem', // Adjust font size for mobile
          }}
        >
          <PaymentStatusIcon sx={{ verticalAlign: 'middle', mr: theme.spacing(1), color: paymentColor }} />
          <span style={{ color: paymentColor }}>
            {paymentStatus === 'due' ? (<>{customer.paymentInfo.dueAmount} RS </>):(<>{customer.paymentInfo.invoiceAmount} RS</>)}
          </span>
        </Typography>
      </Box>

    </Box>
  );
};

export default CustomerDetails;
