const { Router } = require('express');
const { check } = require('express-validator');

const {
    validarCampos,
    validarJWT
} = require('../middlewares');

const {
    proveedoresPost,
    proveedoresGet,
    proveedoresPut,
    proveedoresDelete
} = require('../controllers/proveedores');

const router = Router();

//Listar proveedores
router.get('/',[validarJWT], proveedoresGet);
module.exports = router;

//Guardar provedor
router.post('/', [
    validarJWT,
    validarCampos
], proveedoresPost);

//actulizar proveedores
router.put('/:id', [
    validarJWT,
    check('id', 'No es un ID válido').isMongoId(),
    validarCampos
], proveedoresPut);

//Eliminar provedor
router.delete('/:id', [
    validarJWT,
    // esAdminRole,
    check('id', 'No es un ID válido').isMongoId(),
    validarCampos
], proveedoresDelete);

