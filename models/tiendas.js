
const { Schema, model } = require('mongoose');

const TiendasSchema = Schema({

    ubicacion: {
        type: String,
        required: [true, 'El ubicacion es obligatorio']
    },
    nombre: {
        type: String,
        required: [true, 'El nombre es obligatorio']
    },
    articulos: [{
        type: Schema.ObjectId, ref: 'Ariculo'
    }],

    estado: {
        type: String,
    }

});


module.exports = model('Tienda', TiendasSchema);
