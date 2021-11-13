const { Router } = require('express');
const { check } = require('express-validator');

const {
    validarCampos,
    validarJWT
} = require('../middlewares');

const {
    articulosPost,
    articulosGet,
    articulosPut,
    articulosDelete
} = require('../controllers/articulos');

const router = Router();


//Listar proveedores
router.get('/',[validarJWT], articulosGet);
module.exports = router;

//Guardar articulo
router.post('/', [
    validarJWT,
    validarCampos
], articulosPost);

//actulizar articulo
router.put('/:id', [
    validarJWT,
    check('id', 'No es un ID válido').isMongoId(),
    validarCampos
], articulosPut);

//Eliminar articulo
router.delete('/:id', [
    validarJWT,
    // esAdminRole,
    check('id', 'No es un ID válido').isMongoId(),
    validarCampos
], articulosDelete);

