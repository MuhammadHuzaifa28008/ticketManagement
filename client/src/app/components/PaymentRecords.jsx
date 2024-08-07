import React from 'react';
import { Typography, Box, Card, CardContent, useTheme, Grid } from '@mui/material';
5



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
      }}
    >
      <CardContent>
        <Grid container spacing={2} direction={{ xs: 'column', sm: 'row' }}>
          <Grid item xs={12} sm={4} textAlign="center">
            <Typography variant="h4">RS {paymentRecord.amt.toFixed(2)}</Typography>
          </Grid>
          <Grid item xs={12} sm={4} textAlign="center">
            <Typography variant="h4">{paymentRecord.method}</Typography>
          </Grid>
          <Grid item xs={12} sm={4} textAlign="center">
            <Typography variant="h4">{formatDateReadable(paymentRecord.date)}</Typography>
          </Grid>
        </Grid>
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
