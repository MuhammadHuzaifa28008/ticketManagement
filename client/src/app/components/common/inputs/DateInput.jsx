import React from 'react';
import { TextField, Grid } from '@mui/material';

const DateInput = ({ title, name, value, required, onChange, error, helperText }) => {
  const handleInputChange = (event) => {
    let date = event.target.value;
    // Remove all non-digit characters
    // date = date.replace(/\D/g, '');

    // // Format the date with dashes (yyyy-mm-dd)
    // if (date.length > 4) {
    //   date = date.slice(0, 4) + '-' + date.slice(4);
    // }
    // if (date.length > 7) {
    //   date = date.slice(0, 7) + '-' + date.slice(7);
    // }

    // Call the parent onChange function
    onChange(name, date);
  };

  return (
    <Grid item xs={12} mb={2}>
      <TextField
        label={title}
        fullWidth
        required={required}
        type="date"
        placeholder="yyyy-mm-dd"
        value={value}
        onChange={handleInputChange}
        inputProps={{
          maxLength: 10, // Limit input length to "yyyy-mm-dd"
        }}
        InputLabelProps={{
          shrink: true, // Always keep the label above the input
        }}
        error={!!error}
        helperText={helperText}
      />
    </Grid>
  );
};

export default DateInput;
