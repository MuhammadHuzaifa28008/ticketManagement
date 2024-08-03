import React, { useEffect, useState } from 'react';
import { useAppContext } from '../context/AppContext';
import { Box, TextField, InputAdornment } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
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
    setCustomers(query === '' ? allCustomers : filteredCustomers);
  }, [query, filteredCustomers, allCustomers]);

  return (
    <Box
      sx={{
        width: '100%',
        maxWidth: '800px',
        mx: 'auto',
        mt: 4,
        px: 2,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      <TextField
        id="customer-search"
        label="Search by Name or PNR#"
        variant="outlined"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        sx={{ marginBottom: 2, width: '100%' }}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon />
            </InputAdornment>
          ),
        }}
        autoFocus
      />

      {customers.length > 0 ? (
        <CustomerList customers={customers} />
      ) : query ? (
        <NoResults />
      ) : (
        <>
          <CustomerSkeleton />
          <CustomerSkeleton />
          <CustomerSkeleton />
        </>
      )}
    </Box>
  );
}

export default AllCustomers;
