const express = require('express');
const {
  addProduct,
  getProductsByCategories,
  getProductsCount,
  getCategories
} = require('./products');

const app = express();

app.post('/add_product', async (req, res) => {
  await addProduct(req, res);
});

app.get('/products_by_categories', async (req, res) => {
  await getProductsByCategories(req, res);
});

app.get('/products_count', async (req, res) => {
  await getProductsCount(req, res);
});

app.get('/categories', async (req, res) => {
  await getCategories(req, res);
});

module.exports = app;
