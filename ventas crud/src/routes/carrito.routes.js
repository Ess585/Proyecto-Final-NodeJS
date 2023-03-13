'use strict'

const {Router} = require ('express');
const { createCarrito, deleteCarrito } = require('../controllers/carrito.controller');
const api = Router();

api.post("/create-carrito", createCarrito);
api.delete('/delete-carrito/:id', deleteCarrito);

module.exports = api;