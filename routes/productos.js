const { Router } = require('express');
const { check } = require('express-validator');

const {
    validarCampos,
    validarJWT,
    tieneRole
} = require('../middlewares');

const { esRoleValido, emailExiste, existeUsuarioPorId } = require('../helpers/db-validators');

const {
    productoPost,
    productoGet,
    productoDelete,
    productosPut
} = require('../controllers/productos');

const router = Router();

//Guardar producto
router.post('/', [
    validarJWT,
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    validarCampos
], productoPost);

//Listar producto
router.get('/', [validarJWT], productoGet);

//Eliminar producto
router.delete('/:id', [
    validarJWT,
    // esAdminRole,
    check('id', 'No es un ID válido').isMongoId(),
    validarCampos
], productoDelete);

//actulizar propductos
router.put('/:id', [
    validarJWT,
    check('id', 'No es un ID válido').isMongoId(),
    validarCampos
], productosPut);

module.exports = router;