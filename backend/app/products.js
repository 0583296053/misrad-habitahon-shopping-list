const Products = require('../db/schemas/products');
const Categories = require('../db/schemas/categories');
const { CustomError, NotFoundError } = require('./errors');
const { ObjectId } = require('mongodb');

const addProduct = async (req, res) => {
  const { body: { name, categoryId } } = req;

  try {
    const fixedCategoryId = !(categoryId instanceof ObjectId)
      ? new ObjectId(categoryId)
      : categoryId;

    let category = await Categories.findById(fixedCategoryId).lean();
    if (!category) {
      throw new NotFoundError(`Category with the ID ${fixedCategoryId}`);
    }

    let product = await Products.findOne({ name, category }).lean();

    if (product) {
      const { _id, count } = product;

      product = await Products.findByIdAndUpdate(
        _id,
        { count: count + 1 },
        { new: true }
      ).lean();
    } else {
      product = (await Products.create({ name, category })).toObject();
    }

    res.send(product);
  } catch (err) {
    const statusCode = err instanceof CustomError
      ? err.statusCode
      : 500;

    console.log('err: ', err);
    res.status(statusCode).send(err);
  }
};

const getProducts = async (req, res) => {
  try {
    const products = await Categories.find({});

    res.send(products);
  } catch (err) {
    const statusCode = err instanceof CustomError
      ? err.statusCode
      : 500;

    res.status(statusCode).send(err);
  }
};

const getProductsCount = async (req, res) => {
  try {
    const productsCount = await Products.countDocuments({});

    res.send({ productsCount });
  } catch (err) {
    const statusCode = err instanceof CustomError
      ? err.statusCode
      : 500;

    res.status(statusCode).send(err);
  }
};

module.exports = {
  addProduct,
  getProducts,
  getProductsCount
};
