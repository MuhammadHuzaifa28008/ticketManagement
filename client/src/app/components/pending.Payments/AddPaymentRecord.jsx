import React, { useState } from 'react';
import { Grid, Typography, TextField, Button, MenuItem, CircularProgress } from '@mui/material';
import useApiCall from '../../hooks/useApiCall';

function AddPaymentRecord({ customerData, paymentMethods, refreshCustomer }) {
  const [paymentAmount, setPaymentAmount] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('');
  const [errors, setErrors] = useState({ amt: '', method: '' });
  const { makeApiCall, data, loading } = useApiCall();

  const handleInputChangeWithValidation = (e) => {
    const { name, value } = e.target;
    if (name === 'amt') {
      const dueAmount = customerData.paymentInfo.dueAmount;
      if (parseFloat(value) > dueAmount) {
        setErrors((prevErrors) => ({
          ...prevErrors,
          amt: `Amount cannot be more than RS ${dueAmount}`,
        }));
      } else {
        setErrors((prevErrors) => ({
          ...prevErrors,
          amt: '',
        }));
      }
    }
    setPaymentAmount(value);
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
    if (paymentAmount && paymentMethod && !errors.amt && !errors.method) {
      await makeApiCall(`http://localhost:5000/customer/${customerData._id}/paymentrecords`, {
        method: 'post',
        data: { amount: paymentAmount, method: paymentMethod },
      });

      if (data) {
        refreshCustomer(true);
        setPaymentAmount('');
        setPaymentMethod('');
      }
    } else {
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
          type="number"
          fullWidth
          value={paymentAmount}
          onChange={handleInputChangeWithValidation}
          sx={{ mb: 2 }}
          inputProps={{ maxLength: 10, min: 0 }}
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
              {loading ? <CircularProgress size={24} /> : 'Save'}
            </Button>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}

export default AddPaymentRecord;
