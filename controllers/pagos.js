const { response, request } = require('express');
const pagos = require('../models/pagos');

const Pagos = require('../models/pagos');

const pagosGet = async(req = request, res = response) => {

    const { limite = 5, desde = 0 } = req.query;
    const query = { estado: '1' };

    const [ total, pagos ] = await Promise.all([
        Pagos.countDocuments(query),
        Pagos.find(query)
            .skip( Number( desde ) )
            .limit(Number( limite ))
    ])

    console.log(pagos);
    res.json({
        total,
        pagos
    });
}

const pagosPost = async (req = request, res = response) => {

    const {cantidad, tipoPago} = req.body;
    const pago = new Pagos({cantidad, tipoPago, estado : '1'})

    await pago.save();

    res.json({
        pago
    });
}

const pagosPut = async(req, res = response) => {

    const { id } = req.params;
    const pagosupdate = req.body;

    const pago = await Pagos.findByIdAndUpdate( id, pagosupdate, {new: true});

    res.json(pago);
}

const pagosDelete = async(req, res = response) => {

    const { id } = req.params;
    const pago = await Pagos.findByIdAndUpdate( id, { estado: '0' } );

    
    res.json(pago);
}


module.exports = {
    pagosPost,
    pagosGet,
    pagosPut,
    pagosDelete
}