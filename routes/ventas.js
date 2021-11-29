const { Router } = require('express');
const { check } = require('express-validator');

const {
    validarCampos,
    validarJWT
} = require('../middlewares');

const {
    ventasPost,
    ventasGet,
    ventasPut,
    ventasDelete
} = require('../controllers/ventas');

const router = Router();

//Listar ventas
router.get('/', [validarJWT], ventasGet);


//Guardar ventas
router.post('/', [
    validarJWT,
    validarCampos
], ventasPost);

//actulizar ventas
router.put('/:id', [
    validarJWT,
    check('id', 'No es un ID válido').isMongoId(),
    validarCampos
], ventasPut);

//Eliminar ventas
router.delete('/:id/:cantidad', [
    validarJWT,
    // esAdminRole,
    check('id', 'No es un ID válido').isMongoId(),
    validarCampos
], ventasDelete);


module.exports = router;