const mongoose = require('mongoose');

const CategoriesSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  }
});

const Categories = mongoose.model('categories', CategoriesSchema);

module.exports = Categories;