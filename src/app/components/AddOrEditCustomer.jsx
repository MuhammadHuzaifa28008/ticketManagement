import React, { useState, useEffect } from 'react';
import { TextField, Button, Grid, Typography, Paper, useTheme } from '@mui/material';
import { DatePicker } from '@mui/lab';
import { useLocation } from 'react-router-dom';

export default function AddOrEditCustomer() {
  const location = useLocation();
  const customer = location.state || {};
  const theme = useTheme();

  const [formData, setFormData] = useState({
    customerName: customer.customerName || '',
    email: customer.email || '',
    phoneNumber: customer.phoneNumber || '',
    dob: customer.dob || null,
    ticketInfo: {
      PNRNo: customer.ticketInfo?.PNRNo || '',
      dateOfTraveling: customer.ticketInfo?.dateOfTraveling || null,
      dateOfIssue: customer.ticketInfo?.dateOfIssue || null,
    },
    paymentInfo: {
      ticketPrice: customer.paymentInfo?.ticketPrice || 0,
      profit: customer.paymentInfo?.profit || 0,
      invoiceAmount: customer.paymentInfo?.invoiceAmount || 0,
      paymentStatus: customer.paymentInfo?.paymentStatus || 'pending',
      paymentMethod: customer.paymentInfo?.paymentMethod || '',
      amountPaid: customer.paymentInfo?.amountPaid || 0,
      dueAmount: customer.paymentInfo?.dueAmount || 0,
    }
  });

  useEffect(() => {
    if (customer) {
      setFormData({
        customerName: customer.customerName || '',
        email: customer.email || '',
        phoneNumber: customer.phoneNumber || '',
        dob: customer.dob || null,
        ticketInfo: {
          PNRNo: customer.ticketInfo?.PNRNo || '',
          dateOfTraveling: customer.ticketInfo?.dateOfTraveling || null,
          dateOfIssue: customer.ticketInfo?.dateOfIssue || null,
        },
        paymentInfo: {
          ticketPrice: customer.paymentInfo?.ticketPrice || 0,
          profit: customer.paymentInfo?.profit || 0,
          invoiceAmount: customer.paymentInfo?.invoiceAmount || 0,
          paymentStatus: customer.paymentInfo?.paymentStatus || 'pending',
          paymentMethod: customer.paymentInfo?.paymentMethod || '',
          amountPaid: customer.paymentInfo?.amountPaid || 0,
          dueAmount: customer.paymentInfo?.dueAmount || 0,
        }
      });
    }
  }, [customer]);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    const keys = name.split('.');
    if (keys.length === 1) {
      setFormData((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    } else {
      setFormData((prevState) => ({
        ...prevState,
        [keys[0]]: {
          ...prevState[keys[0]],
          [keys[1]]: value,
        },
      }));
    }
  };

  const handleDateChange = (field, date) => {
    const keys = field.split('.');
    if (keys.length === 1) {
      setFormData((prevState) => ({
        ...prevState,
        [field]: date,
      }));
    } else {
      setFormData((prevState) => ({
        ...prevState,
        [keys[0]]: {
          ...prevState[keys[0]],
          [keys[1]]: date,
        },
      }));
    }
  };

  const handleSubmit = () => {
    // Add logic to handle form submission
    console.log(formData);
  };

  return (
    <Paper style={{ padding: theme.spacing(3) }}>
      <Typography variant="h5" gutterBottom>
        {customer.customerName ? 'Edit Customer' : 'Add Customer'}
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            label="Customer Name"
            name="customerName"
            fullWidth
            value={formData.customerName}
            onChange={handleInputChange}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            label="Email"
            name="email"
            fullWidth
            value={formData.email}
            onChange={handleInputChange}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            label="Phone Number"
            name="phoneNumber"
            fullWidth
            value={formData.phoneNumber}
            onChange={handleInputChange}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <DatePicker
            label="Date of Birth"
            value={formData.dob}
            onChange={(date) => handleDateChange('dob', date)}
            renderInput={(params) => <TextField {...params} fullWidth required />}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            label="PNR No"
            name="ticketInfo.PNRNo"
            fullWidth
            value={formData.ticketInfo.PNRNo}
            onChange={handleInputChange}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <DatePicker
            label="Date of Traveling"
            value={formData.ticketInfo.dateOfTraveling}
            onChange={(date) => handleDateChange('ticketInfo.dateOfTraveling', date)}
            renderInput={(params) => <TextField {...params} fullWidth required />}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <DatePicker
            label="Date of Issue"
            value={formData.ticketInfo.dateOfIssue}
            onChange={(date) => handleDateChange('ticketInfo.dateOfIssue', date)}
            renderInput={(params) => <TextField {...params} fullWidth required />}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            label="Ticket Price"
            name="paymentInfo.ticketPrice"
            type="number"
            fullWidth
            value={formData.paymentInfo.ticketPrice}
            onChange={handleInputChange}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            label="Profit"
            name="paymentInfo.profit"
            type="number"
            fullWidth
            value={formData.paymentInfo.profit}
            onChange={handleInputChange}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            label="Amount Paid"
            name="paymentInfo.amountPaid"
            type="number"
            fullWidth
            value={formData.paymentInfo.amountPaid}
            onChange={handleInputChange}
          />
        </Grid>
        <Grid item xs={12}>
          <Button
            variant="contained"
            color="primary"
            onClick={handleSubmit}
          >
            Save
          </Button>
        </Grid>
      </Grid>
    </Paper>
  );
}
