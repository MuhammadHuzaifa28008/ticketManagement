import React from 'react';
import { List, ListItemButton, ListItemAvatar, ListItemText, Avatar, Typography } from '@mui/material';
import MailIcon from '@mui/icons-material/Mail';
import PhoneIcon from '@mui/icons-material/Phone';
import PaymentIcon from '@mui/icons-material/Payment';
import CustomerListItem from './CustomerListItem';

const CustomerList = ({ customers }) => (
  <List sx={{ width: '100%', height: '100%', padding: '5px',  display:'flex',flexDirection:'column', alignItems:'center'}}>
    {customers.map((customer, index) => (
      <CustomerListItem key={index} customer={customer} />
    ))}
  </List>
);

export default CustomerList;
