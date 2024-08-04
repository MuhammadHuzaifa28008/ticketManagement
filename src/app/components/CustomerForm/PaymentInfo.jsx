import {Grid,TextField} from '@mui/material';



function PaymentInfo({ formData, handleInputChange }) {
    return (
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            label="Ticket Price"
            name="paymentInfo.ticketPrice"
            type="number"
            fullWidth
            value={formData.paymentInfo.ticketPrice}
            onChange={handleInputChange}
            sx={{ mb: 2 }}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            label="Profit"
            name="paymentInfo.profit"
            type="number"
            fullWidth
            value={formData.paymentInfo.profit}
            onChange={handleInputChange}
            sx={{ mb: 2 }}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            label="Amount Paid"
            name="paymentInfo.amountPaid"
            type="number"
            fullWidth
            value={formData.paymentInfo.amountPaid}
            onChange={handleInputChange}
            sx={{ mb: 2 }}
          />
        </Grid>
      </Grid>
    );
  }

  export default PaymentInfo