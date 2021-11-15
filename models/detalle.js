
const { Schema, model } = require('mongoose');

const DetalleVentasSchema = Schema({

    fechacreacion:{
        type: String,
    },

    cliente:{
        type: Schema.ObjectId, ref: 'Cliente'
    },

    ventas: [
        {
            type: Schema.ObjectId, ref: 'Venta'
        }
    ],


    totalpagar: {
        type: String,
        required: [true, 'El pTotal es obligatorio']
    },



    estado: {
        type: String,
    }

});


module.exports = model('DetalleVenta', DetalleVentasSchema);
