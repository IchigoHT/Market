
const { Schema, model } = require('mongoose');

const PagosSchema = Schema({
    cantidad: {
        type: String,
        required: [true, 'El cantidad es obligatorio']
    },
    tipoPago: {
        type: String,
        required: [true, 'El tipoPago es obligatorio']
    },

    estado: {
        type: String,
    }

});


module.exports = model('Pago', PagosSchema);
