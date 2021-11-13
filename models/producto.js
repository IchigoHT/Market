const {Schema, model, isValidObjectId} = require('mongoose');


const ProductoSchema = Schema({
    nombre: {
        type: String,
        required: [true, 'El nombre de producto es obligatorio']
    },
    usuario:{
        type: Schema.ObjectId, ref: 'Usuario'
    },
    precio:{
        type: String,
        required: [true, 'El precio es obligatorio']
    },
    categoria: {    
        type: Schema.ObjectId, ref: 'Categoria'
    },
    descripcion:{
        type: String
    },
    disponible: {
        type: Boolean,
        default: true
    },
    img: {
        type: String
    },
    estado: {
        type: Boolean,
        default: true
    }
});

module.exports = model('Producto', ProductoSchema);