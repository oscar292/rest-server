const { validationResult } = require('express-validator');
const Usuario = require('../models/usuario');

const validarCampos = (req,res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).json(errors);
    }

    next();
}

const exiteUsuarioId = async(id)=>{

    const existeUsuario = await Usuario.findById(id); 
    if(!existeUsuario){
        throw new Error(`El id no existe ${id}`)
    }
}


module.exports = {
    validarCampos, 
    exiteUsuarioId
}