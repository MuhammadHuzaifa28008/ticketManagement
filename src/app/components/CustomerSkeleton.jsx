import React from 'react';
import { Box, Skeleton } from '@mui/material';

const CustomerSkeleton = () => (
  <Box sx={{ width: '100%', height: "100%" }}>
    <Skeleton height={100} />
    <Skeleton animation="wave" height={100} />
    <Skeleton animation={false} height={100} />
    <Skeleton variant="rounded" mb="5px" height={100} />
  </Box>
);

export default CustomerSkeleton;
