"use strict"

const { Router } = require("express");
const api = Router();
const { 
    createUser, 
    listUsers, 
    updateUser, 
    deleteUser, 
    loginUser } = require("../controllers/user.controller");
    const { check } = require("express-validator");
    const { validateParams } = require("../middlewares/validate-params");
    const { validateJWT } = require("../middlewares/validate-jwt");

api.post("/create-user",
[
  check("username", "El nombre de inicio es un campo obligatorio").not().isEmpty(),
  check("password", "La contraseña debe ser mayor a 6 digitos").isLength({
    min: 5,
  }),
  check("email", "El correo electronico es un campo obligatorio").not().isEmpty(),
  validateParams,
],
createUser);

api.get("/list-users", listUsers);

api.put("/update-user/:id",
[
//  validateJWT,
  check("username", "El nombre de inicio es un campo obligatorio").not().isEmpty(),
  check("password", "La contraseña debe ser mayor a 6 digitos").isLength({
    min: 5,
  }),
  check("email", "El correo electronico es un campo obligatorio").not().isEmpty(),
  validateParams,
],
updateUser);

api.delete("/delete-user/:id", deleteUser);
api.post("/login-user", loginUser);

module.exports = api;