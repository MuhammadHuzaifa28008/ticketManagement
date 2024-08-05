import React from 'react';
import { ListItem, useMediaQuery, Stack, ListItemAvatar, Avatar, Typography, Box, IconButton } from '@mui/material';
import MailIcon from '@mui/icons-material/Mail';
import ConfirmationNumberIcon from '@mui/icons-material/ConfirmationNumber';
import PhoneIcon from '@mui/icons-material/Phone';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import CustomerDetails from './CustomerDetails';
import { useTheme } from '@mui/material/styles';
import { Link } from 'react-router-dom';

const CustomerListItem = ({ customer, onDelete }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  return (
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
        alignItems: isMobile ? 'center' : 'flex-start', // Center on mobile, align left otherwise
        // alignItems: 'flex-start', // Center on mobile, align left otherwise
      }}
    >
      <Stack
        direction="row"
        spacing={2}
        alignItems="center"
        sx={{ width: '100%', mb: isMobile ? 2 : 0 }}
      >
        <ListItemAvatar>
          <Avatar>{customer.customerName[0]}</Avatar>
        </ListItemAvatar>
        <Box sx={{ ml: 2, flex: 1 }}>
          <Typography variant="h6" noWrap>
            {customer.customerName}
          </Typography>
          <Typography variant="body2" color="text.primary" display="flex" alignItems="center" noWrap>
            <ConfirmationNumberIcon sx={{ verticalAlign: 'middle', mr: theme.spacing(1) }} />
            {customer.ticketInfo.PNRNo}
          </Typography>
          <Typography variant="body2" color="text.primary" display="flex" alignItems="center" noWrap>
            <PhoneIcon sx={{ verticalAlign: 'middle', mr: theme.spacing(1) }} />
            {customer.phoneNumber}
          </Typography>
        </Box>
      </Stack>

      {/* Customer Details Section */}
      <CustomerDetails customer={customer} sx={{ width: '100%', mb: isMobile ? 2 : 0 }} />

      {/* Action Buttons */}
      <Stack
        direction="row"
        spacing={1}
        sx={{
          mt: isMobile ? 2 : 0,
          ml: isMobile ? 0 : 'auto',
          justifyContent: 'flex-end',
          width: isMobile ? '100%' : 'auto',
        }}
      >
        <Link to= '/add-or-edit-customer-data' state = { customer } >
        <IconButton
          edge="end"
          aria-label="edit"
          // onClick={onEdit}
          sx={{
            color: theme.palette.text.primary,
            '&:hover': {
              backgroundColor: theme.palette.action.hover,
            },
          }}
          >
          <EditIcon />
        </IconButton>
          </Link>
        <IconButton
          edge="end"
          aria-label="delete"
          onClick={onDelete}
          sx={{
            color: theme.palette.error.main,
            '&:hover': {
              backgroundColor: theme.palette.error.light,
            },
          }}
        >
          <DeleteIcon />
        </IconButton>
      </Stack>
    </ListItem>
  );
};

export default CustomerListItem;