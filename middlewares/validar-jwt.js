const { response, request } = require('express');
const jwt = require('jsonwebtoken');
const Usuario = require('../models/usuario');

const validarJWT = async(req = request, res = response, next) => {
    const token = req.header('x-token');
    
    if (!token) {
        return res.status(401).json({
            msg: 'No hay token en la peticion'
        })
    }

    try {
        const { uid } = jwt.verify(token, process.env.SECRETORPRIVATEKEY);
        
        //Leer el usuario que corresponde al uid
        const usuario = await Usuario.findById(uid);
        
        if(!usuario){
            return res.status(401).json({
                msg: 'El usuario no existe en nuestros registros'
            })
        }
        
        //Verificar si el uid tiene estado true

        if( !usuario.estado ){
            return res.status(401).json({
                msg: 'El estado del usuario es false'
            })
        }

        req.usuario = usuario;

        next();
    } catch (error) {
        res.status(401).json({
            msg: 'Token no valido'
        })    
    }
}


module.exports = {
    validarJWT
}