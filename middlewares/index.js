const validaCampos = require('../middlewares/validar-campos');
const validarJTW = require('../middlewares/validar-jwt');
const validaRoles = require('../middlewares/validar-roles');
const exiteUsuarioId  = require('../middlewares/validar-campos');

module.exports = {
    ...validaCampos,
    ...validarJTW,
    ...validaRoles, 
    ... exiteUsuarioId
}