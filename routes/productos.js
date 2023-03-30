const { Router } = require('express');
const { check } = require('express-validator');
const { crearProducto, obtenerProducto, obtenerProductos } = require('../controllers/productos');
const { existeProductoPorId } = require('../helpers/db-validators');
const { validarCampos, validarJWT } = require('../middlewares');

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
    validarCampos
], crearProducto)


router.put('/:id', (req, res) => {
    res.json('Actualizar producto')
})

router.delete('/:id', (req, res) => {
    res.json('eliminando producto')
})

module.exports = router;
