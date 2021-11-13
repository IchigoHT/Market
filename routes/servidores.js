const { Router } = require('express');
const { check } = require('express-validator');

const {
    validarCampos,
    validarJWT
} = require('../middlewares');

const {
    servidoresPost,
    servidoresGet,
    servidoresPut,
    servidoresDelete
} = require('../controllers/servidores');

const router = Router();

//Listar servidor
router.get('/',[validarJWT], servidoresGet);
module.exports = router;

//Guardar servidor
router.post('/', [
    validarJWT,
    validarCampos
], servidoresPost);

//actulizar servidor
router.put('/:id', [
    validarJWT,
    check('id', 'No es un ID válido').isMongoId(),
    validarCampos
], servidoresPut);

//Eliminar servidor
router.delete('/:id', [
    validarJWT,
    // esAdminRole,
    check('id', 'No es un ID válido').isMongoId(),
    validarCampos
], servidoresDelete);

