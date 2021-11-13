
const { Schema, model } = require('mongoose');

const ClientesSchema = Schema({
    nombre: {
        type: String,
        required: [true, 'El clave es obligatorio']
    },
    RFC: {
        type: String,
        required: [true, 'El RFC es obligatorio']
    },

    direccion: {
        type: String,
        required: [true, 'La direccion es obligatorio']
    },

    tipo: {
        type: String,
        required: [true, 'El tipo es obligatorio']
    },

    telefono: {
        type: String,
        required: [true, 'El telefono es obligatorio']
    },

    estado: {
        type: String,
    }

});


module.exports = model('Cliente', ClientesSchema);
