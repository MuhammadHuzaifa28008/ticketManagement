import React, { useEffect, useState } from 'react';
import { Grid, Typography, TextField } from '@mui/material';
import DateInput from '../common/inputs/DateInput';
import {formatDate} from '../../utils/formatDate';





function TakeCustomerInfo({ formData, handleInputChange, handleDateChange, errors }) {

  // useEffect(()=>{
// // console.log(formData)
// },[formData])


  return (
    <Grid container spacing={2} mt={2}>
      <Grid item xs={12} sm={6} md={6}>
        <Typography variant={'h4'}>Customer Information</Typography>
      </Grid>
      <Grid item xs={12} sm={6}>
        <TextField
          required
          label="Customer Name"
          name="customerName"
          fullWidth
          value={formData? formData.customerName : ''}
          onChange={handleInputChange}
          error={!!errors.customerName}
          helperText={errors.customerName}
          sx={{ mb: 2,
           }}
           inputProps={{maxLength:20}} 
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <TextField
          label="Email"
          name="email"
          fullWidth
          value={formData? formData.email : ''}
          onChange={handleInputChange}
          sx={{ mb: 2,
           }}
           inputProps={{maxLength:20}}
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <TextField
          required
          label="Phone Number"
          name="phoneNumber"
          type='tel'
          fullWidth
          value={formData ? formData.phoneNumber : ''}
          onChange={handleInputChange}
          error={!!errors.phoneNumber}
          helperText={errors.phoneNumber}
          sx={{ mb: 2,

          }}

           inputProps={{maxLength:15}} 
          
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <DateInput
          title="Date of Birth"
          name="dob"
          type="date"
          value={formData ? formData.dob : ''}
          required={true}
          onChange={handleDateChange}
          error={errors.dob}
          helperText={errors.dob}
        />
      </Grid>
    </Grid>
  );
}

export default TakeCustomerInfo;
