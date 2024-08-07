import React from 'react';
import { Typography, Box, Card, CardContent, useTheme } from '@mui/material';

// Function to format date in a readable format
const formatDateReadable = (date) => {
  const options = { year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' };
  return new Date(date).toLocaleDateString(undefined, options);
};

function PaymentRecord({ paymentRecord }) {
  const theme = useTheme();

  return (
    <Card
      variant="outlined"
      sx={{
        mb: 2,
        background: `linear-gradient(45deg, ${theme.palette.primary.main} 30%, ${theme.palette.secondary.main} 90%)`,
        color: theme.palette.common.white,
        '@media (max-width:600px)': {
          flexDirection: 'column',
        }
      }}
    >
      <CardContent>
        <Box 
          display="flex" 
          flexDirection="row" 
          justifyContent="space-between" 
          flexWrap="wrap" 
          mb={1}
        >
          <Box flex={1} textAlign="center">
            {/* <Typography variant="h6">Amount</Typography> */}
            <Typography variant="h4">RS {paymentRecord.amt.toFixed(2)}</Typography>
          </Box>
          <Box flex={1} textAlign="center">
            {/* <Typography variant="h6">Method</Typography> */}
            <Typography variant="h4">{paymentRecord.method}</Typography>
          </Box>
          <Box flex={1} textAlign="center">
            {/* <Typography variant="h6">Time</Typography> */}
            <Typography variant="h4">{formatDateReadable(paymentRecord.date)}</Typography>
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
}

function PaymentRecords({ paymentRecords }) {
  // Sort payment records by date in descending order
  const sortedRecords = [...paymentRecords].sort((a, b) => new Date(b.date) - new Date(a.date));

  return (
    <Box sx={{ mt: 2 }}>
      <Typography variant="h5" gutterBottom>
        Payment Records
      </Typography>
      {sortedRecords.map((record, index) => (
        <PaymentRecord key={index} paymentRecord={record} />
      ))}
    </Box>
  );
}

export default PaymentRecords;
