import { Grid, Typography, TextField, Card, CardContent } from '@mui/material';
import { calculateInvoiceAmount, calculateDueAmount } from '../../utils/paymentCalculations';
import { useEffect, useState } from 'react';

function TakePaymentInfo({ formData, handleInputChange, formErrors }) {
  const [invoiceAmount, setInvoiceAmount] = useState(0);
  const [newDueAmount, setNewDueAmount] = useState(0);
  // const [newPaidAmount, setNewPaidAmount] = useState(0);
  const [errors, setErrors] = useState({ ticketPrice: '', profit: '' });



  useEffect(() => {
    if(!formData) {
      handleInputChange({target:{name:'paymentInfo.AmountPaid', value: 0}})
      handleInputChange({target:{name:'paymentInfo.dueAmount', value: newInvoiceAmount}})
      return
    }
    const newInvoiceAmount = calculateInvoiceAmount(formData.paymentInfo.ticketPrice, formData.paymentInfo.profit);
    setInvoiceAmount(newInvoiceAmount);
    const newDueAmount = calculateDueAmount(formData.paymentInfo.amountPaid, newInvoiceAmount)
    // Update the form data with the new invoice amount
    handleInputChange({ target: { name: 'paymentInfo.invoiceAmount', value: newInvoiceAmount } });
    handleInputChange({target:{name:'paymentInfo.dueAmount', value: newDueAmount}})
  }, [formData]);

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
          type="text"
          fullWidth
          value={formData ? formData.paymentInfo.ticketPrice : 0}
          onChange={handleInputChangeWithValidation}
          sx={{ mb: 2,
           }}
           inputProps = {{ maxLength: 10}}
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
          type="text"
          fullWidth
          value={formData? formData.paymentInfo.profit : 0}
          onChange={handleInputChangeWithValidation}
          // InputProps={{ inputProps: { min: 0 } }}
          inputProps={{maxLength:3, min:0}} 
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
              RS {formData? formData.paymentInfo.invoiceAmount : invoiceAmount}
            </Typography>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
}

export default TakePaymentInfo;