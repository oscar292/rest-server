const { response } = require('express');

const usuariosGet = (req=request, res = response) => {

    const {q,nombre='No name',apikey, page= 1, limit } = req.query;


    res.send({
        msg: 'get my api - Controlador', 
        q,
        nombre,
        apikey, 
        page,
        limit
    })
};

const usuariosPost = ((req, res = response) => {

    const {nombre, edad} = req.body; 

    res.send({
        msg: 'post my api -Controlador', 
        nombre,edad
    });
})

const usuariosPut = ((req, res = response) => {


    const {id} = req.params;
    res.send({
        msg: 'put my api - Controlador', 
        id
    });
})
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