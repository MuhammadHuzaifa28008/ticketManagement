import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {
  Box,
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
  const [customer, setCustomer] = useState(null)
  const [fetchCustomer, setFetchCustomer]  = useState(false)
  const { makeApiCall, data, error, loading } = useApiCall();
  const [paymentAmount, setPaymentAmount] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('');
  const [paymentMethods] = useState(['Cash', 'Credit Card', 'Bank Transfer', 'EasyPaisa', 'JazzCash', 'SadaPay']);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [checked, setChecked] = useState(false);
const {allCustomers, setFetch} = useAppContext()
const navigate = useNavigate()


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

    if(fetchCustomer){
      // console.log('fetch customer was set to true')
      fetchUserData()
      setFetch(true) 
      setChecked(false); // show loading
      setFetchCustomer(false)
    }
  }, [fetchCustomer]);


  useEffect(() => {
    if (error)  console.log(error.error);
    if (data) {
      setChecked(true)
      setCustomer(data)
    }
    if (loading) setChecked(false)
  }, [error, loading,  data]);
  
  useEffect(()=>{
    if(customer) {
      // console.log('updating customer')
      // console.log(customer.paymentInfo.paymentRecords.length); 
      setChecked(true)
    }
      if(!customer) setChecked(false)
  },[fetchCustomer])




const handleCancel = ()=>{
  // go back to prev page using react router dom
  if (!loading) navigate(-1)
}
  if (loading || !customer) {
    return (
      <Box>
        <Skeleton variant="text" height={40} />
        <Skeleton variant="rectangular" height={200} />
        <Skeleton variant="rectangular" height={200} />
      </Box>
    );
}

  return (
    <Fade in={checked} timeout={500}>
      <Paper sx={{ maxWidth: '100%', padding: theme.spacing(3) }}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Typography variant="h4" gutterBottom>
              {customer.customerName}
            </Typography>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Card variant="outlined" sx={{ bgcolor: 'background.paper', borderColor: 'primary.main' }}>
              <CardContent>
                <Typography variant="h6" color="text.primary">
                  Invoice Amount
                </Typography>
                <Typography variant="h4" color="primary.main">
                  RS {customer.paymentInfo.invoiceAmount.toFixed(2)}
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
              customerData={customer}
              paymentMethods={paymentMethods}
              refreshCustomer={setFetchCustomer}
              setCustomer = {setCustomer}
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
          <PaymentRecords paymentRecords={customer.paymentInfo.paymentRecords} />
          </ Grid>
        </Grid>
      )}

      {/* <CustomSnackbar
        message={snackbarMessage}
        openSB={!!snackbarMessage}
        onCloseSB={() => setSnackbarMessage('')}
        severity={error ? "error": 'success'}
      /> */}
      </Paper>
    </Fade>
  );
};

export default RecordPayment;