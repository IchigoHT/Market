
const { Schema, model } = require('mongoose');

const ProveedoresSchema = Schema({
    nombre: {
        type: String,
        required: [true, 'El nombre es obligatorio']
    },
    RFC: {
        type: String,
        required: [true, 'El RFC es obligatorio']
    },

    direccion: {
        type: String,
        required: [true, 'La direccion es obligatorio']
    },

    telefono: {
        type: String,
        required: [true, 'El telefono es obligatorio']
    },

    email: {
        type: String,
        required: [true, 'El email es obligatorio']
    },
    estado: {
        type: String,
    }

});


module.exports = model('Proveedore', ProveedoresSchema);
