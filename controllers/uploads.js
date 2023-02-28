const {request, response} = require('express');
const { v4: uuidv4 } = require('uuid');
const path = require('path')
const {subirArchivo} = require("../helpers/subir-archivo");


const cargarArchivo = async ( req = request, res = response) => {

    if (!req.files || Object.keys(req.files).length === 0 || !req.files.archivo) {
        res.status(400).json({ msg: 'No files were uploaded.'});
        return;
    }

    try {
        const path = await subirArchivo(req.files, undefined, 'imgs' );
        res.json({ path });
    }catch (error) {
        res.status(400).json({ error });
    }
}

const actualizarArchivo = async ( req = request, res = response) => {
    const { id, coleccion } = req.params;

    res.json({ id, coleccion });
}

module.exports = {
    cargarArchivo,
    actualizarArchivo,
}