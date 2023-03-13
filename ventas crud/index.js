"use strict"

const express = require("express");
const app = express();
const { connection } = require("./src/database/connection");
require("dotenv").config();
const port = process.env.PORT;
const routes = require ("./src/routes/user.routes");
const routesP = require ("./src/routes/products.routes");
const routesC = require("./src/routes/category.routes")
const carrito = require("./src/routes/carrito.routes");

connection();

app.use(express.urlencoded({extended: false}));
app.use(express.json());
app.use("/api", routes, routesP, routesC, carrito);
app.listen(port, function(){
    console.log(`El servidor esta corriendo en el puero ${port}`);
})






