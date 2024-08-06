import { Grid, Typography, TextField, Card, CardContent } from '@mui/material';
import { calculateInvoiceAmount } from '../../utils/paymentCalculations';
import { useEffect, useState } from 'react';

function PaymentInfo({ formData, handleInputChange, formErrors }) {
  const [invoiceAmount, setInvoiceAmount] = useState(0);
  const [errors, setErrors] = useState({ ticketPrice: '', profit: '' });



  useEffect(() => {
    const newInvoiceAmount = calculateInvoiceAmount(formData.paymentInfo.ticketPrice, formData.paymentInfo.profit);
    setInvoiceAmount(newInvoiceAmount);
    // Update the form data with the new invoice amount
    handleInputChange({ target: { name: 'paymentInfo.invoiceAmount', value: newInvoiceAmount } });
  }, [formData.paymentInfo.ticketPrice, formData.paymentInfo.profit]);

  const validateInput = (name, value) => {
    let error = '';
    if (isNaN(value) || value < 0) {
      error = 'Value must be a positive number.';
    }
    setErrors(prevErrors => ({ ...prevErrors, [name]: error }));
    return !error;
  };

  const handleInputChangeWithValidation = (event) => {
    const { name, value } = event.target;
    const numericValue = parseFloat(value);

    // Validate input
    if (validateInput(name, numericValue)) {
      // Update form data only if validation passes
      handleInputChange({ target: { name, value: numericValue } });
    }
  };

  return (
    <Grid container spacing={2} mt={2}>
      <Grid item xs={12} sm={6}>
        <Typography variant="h4">Payment Information</Typography>
      </Grid>
      <Grid item xs={12} sm={6}>
        <TextField
          required
          label="Ticket Price"
          name="paymentInfo.ticketPrice"
          type="number"
          fullWidth
          value={formData.paymentInfo.ticketPrice || ''}
          onChange={handleInputChangeWithValidation}
          sx={{ mb: 2,
            inputProps: { maxLength: 20 },
           }}
          InputProps={{ inputProps: { min: 0 } }}
          error={!!formErrors.ticketPrice}
          helperText={formErrors.ticketPrice}
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <TextField
          required
          label="Profit %"
          placeholder='0%'
          name="paymentInfo.profit"
          type="number"
          fullWidth
          value={formData.paymentInfo.profit || ''}
          onChange={handleInputChangeWithValidation}
           inputProps={{maxLength:3}}
          
          InputProps={{ inputProps: { min: 0 } }}
          error={!!formErrors.profit}
          helperText={formErrors.profit}
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <Card variant="outlined" sx={{ bgcolor: 'background.paper', borderColor: 'primary.main' }}>
          <CardContent>
            <Typography variant="h6" color="text.primary">
              Invoice Amount
            </Typography>
            <Typography variant="h4" color="primary.main">
              RS {formData.paymentInfo.invoiceAmount.toFixed(2)}
            </Typography>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
}

export default PaymentInfo;