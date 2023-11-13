import { Typography, Box } from '@mui/material';
import React, { useState, useEffect } from 'react';
import ProductsService from '../services/productsService';

export default function TotalItems() {
  const [productsCount, setProductsCount] = useState(0);

  const getProductsCount = async () => {
    ProductsService.getProductsCount()
      .then(response => {
        setProductsCount(response.data.productsCount);
      })
      .catch(e => {
        console.log(e);
      });
  };

  useEffect(() => {
    getProductsCount();
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
