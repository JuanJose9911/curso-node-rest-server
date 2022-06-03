const { request, response } = require("express")


const esAdminRol = (req = request, res = response, next) => {

    if ( !req.usuario ) {
        return res.status(500).json({
            msg: 'No se ha validado el token aun'
        });
    }

    const { rol, nombre } = req.usuario

    if( rol !== 'ADMIN_ROLE'){
        return res.status(401).json({
            msg: `${nombre} no es administrador`
        });
    }

    next();
}

const tieneRol = ( ...roles ) => {
    
    return (req = request, res = response, next) => {

        if ( !req.usuario ) {
            return res.status(500).json({
                msg: 'No se ha validado el token aun'
            });
        }

        if ( !roles.includes( req.usuario.rol) ) {
            return res.status(401).json({
                msg: `El servicio requiere uno de estos roles: ${roles}`
            })
        }
        next()
    };
}


module.exports = {
    esAdminRol,
    tieneRol
}