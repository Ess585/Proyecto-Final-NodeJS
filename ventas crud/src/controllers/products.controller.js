"use strict"

const Product = require ("../models/products.model");
const Category = require("../models/category.model");

const createProduct = async (req, res) => {
    //if (req.user.rol === "ADMIN") {
        const {nameProduct, price, productType, stock} = req.body;
        try {
            let product = await Product.findOne({nameProduct});
            if(product){
                return res.status(400).send({
                    message: "Np se puedo registrar nuevamente el producto.",
                    ok: false,
                    producto: product
            })
            }
            
            const category = await Category.findOne({nameCategory: Category});
            const idCategory = category ? category._id: null;

            const addProduct = new Product({
                nameProduct, productType, price, stock,
                category: idCategory
            });

            if (idCategory) {
                await Category.findByIdAndUpdate(
                    idCategory,
                    {$push: {allProducts: product._id}},
                    {new: true, useFindAndModify: false}
                )
            };

            await addProduct.save();
            return res.status(201).json({
                message: "Se ah creado una nueva Producto",
                ok: true,
                allProducts: addProduct
            });

        } catch (error) {
            throw new Error(error);
            return res.status(500).json({message: "Hay un problema al agregar un producto"})
        }
    //} else {
    //    return res.status(401).send({message: "Solo un administrados tiene permiso de agregar nuesvos productos"})
    //}
};

const listProducts = async(req, res) =>{
    //if(req.user.rol === 'ADMIN'){
        try{
            const product = await Product.find();

            if(!product){
                res.status(404).send({message:'No hay productos'});
            }else{
                res.status(200).json({'Productos encontrados': product})
            }
        }catch(error){
            throw new Error(error);
        }
    //}else{
    //    return res.status (200)
    //    .send({message: 'No tienes permiso para realizar esta accion'});
    //}
}


const searchProduct = async(req, res) =>{
    //if(req.user.rol === 'ADMIN'){
        const {nameProduct} = req.body;
        try{
            const sProduct = await Product.findOne({nameProduct});

            if(!sProduct){
                res.status(404).send({message:'Nose encuentra el producto quebuscas'});
            }
            res.status(200).json(sProduct)
        }catch(error){
            console.log(error);
        }
    //}else{
    //    return res.status (200)
    //    .send({message: 'No tienes permiso para realiar esta accion'});
    //}
}

const updateProduct = async (req, res) =>{
    //if (req.user.rol === 'ADMIN'){
        try{
        const id = req.params.id;
        const product = await Product.findByIdAndUpdate(id, req.body, {new: true});
        
        if(!product){
            return res.status(404).json({message: 'No hay ningun registro con ese id'});
        }
        res.json(product);
        }catch(error){
            console.error(error);
            res.status(500)
            .json({message: 'Pendiente...'})
        }
    //}else{
    //    return res.status(200).send({
    //        message:'Error al editar los datos.'})
    //}
};

const deleteProduct = async(req, res)=>{
    //if (req.user.rol === 'ADMIN'){
        try{
            const pId = req.params.id;
            const elimProduct = await Product.findByIdAndDelete(pId);
            if(!elimProduct){
                return res.status(404)
                .json({message:'No existe el producto que buscas'})
            }

            const idProduct = elimProduct.product;

            const product = await Product.findById(idProduct);

            if(!product){
                return res.status(404)
                .json({
                    message: 'Como el producto no existe, tampoco ah sido asignado a una categoria'
                });
            }

            product.productos.pull(pId);
            await product.save();

            res.json({message:'Producto eliminado correctamente'})
        }catch(err){
            console.error(err);
            res.status(500)
            .json({
                message:'Error al eliminar este producto'
            })
        }
    //}else{
    //    return 
    //    res.status(200).
    //    send({message:'No tiener permiso para realizar esta accion'})
    //}
};

const stockProduct = async (req, res) =>{
        try{
        const stock = req.params.nameProduct;

        const product = await Product.find({stock: 0});
        if(product.length > 0){
            return res.json({
                ok: true,
                message: 'Productos encontrados',
                product: product,
                stock: stock,
            });
        }else{
            return res.json({
                ok: false,
                message: 'No hay productos'
            })
        }
        }catch(error){
            return res.status(500).json({message:'Error al buscar los productos'})
        }
};

module.exports = {createProduct, listProducts, searchProduct, updateProduct, deleteProduct, stockProduct};












