import { Box, Paper, Typography, Button, TextField } from '@mui/material';
import { useState } from 'react';

export default function Calculator() {
  return (
    <Box sx={{ p: 4, maxWidth: 800, mx: 'auto' }}>
      <Paper elevation={3} sx={{ p: 4 }}>
        <Typography variant="h4" gutterBottom>
          Calculateur ACV CarbonLoop
        </Typography>
        
        <TextField 
          fullWidth 
          label="Émissions CO2 (kg)" 
          variant="outlined" 
          sx={{ mb: 2 }}
        />
        
        <Button 
          variant="contained" 
          size="large" 
          fullWidth
        >
          Calculer Empreinte
        </Button>
      </Paper>
    </Box>
  );
}
