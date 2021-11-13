const { Router } = require('express');
const { check } = require('express-validator');

const {
    validarCampos,
    validarJWT
} = require('../middlewares');

const {
    pagosPost,
    pagosGet,
    pagosPut,
    pagosDelete
} = require('../controllers/pagos');

const router = Router();

//Listar proveedores
router.get('/',[validarJWT], pagosGet);
module.exports = router;

//Guardar provedor
router.post('/', [
    validarJWT,
    validarCampos
], pagosPost);

//actulizar proveedores
router.put('/:id', [
    validarJWT,
    check('id', 'No es un ID válido').isMongoId(),
    validarCampos
], pagosPut);

//Eliminar provedor
router.delete('/:id', [
    validarJWT,
    // esAdminRole,
    check('id', 'No es un ID válido').isMongoId(),
    validarCampos
], pagosDelete);

