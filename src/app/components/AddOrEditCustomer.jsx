import React, { useState, useEffect } from 'react';
import { TextField, Button, Grid, Typography, Paper, useTheme } from '@mui/material';
import { useNavigate, useLocation } from 'react-router-dom';
import CustomerInfo from './CustomerForm/CustomerInfo';
import TicketInfo from './CustomerForm/TicketInfo';
import PaymentInfo from './CustomerForm/PaymentInfo';

export default function AddOrEditCustomer() {
  const location = useLocation();
  const navigate = useNavigate();
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

  const [errors, setErrors] = useState({});

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

  const validate = () => {
    const newErrors = {};
    if (!formData.customerName) newErrors.customerName = 'Customer Name is required';
    if (!formData.phoneNumber) newErrors.phoneNumber = 'Phone Number is required';
    if (!formData.dob) newErrors.dob = 'Date of Birth is required';
    // Add more validation as needed
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

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
    if (validate()) {
      console.log(formData);
      // Handle form submission
    }
  };

  const handleCancel = () => {
    navigate(-1); // Navigate back to the previous screen
  };

  return (
    <Paper sx={{maxWidth:'100%', boxSizing:'border-box', padding: theme.spacing(3) }}>
      <Typography variant="h1" gutterBottom>
        {customer.customerName ? 'Edit Customer' : 'Add Customer'}
      </Typography>
      <CustomerInfo
        formData={formData}
        handleInputChange={handleInputChange}
        handleDateChange={handleDateChange}
        errors={errors}
      />
      <TicketInfo
        formData={formData}
        handleInputChange={handleInputChange}
        handleDateChange={handleDateChange}
        errors={errors}
      />
      <PaymentInfo
        formData={formData}
        handleInputChange={handleInputChange}
        errors={errors}
      />
      <Grid container justifyContent="flex-end" sx={{ mt: 2 }}>
        <Button variant="contained" color="primary" onClick={handleSubmit}>
          Save
        </Button>
        <Button variant="outlined" color="secondary" onClick={handleCancel} sx={{ ml: 2 }}>
          Cancel
        </Button>
      </Grid>
    </Paper>
  );
}
