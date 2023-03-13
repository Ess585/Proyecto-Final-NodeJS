'use strict'


const {Router} = require ('express');
const api = Router();
const { createProduct, listProducts, searchProduct, updateProduct, deleteProduct, stockProduct} = require ('../controllers/products.controller');
const {validateJWT} = require ('../middlewares/validate-jwt');

api.post('/create-product', /*validateJWT,*/ createProduct);
api.get('/list-products', /*validateJWT,*/ listProducts);
api.get('/search-product', /*validateJWT,*/ searchProduct);
api.put('/update-product/:id', /*validateJWT,*/ updateProduct);
api.delete('/delete-product/:id', /*validateJWT,*/ deleteProduct);
api.get('/stock-product', /*validateJWT,*/ stockProduct)

module.exports = api;

