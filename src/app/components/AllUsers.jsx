import React from 'react';
import { useAppContext } from '../context/AppContext';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemText from '@mui/material/ListItemText';
import Avatar from '@mui/material/Avatar';
import MailIcon from '@mui/icons-material/Mail';
import PhoneIcon from '@mui/icons-material/Phone';
import PaymentIcon from '@mui/icons-material/Payment';

function AllUsers() {
  const { userData } = useAppContext();

  return (
    <Box sx={{ width: '100%',  bgcolor: 'background.paper', p: 2, m: 'auto' }}  gutterBottom>
      <Typography variant="h4" component="h1" >
        All Users
      </Typography>
      {userData ? (
        <List width = '100%' height = '100%' >
          {userData.map((user, index) => (
            <ListItem key={index} alignItems="flex-start" flexDirection = 'column'>
              <ListItemAvatar>
                <Avatar>{user.customerName[0]}</Avatar>
              </ListItemAvatar>
              <ListItemText
                primary={user.customerName}
                secondary={
                  <>
                    <Typography variant="body2" color="text.primary">
                      <MailIcon sx={{ verticalAlign: 'middle', mr: 1 }} />
                      {user.email}
                    </Typography>
                    <Typography variant="body2" color="text.primary">
                      <PhoneIcon sx={{ verticalAlign: 'middle', mr: 1 }} />
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

export default AllUsers;
