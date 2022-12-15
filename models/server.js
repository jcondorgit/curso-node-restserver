const express = require('express');
const cors = require('cors');
const{dbConexion}  = require('../db/config');

class Server{


    constructor(){
        //crear la aplicación de express como propiedad de la clase
        this.app = express();
        this.port = process.env.PORT;
        this.usuariosPath = '/api/usuarios';
        this.usuarioAuth  = '/api/auth';

        //conexión db
        this.conectarDb();
        //Middlewares
        this.middlewares();

        //rutas de la aplicación
        this.routes();
    }

    async conectarDb(){

        await dbConexion();

    }

    middlewares(){
        
        //CORS
        this.app.use(cors());
        //LECTURA Y PARSEO DEL BODY
        this.app.use(express.json());
        //DIRECTORIO PÚBLICO
        this.app.use(express.static('public'));

    }

    routes(){

        this.app.use(this.usuarioAuth, require('../routes/auth'));
        this.app.use(this.usuariosPath, require('../routes/usuarios'));

    }

    listen(){
        //process.env.PORT variables globales
        this.app.listen(this.port, ()=>{
            console.log('Servidor corriendo en puerto', this.port);
        });
    }

}

module.exports = Server;