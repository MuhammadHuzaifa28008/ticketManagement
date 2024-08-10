import React, { useEffect, useState } from 'react';
import { ListItem, useMediaQuery, Stack } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { useAppContext } from '../../context/AppContext';
import useApiCall from '../../hooks/useApiCall';
import CustomerInfo from './CustomerListItem.components/CustomerInfo';
import FlightAndPaymentDetails from './CustomerListItem.components/FlightAndPaymentDetails';
import CustomerActionButtons from './CustomerListItem.components/CustomerActionButtons';
import ConfirmationDialog from '../../components/common/FeedBack/ConfirmationDialog';
import LoadingBackdrop from '../../components/common/FeedBack/LoadingBackDrop';
import CustomSnackbar from '../../components/common/FeedBack/SnackBar'; // Adjust the import path as needed

const CustomerListItem = ({ customer }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [openDialog, setOpenDialog] = useState(false);
  const [openBackdrop, setOpenBackdrop] = useState(false);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('success');
  const { loading, makeApiCall, error } = useApiCall();
  const { setFetch } = useAppContext();



useEffect(()=>{
  if(!loading){

    if (!error) {
      setSnackbarMessage(`${customer.customerName} deleted successfully`);
      setSnackbarSeverity('success');
      setFetch(true);
    } else {
      setSnackbarMessage(error.error || 'Error deleting customer');
      setSnackbarSeverity('error');
    }
  }
},[error, loading])



  const handleDelete = async () => {
    setOpenBackdrop(true);
    try {
      await makeApiCall(`http://localhost:5000/customer/${customer._id}`, { method: 'DELETE' });

    } catch (err) {
      setSnackbarMessage('Error deleting customer');
      setSnackbarSeverity('error');
      console.error('Error deleting customer:', err);
    } finally {
      setOpenBackdrop(false);
      setOpenSnackbar(true);
    }
  };

  const handleDeleteClick = () => {
    if (customer.paymentInfo.dueAmount > 0) {
      setOpenDialog(true);
    } else {
      handleDelete();
    }
  };

  const handleSnackbarClose = () => {
    setOpenSnackbar(false);
  };

  return (
    <>
      <ListItem
        sx={{
          backgroundColor: theme.palette.background.paper,
          marginBottom: theme.spacing(2),
          width: '100%',
          maxWidth: '40rem',
          padding: theme.spacing(2),
          borderRadius: theme.shape.borderRadius,
          display: 'flex',
          flexDirection: isMobile ? 'column' : 'row',
          alignItems: isMobile ? 'center' : 'flex-start',
        }}
      >
        <Stack direction={isMobile ? 'column' : 'row'} spacing={2} alignItems="center" sx={{ width: '100%' }}>
          <CustomerInfo customer={customer} />
          <FlightAndPaymentDetails customer={customer} />
        </Stack>

        <CustomerActionButtons customer={customer} onDeleteClick={handleDeleteClick} />
      </ListItem>

      <LoadingBackdrop open={loading} />

      <ConfirmationDialog
        open={openDialog}
        onClose={() => setOpenDialog(false)}
        onConfirm={() => { setOpenDialog(false); handleDelete(); }}
        dueAmount={customer.paymentInfo.dueAmount}
      />

      <CustomSnackbar
        message={snackbarMessage}
        severity={snackbarSeverity}
        openSB={openSnackbar}
        onCloseSB={handleSnackbarClose}
      />
    </>
  );
};

export default CustomerListItem;
