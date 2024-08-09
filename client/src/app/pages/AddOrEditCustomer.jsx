import React, { useState, useEffect } from 'react';
import { useTheme, Button, Grid, Typography, Paper, Fade } from '@mui/material';
import { useNavigate, useLocation } from 'react-router-dom';
import TakeCustomerInfo from '../components/CustomerForm/TakeCustomerInfo';
import TakeTicketInfo from '../components/CustomerForm/TakeTicketInfo';
import TakePaymentInfo from '../components/CustomerForm/TakePaymentInfo';
import { useAppContext } from '../context/AppContext';
import useApiCall from '../hooks/useApiCall';
import SnackBar from '../components/common/FeedBack/SnackBar';
import LoadingCircular from '../components/common/FeedBack/LoadingCircular';
import { formatDate } from '../utils/formatDate';
import { validateCustomerInfo } from '../utils/formValidations';


export default function AddOrEditCustomer() {
  const location = useLocation();
  const navigate = useNavigate();
  const customer = location.state || null;
  const theme = useTheme();
  const { setFetch } = useAppContext();
  const [checked, setChecked] = React.useState(false);
  
   const [formData, setFormData] = useState(!customer? null: {...customer, dob: formatDate(customer.dob), ticketInfo: {...customer.ticketInfo, dateOfTraveling: formatDate(customer.ticketInfo.dateOfTraveling), dateOfIssue:formatDate(customer.ticketInfo.dateOfIssue)}});

  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [drawerOpen, setDrawerOpen] = useState(false);
  const { data, loading, error, makeApiCall } = useApiCall();

  useEffect(() => {
    if (!customer) {
      console.warn('no state was passsed')
      setFormData({
        customerName:  '',
        email: '',
        phoneNumber: '',
        dob: '',
        ticketInfo: {
          PNRNo:  '',
          dateOfTraveling:  '',
          dateOfIssue:  '',
        },
        paymentInfo: {
          ticketPrice:  0,
          profit:  0,
          invoiceAmount:  0,
          dueAmount: 0
        },
      });
    }
  }, []);




// useEffect(()=>{
//   if (Object.keys(errors).length >0 ) console.log(errors)
// },[errors])

useEffect(()=>{
setChecked(true)
},[])

  useEffect(()=>{
    if(data) {
      // console.log("data:", data)
      setFetch(true)
      setFormData({...data, dob: formatDate(data.dob), ticketInfo: {...data.ticketInfo, dateOfTraveling: formatDate(data.ticketInfo.dateOfTraveling), dateOfIssue:formatDate(data.ticketInfo.dateOfIssue)}})
      setSnackbarMessage('data saved successfully')
    }
    if(loading) setIsLoading(loading)
      if (error){ 
        console.error("error:", error)
        setSnackbarMessage('unable to Save Data')
    }
  },[data, error, loading])




  // const validate = () => {
  //   let newErrors = {};
  //   const today = new Date();
  //   const minYear = 1940;
  //   const maxTravelDate = new Date(today);
  //   maxTravelDate.setFullYear(today.getFullYear() + 1); // 1 year in the future
  //   const minTravelDate = new Date(today);
  //   minTravelDate.setFullYear(today.getFullYear() - 1); // 1 year in the past
  
  //   const validateDayAndMonth = (date, fieldName) => {

  //     // Parse the date
  //     const parsedDate = new Date(date);
    
  //     // Extract year, month, and day
  //     const year = parsedDate.getFullYear();
  //     const month = parsedDate.getMonth() + 1; // getMonth() returns 0-based month
  //     const day = parsedDate.getDate();
    
  //     // Check if the date is valid
  //     if (isNaN(parsedDate.getTime())) {
  //       newErrors[fieldName] = 'Invalid date format. - yyyy-mm-dd';
  //     }
    
  //     // Check if year is valid
  //     if (year < 0) {
  //       newErrors[fieldName] = 'Year must be a valid positive number.';
  
  //     }
    
  //     // Check if the month is valid
  //     if (month < 1 || month > 12) {
  //       newErrors[fieldName] = 'Month must be between 1 and 12.';
     
  //     }
    
  //     // Check if the day is valid for the given month and year
  //     const daysInMonth = new Date(year, month, 0).getDate();
  //     if (day < 1 || day > daysInMonth) {
  //       newErrors[fieldName] = `Day must be between 1 and ${daysInMonth} for the month ${month} in the year ${year}.`;
       
  //     }
  //   };
    
  
  //   // Check required fields
  //   if (!formData.customerName) newErrors.customerName = 'Customer Name is required';
  //   if (!formData.phoneNumber) newErrors.phoneNumber = 'Phone Number is required';
  //   if (!formData.dob) newErrors.dob = 'Date of Birth is required';
  //   if (!formData.ticketInfo.PNRNo) newErrors.PNRNo = 'PNR# is required';
  //   if (!formData.ticketInfo.dateOfTraveling) newErrors.dateOfTraveling = 'Date of Traveling is required';
  //   if (!formData.ticketInfo.dateOfIssue) newErrors.dateOfIssue = 'Date of Issue is required';
  //   if (!formData.paymentInfo.ticketPrice) newErrors.ticketPrice = 'Ticket Price is required';
  //   if (!formData.paymentInfo.profit) newErrors.profit = 'Profit is required';
  //   if (!formData.paymentInfo.invoiceAmount) newErrors.invoiceAmount = 'Invoice Amount is required';
  //   // if (!formData.paymentInfo.amountPaid) newErrors.amountPaid = 'Amount Paid is required';
  
  //   // Validate Date of Birth
  //   if (formData.dob) {
  //     const dobYear = new Date(formData.dob).getFullYear();
  //     if (dobYear > today.getFullYear()) { // dob cannot be in the future
  //       newErrors.dob = 'Date of birth cannot be a future date.';
  //     } else if (dobYear < minYear) {
  //       newErrors.dob = `Year cannot be less than ${minYear}.`;
  //     }
  //     validateDayAndMonth(formData.dob, 'dob');
  //   }
  
  //   // Validate Date of Traveling and Date of Issue
  //   const validateDate = (date, fieldName) => {
  //     const parsedDate = new Date(date);
  //     if (parsedDate > maxTravelDate) {
  //       newErrors[fieldName] = 'Date cannot be more than 1 year in the future.';
  //     } else if (parsedDate < minTravelDate) {
  //       newErrors[fieldName] = 'Date cannot be more than 1 year in the past.';
  //     }
  //   };
  
  //   if (formData.ticketInfo.dateOfTraveling) {
  //     validateDate(formData.ticketInfo.dateOfTraveling, 'dateOfTraveling');
  //     validateDayAndMonth(formData.ticketInfo.dateOfTraveling, 'dateOfTraveling');
  //   }
  
  //   if (formData.ticketInfo.dateOfIssue) {
  //     validateDate(formData.ticketInfo.dateOfIssue, 'dateOfIssue');
  //     validateDayAndMonth(formData.ticketInfo.dateOfIssue, 'dateOfIssue');
  //   }
  
  //   setErrors(newErrors);
  //   return Object.keys(newErrors).length === 0;
  // };
  

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    const keys = name.split('.');
  // console.log(value)
    // Update formData
    if (keys.length === 1) {
      if(!formData) setFormData({[name]:value})
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
    if (validateCustomerInfo(formData, setErrors)) {
      setIsLoading(true);
      try {
        if(customer){

          // Update existing customer
          if(!formData._id) {
            console.error('id is null in form data | update aborting'); 
            setSnackbarMessage('unexpected error occured | contact developer')  
            return
          }

          await makeApiCall(`http://localhost:5000/customer/${formData._id}`, {
            method: 'put',
            data: formData,
          });
        }
        else{
          //  create new customer
          console.log("it is a create call")
          await makeApiCall(`http://localhost:5000/customer/add`, {
            method: 'post',
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
    setSnackbarMessage('could not save data plese try again')
  };

  const handleCancel = () => {
    navigate(-1); // Navigate back to the previous screen
  };

  return (
    <Fade in={checked} timeout={500}>

    <Paper sx={{ maxWidth: '100%', boxSizing: 'border-box', padding: theme.spacing(3) }}>
      <Typography variant="h1" gutterBottom>
        {customer ? 'Edit Customer' : 'Add Customer'}
      </Typography>
      <TakeCustomerInfo
        formData={customer? formData: null}
        handleInputChange={handleInputChange}
        handleDateChange={handleDateChange}
        errors={errors}
      />
      <TakeTicketInfo
        formData={formData}
        handleInputChange={handleInputChange}
        handleDateChange={handleDateChange}
        errors={errors}
      />
      <TakePaymentInfo
        formData={formData}
        handleInputChange={handleInputChange}
        formErrors={errors}
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
        severity={data? "success":  Object.keys(errors).length>0 || error ? "warn": "error"}
      />


    </Paper>
    </Fade>
  )
};