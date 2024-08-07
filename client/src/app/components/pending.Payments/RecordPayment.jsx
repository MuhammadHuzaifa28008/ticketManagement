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
import { useAppContext } from '../../context/AppContext';



const RecordPayment = () => {
  const theme = useTheme();
  const { id } = useParams();
  const [fetchCustomer, setfechtCustomer]  = useState(false)
  const { makeApiCall, data, error, loading } = useApiCall();
  const [paymentAmount, setPaymentAmount] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('');
  const [paymentMethods] = useState(['Cash', 'Credit Card', 'Bank Transfer', 'EasyPaisa', 'JazzCash', 'SadaPay']);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [checked, setChecked] = useState(false);
const {setFetch} = useAppContext()


useEffect(()=>{
  const fetchUserData = async () => {
    await makeApiCall(`http://localhost:5000/customer/${id}`, {
      method: 'get'
    });
  };
  fetchUserData()
  setChecked(true);
},[])



  useEffect(() => {
    const fetchUserData = async () => {
      await makeApiCall(`http://localhost:5000/customer/${id}`, {
        method: 'get'
      });
    };
    if(fetchCustomer) {
      setFetch(true)
      fetchUserData();
    }
    setfechtCustomer(false)
  }, [fetchCustomer]);


  useEffect(() => {
    if (error) {
      setSnackbarMessage(error.error);
    }
  }, [error]);

  const handlePaymentSubmit = () => {
    if (parseFloat(paymentAmount) > parseFloat(data.paymentInfo.dueAmount)) {
      setSnackbarMessage('Amount cannot exceed due amount');
      return;
    }

    // Submit payment logic here

    // On success
    setSnackbarMessage('Payment recorded successfully');
    

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
              paymentMethods={paymentMethods}
              refreshCustomer={setfechtCustomer}
            />
          </Grid>
        </Grid>
        <Grid item>
          <Button variant="outlined" color="secondary" onClick={handleCancel}>
          Go Back
              </Button>
          </Grid>  
      {data.paymentInfo.paymentRecords.length > 0 && (
        <Grid Container >
          < Grid item>
          <PaymentRecords paymentRecords={data.paymentInfo.paymentRecords} />
          </ Grid>
        </Grid>
      )}

      <CustomSnackbar
        message={snackbarMessage}
        openSB={!!snackbarMessage}
        onCloseSB={() => setSnackbarMessage('')}
        severity={error ? "error": 'success'}
      />
      </Paper>
    </Fade>
  );
};

export default RecordPayment;