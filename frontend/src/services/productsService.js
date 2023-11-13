import http from '../http-common';

const addProduct = data => {
  return http.post('/add_product', data);
};

const getProductsByCategories = () => {
  return http.get(`/products_by_categories`);
};

const getProductsCount = () => {
  return http.get(`/products_count`);
};

const getCategories = () => {
  return http.get(`/categories`);
};

const ProductsService = {
  addProduct,
  getProductsByCategories,
  getProductsCount,
  getCategories
};

export default ProductsService;
