'use strict'

const Categorys = require('../models/category.model');

const createCategory = async (req, res) =>{
    //if(req.user.rol === 'ADMIN'){
        const {nameCategory, description, allProducts} = req.body;
    try{
        let category = await Categorys.findOne({nameCategory});
        if(category){
            return res.status(400).send({
                message: 'La categoria ya esta creada',
                ok: false,
                Category: category,
            })
        }
        category = new Categorys(req.body);
        category = await category.save();

        res.status (200).send({
            message:'Se ah creado una nueva Categoria',
            ok: true,
            category: category,
        });
    }catch(error){
        throw new Error(error);
        res.status(500).json({
            ok: false,
            message: 'No se a creado la categoria',
            error: error,
        });
    }
    //}else{
    //    return 
    //    res.status(200).
    //    send({message:'No tienes permiso para realizar esta accion'})
    //}
};

const listCategory = async(req, res) =>{
    if(req.user.rol === 'ADMIN'){
        try{
            const category = await Categorys.find();
    
            if(!category){
                res.status(404).send({
                    message: 'No se han registrado categorias'
                });
            }else{
                res.status(200).json({message: 'Categorias encontradas', 'Categorias': category})
            }
    
        }catch(error){
            throw new Error(error);
        }
    }else{
        res.status(401).send({
            message: 'No tienes permiso para realizar esta accion'
        });
    }
};

const updateCategory = async(req, res) =>{
    if (req.user.rol === 'ADMIN'){
        try{
        const id = req.params.id;
        const categoria = await Categorys.findByIdAndUpdate(id, req.body, {new: true});
        
        if(!categoria){
            return res.status(404).json({message: 'Esta categoria no existe'})
        }
        res.json(categoria);
        }catch(error){
            console.error(error);
            res.status(500)
            .json({message: 'Hubo un problema'})
        }
    }else{
        return res.status(200).send({message:'No tienes permiso para realizar esta accion'})
    }
}


module.exports = { createCategory, listCategory, updateCategory}
