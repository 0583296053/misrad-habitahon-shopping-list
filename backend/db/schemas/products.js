const mongoose = require('mongoose');

const ProductsSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Categories',
    required: true
  },
  count: {
    type: Number,
    required: true,
    default: 1
  },
});

const Products = mongoose.model('products', ProductsSchema);

module.exports = Products;