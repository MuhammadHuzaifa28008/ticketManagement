import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import {
  Container,
  Typography,
  Grid,
  Paper,
  useTheme,
  Card,
  CardContent,
  Skeleton,
  Fade,
  Button
} from '@mui/material';
import useApiCall from '../../hooks/useApiCall';
import LoadingBackdrop from '../common/FeedBack/LoadingBackDrop';
import CustomSnackbar from '../common/FeedBack/SnackBar';
import PaymentRecords from '../PaymentRecords';
import AddPaymentRecord from './AddPaymentRecord';

const RecordPayment = () => {
  const theme = useTheme();
  const { id } = useParams();
  const { makeApiCall, data, error, loading } = useApiCall();
  const [paymentAmount, setPaymentAmount] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('');
  const [paymentMethods] = useState(['Cash', 'Credit Card', 'Bank Transfer']); // Static list for demo
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    const fetchUserData = async () => {
      await makeApiCall(`http://localhost:5000/customer/${id}`, {
        method: 'get'
      });
    };
    
    fetchUserData();
  }, [id, makeApiCall]);

  useEffect(()=>{
    setChecked(true);
  },[])

  useEffect(() => {
    if (error) {
      setSnackbarMessage(error.error);
      setSnackbarOpen(true);
    }
  }, [error]);

  const handlePaymentSubmit = () => {
    if (parseFloat(paymentAmount) > parseFloat(data.paymentInfo.dueAmount)) {
      setSnackbarMessage('Amount cannot exceed due amount');
      setSnackbarOpen(true);
      return;
    }

    // Submit payment logic here

    // On success
    setSnackbarMessage('Payment recorded successfully');
    setSnackbarOpen(true);

    // Clear form fields
    setPaymentAmount('');
    setPaymentMethod('');
  };
const handleCancel = ()=>{
  // go back to prev page using react router dom
}
  if (loading || !data) {
    return (
      <Container>
        <Skeleton variant="text" height={40} />
        <Skeleton variant="rectangular" height={200} />
        <Skeleton variant="rectangular" height={200} />
      </Container>
    );
  }

  return (
    <Fade in={checked} timeout={500}>
      <Paper sx={{ maxWidth: '100%', padding: theme.spacing(3) }}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Typography variant="h4" gutterBottom>
              {data.customerName}
            </Typography>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Card variant="outlined" sx={{ bgcolor: 'background.paper', borderColor: 'primary.main' }}>
              <CardContent>
                <Typography variant="h6" color="text.primary">
                  Invoice Amount
                </Typography>
                <Typography variant="h4" color="primary.main">
                  RS {data.paymentInfo.invoiceAmount.toFixed(2)}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Card variant="outlined" sx={{ bgcolor: 'background.paper', borderColor: 'primary.main' }}>
              <CardContent>
                <Typography variant="h6" color="text.primary">
                  Due Amount
                </Typography>
                <Typography variant="h4" color="primary.main">
                  RS {data.paymentInfo.dueAmount.toFixed(2)}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12}>
            <AddPaymentRecord
              customerData={data}
              handleAmountChange={(e) => setPaymentAmount(e.target.value)}
              handleSubmit={handlePaymentSubmit}
              handleCancel={() => {
                setPaymentAmount('');
                setPaymentMethod('');
              }}
              paymentAmount={paymentAmount}
              paymentMethod={paymentMethod}
              paymentMethods={paymentMethods}
              isLoading={loading}
            />
          </Grid>
        </Grid>
        <Grid item>
          <Button variant="outlined" color="secondary" onClick={handleCancel}>
          Go Back
              </Button>
                    </Grid>  
      {data.paymentInfo.paymentRecords.length > 0 && (
        <Grid Container xs={12}>
          <PaymentRecords paymentRecords={data.paymentInfo.paymentRecords} />
        </Grid>
      )}

      <CustomSnackbar
        open={snackbarOpen}
        message={snackbarMessage}
        onClose={() => setSnackbarOpen(false)}
      />
      </Paper>
    </Fade>
  );
};

export default RecordPayment;
