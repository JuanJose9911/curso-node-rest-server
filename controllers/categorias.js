const { response, request, raw, json} = require('express');
const { Categoria } = require('../models');
const Usuario = require("../models/usuario");


const crearCategoria = async (req = request, res = response) => {
    const  nombre = req.body.nombre.toUpperCase();

    const categoriaDB = await Categoria.findOne({ nombre });

    if ( categoriaDB ){
        return res.status(400).json( {
            msg: `La categoria ${categoriaDB.nombre}, ya existe`
        });
    }

    //Generar la data a guardar
    const data ={
        nombre,
        usuario: req.usuario._id
    }

    const categoria = new Categoria( data );

    await categoria.save();

    res.status(201).json( categoria );
}

// paginado - total - populate
const obetenerCategorias = async (req = request, res = response) =>{
    const { limite = 5, desde = 0 } = req.query;
    const query = { estado: true };
    const categorias = await Categoria.find({estado: true})
        .populate('usuario', 'nombre')
        .skip(desde)
        .limit(limite);

    const total = await Categoria.countDocuments({estado: true});

    res.json({
        total,
        categorias
    });
}

//Obtener categoria - populate {}
const obtenerCategoria = async (req = request, res = response) => {
    const {id} = req.params
    const categoria = await  Categoria.findById( id ).populate('usuario', 'nombre');

    res.json ( categoria );
}

//actualizar categoria por nombre
const actualizarCategoria = async (req = request, res = response) => {
    const { id } = req.params;
    const { estado, usuario, ...data } = req.body;

    data.nombre  = data.nombre.toUpperCase();
    data.usuario = req.usuario._id;

    const categoria = await Categoria.findByIdAndUpdate(id, data, {new: true});

    res.status(200).json( categoria );
}

//Borrar categoria - cambiar estado - por id
const borrarCategoria = async (req = request, res = response) => {
    const { id } = req.params;
    const categoria = await Categoria.findByIdAndUpdate(id, {estado: false}, {new: true});

    res.status(200).json( categoria )
}


module.exports = {
    crearCategoria,
    obetenerCategorias,
    obtenerCategoria,
    actualizarCategoria,
    borrarCategoria
}

