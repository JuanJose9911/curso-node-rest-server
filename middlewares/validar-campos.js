const { validationResult } = require('express-validator');


const validarCampos = (req, res, next) =>{ 
    const errors = validationResult(req);
    if ( !errors.isEmpty() ) {
        return res.status(400).json(errors);
    }

    next();  //next es una funcion que se llama para indicar que paso el middleware
}

module.exports= {
    validarCampos
}