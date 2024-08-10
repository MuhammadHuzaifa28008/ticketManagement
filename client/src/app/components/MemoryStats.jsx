import React, { useEffect } from 'react';
import { Card, CardContent, Typography, Grid, LinearProgress, useTheme } from '@mui/material';
import { useAppContext } from '../context/AppContext';


function MemoryStats({ storageSize, dataSize }) {
  const theme = useTheme();
const {dbStats}=useAppContext()


useEffect(()=>{
console.log('dbStats updated')
},[dbStats])
  // Convert KB to MB and fix to 2 decimal places
  const storageSizeMB = (storageSize / 1024).toFixed(2);
  const dataSizeMB = (dataSize / 1024).toFixed(2);

  // Calculate the percentage of used memory
  const usedMemoryPercentage = (dataSize / storageSize) * 100;

  // Define colors for visual feedback
  const getColor = (percentage) => {
    if (percentage < 50) return theme.palette.success.main; // Green for less than 50%
    if (percentage < 80) return theme.palette.warning.main; // Yellow for less than 80%
    return theme.palette.error.main; // Red for 80% and above
  };

  return (
    <Card sx={{ maxWidth: 400, margin: 'auto', padding: 2 }}>
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
              sx={{ height: 10, borderRadius: 5 }}
              style={{ backgroundColor: theme.palette.grey[300] }}
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
