const { response } = require('express');
const bcryptjs = require('bcryptjs');
const Usuario = require('../models/usuario');


const usuariosGet = (req = request, res = response) => {

    const { q, nombre = 'No name', apikey, page = 1, limit } = req.query;

    res.send({
        msg: 'get my api - Controlador',
        q,
        nombre,
        apikey,
        page,
        limit
    })
};

const usuariosPost = async (req, res = response) => {


    const { nombre, correo, password, rol } = req.body;
    const usuario = new Usuario({ nombre, correo, password, rol });

    const salt = bcryptjs.genSaltSync();
    usuario.password = bcryptjs.hashSync(password, salt)

    //verificar si el correo existe

    //encriptar contraseña

    //giardar en db

    await usuario.save();

    res.send({
        usuario
    });
}

const usuariosPut = async (req, res = response) => {


    const { id } = req.params;

    const { password, google, correo, ...resto } = req.body;

    //TODO validar contra base de datos

    if (password) {
        const salt = bcryptjs.genSaltSync();
        resto.password = bcryptjs.hashSync(password, salt)
    }

    const usuario = await Usuario.findByIdAndUpdate(id, resto)

    res.send({
        msg: 'put my api - Controlador',
        usuario
    });
}




const usuariosDelete = ((req, res = response) => {
    res.send({
        msg: 'delete my api - Controlador'
    });
})
const usuariosPatch = ((req, res = response) => {
    res.send({
        msg: 'patch my api - Controlador'
    });
})


module.exports = {
    usuariosGet,
    usuariosPost,
    usuariosPut,
    usuariosDelete,
    usuariosPatch
}