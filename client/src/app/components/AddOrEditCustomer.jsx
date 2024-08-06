import React, { useState, useEffect } from 'react';
import { useTheme, Button, Grid, Typography, Paper } from '@mui/material';
import { useNavigate, useLocation } from 'react-router-dom';
import CustomerInfo from './CustomerForm/CustomerInfo';
import TicketInfo from './CustomerForm/TicketInfo';
import PaymentInfo from './CustomerForm/PaymentInfo';
import { useAppContext } from '../context/AppContext';
import useApiCall from '../hooks/useApiCall';
import SnackBar from '../components/common/SnackBar';
import LoadingCircular from '../components/common/LoadingCircular';
import { formatDate } from '../utils/formatDate';

export default function AddOrEditCustomer() {
  const location = useLocation();
  const navigate = useNavigate();
  const customer = location.state || {};
  const theme = useTheme();
  const { setFetch } = useAppContext();

  
   const [formData, setFormData] = useState({
    customerName: customer.customerName || '',
    email: customer.email || '',
    phoneNumber: customer.phoneNumber || '',
    dob:  formatDate(customer.dob) || null,
    ticketInfo: {
      PNRNo: customer.ticketInfo?.PNRNo || '',
      dateOfTraveling: formatDate(customer.ticketInfo?.dateOfTraveling) || null,
      dateOfIssue: formatDate(customer.ticketInfo?.dateOfIssue) || null,
    },
    paymentInfo: {
      ticketPrice: customer.paymentInfo?.ticketPrice || 0,
      profit: customer.paymentInfo?.profit || 0,
      invoiceAmount: customer.paymentInfo?.invoiceAmount || 0,
      amountPaid: customer.paymentInfo?.amountPaid || 0,
      dueAmount: customer.paymentInfo?.dueAmount || 0,
    },
    _id: customer._id || null,
  });

  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [drawerOpen, setDrawerOpen] = useState(false);
  const { data, loading, error, makeApiCall } = useApiCall();

  useEffect(() => {
    if (customer) {
      setFormData({
        customerName: customer.customerName || '',
        email: customer.email || '',
        phoneNumber: customer.phoneNumber || '',
        dob: formatDate(customer.dob) || null,
        ticketInfo: {
          PNRNo: customer.ticketInfo?.PNRNo || '',
          dateOfTraveling: formatDate(customer.ticketInfo?.dateOfTraveling) || null,
          dateOfIssue: formatDate(customer.ticketInfo?.dateOfIssue) || null,
        },
        paymentInfo: {
          ticketPrice: customer.paymentInfo?.ticketPrice || 0,
          profit: customer.paymentInfo?.profit || 0,
          invoiceAmount: customer.paymentInfo?.invoiceAmount || 0,
          amountPaid: customer.paymentInfo?.amountPaid || 0,
          dueAmount: customer.paymentInfo?.dueAmount || 0,
        },
        _id: customer._id || null,
      });
    }
  }, [customer]);

useEffect(()=>{
  if (Object.keys(errors).length >0 ) console.error(Object.keys(errors))
},[errors])


  useEffect(()=>{
    if(data) {
      console.log("data:", data)
      setFetch(true)
      setFormData(data)
      setSnackbarMessage('data saved successfully')
    }
    if(loading) setIsLoading(loading)
      if (error){ 
        console.error("error:", error)
        setSnackbarMessage('unable to Save Data')
    }
  },[data, error, loading])




  const validate = () => {
    let newErrors = {};
    const today = new Date();
    const minYear = 1940;
    const maxTravelDate = new Date(today);
    maxTravelDate.setFullYear(today.getFullYear() + 1); // 1 year in the future
    const minTravelDate = new Date(today);
    minTravelDate.setFullYear(today.getFullYear() - 1); // 1 year in the past
  
    // Check required fields
    if (!formData.customerName) newErrors.customerName = 'Customer Name is required';
    if (!formData.phoneNumber) newErrors.phoneNumber = 'Phone Number is required';
    if (!formData.dob) newErrors.dob = 'Date of Birth is required';
    if (!formData.ticketInfo.PNRNo) newErrors.PNRNo = 'PNR# is required';
    if (!formData.ticketInfo.dateOfTraveling) newErrors.dateOfTraveling = 'Date of Traveling is required';
    if (!formData.ticketInfo.dateOfIssue) newErrors.dateOfIssue = 'Date of Issue is required';
    if (!formData.paymentInfo.ticketPrice) newErrors.ticketPrice = 'Ticket Price is required';
    if (!formData.paymentInfo.profit) newErrors.profit = 'Profit is required';
    if (!formData.paymentInfo.invoiceAmount) newErrors.invoiceAmount = 'Invoice Amount is required';
    if (!formData.paymentInfo.amountPaid) newErrors.amountPaid = 'Amount Paid is required';
  
    // Validate Date of Birth
    if (formData.dob) {
      const dobYear = new Date(formData.dob).getFullYear();
      if (dobYear > today.getFullYear()) {
        newErrors.dob = 'Year cannot be a future date.';
      } else if (dobYear < minYear) {
        newErrors.dob = `Year cannot be less than ${minYear}.`;
      }
    }
  
    // Validate Date of Traveling and Date of Issue
    const validateDate = (date, fieldName) => {
      const parsedDate = new Date(date);
      if (parsedDate > maxTravelDate) {
        newErrors[fieldName] = 'Date cannot be more than 1 year in the future.';
      } else if (parsedDate < minTravelDate) {
        newErrors[fieldName] = 'Date cannot be more than 1 year in the past.';
      }
    };
  
    if (formData.ticketInfo.dateOfTraveling) {
      validateDate(formData.ticketInfo.dateOfTraveling, 'dateOfTraveling');
    }
    
    if (formData.ticketInfo.dateOfIssue) {
      validateDate(formData.ticketInfo.dateOfIssue, 'dateOfIssue');
    }
  
  
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    const keys = name.split('.');
  
    // Update formData
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
  
    // Remove error if field is valid
    setErrors((prevErrors) => {
      const newErrors = { ...prevErrors };
      if (keys.length === 1 && newErrors[name]) {
        delete newErrors[name];
      } else if (keys.length > 1 && newErrors[keys[1]]) {
        delete newErrors[keys[1]];
      }
      return newErrors;
    });
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
  
    // Remove error if the date is valid
    setErrors((prevErrors) => {
      const newErrors = { ...prevErrors };
      if (keys.length === 1 && newErrors[field]) {
        delete newErrors[field];
      } else if (keys.length > 1 && newErrors[keys[1]]) {
        delete newErrors[keys[1]];
      }
      return newErrors;
    });
  };
  

  const handleSubmit = async () => {
    if (validate()) {
      setIsLoading(true);
      try {
        if(customer.customerName){

          // Update existing customer
          if(!formData._id) {console.error('id is null in form data aborting'); 
            return
          }

          await makeApiCall(`http://localhost:5000/customer/${formData._id}`, {
            method: 'put',
            data: formData,
          });
          
          
        }
      } catch (err) {
        console.error('Error saving customer:', err);
        setSnackbarMessage('Failed to save customer. Please try again later.');
        setDrawerOpen(true);
      } finally {
        setIsLoading(false);
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
        <Button variant="contained" color="primary" onClick={handleSubmit} disabled={isLoading}>
          {isLoading ? <LoadingCircular /> : 'Save'}
        </Button>
        <Button variant="outlined" color="secondary" onClick={handleCancel} sx={{ ml: 2 }}>
          Go Back
        </Button>
      </Grid>



      <SnackBar
        message={snackbarMessage}
        openSB={!!snackbarMessage}
        onCloseSB={() => setSnackbarMessage('')}
        severity={data? "success":"error"}
      />


    </Paper>
  )
};



