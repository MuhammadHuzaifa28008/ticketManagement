import DateInput from '../common/inputs/DateInput';
import { Grid, TextField, Typography } from '@mui/material';
import {formatDate} from '../../utils/formatDate';



function TakeTicketInfo({ formData, handleInputChange, handleDateChange, errors }) {
  return (
    <Grid container spacing={2} mt={5}>
      <Grid item xs={12} sm={6} md={6} order={{ xs: 1, md: 1 }}>
        <Typography variant='h4'>Flight information</Typography>
      </Grid>
      <Grid item xs={12} sm={6} md={6} order={{ xs: 1, md: 1 }}>
        <TextField
          required
          label="PNR No"
          name="ticketInfo.PNRNo"
          fullWidth
          value={formData.ticketInfo.PNRNo}
          onChange={handleInputChange}
          sx={{ mb: 2 }}
          error = {!!errors.PNRNo}
          helperText={errors.PNRNo}

          inputProps={{maxLength:20}} 
        />
      </Grid>
      <Grid item xs={12} sm={6} md={6} order={{ xs: 2, md: 2 }}>
        <DateInput
          title="Date of Traveling"
          name= "ticketInfo.dateOfTraveling"
          value={formData.ticketInfo?.dateOfTraveling}
          required={true}
          onChange={handleDateChange}
          error = {!! errors.dateOfTraveling}
          helperText={errors.dateOfTraveling}
        />
      </Grid>
      <Grid item xs={12} sm={6} md={6} order={{ xs: 3, md: 3 }}>
        <DateInput
          title="Date of Issue"
          name="ticketInfo.dateOfIssue"
          value={formData.ticketInfo?.dateOfIssue}
          required={true}
          onChange={handleDateChange}
          error = {!!errors.dateOfIssue}
          helperText={errors.dateOfIssue}

        />
      </Grid>
    </Grid>
  );
}

export default TakeTicketInfo;
