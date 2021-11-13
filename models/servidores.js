
const { Schema, model } = require('mongoose');

const ServidoresSchema = Schema({
    nombre: {
        type: String,
        required: [true, 'El nombre es obligatorio']
    },
    direccion: {
        type: String,
        required: [true, 'El direccion es obligatorio']
    },

    telefono: {
        type: String,
        required: [true, 'La telefono es obligatorio']
    },

    RFC: {
        type: String,
        required: [true, 'El RFC es obligatorio']
    },

    email: {
        type: String,
        required: [true, 'El email es obligatorio']
    },

    estado: {
        type: String,
    }

});


module.exports = model('Servidore', ServidoresSchema);
