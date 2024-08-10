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
import MemoryStats from '../components/MemoryStats';
import { useAppContext } from '../context/AppContext';


export default function Home() {
  const theme = useTheme();
  const [open, setOpen] = useState(false);

  // Example memory stats data
  const memoryStatsData = {
    storageSize: 45056, // in KB
    dataSize: 18218,    // in KB
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
      
      {/* MemoryStats Component */}
      <Box sx={{ padding: theme.spacing(2) }}>
        <MemoryStats
          storageSize={memoryStatsData.storageSize}
          dataSize={memoryStatsData.dataSize}
        />
      </Box>

      {/* AllCustomers Component */}
      <AllCustomers />
      
      {/* Floating Action Button with Tooltip */}
      <Tooltip title="Add New Customer" arrow>
        <Link to="/add-customer">
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
      
      {/* Dialog for Feature Not Available */}
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
  );
}
