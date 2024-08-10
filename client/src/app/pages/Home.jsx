import React, { useState } from 'react';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Fab from '@mui/material/Fab';
import Tooltip from '@mui/material/Tooltip';
import AddIcon from '@mui/icons-material/Add';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import { Link } from 'react-router-dom';
import AllCustomers from '../components/AllCustomers/AllCustomers';
import NavBar from '../components/NavBar';
import MemoryStats from '../components/MemoryStats';

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

  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <Box display="flex" flexDirection="column" height="100vh">
      <NavBar />
      
      {/* Grid Layout for MemoryStats and AllCustomers */}
      <Grid container spacing={2} sx={{ padding: theme.spacing(2) }}>
        <Grid item xs={12} md={4}>
          <MemoryStats
            storageSize={memoryStatsData.storageSize}
            dataSize={memoryStatsData.dataSize}
          />
        </Grid>
        <Grid item xs={12} md={8}>
          <AllCustomers />
        </Grid>
      </Grid>
      
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
      
      {/* Scroll-to-Top Button */}
      <Tooltip title="Scroll to Top" arrow>
        <Fab
          color="secondary"
          aria-label="scroll-to-top"
          onClick={handleScrollToTop}
          sx={{
            position: 'fixed',
            bottom: 16,
            left: 16,
            [theme.breakpoints.down('sm')]: {
              bottom: 8,
              left: 8,
            },
          }}
        >
          <ArrowUpwardIcon />
        </Fab>
      </Tooltip>
      
    </Box>
  );
}
