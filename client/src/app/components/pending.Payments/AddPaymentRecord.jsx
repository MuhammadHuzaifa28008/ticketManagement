import React, { useEffect, useState } from 'react';
import { Grid, Typography, TextField, Button, MenuItem, CircularProgress } from '@mui/material';
import useApiCall from '../../hooks/useApiCall';
import CustomSnackbar from '../common/FeedBack/SnackBar';
import LoadingBackdrop from '../common/FeedBack/LoadingBackDrop';




function AddPaymentRecord({ customerData, setCustomer, paymentMethods, refreshCustomer }) {
  const [paymentAmount, setPaymentAmount] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('');
  const [snackbarMessage, setSnackbarMessage] = useState('')
  const [errors, setErrors] = useState({ amt: '', method: '' });
  const { makeApiCall, data, error, loading } = useApiCall();
  const [openBD, setOpenBD] =  useState(false)
useEffect(()=>{
refreshCustomer(false)
},[])

useEffect(()=>{
if(loading) setOpenBD(true)
if (error) setSnackbarMessage('unable to save payment'); setOpenBD(false)
if (data) {
  setOpenBD(false)
  setPaymentAmount('');
  setPaymentMethod('');
  setSnackbarMessage('data saved successfully')
  // console.log(data)
  // refreshCustomer(true);
  refreshCustomer(true)
  setCustomer(data)
}
},[data, error, loading])



  const handleInputChangeWithValidation = (e) => {
    const { name, value } = e.target;
  
    // Check if the value is a valid number
    const numericValue = Math.round(parseFloat(value));
  
    if (name === 'amt') {
      const dueAmount = Math.round(customerData.paymentInfo.dueAmount);
  
      // Check if the value is a valid number and not an empty string
      if (isNaN(numericValue) || value.trim() === '' || !/^\d+(\.\d+)?$/.test(value)) {
        setErrors((prevErrors) => ({
          ...prevErrors,
          amt: 'Please enter a valid amount',
        }));
      } else if (numericValue > dueAmount) {
        setErrors((prevErrors) => ({
          ...prevErrors,
          amt: `Amount cannot be more than RS ${dueAmount}`,
        }));
      } else if (numericValue <= 0) {
        setErrors((prevErrors) => ({
          ...prevErrors,
          amt: 'Amount must be greater than zero',
        }));
      } else {
        setErrors((prevErrors) => ({
          ...prevErrors,
          amt: '',
        }));
      }
    }
  
    setPaymentAmount(Math.round(value));
  };
  

  const handleMethodChange = (e) => {
    setPaymentMethod(e.target.value);
    if (!e.target.value) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        method: 'Payment method is required',
      }));
    } else {
      setErrors((prevErrors) => ({
        ...prevErrors,
        method: '',
      }));
    }
  };

  const handleSubmitPayment = async () => {
    // console.log('submit fn called')
    if(loading) {console.log('loading prev req....');  return}
    if (paymentAmount && paymentMethod && !errors.amt && !errors.method) {
      await makeApiCall(`http://localhost:5000/customer/${customerData._id}/paymentrecords`, {
        method: 'post',
        data: { amt: paymentAmount, method: paymentMethod },
      });
    } else {
      // console.log('we are in else block')
      if (!paymentAmount) {
        setErrors((prevErrors) => ({
          ...prevErrors,
          amt: 'Payment amount is required',
        }));
      }
      if (!paymentMethod) {
        setErrors((prevErrors) => ({
          ...prevErrors,
          method: 'Payment method is required',
        }));
      }

      if (error) setSnackbarMessage('could not save data')
    }
  };

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Typography variant="h4">Add Payment Record</Typography>
      </Grid>
      <Grid item xs={12} sm={6}>
        <TextField
          required
          label="Amount"
          name="amt"
          type="text"
          fullWidth
          value={paymentAmount}
          onChange={handleInputChangeWithValidation}
          sx={{ mb: 2 }}
          inputProps={{ maxLength: 10, min: 5}}
          error={!!errors.amt}
          helperText={errors.amt}
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <TextField
          label="Payment Method"
          select
          value={paymentMethod}
          onChange={handleMethodChange}
          fullWidth
          margin="normal"
          error={!!errors.method}
          helperText={errors.method}
        >
          {paymentMethods.map((method, index) => (
            <MenuItem key={index} value={method}>
              {method}
            </MenuItem>
          ))}
        </TextField>
      </Grid>
      <Grid item xs={12}>
        <Grid container justifyContent="flex-end" spacing={2}>
          <Grid item>
            <Button
              variant="contained"
              color="primary"
              onClick={handleSubmitPayment}
              disabled={loading || !!errors.amt || !!errors.method}
            >
              {loading ? <CircularProgress sx={{color:'white'}} size={24} /> : 'Save'}
            </Button>
          </Grid>
        </Grid>
      </Grid>
          <LoadingBackdrop open={openBD} />
      <CustomSnackbar
      openSB={!!snackbarMessage}
      message={snackbarMessage}
      severity={data?"success": "error"}
      onCloseSB={()=> setSnackbarMessage('')}
      />
    </Grid>
  );
}

export default AddPaymentRecord;
