const express = require('express');
const cors = require('cors');

class Server {

    constructor() {
        this.app = express();
        this.port = process.env.PORT;
        this.usuariosRoutesPath = '/api/usuarios';

        //Middleares
        this.middlewares();

        //Rutas de mi aplicacion
        this.routes();
    }


    middlewares() {

        //cors
        this.app.use(cors())


        //lectura y parseo del body



        this.app.use(express.json());

        //directorio publico 
        this.app.use(express.static('public'));
    }

    routes() {
        this.app.use(this.usuariosRoutesPath, require('../routes/usuarios'));
    }

    listen() {
        this.app.listen(process.env.PORT, () => {
            console.log('Corriendo por el puerto', this.port)
        });
    }
}

module.exports = Server;