const Invoice = require("../models/bill.model");
const Carrito = require("../models/carrito.model");
const Products = require("../models/products.model");
const PDFDocument = require("pdfkit");
const fs = require("fs");
const doc = new PDFDocument();

const confirmBuy = async(req, res) => {
  const userId = req.user.sub;

  Carrito.findOne({ user: userId }, (err, searchCarrito) => {
    if (searchCarrito == null)
      return res.status(500).send({ message: "No tienes productos agregados" });
    {
      

      for (let carrito of searchCarrito.products) {
        Products.findOne({ _id: carrito.product._id }, (err, productId) => {
          const quantity = carrito.quantity;
          const data = {
            stock: productId.stock,
            sales: productId.sales,
          };

          data.stock = productId.stock - quantity;
          data.sales = productId.sales + quantity;
          Products.findOneAndUpdate(
            { _id: carrito.product._id },
            data,
            { new: true },
            (err, actualizarProducto) => {}
          ).lean();
        }).lean();
      }
      const invoice = new Invoice(buscarCarrito);
      invoice.save((err, guardado) => {
        Carrito.findOneAndDelete(
          { user: userId },
          (err, eliminarCarrito) => {
            return res.status(200).send({invoice: invoice });
          }
        );
      });
    }
  }).lean();
}


const viewAllInvoice = async(req, res) => {
  Invoice.find({}, (err, searchInvoices) => {
    if (searchInvoices.length == 0)
      return res.status(404).send({ mensaje: "No se han relizado compras" });
    if (err) return res.status(500).send({ mensaje: "Error en la peticion" });
    if (!searchInvoices)
      return res.status(500).send({ mensaje: "Error al encontrar facturas" });

    return res.status(200).send({ Compras: searchInvoices });
  })
    .populate("productos.producto")
    .lean();
}

module.exports = {
  confirmBuy,
  viewAllInvoice
};
