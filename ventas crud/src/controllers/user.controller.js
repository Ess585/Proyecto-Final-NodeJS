'use strict'

const User = require("../models/user.model");
const bcrypt = require("bcrypt");
const { generateJWT } = require("../helpers/create-jwt");

const createUser = async(req, res) =>{
    //if (req.user.rol === "ADMIN") {
    const { username, email, password, rol } = req.body;
    try {
        let user = await User.findOne({email: email});
        if(user){
            return res.status(400).send({
                message: "Un usuario ya utiliza este email",
                ok: false,
                user: user,
            })
        }

        user = new User(req.body);
        const salt = bcrypt.genSaltSync();
        user.password = bcrypt.hashSync(password, salt)
        user = await user.save();
        const token = await generateJWT(user.id, user.username, user.email);
            res.status(200).send({
                message: `El usuario ${user.username} se ha creado de manera exitosa`,
                user,
                token
        });

    }catch (error) {
        throw new Error(error)
    }
 /*   } else {
  return res.status(500).send({
      message: "Este usuario no tiene permiso para crear mas usuarios",
    });
  }*/

};

const listUsers = async(req, res) =>{
    try {
        const users = await User.find();

        if (!users) {
            res.status(404).send({message: "No hay usuarios registrados"})
        } else {
            res.status(200).send({usuarios: users})
        }
    } catch (error) {
        throw new Error ("Error al listar Usuarios")
    }
};

const updateUser = async(req, res) =>{
//    if (req.user.rol === "ADMIN") {
    try {
        const id = req.params.id;
        const userEdit = {...req.body};
        userEdit.password = userEdit.password
        ? bcrypt.hashSync(userEdit.password, bcrypt.genSaltSync())
        : userEdit.password;
        const userComplete = await User.findByIdAndUpdate(id, userEdit, {new: true});
        if (userComplete) {
            const token = await generateJWT(
                userComplete.id,
                userComplete.username,
                userComplete.email
              );
            return res.status(200).send({message: "Usuario actualizado correctamente", userComplete, token})
        } else {
            res.status(400).send({message: 'El usuario que buscas no existe en la base de Datos'})
        }
        } catch (error) {
            throw new Error(error);
        } 
/*    }else {
        return res.status(200).send({
          message: "Solo un ADMIN tiene los permisos para poder actualizar un usuario",
        });
      }*/
};

const deleteUser = async (req, res) => {
 //   if (req.user.rol === "ADMIN") {  
    try {
        const id = req.params.id;
        const userDelete = await User.findByIdAndDelete(id);
        return res
          .status(200)
          .send({ message: "usuario eliminado correctamente", userDelete });
      } catch (err) {
        throw new Error(err);
      }
/*    } else {
        return res
          .status(500)
          .send({ message: "Usted es solo un usuario, no tiene los permisos de un ADMIN" });
      } */
  };

const loginUser = async(req, res) =>{
    const { email, password } = req.body;
    try {
        const user = await User.findOne({email});
        if (!user) {
            return res
            .status(400)
            .send({ok: false, message: 'El usuario no existe'});
        }
        const validPassword = bcrypt.compareSync(
        password, 
        user.password
        );
        if(!validPassword){
            return res.status(400).send({ok: false, message: 'Contraseña Incorrecta'})
    }

        const token = await generateJWT(user.id, user.username, user.email);
        res.json({
            message: 'Haz iniciado sesión correctamente',
            ok: true,
            uid: user.id,
            name: user.username,
            email: user.email,
            token
        });

    } catch (error) {
       throw new Error(error)
    }
};

module.exports =  {createUser, listUsers, updateUser, deleteUser, loginUser};
