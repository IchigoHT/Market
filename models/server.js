const express = require('express');
const cors = require('cors');

const { dbConnection } = require('../database/config');

class Server {

    constructor() {
        this.app  = express();
        this.port = process.env.PORT;

        this.usuariosPath = '/api/usuarios';
        this.authPath     = '/api/auth';
        //this.categoriaPath     = '/api/categorias';
        this.productoPath     = '/api/productos';
        this.proveedoresPath =   '/api/proveedores';
        this.articulosPath =   '/api/articulos';
        this.clientesPath =   '/api/clientes';
        this.ventasPath =   '/api/ventas';
        this.servidoresPath =   '/api/servidores';
        this.tiendasPath =   '/api/tiendas';
        this.pagosPath =   '/api/pagos';

        // Conectar a base de datos
        this.conectarDB();

        // Middlewares
        this.middlewares();

        // Rutas de mi aplicación
        this.routes();
    }

    async conectarDB() {
        await dbConnection();
    }


    middlewares() {

        // CORS
        this.app.use( cors() );

        // Lectura y parseo del body
        this.app.use( express.json() );

        // Directorio Público
        this.app.use( express.static('public') );

    }

    routes() {
        
        this.app.use( this.authPath, require('../routes/auth'));
        this.app.use( this.usuariosPath, require('../routes/usuarios'));
       // this.app.use( this.categoriaPath, require('../routes/categorias'));
        this.app.use( this.productoPath, require('../routes/productos'));
        this.app.use( this.proveedoresPath, require('../routes/proveedores'));
        this.app.use( this.articulosPath, require('../routes/articulos'));
        this.app.use( this.clientesPath, require('../routes/clientes'));
        this.app.use( this.ventasPath, require('../routes/ventas'));
        this.app.use( this.servidoresPath, require('../routes/servidores'));
        this.app.use( this.tiendasPath, require('../routes/tiendas'));
        this.app.use( this.pagosPath, require('../routes/pagos'));
    }

    listen() {
        this.app.listen( this.port, () => {
            console.log('Servidor corriendo en puerto', this.port );
        });
    }

}




module.exports = Server;
