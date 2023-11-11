import {
  TextField,
  Button,
  Typography,
  Box,
  Select,
  MenuItem,
  InputLabel
} from '@mui/material';
import React, { useState, useEffect } from 'react';

export default function TotalItems() {
  const [productsCount, setProductsCount] = useState(0);

  useEffect(() => {
    const getCategories = async () => {
      try {
        const response = await fetch(
          'http://localhost:4000/products_count'
        );
        const data = await response.json();
        setProductsCount(data);
      } catch (error) {
        console.log(error);
      }
    };
  }, []);

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        '& .MuiButton-root': { width: '15ch' },
        '& .MuiTextField-root': { width: '50ch' }
      }}
    >
      <div>
        <Typography sx={{ mt: 3 }} align='left' color='primary' variant="h5">סה"כ: {productsCount} מוצרים</Typography>
      </div>
    </Box>
  );
}
