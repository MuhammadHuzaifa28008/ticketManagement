import React, { useState } from 'react';
import { Button, Grid } from '@mui/material';
import TakeCustomerInfo from '../CustomerForm/TakeCustomerInfo';
import TakePaymentInfo from '../CustomerForm/TakePaymentInfo';


function FormDataTest() {
  const [formData, setFormData] = useState(null);
  const [errors, setErrors] = useState({});

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




  const populateFormData = () => {
    setFormData({
      customerName: 'John Doe',
      email: 'john@example.com',
      phoneNumber: '1234567890',
      dob: '1990-01-01',
      paymentInfo: {
        ticketPrice: 1000,
        profit: 20,
        invoiceAmount: 1200,
        amountPaid: 500,
        dueAmount: 700,
      },
    });
  };

  return (
    <div>
      <Button onClick={() => setFormData(null)}>Set formData to null</Button>
      <Button onClick={populateFormData}>Populate formData</Button>

      <Grid container spacing={4}>
        <Grid item xs={12}>
          <TakeCustomerInfo
            formData={formData}
            handleInputChange={handleInputChange}
            handleDateChange={handleDateChange}
            errors={errors}
          />
        </Grid>
        <Grid item xs={12}>
          <TakePaymentInfo
            formData={formData}
            handleInputChange={handleInputChange}
            formErrors={errors}
          />
        </Grid>
      </Grid>
    </div>
  );
}

export default FormDataTest;
