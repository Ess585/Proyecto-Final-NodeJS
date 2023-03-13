const express = require('express');
const invoiceController = require('../controllers/bill.controller')
const { validateJWT } = require('../middlewares/validate-jwt')

const api = express.Router();

//rutas

api.get('/confirm-buy', validateJWT, invoiceController.confirmBuy)
api.get('/view-all', validateJWT, invoiceController.viewAllInvoice)

module.exports = api;