const { Router } = require('express');
const { check } = require('express-validator');

const { usuariosGet,
    usuariosPut,
    usuariosPost,
    usuariosDelete,
    usuariosPatch } = require('../controllers/usuarios');
const { esRoleValido, emailExiste } = require('../helpers/db-validators');
const { validarCampos, exiteUsuarioId } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');
const { esAdminRole } = require('../middlewares/validar-roles');

const router = Router();

router.get('/', usuariosGet);

router.post('/', [
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('password', 'El password debe de ser más de 6 letras').isLength({ min: 6 }),
    check('correo', 'El correo no es válido').isEmail(),
    check('correo').custom(emailExiste),
    check('rol').custom(esRoleValido),
    validarCampos

], usuariosPost)

router.put('/:id', [
    check('id', 'No es un id valido').isMongoId(),
    check('id').custom(exiteUsuarioId),
    validarCampos], usuariosPut);

router.delete('/:id', [
    validarJWT,
    esAdminRole,
    check('id', 'No es un id valido').isMongoId(),
    check('id').custom(exiteUsuarioId),
    validarCampos], usuariosDelete);

router.patch('/', usuariosPatch);

module.exports = router;