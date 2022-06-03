const bcryptjs = require("bcryptjs");
const { request, response } = require("express");

const Usuario = require('../models/usuario');

const { generarJWT } = require("../helpers/generar-jwt");
const { googleVerify } = require("../helpers/google-verify");

const login = async (req = request, res = response) => {
    
    const { correo, password } = req.body;
    
    try {
        //Verificar si el correo existe
        const usuario = await Usuario.findOne({ correo });
        if ( !usuario ) {
            return res.status(400).json({
                msg: 'Usuario / password no son correctos - correo'
            })
        }
        
        //Verificar si el usuario esta activo
        if ( !usuario.estado ) {
            return res.status(400).json({
                msg: 'Este usuario no se encuentra activo'
            })
        }

        //Verificar contraseña 
        const validPassword = bcryptjs.compareSync( password, usuario.password);
        if ( !validPassword ) {
            return res.status(400).json({
                msg: 'La contraseña es incorrecta'
            })
        }

        //Generar el JWT
        const token = await generarJWT( usuario.id );

        res.json({
            usuario,
            token
        })
    } catch (error) {   
        console.log(error);
        res.status(500).json({
            msg: 'Hable con el admin'
        })
    }
}

const googleLogin = async( req = request, res = response)=> {
    const {id_token } = req.body;
    try {
        
        const { nombre, img, correo } = await googleVerify( id_token );
        
        let usuario = await Usuario.findOne( { correo } );
        
        
        if( !usuario ){
            //tengo que crearlo is no existe
            const data = {
                nombre,
                correo,
                img,
                rol: 'USER_ROLE',
                password: 'xd', //no importa la contraseña porque debe coincidir con el hash
                google: true
            };

            usuario = new Usuario(data);

            await usuario.save();
        }

        //Si el usuario en DB tiene estado false

        if(!usuario.estado) {
            return res.status(401).json({
                msg: 'Hable con el administrador, usuario bloqueado'
            })
        }

        //Generar el JWT
        const token = await generarJWT( usuario.id );

        res.json({
            usuario,
            token
        })
    } catch (error) {
        console.log(error);
        res.status(400).json({
            ok: false,
            msg: 'El token no se pudo verificar'
        })
    }


    
}

module.exports = {
    login,
    googleLogin
}