import React, { useState, useEffect } from 'react';
import {
  TextField, Button, Grid, Typography, Paper, Drawer, useTheme
} from '@mui/material';
import { useNavigate, useLocation } from 'react-router-dom';
import CustomerInfo from './CustomerForm/CustomerInfo';
import TicketInfo from './CustomerForm/TicketInfo';
import PaymentInfo from './CustomerForm/PaymentInfo';
import { useAppContext } from '../context/AppContext';
import useApiCall from '../hooks/useApiCall';
import LoadingCircular from '../components/common/LoadingCircular';
import SnackBar from '../components/common/SnackBar';

export default function AddOrEditCustomer() {
  const location = useLocation();
  const navigate = useNavigate();
  const customer = location.state || {};
  const theme = useTheme();
  const { setAllCustomers } = useAppContext();

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
    },
    id: customer.id || null,
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [drawerOpen, setDrawerOpen] = useState(false);

  const { makeApiCall } = useApiCall();

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
        },
        id: customer.id || null,
      });
    }
  }, [customer]);

  const validate = () => {
    let newErrors = {};
    if (!formData.customerName) newErrors.customerName = 'Customer Name is required';
    if (!formData.phoneNumber) newErrors.phoneNumber = 'Phone Number is required';
    if (!formData.dob) newErrors.dob = 'Date of Birth is required';
    if (!formData.ticketInfo.PNRNo) newErrors.PNRNo = 'PNR# is required';
    if (!formData.ticketInfo.dateOfTraveling) newErrors.dateOfTraveling = 'Date of Traveling is required';
    if (!formData.ticketInfo.dateOfIssue) newErrors.dateOfIssue = 'Date of Issue is required';
    if (!formData.paymentInfo.ticketPrice) newErrors.ticketPrice = 'Ticket Price is required';
    if (!formData.paymentInfo.profit) newErrors.profit = 'Profit is required';
    if (!formData.paymentInfo.invoiceAmount) newErrors.invoiceAmount = 'Invoice Amount is required';
    if (!formData.paymentInfo.amountPaid) newErrors.amountPaid = 'Amount paid is required';

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

  const handleSubmit = async () => {
    if (validate()) {
      setLoading(true);
      try {
        let response;
        if (formData.id !== null) {
          // Update existing customer
          response = await makeApiCall(`/customers/${formData.id}`, {
            method: 'PATCH',
            data: formData,
          });
        } else {
          // Create new customer
          response = await makeApiCall('/customers', {
            method: 'POST',
            data: formData,
          });
        }
        setSnackbarMessage('Customer saved successfully');
        setDrawerOpen(true);
        setTimeout(() => navigate(-1), 2000); // Navigate back after 2 seconds
      } catch (err) {
        console.error('Error saving customer:', err);
        setSnackbarMessage('Failed to save customer. Please try again later.');
        setDrawerOpen(true);
      } finally {
        setLoading(false);
      }
    }
  };

  const handleCancel = () => {
    navigate(-1); // Navigate back to the previous screen
  };

  return (
    <Paper sx={{ maxWidth: '100%', boxSizing: 'border-box', padding: theme.spacing(3) }}>
      <Typography variant="h1" gutterBottom>
        {formData.customerName ? 'Edit Customer' : 'Add Customer'}
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
        <Button variant="contained" color="primary" onClick={handleSubmit} disabled={loading}>
          {loading ? <LoadingCircular /> : 'Save'}
        </Button>
        <Button variant="outlined" color="secondary" onClick={handleCancel} sx={{ ml: 2 }}>
          Cancel
        </Button>
      </Grid>
      <SnackBar
        message={snackbarMessage}
        open={!!snackbarMessage}
        onClose={() => setSnackbarMessage('')}
      />
      <Drawer
        anchor="bottom"
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
      >
        <div style={{ width: '100%', padding: theme.spacing(2), textAlign: 'center' }}>
          <Typography variant="h6">{snackbarMessage}</Typography>
          <Button onClick={() => setDrawerOpen(false)}>Close</Button>
        </div>
      </Drawer>
    </Paper>
  );
}
