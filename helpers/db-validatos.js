const {Usuario, Categoria, Producto} = require('../models');
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

const existeCategoria = async (id) => {
    const existeCategoria = await Categoria.findById( id );
    if ( !existeCategoria ) {
        throw new Error(`No existe la categoria con el id: ${id}`);
    }
}

const existeProductoPorId = async( id ) => {

    // Verificar si el correo existe
    const existeProducto = await Producto.findById(id);
    if ( !existeProducto ) {
        throw new Error(`El id no existe ${ id }`);
    }
}

const coleccionesPermitidas = (coleccion = '', coleccionesPermitidas = []) => {
    if (!coleccionesPermitidas.includes(coleccion)) {
        throw new Error(`La coleccion ${coleccion} no esta permitida`);
    }
}

module.exports = {
    esRolValido,
    emailExiste,
    existeUser,
    existeCategoria,
    existeProductoPorId,
    coleccionesPermitidas
}



