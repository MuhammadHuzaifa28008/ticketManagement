import React from 'react';
import { Typography, Box } from '@mui/material';
import { formatDateReadable } from '../utils/formatDate';
import { Card, CardContent, useTheme } from '@mui/material';

function PaymentRecord({ paymentRecord }) {
  const theme = useTheme();

  return (
    <Card
      variant="outlined"
      sx={{
        mb: 2,
        background: `linear-gradient(45deg, ${theme.palette.primary.main} 30%, ${theme.palette.secondary.main} 90%)`,
        color: theme.palette.common.white,
      }}
    >
      <CardContent>
        <Box display="flex" justifyContent="space-between" mb={1}>
          <Box>
            {/* <Typography variant="h6">Amount</Typography> */}
            <Typography variant="h4">RS {paymentRecord.amt.toFixed(2)}</Typography>
          </Box>
          <Box>
            {/* <Typography variant="h6">Method</Typography> */}
            <Typography variant="h4">{paymentRecord.method}</Typography>
          </Box>
          <Box>
            {/* <Typography variant="h6">Time</Typography> */}
            <Typography variant="h4">{new Date(paymentRecord.time).toLocaleString()}</Typography>
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
}






function PaymentRecords({ paymentRecords }) {
  return (
    <Box sx={{ mt: 2 }}>
      <Typography variant="h5" gutterBottom>
        Payment Records
      </Typography>
      {paymentRecords.map((record, index) => (
        <PaymentRecord key={index} paymentRecord={record} />
      ))}
    </Box>
  );
}

export default PaymentRecords;
