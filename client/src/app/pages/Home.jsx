import React, { useState } from 'react';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Fab from '@mui/material/Fab';
import Tooltip from '@mui/material/Tooltip';
import AddIcon from '@mui/icons-material/Add';
import { Link } from 'react-router-dom';
import AllCustomers from '../components/AllCustomers/AllCustomers';
import NavBar from '../components/NavBar';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';
import FormDataTest from '../components/test/FormDataTest'



export default function Home() {
  const theme = useTheme();
  const [open, setOpen] = useState(false);

  const customerState = {
    customerName: 'placeholder',
    email: 'placeholder',
    phoneNumber: 'placeholder',
    dob: "date",
    ticketInfo: {
      PNRNo: 'placeholder',
      dateOfTraveling: 'placeholder',
      dateOfIssue: 'date',
    },
    paymentInfo: {
      ticketPrice: 0,
      profit: 0,
      invoiceAmount: 0,
      amountPaid: 0,
      dueAmount: 0,
    }
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Box display='flex' flexDirection='column' height='100vh'>
      <NavBar />
      <AllCustomers />
      <Tooltip title="Add New Customer" arrow>
        <Link to = "add-or-edit-customer-data">
        <Fab
          color="primary"
          aria-label="add"
          onClick={handleClickOpen}
          sx={{
            position: 'fixed',
            bottom: 16,
            right: 16,
            [theme.breakpoints.down('sm')]: {
              bottom: 8,
              right: 8,
            },
          }}
        >
          <AddIcon />
        </Fab>
      </Link>
      </Tooltip>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">Feature Not Available</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            This feature will be introduced after the deal is done.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary" autoFocus>
            OK
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  
  // <FormDataTest />
  
  );
}
