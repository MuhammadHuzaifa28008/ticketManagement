import React from 'react';
import { useAppContext } from '../context/AppContext';
import MailIcon from '@mui/icons-material/Mail';
import PhoneIcon from '@mui/icons-material/Phone';
import PaymentIcon from '@mui/icons-material/Payment';
import { Box, Avatar, Typography, List, ListItem, ListItemAvatar, ListItemText } from '@mui/material';

function AllCustomers() {
  const { userData } = useAppContext();

  return (
    <Box sx={{ width: '100%', height: '100%', bgcolor: 'background.paper', border: '2px solid black' }}>
      <Typography variant="h4" component="h1" gutterBottom>
        All Customers
      </Typography>
      {userData ? (
        <List sx ={{
          width: '100%',
          height: '100%',
          padding: '5px'
        }}>
          {userData.map((user, index) => (
            <ListItem key={index} alignItems="flex-start">
              <ListItemAvatar>
                <Avatar>{user.customerName[0]}</Avatar>
              </ListItemAvatar>
              <ListItemText
                primary={user.customerName}
                secondary={
                  <>
                    <Typography variant="body2" color="text.primary">
                      <MailIcon sx={{ verticalAlign: 'middle', mr: '5px' }} />
                      {user.email}
                    </Typography>
                    <Typography variant="body2" color="text.primary">
                      <PhoneIcon sx={{ verticalAlign: 'middle', mr: '5px' }} />
                      {user.phoneNumber}
                    </Typography>
                    <Typography variant="body2" color="text.primary">
                      <PaymentIcon sx={{ verticalAlign: 'middle', mr: 1 }} />
                      {user.paymentMethod}
                    </Typography>
                  </>
                }
              />
            </ListItem>
          ))}
        </List>
      ) : (
        <Typography variant="body1">Loading...</Typography>
      )}
    </Box>
  );
}

export default AllCustomers;
