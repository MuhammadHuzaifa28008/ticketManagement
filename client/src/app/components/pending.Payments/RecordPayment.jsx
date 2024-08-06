import React from 'react';
import { useParams } from 'react-router-dom';
import { Container, Typography } from '@mui/material';
import useApiCall from '../../hooks/useApiCall';
import LoadingBackdrop from '../common/FeedBack/LoadingBackDrop';
import { formatDateReadable } from '../../utils/formatDate';
import CustomSnackbar from '../common/FeedBack/SnackBar';




const RecordPayment = () => {
  const { id } = useParams();
  //  make api call to get user by id from get http://localhost:5000/customer/:id
const {makeApiCall, data, error, loading} = useApiCall()
  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Record Payment
      </Typography>
      <Typography variant="body1">
        {/*  A very sexy display of uer name */}
        {/* A very huge display of due amount */}
        {/* A very huge display of invoice Amount */}
        {/* Above is banner content of page */}
        {/* */}
        {/* now input form for recording payment if no prev payments array->[customer.paymentInfo.paymentRecords] were made  */}
        {/* if prev payments were made find a fabolus way to display them entries include time, amt, method*/}
        {/* now these are two [not time] entries that we need to take as input for new payment record */}
        {/* amt cannot be more than customer.paymentInfo.dueAmount  */}
        {/* time will not be taken as input but set automatically as present utc5 time and just be displayed as output*/}
        {/* method will from a searchable list */}
        {/* method will from a searchable list */}
        {/* snackbar should be used for action feedback*/}

      </Typography>
      {/* Add payment form and logic here */}
    </Container>
  );
};

export default RecordPayment;
