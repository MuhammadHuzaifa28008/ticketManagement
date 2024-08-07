import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import {
  Container,
  Typography,
  TextField,
  Button,
  List,
  ListItem,
  ListItemText,
  Box,
  Divider,
  CircularProgress,
  Paper,
  useTheme,
} from '@mui/material';
import useApiCall from '../../hooks/useApiCall';
import LoadingBackdrop from '../common/FeedBack/LoadingBackDrop';
import CustomSnackbar from '../common/FeedBack/SnackBar';
import { formatDateReadable } from '../../utils/formatDate';

const RecordPayment = () => {
  const theme = useTheme();
  const { id } = useParams();
  const { makeApiCall, data, error, loading } = useApiCall();
  const [paymentAmount, setPaymentAmount] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('');
  const [paymentMethods, setPaymentMethods] = useState(['Cash', 'Credit Card', 'Bank Transfer']); // Static list for demo
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [previousPayments, setPreviousPayments] = useState([]);

  useEffect(() => {
    const fetchUserData = async () => {
      await makeApiCall(`http://localhost:5000/customer/${id}`, {
        method: 'get'
      });
    };
    
    fetchUserData();
  }, []);

  useEffect(() => {
    if (data) {
      setPreviousPayments(data.paymentInfo.paymentRecords || []);
    }
    if(error) setSnackbarMessage(error.error)
  }, [data, loading, error]);

  const handlePaymentSubmit = () => {
    if (parseFloat(paymentAmount) > parseFloat(data.paymentInfo.dueAmount)) {
      setSnackbarMessage('Amount cannot exceed due amount');
      setSnackbarOpen(true);
      return;
    }

    // Submit payment logic here

    // On success
    setSnackbarMessage('Payment recorded successfully');
    setSnackbarOpen(true);

    // Clear form fields
    setPaymentAmount('');
    setPaymentMethod('');
  };

  if (loading) return <LoadingBackdrop open={loading} />;
  if (error) return <Typography color="error">Error fetching data</Typography>;

  return (
    <Container sx={{ paddingY: 4 }}>
      <Paper sx={{ padding: 3, marginBottom: 4, backgroundColor: theme.palette.background.paper }}>
        <Typography variant="h1" color="text.primary" fontSize={'5rem'}>
    {data?.customerName}
        </Typography>
        <Typography variant="h6" color="text.secondary">
          Due Amount: ${data?.paymentInfo.dueAmount}
        </Typography>
        <Typography variant="h6" color="text.secondary">
          Invoice Amount: ${data?.paymentInfo.invoiceAmount}
        </Typography>
      </Paper>
      <Box sx={{ marginBottom: 4 }}>
        <Typography variant="h5" gutterBottom>
          Previous Payments
        </Typography>
        <List>
          {previousPayments.length > 0 &&
            previousPayments.map((payment, index) => (
              <React.Fragment key={index}>
                <ListItem>
                  <ListItemText
                    primary={`Amount: $${payment.amount.toFixed(2)}`}
                    secondary={`Method: ${payment.method} | Time: ${formatDateReadable(payment.time)}`}
                  />
                </ListItem>
                {index < previousPayments.length - 1 && <Divider />}
              </React.Fragment>
            ))
          }
        </List>
      </Box>

      <Paper sx={{ padding: 3, backgroundColor: theme.palette.background.paper }}>
        <Typography variant="h5" gutterBottom>
          Record New Payment
        </Typography>
        <TextField
          label="Amount"
          type="number"
          value={paymentAmount}
          onChange={(e) => setPaymentAmount(e.target.value)}
          fullWidth
          margin="normal"
          sx={{ marginBottom: 2 }}
          InputProps={{ startAdornment: <Box sx={{ mr: 1 }}>RS</Box> }}
        />
        <TextField
          label="Payment Method"
          select
          value={paymentMethod}
          onChange={(e) => setPaymentMethod(e.target.value)}
          fullWidth
          margin="normal"
          SelectProps={{ native: true }}
        >
          {paymentMethods.map((method, index) => (
            <option key={index} value={method}>
              {method}
            </option>
          ))}
        </TextField>
        <Button
          variant="contained"
          color="primary"
          onClick={handlePaymentSubmit}
          fullWidth
          sx={{ mt: 2 }}
        >
          Record Payment
        </Button>
      </Paper>

      <CustomSnackbar
        openSB={!! snackbarMessage}
        message={snackbarMessage}
        onCloseSB={() => setSnackbarMessage('')}
        severity={data?'success': error? 'error': 'warning'}
      />
    </Container>
  );
};

export default RecordPayment;
