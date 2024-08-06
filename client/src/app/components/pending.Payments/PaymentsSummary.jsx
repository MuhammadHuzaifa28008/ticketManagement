import React, { useMemo } from 'react';
import { Card, CardContent, Typography, Grid } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { motion } from 'framer-motion';

const PaymentsSummary = ({ customers }) => {
  const theme = useTheme();

  // Calculate total amounts
  const totals = useMemo(() => {
    const totalDue = customers.reduce((acc, customer) => acc + customer.paymentInfo.dueAmount, 0);
    const totalPaid = customers.reduce((acc, customer) => acc + customer.paymentInfo.amountPaid, 0);
    return { totalDue, totalPaid };
  }, [customers]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Card sx={{ mb: 4, mt:2, p: 2, backgroundColor: theme.palette.primary.main, color: theme.palette.common.white }}>
        <CardContent>
          <Typography variant="h5" sx={{ fontWeight: 'bold' }}>
            Payment Summary
          </Typography>
          <Grid container spacing={2} sx={{ mt: 2 }}>
            <Grid item xs={6}>
              <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                Total Due Amount
              </Typography>
              <Typography variant="h4" sx={{ fontWeight: 'bold' }}>
                ${totals.totalDue.toFixed(2)}
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                Total Amount Paid
              </Typography>
              <Typography variant="h4" sx={{ fontWeight: 'bold' }}>
                ${totals.totalPaid.toFixed(2)}
              </Typography>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default PaymentsSummary;
