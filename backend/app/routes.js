const express = require('express');
const { addProduct, getProducts, getProductsCount } = require('./products');

const app = express();

app.post('/add_product', async (req, res) => {
  await addProduct(req, res);
});

app.get('/products', async (req, res) => {
  await getProducts(req, res);
});

app.get('/products_count', async (req, res) => {
  await getProductsCount(req, res);
});

module.exports = app;
