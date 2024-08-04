import React, { useState } from 'react';
import { TextField, Grid, Typography } from '@mui/material';

const DateInput = ({ title, value, onChange, required}) => {
  const [inputValue, setInputValue] = useState(value || '');

  const handleInputChange = (event) => {
    let date = event.target.value;
    // Remove all non-digit characters
    date = date.replace(/\D/g, '');

    // Format the date with dashes (yyyy-mm-dd)
    if (date.length > 4) {
      date = date.slice(0, 4) + '-' + date.slice(4);
    }
    if (date.length > 7) {
      date = date.slice(0, 7) + '-' + date.slice(7);
    }

    setInputValue(date);
    onChange(date); // Pass the formatted date back to the parent
  };

  return (
    <Grid item xs={12} mb={2}>
      <Typography variant="h6" gutterBottom>
        {title}
      </Typography>
      <TextField
        fullWidth
        required
        placeholder="yyyy-mm-dd"
        value={inputValue}
        onChange={handleInputChange}
        inputProps={{
          maxLength: 10, // Limit input length to "yyyy-mm-dd"
        }}
      />
    </Grid>
  );
};

export default DateInput;
