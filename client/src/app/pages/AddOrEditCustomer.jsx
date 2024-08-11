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

  // useEffect(() => {
  //   if (!customer && !formData) {
  //     console.warn('no state was passsed')
  //     setFormData({
  //       customerName:  '',
  //       email: '',
  //       phoneNumber: '',
  //       dob: '',
  //       ticketInfo: {
  //         PNRNo:  '',
  //         dateOfTraveling:  '',
  //         dateOfIssue:  '',
  //       },
  //       paymentInfo: {
  //         ticketPrice:  0,
  //         profit:  0,
  //         invoiceAmount:  0,
  //         dueAmount: 0,
  //         amountPaid:0
  //       },
  //     });
  //   }
  //   else{
  //     console.log('formData initialized')
  //     console.log(formData)
  //   }

  // }, [formatDate]);





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




  

  const handleInputChange = (event) => {
    const { name, value } = event.target;


    // if(!customer) setFormData({[name]:value})

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
          // console.log('data before edit data: ', formData)
          await makeApiCall(`/customer/${formData._id}`, {
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
    setSnackbarMessage('please double check all inputs data')
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
        severity={data ? "success":  Object.keys(errors).length>0 || error ? "warn": "error"}
      />


    </Paper>
    </Fade>
  )
};