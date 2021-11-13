const { response, request } = require('express');
const ventas = require('../models/ventas');

const Ventas = require('../models/ventas');

const ventasGet = async(req = request, res = response) => {

    const { limite = 5, desde = 0 } = req.query;
    const query = { estado: '1' };

    const [ total, ventas ] = await Promise.all([
        Ventas.countDocuments(query),
        Ventas.find(query)
            .skip( Number( desde ) )
            .limit(Number( limite ))
    ])

    console.log(ventas);
    res.json({
        total,
        ventas
    });
}

const ventasPost = async (req = request, res = response) => {

    const {fecha, hora, monto, descripcion, cantidad, pUnitario, pTotal} = req.body;
    const cliente = new Ventas({fecha, hora, monto, descripcion, cantidad, pUnitario, pTotal, estado : '1'})

    await cliente.save();

    res.json({
        cliente
    });
}

const ventasPut = async(req, res = response) => {

    const { id } = req.params;
    const ventasupdate = req.body;

    const venta = await Ventas.findByIdAndUpdate( id, ventasupdate, {new: true});

    res.json(venta);
}

const ventasDelete = async(req, res = response) => {

    const { id } = req.params;
    const venta = await Ventas.findByIdAndUpdate( id, { estado: '0' } );

    
    res.json(venta);
}


module.exports = {
    ventasPost,
    ventasGet,
    ventasPut,
    ventasDelete
}