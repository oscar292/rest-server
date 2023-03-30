const { Router } = require('express');
const { check } = require('express-validator');

const { crearCategoria, obtenerCategorias, ObtenerCategoria, actualizarCategoria, borrarCategoria } = require('../controllers/categorias');
const { existeCategoriaPorId } = require('../helpers/db-validators');
const { validarJWT, validarCampos, esAdminRole } = require('../middlewares');

const router = Router();

//OBTENER TODAS LAS CATEGORIAS
router.get('/', obtenerCategorias);

//OBTENER UNA CATEGORIA POR ID
router.get('/:id',
    [check('id', 'No es un id de mongo').isMongoId(),
    check('id').custom(existeCategoriaPorId),
        validarCampos],
    ObtenerCategoria)

//CREAR UNA NUEVA CATEGORIA
router.post('/',
    [validarJWT,
        check('nombre', 'el nombre es obligatorio').not().isEmpty(),
        validarCampos
    ],
    crearCategoria);

//ACTUALIZAR REGISTRO POR ID
router.put('/:id',
    [validarJWT,
        check('nombre', 'El nombre es obligatorio').not().isEmpty(),
        check('id').custom(existeCategoriaPorId),
        validarCampos],
    actualizarCategoria);

//BORRAR CATEGORIA POR ID <<<SOLAMENTE ADMINSTRADOR>>>
router.delete('/:id',
    [validarJWT,
        esAdminRole,
        check('id', 'El id no existe').isMongoId(),
        check('id', 'No es un id de mongo').isMongoId(),
        validarCampos],
    borrarCategoria);


module.exports = router;