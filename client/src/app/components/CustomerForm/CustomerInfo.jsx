import { Grid, Typography, TextField } from '@mui/material';
import DateInput from '../common/inputs/DateInput';

function CustomerInfo({ formData, handleInputChange, handleDateChange, errors }) {
  return (
    <Grid container spacing={2} mt={2}>
      <Grid item xs={12} sm={6} md={6} order={{ xs: 1, md: 1 }}>
        <Typography variant = {'h4'}>Customer Information</Typography>
      </Grid>
      <Grid item xs={12} sm={6} order={{ xs: 2, md: 2 }}>
        <TextField
          required
          label="Customer Name"
          name="customerName"
          fullWidth
          value={formData.customerName}
          onChange={handleInputChange}
          error={!!errors.customerName}
          helperText={errors.customerName}
          sx={{ mb: 2 }}
        />
      </Grid>
      <Grid item xs={12} sm={6} order={{ xs: 3, md: 3 }}>
        <TextField
          label="Email"
          name="email"
          fullWidth
          value={formData.email}
          onChange={handleInputChange}
          sx={{ mb: 2 }}
        />
      </Grid>
      <Grid item xs={12} sm={6} order={{ xs: 4, md: 4 }}>
        <TextField
          required
          label="Phone Number"
          name="phoneNumber"
          fullWidth
          value={formData.phoneNumber}
          onChange={handleInputChange}
          error={!!errors.phoneNumber}
          helperText={errors.phoneNumber}
          sx={{ mb: 2 }}
        />
      </Grid>
      <Grid item xs={12} sm={6} order={{ xs: 5, md: 5 }}>
        <DateInput
          title="Date of Birth"
          value={formData.dob}
          required={true}
          error={!!errors.dob}
          helperText={errors.dob}
          onChange={handleInputChange}
          sx={{ mb: '2em' }}
        />
      </Grid>
    </Grid>
  );
}

export default CustomerInfo;
