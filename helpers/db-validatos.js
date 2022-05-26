const Usuario = require('../models/usuario');
const Rol = require('../models/rol');

const esRolValido =  async ( rol = '' ) => {
    const existeRol = await Rol.findOne({ rol });
    if( !existeRol ){
        throw new Error(`El rol: ${rol} no esta registrado en la DB`);
    }
};

const emailExiste = async ( correo = '') => {
    //verificar si el correo existe
    const existEmail = await Usuario.findOne({correo});
    if (existEmail) {
        throw new Error(`El correo ya est registrado`);
    }
}

const existeUser = async ( id ) => {
    const existeUsuario = await Usuario.findById( id );
    if ( !existeUsuario ) {
        throw new Error(`No existe ningun usuario con el id: ${id}`);
    }
} 

module.exports = {
    esRolValido,
    emailExiste,
    existeUser
}



