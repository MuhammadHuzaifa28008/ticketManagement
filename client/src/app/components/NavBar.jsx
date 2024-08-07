import React, { useState, useEffect } from 'react';
import { Box, AppBar, Toolbar, IconButton, Typography, Badge, Menu, MenuItem } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import AirplaneTicketIcon from '@mui/icons-material/AirplaneTicket';
import MoreIcon from '@mui/icons-material/MoreVert';
import { Link } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';

const NavBar = () => {
  const theme = useTheme();
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = useState(null);
  const { allCustomers } = useAppContext();
  const [duePayments, setDuePayments] = useState(0);
  const [flights, setFlights] = useState(0);

  useEffect(() => {
    const today = new Date();
    let duePaymentsCount = 0;
    let flightsCount = 0;

    allCustomers.forEach(customer => {
      if (customer.paymentInfo.dueAmount > 0) {
        duePaymentsCount++;
      }
      if (new Date(customer.ticketInfo.dateOfTraveling) >= today) {
        flightsCount++;
      }
    },[allCustomers]);

    setDuePayments(duePaymentsCount);
    setFlights(flightsCount);
  }, [allCustomers]);

  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      id="primary-search-account-menu-mobile"
      keepMounted
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <MenuItem onClick={handleMobileMenuClose} component={Link} to="/payments">
        <IconButton size="large" aria-label="show pending payments" color="inherit">
          <Badge badgeContent={duePayments} color="error">
            <AttachMoneyIcon />
          </Badge>
        </IconButton>
        <Typography variant="body2">Pending Payments</Typography>
      </MenuItem>
      <MenuItem onClick={handleMobileMenuClose}>
        <IconButton size="large" aria-label="show flight notifications" color="inherit">
          <Badge badgeContent={flights} color="error">
            <AirplaneTicketIcon />
          </Badge>
        </IconButton>
        <Typography variant="body2">Flights</Typography>
      </MenuItem>
    </Menu>
  );

  return (
    <AppBar
      position="static"
      sx={{
        backgroundColor: theme.palette.primary.dark,
        padding: theme.spacing(1),
        boxShadow: theme.shadows[4],
      }}
    >
      <Toolbar>
        <Typography
          variant="h6"
          noWrap
          sx={{
            flexGrow: 1,
            fontWeight: 'bold',
            cursor: 'pointer',
            transition: 'color 0.3s',
            '&:hover': {
              color: theme.palette.secondary.main,
            },
          }}
        >
          Logo
        </Typography>
        <Box sx={{ display: { xs: 'none', md: 'flex' }, alignItems: 'center' }}>
          <IconButton
            size="large"
            aria-label="show pending payments"
            color="inherit"
            component={Link}
            to="/payments"
            sx={{
              transition: 'transform 0.2s',
              '&:hover': {
                transform: 'scale(1.1)',
              },
            }}
          >
            <Badge badgeContent={duePayments} color="error">
              <AttachMoneyIcon />
            </Badge>
          </IconButton>
          <IconButton
            size="large"
            aria-label="show flight notifications"
            color="inherit"
            sx={{
              transition: 'transform 0.2s',
              '&:hover': {
                transform: 'scale(1.1)',
              },
            }}
          >
            <Badge badgeContent={flights} color="error">
              <AirplaneTicketIcon />
            </Badge>
          </IconButton>
        </Box>
        <Box sx={{ display: { xs: 'flex', md: 'none' }, alignItems: 'center' }}>
          <IconButton
            size="large"
            aria-label="show more"
            aria-controls="primary-search-account-menu-mobile"
            aria-haspopup="true"
            onClick={handleMobileMenuOpen}
            color="inherit"
          >
            <MoreIcon />
          </IconButton>
        </Box>
      </Toolbar>
      {renderMobileMenu}
    </AppBar>
  );
};

export default NavBar;
