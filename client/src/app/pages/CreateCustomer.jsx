import React, { useEffect, useState } from 'react';
import { Grid, TextField, Button, CircularProgress, Card, CardContent, Typography, Paper } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import DateInput from '../components/common/inputs/DateInput';
import useApiCall from '../hooks/useApiCall';
import CustomSnackbar from '../components/common/FeedBack/SnackBar';
import { validateCustomerInfo } from '../utils/formValidations';
import { calculateInvoiceAmount } from '../utils/paymentCalculations';
import { useAppContext } from '../context/AppContext';




const CreateCustomer = () => {
  const [formData, setFormData] = useState({
    customerName: '',
    email: '',
    phoneNumber: '',
    dob: '',
    PNRNo: '',
    dateOfTraveling: '',
    dateOfIssue: '',
    ticketPrice: 0,
    profit: 0,
    invoiceAmount: 0
  });

  const { data, error, loading, makeApiCall } = useApiCall();
  const [errors, setErrors] = useState({});
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const navigate = useNavigate();
  const {setFetch} = useAppContext()

  useEffect(() => {
    if (data) {
      console.log('Customer saved in DB:', data);
      setSnackbarMessage('Customer added successfully!');
      setFetch(true)
      navigate(-1);
    }
    if(error) console.log(error)
  }, [data]);

  useEffect(() => {
    if (formData.profit !== 0 && formData.ticketPrice !== 0) {
      let newInvoiceAmount = calculateInvoiceAmount(formData.ticketPrice, formData.profit);
      handleChange({ target: { name: 'invoiceAmount', value: newInvoiceAmount } });
    }
  }, [formData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

// useEffect(()=>{

//   console.log(errors)
// },[errors])

  const handleDateChange = (name, value) => {
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const structuredData = {
      customerName: formData.customerName,
      email: formData.email,
      phoneNumber: formData.phoneNumber,
      dob: formData.dob,
      ticketInfo: {
        PNRNo: formData.PNRNo,
        dateOfTraveling: formData.dateOfTraveling,
        dateOfIssue: formData.dateOfIssue,
      },
      paymentInfo: {
        ticketPrice: parseFloat(formData.ticketPrice),
        profit: parseFloat(formData.profit),
        invoiceAmount: parseFloat(formData.invoiceAmount),
        
      }
    };

    try {
      if (validateCustomerInfo(structuredData, setErrors)) {
        console.log('everything valid')
        console.log('structured data:', structuredData)
        await makeApiCall('http://localhost:5000/customer/add', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          data: JSON.stringify(structuredData)
        });
      } else {
        setSnackbarMessage('Please check all input data.');
      }
    } catch (err) {
      console.log(err.message)
      setSnackbarMessage('Failed to add customer. Please try again.');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <Grid padding={10}container spacing={2} sx={{ bgcolor: 'background.paper', borderColor: 'primary.main' }}>

        {/* Customer Info Section */}
        <Grid  item xs={12} md={6}>
          <Paper elevation={3} sx={{ padding: 2, mb: 2 }}>
            <Typography variant="h6" color="text.primary" gutterBottom>Customer Info</Typography>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={12}>
                <TextField
                  fullWidth
                  required
                  label="Customer Name"
                  name="customerName"
                  value={formData.customerName}
                  onChange={handleChange}
                  error={!!errors.customerName}
                  helperText={errors.customerName}
                  sx={{ mb: 2 }}
                  inputProps={{ maxLength: 40 }}
                />
              </Grid>
              <Grid item xs={12} sm={12}>
                <TextField
                  fullWidth
                  label="Email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  sx={{ mb: 2 }}
                  type="email"
                />
              </Grid>
              <Grid item xs={12} sm={12}>
                <TextField
                  fullWidth
                  required
                  label="Phone Number"
                  name="phoneNumber"
                  type="tel"
                  value={formData.phoneNumber}
                  onChange={handleChange}
                  inputProps={{ maxLength: 20 }}
                />
              </Grid>
              <Grid item xs={12} sm={12}>
                <DateInput
                  title="Date of Birth"
                  name="dob"
                  type="date"
                  value={formData.dob}
                  required
                  onChange={handleDateChange}
                  fullWidth
                  error={!!errors.dob}
                  helperText={errors.dob}
                />
              </Grid>
            </Grid>
          </Paper>
        </Grid>

        {/* Ticket Info Section */}
        <Grid item xs={12} md={6}>
          <Paper elevation={3} sx={{ padding: 2, mb: 2 }}>
            <Typography variant="h6" color="text.primary" gutterBottom>Ticket Info</Typography>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={12}>
                <TextField
                  fullWidth
                  required
                  label="PNR No"
                  name="PNRNo"
                  value={formData.PNRNo}
                  onChange={handleChange}
                  inputProps={{ maxLength: 20 }}
                />
              </Grid>
              <Grid item xs={12} sm={12}>
                <DateInput
                  title="Date of Traveling"
                  name="dateOfTraveling"
                  value={formData.dateOfTraveling}
                  onChange={handleDateChange}
                  error={!!errors.dateOfTraveling}
                  helperText={errors.dateOfTraveling}
                  fullWidth
                  required
                />
              </Grid>
              <Grid item xs={12} sm={12}>
                <DateInput
                  fullWidth
                  required
                  title="Date of Issue"
                  name="dateOfIssue"
                  value={formData.dateOfIssue}
                  onChange={handleDateChange}
                  error={!!errors.dateOfIssue}
                  helperText={errors.dateOfIssue}
                />
              </Grid>
            </Grid>
          </Paper>
        </Grid>

        {/* Payment Info Section */}
        <Grid item xs={12} md={12}>
          <Paper elevation={3} sx={{ padding: 2, mb: 2 }}>
            <Typography variant="h6" color="text.primary" gutterBottom>Payment Info</Typography>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  required
                  label="Ticket Price"
                  name="ticketPrice"
                  value={formData.ticketPrice}
                  onChange={handleChange}
                  inputProps={{ inputMode: 'numeric', pattern: '[0-9]*', maxLength: 10 }}
                  error={!!errors.ticketPrice}
                  helperText={errors.ticketPrice}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  required
                  label="Profit %"
                  name="profit"
                  value={formData.profit}
                  onChange={handleChange}
                  inputProps={{ min: 0, maxLength: 3, inputMode: 'numeric', pattern: '[0-9]*' }}
                  error={!!errors.profit}
                  helperText={errors.profit}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <Card variant="outlined" sx={{ bgcolor: 'background.paper', borderColor: 'primary.main' }}>
                  <CardContent>
                    <Typography variant="h6" color="text.primary">Invoice Amount</Typography>
                    <Typography variant="h4" color="primary.main">RS {formData.invoiceAmount}</Typography>
                  </CardContent>
                </Card>
              </Grid>
            </Grid>
          </Paper>
        </Grid>

        {/* CTA Section */}
        <Grid item xs={12} display="flex" justifyContent="space-between">
          <Button
            variant="outlined"
            color="secondary"
            onClick={() => navigate(-1)}
            sx={{ mr: 2, width: '48%' }}
          >
            Go Back
          </Button>
          <Button
            variant="contained"
            color="primary"
            type="submit"
            disabled={loading}
            sx={{ width: '48%' }}
          >
            {loading ? <CircularProgress size={24} /> : 'Add Customer'}
          </Button>
        </Grid>
      </Grid>
      <CustomSnackbar
        openSB={!!snackbarMessage}
        message={snackbarMessage}
        onCloseSB={() => setSnackbarMessage('')}
        severity={data ? 'success' : 'error'}
      />
    </form>
  );
};

export default CreateCustomer;
