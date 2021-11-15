
const { Schema, model } = require('mongoose');

const VentasSchema = Schema({

    articulos:
    {
        type: Schema.ObjectId, ref: 'Articulo'
    },

    cantidad: {
        type: String,
        required: [true, 'El cantidad es obligatorio']
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
