'use strict'


const {Router} = require ('express');
const api = Router();
const { createCategory, listCategory, updateCategory} = require ('../controllers/category.controller');
const {validateJWT} = require ('../middlewares/validate-jwt');

api.post("/create-category", /*validateJWT,*/ createCategory);
api.get('/list-category', validateJWT, listCategory);
api.put('/update-category/:id', validateJWT, updateCategory);

module.exports = api;
