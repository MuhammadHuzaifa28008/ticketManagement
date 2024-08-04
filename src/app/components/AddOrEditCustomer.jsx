import React, { useState, useEffect } from 'react';
import { TextField, Button, Grid, Typography, Paper, useTheme } from '@mui/material';
import { DatePicker } from '@mui/lab';
import { useLocation } from 'react-router-dom';
import CustomerInfo from './CustomerForm/CustomerInfo';
import TicketInfo from './CustomerForm/TicketInfo'
import PaymentInfo from './CustomerForm/PaymentInfo';

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
    console.log(formData);
  };

  return (
    <Paper sx={{ padding: theme.spacing(3) }}>
      <Typography variant="h1" gutterBottom>
        {customer.customerName ? 'Edit Customer' : 'Add Customer'}
      </Typography>
      <CustomerInfo
        formData={formData}
        handleInputChange={handleInputChange}
        handleDateChange={handleDateChange}
      />
      <TicketInfo
        formData={formData}
        handleInputChange={handleInputChange}
        handleDateChange={handleDateChange}
      />
      <PaymentInfo
        formData={formData}
        handleInputChange={handleInputChange}
      />
      <Grid container justifyContent="flex-end" sx={{ mt: 2 }}>
        <Button variant="contained" color="primary" onClick={handleSubmit}>
          Save
        </Button>
      </Grid>
    </Paper>
  );
}
