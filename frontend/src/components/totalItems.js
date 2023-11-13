import React from 'react';
import { Typography, Box } from '@mui/material';
import { observer } from 'mobx-react';
import { useStore } from '../itemsStore';

const TotalItems = observer(() => {
  const itemsStore = useStore();

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
        <Typography sx={{ mt: 3 }} align='left' color='primary' variant="h5">סה"כ: {itemsStore.totalItems} מוצרים בסל</Typography>
      </div>
    </Box>
  );
});

export default TotalItems;
