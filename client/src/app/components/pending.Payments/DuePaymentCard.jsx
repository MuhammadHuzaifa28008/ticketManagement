import React from 'react';
import { Card, CardContent, Typography, Button, Stack, Box, LinearProgress, CircularProgress, Grid } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { useMediaQuery } from '@mui/material';
import { Link } from 'react-router-dom';

const DuePaymentCard = ({ customer }) => {
  const theme = useTheme();
  const isLargeDevice = useMediaQuery(theme.breakpoints.up('md'));

  const paymentStatus = customer.paymentInfo.dueAmount > 0 && customer.paymentInfo.amountPaid === 0 ? 'Pending' : 'Incomplete';
  const progressPercentage = (customer.paymentInfo.amountPaid / customer.paymentInfo.dueAmount) * 100;

  const cardBackground = `linear-gradient(135deg, ${theme.palette.primary.light} 0%, ${theme.palette.primary.main} 100%)`;
  const badgeBackground = paymentStatus === 'Pending'
    ? theme.palette.error.main
    : theme.palette.warning.main;
  const progressBarBackground = theme.palette.info.main;
  const buttonBackground = theme.palette.primary.dark;

  return (
    <Card
      sx={{
        marginBottom: 2,
        background: cardBackground,
        color: theme.palette.common.white,
        borderRadius: theme.shape.borderRadius,
        boxShadow: theme.shadows[4],
        overflow: 'hidden',
        padding: 2,
      }}
    >
      <CardContent>
        <Grid container spacing={3} alignItems="center">
          {/* Customer Name and Status Badge */}
          <Grid item xs={12} md={6}>
            <Stack direction="row" justifyContent="space-between" alignItems="center">
              <Typography variant="h6" sx={{ fontWeight: 'bold', fontSize: isLargeDevice ? '2rem' : '1.5rem' }}>
                {customer.customerName}
              </Typography>
              <Typography
                variant="h6"
                sx={{
                  fontWeight: 'bold',
                  backgroundColor: badgeBackground,
                  color: theme.palette.common.white,
                  padding: '6px 14px',
                  borderRadius: '12px',
                  textAlign: 'center',
                }}
              >
                {paymentStatus}
              </Typography>
            </Stack>
          </Grid>

          {/* Invoice Amount */}
          <Grid item xs={12} md={6}>
            <Card
              variant="outlined"
              sx={{
                bgcolor: 'background.paper',
                borderColor: 'primary.main',
                boxShadow: theme.shadows[2],
                padding: 2,
                textAlign: 'center',
              }}
            >
              <Typography variant="h6" color="text.primary">
                Invoice Amount
              </Typography>
              <Typography variant="h4" color="primary.main">
                RS {customer.paymentInfo.invoiceAmount.toFixed(2)}
              </Typography>
            </Card>
          </Grid>

          {/* Amount Paid and Progress Indicator */}
          <Grid item xs={12} md={6}>
            <Box sx={{ position: 'relative', display: 'inline-flex', width: '100%', justifyContent: 'center', alignItems: 'center' }}>
              <CircularProgress
                variant="determinate"
                value={progressPercentage}
                size={isLargeDevice ? 100 : 80}
                thickness={4}
                sx={{
                  color: progressBarBackground,
                }}
              />
              <Box
                sx={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: '100%',
                  height: '100%',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                <Typography variant="body2" sx={{ color: theme.palette.common.white, fontWeight: 'bold' }}>
                  RS {customer.paymentInfo.amountPaid.toFixed(2)}
                </Typography>
              </Box>
            </Box>
          </Grid>

          {/* Record Payment Button */}
          <Grid item xs={12} md={6} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <Link to={`/recordPayment/${customer._id}`} style={{ textDecoration: 'none', width: '100%' }}>
              <Button
                variant="contained"
                sx={{
                  width: isLargeDevice ? '50%' : '100%',
                  fontSize: isLargeDevice ? '1.2rem' : '1rem',
                  padding: isLargeDevice ? '10px 20px' : '8px 16px',
                  backgroundColor: buttonBackground,
                  '&:hover': {
                    backgroundColor: theme.palette.primary.main,
                  },
                }}
              >
                RS {customer.paymentInfo.dueAmount.toFixed(2)}
                <Typography sx={{ marginLeft: 1 }}>Record Payment</Typography>
              </Button>
            </Link>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

export default DuePaymentCard;
