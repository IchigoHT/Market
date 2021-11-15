
const { Schema, model } = require('mongoose');

const ArticulosSchema = Schema({
    clave: {
        type: String,
        required: [true, 'El clave es obligatorio']
    },
    cantidad: {
        type: String,
        required: [true, 'El cantidad es obligatorio']
    },

    tienda:{
        type: Schema.ObjectId, ref: 'Tienda'
    },

    costoVenta: {
        type: String,
        required: [true, 'La costoVenta es obligatorio']
    },

    costoCompra: {
        type: String,
        required: [true, 'El costoCompra es obligatorio']
    },

    perecedero: {
        type: String,
        required: [true, 'El perecedero es obligatorio']
    },

    descripcion: {
        type: String,
        required: [true, 'El descripcion es obligatorio']
    },
    proveedor: {
        type: Schema.ObjectId, ref: 'Proveedore'
    },
    estado: {
        type: String,
    }

});


module.exports = model('Articulo', ArticulosSchema);
