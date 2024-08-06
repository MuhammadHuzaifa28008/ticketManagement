import React, { useState, useEffect } from 'react';
import { TextField, Grid, Typography } from '@mui/material';

const DateInput = ({ title, value, onChange,error, helperText, required }) => {
  const [inputValue, setInputValue] = useState(value || '');
  const [formatErr, setFormatErr] = useState();

  useEffect(() => {
    // if (required && !inputValue) {
    //   setError(`${title} is required.`);
    // } else {
    //   setError('');
    // }
  }, [inputValue, required]);

  const validateDate = (date) => {
    const today = new Date();
    const currentYear = today.getFullYear();
    const maxYear = currentYear + 1; // One year from the current year
    const minYear = currentYear - 1; // One year before the current year

    const dateParts = date.split('-');
    if (dateParts.length === 3) {
      const year = parseInt(dateParts[0], 10);
      const month = parseInt(dateParts[1], 10);
      const day = parseInt(dateParts[2], 10);

      // Check year range
      if (year < minYear || year > maxYear) {
        setFormatErr('Year must be within one year of the current year.');
        return false;
      }

      // Check month range
      if (month < 1 || month > 12) {
        setFormatErr('Month must be between 01 and 12.');
        return false;
      }

      // Check day range
      const daysInMonth = new Date(year, month, 0).getDate();
      if (day < 1 || day > daysInMonth) {
        setFormatErr('Day must be valid for the given month and year.');
        return false;
      }

      setFormatErr('');
      return true;
    }
    return false;
  };

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

    // Validate the formatted date
    if (validateDate(date) || !required) {
      onChange(date); // Pass the formatted date back to the parent
    }
  };

  return (
    <Grid item xs={12} mb={2}>
      <Typography variant="body1" gutterBottom>
        {title}
      </Typography>
      <TextField
        fullWidth
        required={required}
        placeholder="yyyy-mm-dd"
        value={inputValue}
        onChange={handleInputChange}
        inputProps={{
          maxLength: 10, // Limit input length to "yyyy-mm-dd"
        }}
        error={!!error}
        helperText={helperText? helperText : formatErr}
      />
    </Grid>
  );
};

export default DateInput;
