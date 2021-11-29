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
    articulosGetId,
    articulosDelete
} = require('../controllers/articulos');

const router = Router();


//Listar articulo
router.get('/', [validarJWT], articulosGet);



//Listar articulo de Tienda ID
router.get('/:id', [validarJWT], articulosGetId);

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


module.exports = router;
