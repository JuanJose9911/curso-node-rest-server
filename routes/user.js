const { Router } = require('express');
const { check } = require('express-validator');


// const { validarCampos } = require('../middlewares/validar-campos');
// const { validarJWT } = require('../middlewares/validar-jwt');
// const { esAdminRol, tieneRol } = require('../middlewares/validar-roles');
const {
    validarCampos,
    validarJWT,
    esAdminRol,
    tieneRol
} = require('../middlewares');

const { esRolValido, emailExiste, existeUser } = require('../helpers/db-validatos');

const { usuariosGet, usuariosPut, usuariosPost, usuariosDelete } = require('../controllers/user');

const router = Router();

router.get('/', usuariosGet );

router.post('/', [
    check('correo', 'El correo no es valido').isEmail(),
    check('correo').custom( emailExiste ),
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('password', 'La contraseña debe tener mas de 6 caracteres ').isLength( { min: 6 } ),
    check('rol').custom( esRolValido),
    // check('rol', 'No es un rol valido').isIn('ADMIN_ROLE', 'USER_ROLE'),
    validarCampos
] , usuariosPost );

router.put('/:id',[
    check('id', 'No es un ID valido').isMongoId(),
    check('rol').custom( esRolValido),
    check('id').custom( existeUser),
    validarCampos
], usuariosPut);

router.delete('/:id',[
    validarJWT,
    // esAdminRol,
    tieneRol('ADMIN_ROLE','VENTAS_ROLE'),
    check('id', 'No es un ID valido').isMongoId(),
    check('id').custom( existeUser),
    validarCampos
], usuariosDelete );








module.exports = router