const { response, request } = require('express');
const jwt = require('jsonwebtoken');
const Usuario = require('../models/usuario')

const validarJWT = async (req = request, res = response, next) => {

    const token = req.header('x-token');

    if (!token) {
        return res.status(401).json({
            msg: 'No hay token en la peticion'
        });

    }


    try {

        const { uid } = jwt.verify(token, process.env.SECRETORPRIVATEKEY);

        const usuario = await Usuario.findById(uid);


        if (!usuario) {
            return res.status(401).json({
                msg: 'Token no válido - usuario no existe en db'
            })
        }


        //verificar si el uid tiene estado en true

        if (!usuario.estado) {
            return res.status(401).json({
                msg: 'Token no válido'
            })
        }

        req.usuario = usuario;

        next();


    } catch (err) {
        console.log(err);

        res.status(401).json({
            msg: 'Token no valido'
        })
    }
}


module.exports = {
    validarJWT
}