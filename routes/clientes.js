const { Router } = require('express');
const { check } = require('express-validator');

const {
    validarCampos,
    validarJWT
} = require('../middlewares');

const {
    clientesPost,
    clientesGet,
    clientesPut,
    clientesDelete
} = require('../controllers/clientes');

const router = Router();

//Listar clientes
router.get('/',[validarJWT], clientesGet);
module.exports = router;

//Guardar cliente
router.post('/', [
    validarJWT,
    validarCampos
], clientesPost);

//actulizar clientes
router.put('/:id', [
    validarJWT,
    check('id', 'No es un ID válido').isMongoId(),
    validarCampos
], clientesPut);

//Eliminar clientes
router.delete('/:id', [
    validarJWT,
    // esAdminRole,
    check('id', 'No es un ID válido').isMongoId(),
    validarCampos
], clientesDelete);