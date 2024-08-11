import React, { useEffect } from 'react';
import { Card, CardContent, Typography, Grid, LinearProgress, useTheme } from '@mui/material';
import { useAppContext } from '../context/AppContext';

function MemoryStats({ storageSize, dataSize }) {
  const theme = useTheme();
  const { dbStats } = useAppContext();

  useEffect(() => {
    console.log('dbStats updated');
  }, [dbStats]);

  // Convert KB to MB and fix to 2 decimal places
  const storageSizeMB = (dbStats.storageSize / 1024).toFixed(2);
  const dataSizeMB = (dbStats.dataSize / 1024).toFixed(2);

  // Calculate the percentage of used memory
  const usedMemoryPercentage = ((dataSizeMB / storageSizeMB) * 100).toFixed(2);

  // Define colors for visual feedback
  const getColor = (percentage) => {
    if (percentage < 50) return theme.palette.success.main; // Green for less than 50%
    if (percentage < 80) return theme.palette.warning.main; // Yellow for less than 80%
    return theme.palette.error.main; // Red for 80% and above
  };

  return (
    <Card
      sx={{
        maxWidth: 400,
        margin: 'auto',
        padding: 2,
        background: `linear-gradient(to right, ${theme.palette.background.paper}, ${theme.palette.background.default})`, // Gradient background
        boxShadow: theme.shadows[5],
      }}
    >
      <CardContent>
        <Typography variant="h6" component="div" gutterBottom>
          Memory Stats
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Typography variant="body1" color="textSecondary">
              Total Memory: {storageSizeMB} MB
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="body1" color="textSecondary">
              Used Memory: {dataSizeMB} MB
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="body2" color="textSecondary">
              Usage:
            </Typography>
            <LinearProgress
              variant="determinate"
              value={usedMemoryPercentage}
              sx={{
                height: 12,
                borderRadius: 5,
                background: `linear-gradient(to right, ${theme.palette.grey[300]}, ${theme.palette.grey[400]})`, // Gradient for the background
                '& .MuiLinearProgress-bar': {
                  background: getColor(usedMemoryPercentage), // Sharp color for the progress bar
                },
              }}
            />
            <Typography variant="body2" align="center" color={getColor(usedMemoryPercentage)}>
              {Math.round(usedMemoryPercentage)}% Used
            </Typography>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
}

export default MemoryStats;
