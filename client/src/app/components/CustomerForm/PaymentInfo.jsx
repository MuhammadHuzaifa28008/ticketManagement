import React from 'react';
import { Card, CardContent, Typography, Button, Stack, Box, LinearProgress, CircularProgress } from '@mui/material';
import { useTheme, useMediaQuery } from '@mui/material/styles';
import { Link } from 'react-router-dom';

const DuePaymentCard = ({ customer }) => {
  const theme = useTheme();
  const isLargeDevice = useMediaQuery(theme.breakpoints.up('md'));
  
  const paymentStatus = customer.paymentInfo.dueAmount > 0 && customer.paymentInfo.amountPaid === 0 ? 'Pending' : 'Incomplete';

  // Compute the percentage of amount paid to due amount
  const progressPercentage = (customer.paymentInfo.amountPaid / customer.paymentInfo.dueAmount) * 100;

  const cardBackground = `linear-gradient(135deg, ${theme.palette.primary.light} 0%, ${theme.palette.primary.main} 100%)`;
  const badgeBackground = paymentStatus === 'Pending'
    ? theme.palette.error.main
    : theme.palette.warning.main;
  const progressBarBackground = theme.palette.info.main;
  const buttonBackground = theme.palette.primary.main;
  const buttonHoverBackground = theme.palette.primary.dark;

  return (
    <Card
      sx={{
        marginBottom: 2,
        background: cardBackground,
        color: theme.palette.common.white,
        borderRadius: theme.shape.borderRadius,
        boxShadow: theme.shadows[4],
        overflow: 'hidden',
        textAlign: 'center',
        padding: 2,
      }}
    >
      <CardContent>
        <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 2 }}>
          <Typography variant="h6" sx={{ fontWeight: 'bold', fontSize: '1.5rem' }}>
            {customer.customerName}
          </Typography>
          <Typography
            variant="h6"
            sx={{
              fontWeight: 'bold',
              backgroundColor: badgeBackground,
              color: theme.palette.common.white,
              padding: '4px 12px',
              borderRadius: '12px',
              textAlign: 'center',
            }}
          >
            {paymentStatus}
          </Typography>
        </Stack>
        
        <Box sx={{ mb: 2, display: 'flex', flexDirection: isLargeDevice ? 'row' : 'column', alignItems: 'center', justifyContent: 'center' }}>
          {isLargeDevice ? (
            <Box sx={{ position: 'relative', width: 100, height: 100, mb: isLargeDevice ? 0 : 2 }}>
              <CircularProgress
                variant="determinate"
                value={progressPercentage}
                sx={{
                  color: progressBarBackground,
                  position: 'absolute',
                  top: 0,
                  left: 0,
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
                  ${customer.paymentInfo.amountPaid.toFixed(2)}
                </Typography>
              </Box>
            </Box>
          ) : (
            <Box sx={{ width: '100%' }}>
              <Typography variant="h6" sx={{ mb: 1 }}>
                Amount Paid
              </Typography>
              <LinearProgress
                variant="determinate"
                value={progressPercentage}
                sx={{
                  height: 20,
                  borderRadius: 10,
                  backgroundColor: theme.palette.grey[200],
                  '& .MuiLinearProgress-bar': {
                    backgroundColor: progressBarBackground,
                  },
                }}
              />
              <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', color: theme.palette.common.white, fontWeight: 'bold', mt: -2 }}>
                <Typography variant="body2">
                  ${customer.paymentInfo.amountPaid.toFixed(2)}
                </Typography>
              </Box>
            </Box>
          )}

          <Box
            sx={{
              display: 'flex',
              flexDirection: isLargeDevice ? 'column' : 'row',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 2,
              mt: 2,
              width: '100%',
            }}
          >
            <Card
              sx={{
                bgcolor: 'background.paper',
                borderColor: 'primary.main',
                border: 1,
                borderRadius: 2,
                p: 2,
                width: isLargeDevice ? '200px' : '100%',
                boxShadow: theme.shadows[3],
              }}
            >
              <CardContent>
                <Link to={`/recordPayment/${customer._id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                  <Button
                    variant="contained"
                    color="primary"
                    sx={{
                      width: '100%',
                      fontSize: '1.2rem',
                      borderRadius: 2,
                      background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.primary.dark} 100%)`,
                      boxShadow: theme.shadows[4],
                      '&:hover': {
                        background: `linear-gradient(135deg, ${theme.palette.primary.dark} 0%, ${theme.palette.primary.main} 100%)`,
                        boxShadow: theme.shadows[6],
                      },
                      transition: 'background 0.3s, box-shadow 0.3s',
                    }}
                  >
                    ${customer.paymentInfo.dueAmount.toFixed(2)}
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
};

export default DuePaymentCard;
