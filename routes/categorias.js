const {Router} = require('express');
const {check} = require('express-validator');

const {validarCampos} = require('../middlewares/validar-campos');
const {validarJWT, esAdminRol} = require("../middlewares");
const {crearCategoria, obetenerCategorias, obtenerCategoria, actualizarCategoria, borrarCategoria} = require("../controllers/categorias");
const {existeCategoria} = require("../helpers/db-validatos");


const router = Router();


//Obtener todas las categorias - publico
router.get('/', obetenerCategorias)

//Obtener 1 categoria por id
router.get('/:id', [
    check('id', 'No es un id de mongo').isMongoId(),
    check('id').custom( existeCategoria ),
    validarCampos,
], obtenerCategoria)


//Crear una nueva categoria - cualquier persona con token
router.post('/', [
    validarJWT,
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    validarCampos
    ], crearCategoria
)


//Actualizar una categoria por id 
router.put('/:id', [
    validarJWT,
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('id').custom( existeCategoria ),
    validarCampos
    ],
    actualizarCategoria)

//Borrar categoria - solo si es ADMIN - estado = false
router.delete('/:id', [
    validarJWT,
    esAdminRol,
    check('id', 'No es un id de mongo').isMongoId(),
    check('id').custom( existeCategoria ),
    validarCampos
    ],
    borrarCategoria)

module.exports = router;