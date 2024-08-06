import React from 'react';
import { Box, AppBar,  Toolbar, IconButton, Typography, Badge, Menu, MenuItem } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney'; // Icon for pending payments
import AirplaneTicketIcon from '@mui/icons-material/AirplaneTicket'; // Icon for flights
import MoreIcon from '@mui/icons-material/MoreVert';

export default function NavBar() {
  const theme = useTheme();
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);

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
      <MenuItem>
        <IconButton size="large" aria-label="show pending payments" color="inherit">
          <Badge badgeContent={4} color="error">
            <AttachMoneyIcon />
          </Badge>
        </IconButton>
        <p>Pending Payments</p>
      </MenuItem>
      <MenuItem>
        <IconButton size="large" aria-label="show flight notifications" color="inherit">
          <Badge badgeContent={17} color="error">
            <AirplaneTicketIcon />
          </Badge>
        </IconButton>
        <p>Flights</p>
      </MenuItem>
    </Menu>
  );

  return (
    <AppBar position="static" sx={{ backgroundColor: theme.palette.primary.main }}>
      <Toolbar>
        <Typography variant="h6" noWrap sx={{ flexGrow: 1 }}>
          Logo
        </Typography>
        <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
          <IconButton size="large" aria-label="show pending payments" color="inherit">
            <Badge badgeContent={4} color="error">
              <AttachMoneyIcon />
            </Badge>
          </IconButton>
          <IconButton size="large" aria-label="show flight notifications" color="inherit">
            <Badge badgeContent={17} color="error">
              <AirplaneTicketIcon />
            </Badge>
          </IconButton>
        </Box>
        <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
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
}
