import {
  TextField, Button, Typography,
  Box, Select, MenuItem, InputLabel,
  // List, ListSubheader, ListItemButton, ListItemIcon, ListItemText,
  // Collapse, ExpandLess, ExpandMore
} from '@mui/material';
import React, { useState, useEffect } from 'react';
import TotalItems from './totalItems';
import ProductsService from '../services/productsService';

export default function ShoppingList() {
  const [categories, setCategories] = useState([]);
  const [productsByCategories, setProductsByCategories] = useState([]);

  const initialProductState = {
    id: null,
    name: '',
    category: '',
    count: 0
  };
  const [product, setProduct] = useState(initialProductState);

  const initialCategoryState = {
    id: null,
    name: ''
  };
  const [category, setCategory] = useState(initialCategoryState);
  // const [submitted, setSubmitted] = useState(false);

  // const [open, setOpen] = useState(true);

  const getCategories = async () => {
    ProductsService.getCategories()
      .then(response => {
        setCategories(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  };

  const getProductsByCategories = async () => {
    ProductsService.getProductsByCategories()
      .then(response => {
        setProductsByCategories(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  };

  useEffect(() => {
    getCategories();
    getProductsByCategories()
  }, []);

  const handleProductChange = event => {
    const { target: { name, value } } = event;
    setProduct({ ...product, [name]: value });
  };

  const handleCategoryChange = event => {
    const { target: { value } } = event;
    const category = categories.find(c => c._id === value);
    setCategory(category);
  };

  const addProduct = async () => {
    var data = {
      name: product.name,
      categoryId: category._id
    };

    ProductsService.addProduct(data)
      .then(() => {
        alert(`הוספת בהצלחה את המוצר ${product.name} תחת קטגוריה ${product.category} לרשימת הקניות`)
        setProduct(initialProductState);
        setCategory(initialCategoryState);
      })
      .catch(e => {
        console.log(e);
      });
  };

  // const handleClick = (category) => {
  //   setOpen(!open);
  // };

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
        <Typography sx={{ mt: 3 }} align='center' color='primary' variant='h5'>רשימת קניות</Typography>
      </div>

      <div>
        <TotalItems />
      </div>

      <div>
        <Typography sx={{ mt: 3 }} align='center' color='primary' variant='p'>הוספת מוצר</Typography>
      </div>

      <div>
        <TextField
          value={product.name}
          onChange={handleProductChange}
          id='product-name'
          label='שם המוצר'
          variant='outlined'
          margin='normal'
          required
          fullWidth
          align='center'
        >
        </TextField>
      </div>

      <div>
        <InputLabel id='product-category-label'>קטגוריה</InputLabel>
        <Select
          value={category._id}
          onChange={handleCategoryChange}
          labelId='product-category-label'
          id='product-category'
          label='קטגוריה'
          required
          fullWidth
          align='center'
        >
          {
            categories.map((category, index) => {
              return (
                <MenuItem key={index} value={category._id}>{category.name}</MenuItem>
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
          onClick={addProduct}>הוסף לרשימת הקניות
        </Button>
      </div>

      <div>
        <Typography sx={{ mt: 3 }} align='center' color='primary' variant='h5'>יש לאסוף מוצרים אלו במחלקות המתאימות</Typography>
      </div>

      {/*
      <div>
        <List
          sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}
          component='nav'
          aria-labelledby='nested-list-subheader'
          subheader={
            <ListSubheader component='div' id='nested-list-subheader'>
              רשימת המוצרים שבחרת:
            </ListSubheader>
          }
        >
          {
            Object.keys(productsByCategories).map(categoryId => {
              const category = categories.find(c => c._id === categoryId) || {};
              const products = productsByCategories[categoryId] || [];

              return (
                <div>
                  <ListItemButton onClick={handleClick(category)}>
                    <ListItemText primary={`${category.name} - ${products.length} מוצרים`} />
                     {open ? <ExpandLess /> : <ExpandMore />} 
                  </ListItemButton>

                  <Collapse in={open} timeout='auto' unmountOnExit>
                    <List component='div' disablePadding>
                      {
                        products.map(productInCategory => {
                          return (
                            <ListItemButton sx={{ pl: 4 }}>
                              <ListItemText primary={`${productInCategory.name} (${productInCategory.count})`} />
                            </ListItemButton>
                          )
                        })
                      }
                    </List>
                  </Collapse>
                </div>
              );
            })
          }
        </List>
      </div>
      */}
    </Box >
  );
}
