import React, { useEffect, useState } from 'react';
import { Grid, TextField, Button, CircularProgress, Card, CardContent, Typography, Paper } from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers';
import useApiCall from '../hooks/useApiCall';
import CustomSnackbar from '../components/common/FeedBack/SnackBar';
import DateInput from '../components/common/inputs/DateInput';
import { createCustomerValidation, validateCustomerInfo } from '../utils/formValidations';

import { calculateInvoiceAmount } from '../utils/paymentCalculations';



const CreateCustomer = () => {
  const [formData, setFormData] = useState({
    customerName: '',
    email: '',
    phoneNumber: '',
    dob: null,
    PNRNo: '',
    dateOfTraveling: null,
    dateOfIssue: null,
    ticketPrice: 0,
    profit: 0,
    invoiceAmount: 0
  });

  const { data, error, loading, makeApiCall } = useApiCall();
  const [errors, setErrors] = useState({});
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [newInvoiceAmount, setNewInvoiceAmount] = useState(0)

useEffect(()=>{
if(data){
    // setFormData({...data, PNRNo:data.ticketInfo.PNRNo, dateOfTraveling:data.ticketInfo.dateOfTraveling, dateOfIssue:data.ticketInfo.dateOfTraveling, ticketPrice: data.paymentInfo.ticketPrice, profit:data.paymentInfo.profit})



console.log('user saved in db')
console.log(data)

    //  go back before user creates new customer accidently
     setSnackbarMessage('data saved Successfully')
    }

},[data,error,loading])


useEffect(()=>{
if(formData.profit!==0 && formData.ticketPrice!==0) {
    // console.log('we are entering payment values')
    let newInvoiceAmount = calculateInvoiceAmount(formData.ticketPrice, formData.profit )
    handleChange({target:{name: 'invoiceAmount', value: newInvoiceAmount}})

}
},[formData])


  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleDateChange = (name, value) => {
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Structuring data as per required format
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
        invoiceAmount: parseFloat(formData.invoiceAmount)
      }
    };

    try {
        if(validateCustomerInfo(structuredData, setErrors)){

            
            await makeApiCall('http://localhost:5000/customer/add', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: structuredData
      });
      setSnackbarMessage('Customer added successfully!');
    }
      setSnackbarMessage('please check all inputs data')
    } catch (err) {
        setSnackbarMessage('Failed to add customer. Please try again.');
    }
};

return (
    <form onSubmit={handleSubmit}>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
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
            // inputProps={{ maxLength: 100 }}
            />
        </Grid>
        <Grid item xs={12} sm={6}>
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
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            required
            label="Phone Number"
            name="phoneNumber"
            type= "tel"
            value={formData.phoneNumber}
            onChange={handleChange}
            
            inputProps={{ maxLength: 20}}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <DateInput
            title="Date of Birth"
            name="dob"
            type= 'date'
            value={formData.dob}
            required={true}
            onChange={handleDateChange}
            // renderInput={(params) => <DateInput {...params} />}
            fullWidth
            error = {!!errors.dob}
            helperText={errors.dob}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
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
        <Grid item xs={12} sm={6}>
          <DateInput
            title="Date of Traveling"
            name="dateOfTraveling"
            value={formData.dateOfTraveling}
            onChange={handleDateChange}
            error = {!! errors.dateOfTraveling}
          helperText={errors.dateOfTraveling}
            fullWidth
            required
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <DateInput
            fullWidth
            required ={true}
            title="Date of Issue"
            name= "dateOfIssue"
            value={formData.dateOfIssue}
            onChange={handleDateChange}
            error ={!!errors.dateOfIssue}
            helperText={errors.dateOfIssue}
            // renderInput={(params) => <TextField {...params} />}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            required
            label="Ticket Price"
            name="ticketPrice"
            value={formData.ticketPrice}
            onChange={handleChange}
            inputProps={{ inputMode: 'numeric', pattern: '[0-9]*', maxLength:10 }}
            error = {!!errors.ticketPrice}
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
            inputProps={{min:0, maxLength:3, inputMode: 'numeric', pattern: '[0-9]*' }}
            error = {!!errors.profit}
            helperText = {errors.profit}
          />
        </Grid>


        <Grid item xs={12} sm={6}>
        <Card variant="outlined" sx={{ bgcolor: 'background.paper', borderColor: 'primary.main' }}>
          <CardContent>
            <Typography variant="h6" color="text.primary">
              Invoice Amount
            </Typography>
            <Typography variant="h4" color="primary.main">
              RS { formData.invoiceAmount}
            </Typography>
          </CardContent>
        </Card>
      </Grid>


        <Grid item xs={12}>
          <Button
            fullWidth
            variant="contained"
            color="primary"
            type="submit"
            disabled={loading}
          >
            {loading ? <CircularProgress size={24} /> : 'Add Customer'}
          </Button>
        </Grid>
      </Grid>
      <CustomSnackbar
        openSB={!!snackbarMessage}
        message={snackbarMessage}
        onCloseSB={() => setSnackbarMessage('')}
        severity={data ? 'success':'error'}
      />
    </form>
  );
};

export default CreateCustomer;