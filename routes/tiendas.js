const { Router } = require('express');
const { check } = require('express-validator');

const {
    validarCampos,
    validarJWT
} = require('../middlewares');

const {
    TiendasPost,
    TiendasGet,
    TiendasGetID,
    TiendasPut,
    TiendasDelete
} = require('../controllers/tiendas');

const router = Router();

//Listar proveedores
router.get('/',[validarJWT], TiendasGet);
router.get('/:id',[validarJWT], TiendasGetID);
module.exports = router;

//Guardar provedor
router.post('/', [
    validarJWT,
    validarCampos
], TiendasPost);

//actulizar proveedores
router.put('/:id', [
    validarJWT,
    check('id', 'No es un ID válido').isMongoId(),
    validarCampos
], TiendasPut);

//Eliminar provedor
router.delete('/:id', [
    validarJWT,
    // esAdminRole,
    check('id', 'No es un ID válido').isMongoId(),
    validarCampos
], TiendasDelete);

