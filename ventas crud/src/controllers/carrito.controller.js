"use strict"

const Carrito = require ("../models/carrito.model");
const Product = require("../models/products.model");
const User = require("../models/user.model");

const createCarrito = async(req, res) =>{
    try {
        const parameters = req.body;
        const idUser = req.user.id;
        const dates = {
            product: parameters.product,
            quantity: parameters.quantity,
        };
        let carrito = await Carrito.findOne({_id: dates.product})
        const user = User.id;
        if (!carrito) {
            dates.user = idUser;
            dates.subTotal = Product.price * dates.quantity;
            dates.total = dates.subTotal;
            return res.status(400).send({
                message: "Ya has agregado este producto al carrito de compras",
                ok: false,
                carrito: carrito,
            })
        }

        carrito = new Carrito(req.body);
        carrito = await carrito.save();
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            message: 'Error en el servidor'
        })
    }

}

const deleteCarrito = async(req, res) =>{
    try {
        const id = req.params.idProduct;
        const elimCarrito = await Carrito.findByIdAndDelete(id);
    return res
          .status(200)
          .send({ message: "Se ha quitado el producto del carrito ", elimCarrito });


    } catch (error) {
        throw new Error(error)
    }
}

module.exports = {createCarrito, deleteCarrito}





