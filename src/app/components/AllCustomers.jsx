import React, { useEffect, useState } from 'react';
import { useAppContext } from '../context/AppContext';
import { Box, TextField } from '@mui/material';
import useDynamicFilter from '../hooks/useDynamicFilter';
import CustomerList from './CustomerList';
import CustomerSkeleton from './CustomerSkeleton';
import NoResults from './NoResults';

function AllCustomers() {
  const { allCustomers } = useAppContext();
  const [customers, setCustomers] = useState([]);
  const [query, setQuery] = useState('');
  const filteredCustomers = useDynamicFilter(allCustomers, 'customerName', 'ticketInfo.PNRNo', query);

  // Update filtered customers when query or allCustomers change
  useEffect(() => {
    if (query === '') {
      setCustomers(allCustomers);
    } else {
      if (filteredCustomers) setCustomers(filteredCustomers);
    }
  }, [query, filteredCustomers, allCustomers]);

  // Ensure initial load sets all customers
  useEffect(() => {
    setCustomers(allCustomers);
  }, [allCustomers]);

  return (
    <Box sx={{ width: '100%', height: '100%', bgcolor: 'background.paper', border: '2px solid black' }}>
      <TextField
        id="outlined-basic"
        label="Name or PNR#"
        variant="outlined"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        sx={{ marginBottom: '16px' }}
      />

      {customers.length > 0 ? (
        <CustomerList customers={customers} />
      ) : query ? (
        <NoResults />
      ) : (
        <CustomerSkeleton />
      )}
    </Box>
  );
}

export default AllCustomers;
