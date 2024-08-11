import React from 'react';
import { Typography, Box, Paper } from '@mui/material';
import { useTheme } from '@mui/material/styles';

const NoResults = () => {
  const theme = useTheme();

  return (
    <Box

    >
      <Paper
        sx={{
          padding: theme.spacing(3),
          textAlign: 'center',
          boxShadow: theme.shadows[3],
          borderRadius: theme.shape.borderRadius,
        }}
      >
        <Typography
          variant="h6"
          sx={{ color: theme.palette.text.secondary, marginBottom: theme.spacing(2) }}
        >
          No results found
        </Typography>
        <Typography variant="body2" sx={{ color: theme.palette.text.primary }}>
          Please check your input or try a different search.
        </Typography>
      </Paper>
    </Box>
  );
};

export default NoResults;
