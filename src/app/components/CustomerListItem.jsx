import React from 'react';
import { ListItemButton, Container, Stack, ListItemAvatar, ListItemText, Avatar, Typography, Box } from '@mui/material';
import MailIcon from '@mui/icons-material/Mail';
import PhoneIcon from '@mui/icons-material/Phone';
import PaymentIcon from '@mui/icons-material/Payment';
import { useTheme } from '@mui/material';


const CustomerListItem = ({ customer }) => {


    const theme  = useTheme()


    return (
        <ListItemButton  sx = {{ ...theme.components.MuiCard.styleOverrides.root }} alignItems="flex-start" justifyContent="space-between" border="1.5px solid gray" flexDirection="row">
            <Stack direction="row" spacing={15} useFlexGap>
                <Box sx={{ display: 'flex', flexDirection: 'row' }}>
                    <ListItemAvatar>
                        <Avatar>{customer.customerName[0]}</Avatar>
                    </ListItemAvatar>
                    <ListItemText
                        primary={customer.customerName}
                        secondary={
                            <>
                                <Typography variant="body2" color="text.primary">
                                    <MailIcon sx={{ verticalAlign: 'middle', mr: '5px' }} />
                                    {customer.email}
                                </Typography>
                                <Typography variant="body2" color="text.primary">
                                    <PhoneIcon sx={{ verticalAlign: 'middle', mr: '5px' }} />
                                    {customer.phoneNumber}
                                </Typography>
                                <Typography variant="body2" color="text.primary">
                                    <PaymentIcon sx={{ verticalAlign: 'middle', mr: 1 }} />
                                    {customer.paymentInfo.paymentMethod}
                                </Typography>
                            </>
                        }
                    />
                </Box>
                <ListItemText
                    primary={
                        <Box sx={{ width: "auto", border: '1px solid pink', flexDirection: 'column', justifyContent: 'space-between' }}>
                            <Typography> date of travel {customer.ticketInfo.dateOfTraveling} </Typography>
                            <Typography> date of issue {customer.ticketInfo.dateOfIssue} </Typography>
                        </Box>
                    }
                />
                <ListItemText
                    secondary={
                        <Box sx={{ width: "5em", border: '1px solid pink' }}>
                            <Typography>{customer.paymentInfo.dueAmount} RS</Typography>
                        </Box>
                    }
                />
            </Stack>
        </ListItemButton>
    );
}

export default CustomerListItem;
