const { Router } = require('express');
const { check } = require('express-validator');

const { login } = require('../controllers/auth');
const { crearCategoria } = require('../controllers/categorias');
const { validarJWT, validarCampos } = require('../middlewares');



const router = Router();


//OBTENER TODAS LAS CATEGORIAS
router.get('/',
    (req, res) => {
        res.send('obtener categorias')
    })

//OBTENER UNA CATEGORIA POR ID
router.get('/:id', [validarJWT], (req, res) => {
    res.send('obtener categoria por id')
})


//CREAR UNA NUEVA CATEGORIA
router.post('/',
    [validarJWT,
        check('nombre', 'el nombre es obligatorio').not().isEmpty(),
        validarCampos
    ],
    crearCategoria);

//ACTUALIZAR REGISTRO POR ID
router.put('/:id', [validarJWT], (req, res) => {
    res.send('actualizar categoria')
})

//BORRAR CATEGORIA POR ID <<<SOLAMENTE ADMINSTRADOR>>>
router.delete('/:id', [validarJWT], (req, res) => {
    res.send('eleiminar categroria')
})


module.exports = router;