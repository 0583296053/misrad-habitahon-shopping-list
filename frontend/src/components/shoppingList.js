import {
  TextField, Button, Typography,
  Box, Select, MenuItem, InputLabel,
  List, ListItemButton, ListItemText,
  Collapse, Grid
} from '@mui/material';
import { ExpandLess, ExpandMore } from '@mui/icons-material';
import React, { useState, useEffect } from 'react';
import TotalItems from './totalItems';
import ProductsService from '../services/productsService';
import { observer } from 'mobx-react';
import { useStore } from '../itemsStore';

const ShoppingList = observer(() => {
  const itemsStore = useStore();

  const [categories, setCategories] = useState([]);
  const [productsByCategories, setProductsByCategories] = useState([]);
  const [productName, setProductName] = useState('');
  const [productCategoryId, setProductCategoryId] = useState('');
  const [openCollapse, setOpenCollapse] = useState({});
  const [refreshProductsByCategories, setRefreshProductsByCategories] = useState(true);

  const getCategories = async () => {
    ProductsService.getCategories()
      .then(response => {
        setCategories(response.data);
        setOpenCollapse(response.data.reduce((m, category) => {
          m[category._id] = openCollapse[category._id] || false;
          return m;
        }, {}));
      })
      .catch(e => {
        console.log(e);
      });
  };

  useEffect(() => {
    getCategories();
  }, []);

  const getProductsByCategories = async () => {
    ProductsService.getProductsByCategories()
      .then(response => {
        setProductsByCategories(response.data);
        setRefreshProductsByCategories(false);
      })
      .catch(e => {
        console.log(e);
      });
  };

  const setTotalItems = async () => {
    itemsStore.setTotalItems();
  };

  useEffect(() => {
    getProductsByCategories();
    setTotalItems();
  }, [refreshProductsByCategories]);

  const handleProductNameChange = event => {
    const { target: { value } } = event;
    setProductName(value);
  };

  const handleCategoryChange = event => {
    const { target: { value } } = event;
    setProductCategoryId(value);
  };

  const addProduct = async () => {
    var data = {
      name: productName,
      categoryId: productCategoryId
    };

    ProductsService.addProduct(data)
      .then(() => {
        const category = categories.find(c => c._id === productCategoryId) || {};
        alert(`הוספת בהצלחה את המוצר ${productName} תחת קטגוריה ${category.name} לרשימת הקניות`)

        setProductName('');
        setProductCategoryId('');
        setRefreshProductsByCategories(true);
      })
      .catch(e => {
        console.log(e);
      });
  };

  const handleToggleCollapse = (categoryId) => {
    const newOpenCollapse = { ...openCollapse };
    newOpenCollapse[categoryId] = !newOpenCollapse[categoryId];
    setOpenCollapse(newOpenCollapse);
  };

  return (
    <Grid container spacing={2}>
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
          <Typography sx={{ mt: 3 }} align='center' color='primary' variant='h6'>הוספת מוצר</Typography>
        </div>

        <div>
          <InputLabel sx={{ mt: 3 }} id='product-name-label'>שם המוצר</InputLabel>
          <TextField
            labelId='product-name-label'
            value={productName}
            onChange={handleProductNameChange}
            id='product-name'
            variant='outlined'
            required
            fullWidth
            align='center'
          >
          </TextField>
        </div>

        <div>
          <InputLabel sx={{ mt: 3 }} id='product-category-label'>קטגוריה</InputLabel>
          <Select
            value={productCategoryId}
            onChange={handleCategoryChange}
            variant='outlined'
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
            sx={{ mt: 3 }}
            onClick={addProduct}>הוסף לרשימת הקניות
          </Button>
        </div>

        <div>
          <Typography sx={{ mt: 3 }} align='center' color='primary' variant='h5'>יש לאסוף מוצרים אלו במחלקות המתאימות</Typography>
        </div>

        <div>
          <List
            sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}
            component='nav'
            aria-labelledby='nested-list-subheader'
          >
            {
              Object.keys(productsByCategories).map(categoryId => {
                const category = categories.find(c => c._id === categoryId) || {};
                const productsInCategories = productsByCategories[categoryId] || [];

                return (
                  <div>
                    <ListItemButton onClick={() => { handleToggleCollapse(categoryId) }}>
                      <ListItemText primary={`${category.name} - ${productsInCategories.length} מוצרים`} />
                      {openCollapse[categoryId] ? <ExpandLess /> : <ExpandMore />}
                    </ListItemButton>

                    <Collapse align='center' in={openCollapse[categoryId]} timeout='auto' unmountOnExit>
                      <List component='div' disablePadding>
                        {
                          productsInCategories.map(productInCategory => {
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
      </Box >
    </Grid>
  );
});

export default ShoppingList;
