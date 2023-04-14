const { Router } = require('express');
const { check } = require('express-validator');
const { crearProducto, obtenerProducto, obtenerProductos, actualizarProducto, borrarProducto } = require('../controllers/productos');
const { existeProductoPorId, existeCategoriaPorId } = require('../helpers/db-validators');
const { validarCampos, validarJWT, esAdminRole } = require('../middlewares');
const { borrarCategoria } = require('../controllers/categorias');

const router = Router();

//Obtener categorias
router.get('/', obtenerProductos);

router.get('/:id',
    [check('id', 'No es un id de mongo').isMongoId(),
    check('id').custom(existeProductoPorId),
        validarCampos],
    obtenerProducto)

router.post('/', [validarJWT,
    check('nombre', 'el nombre es obligatorio').not().isEmpty(),
    check('categoria', 'No es un Id de Mongo').isMongoId(),
    check('categoria').custom(existeCategoriaPorId),
    validarCampos
], crearProducto)


router.put('/:id', [validarJWT,
    //check('categoria', 'No es in id de mongo').isMongoId(),
    check('id').custom(existeProductoPorId),
    validarCampos
], actualizarProducto)

router.delete('/:id', [validarJWT, esAdminRole,
    check('id', 'No es un id de Mongo').isMongoId(),
    check('id').custom(existeProductoPorId),
    validarCampos,
], borrarProducto);

module.exports = router;
