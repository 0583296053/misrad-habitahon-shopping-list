import {
  TextField, Button, Typography,
  Box, Select, MenuItem, InputLabel,
  List, ListSubheader, ListItemButton, ListItemIcon, ListItemText,
  Collapse, ExpandLess, ExpandMore
} from '@mui/material';
import React, { useState, useEffect } from 'react';
import TotalItems from './totalItems';

export default function ShoppingList() {
  const [open, setOpen] = useState(true);
  const [categories, setCategories] = useState([]);
  const [productName, setProductName] = useState('');
  const [productCategory, setProductCategory] = useState('');
  const [product, setProduct] = useState({});
  const [productsByCategories, setProductsByCategories] = useState([]);

  const init = () => {
    // get all categories
    setCategories(['zzz', 'cc']);
  };

  useEffect(() => {
    const getCategories = async () => {
      try {
        const response = await fetch(
          'http://localhost:4000/categories'
        );
        const data = await response.json();
        setCategories(data);
      } catch (error) {
        console.log(error);
      }
    };

    const getProductsByCategories = async () => {
      try {
        const response = await fetch(
          'http://localhost:4000/products_by_categories'
        );
        const data = await response.json();
        setProductsByCategories(data);
      } catch (error) {
        console.log(error);
      }
    };
  }, []);

  const addProduct = async (name, categoryId) => {
    const response = await fetch('http://localhost:4000/add_product', {
      method: 'POST',
      body: JSON.stringify({
        name,
        categoryId
      }),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    });

    const data = await response.json();

    setProduct(data);

    setProductName('');
    setProductCategory('');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    addProduct(productName, productCategory);
 };

  const handleClick = (category) => {
    setOpen(!open);
  };

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
        <Typography sx={{ mt: 3 }} align='center' color='primary' variant="h5">רשימת קניות</Typography>
      </div>

      <div>
        <TotalItems />
      </div>

      <div>
        <Typography sx={{ mt: 3 }} align='center' color='primary' variant="p">הוספת מוצר</Typography>
      </div>

      <div>
        <TextField
          onChange={(event) => setProductName(event.target.value)}
          value={productName}
          id='product-name'
          label='שם המוצר'
          variant='outlined'
          margin='normal'
          required
          fullWidth
          align='center'>
        </TextField>
      </div>

      <div>
        <InputLabel id="product-category-label">קטגוריה</InputLabel>
        <Select
          labelId="product-category-label"
          id="product-category"
          value={productCategory}
          label="קטגוריה"
          onChange={(event) => setProductCategory(event.target.value)}
        >
          {
            categories.map((category, index) => {
              return (
                <MenuItem key={index} value={category}>{category}</MenuItem>
              );
            })
          }
        </Select>
      </div>

      <div>
        <Button
          type='submit'
          align='center'
          variant='contained'
          color='primary'
          onClick={() => { alert(`הוספת בהצלחה את המוצר ${productName} תחת קטגוריה ${productCategory} לרשימת הקניות`) }}>הוסף לרשימת הקניות
        </Button>
      </div>

      <div>
        <Typography sx={{ mt: 3 }} align='center' color='primary' variant="h5">יש לאסוף מוצרים אלו במחלקות המתאימות</Typography>
      </div>

      <div>
        <List
          sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}
          component="nav"
          aria-labelledby="nested-list-subheader"
          subheader={
            <ListSubheader component="div" id="nested-list-subheader">
              רשימת המוצרים שבחרת:
            </ListSubheader>
          }
        >
          {
            productsByCategories.map((category, index) => {
              return (
                <div>
                  <ListItemButton onClick={handleClick(category)}>
                    <ListItemText primary={category} />
                    {/* {open ? <ExpandLess /> : <ExpandMore />} */}
                  </ListItemButton>

                  <Collapse in={open} timeout="auto" unmountOnExit>
                    <List component="div" disablePadding>
                      <ListItemButton sx={{ pl: 4 }}>
                        <ListItemText primary="Starred" />
                      </ListItemButton>
                    </List>
                  </Collapse>
                </div>
              );
            })
          }

        </List>
      </div>
    </Box>
  );
}
