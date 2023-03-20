const express = require('express');
const cors = require('cors');
const { dbConnection } = require('../database/config');

class Server {

    constructor() {
        this.app = express();
        this.port = process.env.PORT || '3434';
        this.usuariosRoutesPath = '/api/usuarios';

        this.conectarDB();

        //Middleares
        this.middlewares();

        //Rutas de mi aplicacion
        this.routes();
    }

    async conectarDB() {
        await dbConnection();
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