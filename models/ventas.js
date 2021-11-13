
const { Schema, model } = require('mongoose');

const VentasSchema = Schema({
    fecha: {
        type: String,
        required: [true, 'La fecha es obligatorio']
    },
    hora: {
        type: String,
        required: [true, 'La hora es obligatorio']
    },

    monto: {
        type: String,
        required: [true, 'El monto es obligatorio']
    },

    descripcion: {
        type: String,
        required: [true, 'El descripcion es obligatorio']
    },

    cantidad: {
        type: String,
        required: [true, 'El cantidad es obligatorio']
    },

    pUnitario: {
        type: String,
        required: [true, 'El pUnitario es obligatorio']
    },

    pTotal: {
        type: String,
        required: [true, 'El pTotal es obligatorio']
    },

    estado: {
        type: String,
    }

});


module.exports = model('Venta', VentasSchema);
