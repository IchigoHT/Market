const { response, request } = require('express');
const clientes = require('../models/clientes');

const Clientes = require('../models/clientes');

const clientesGet = async(req = request, res = response) => {

    const { limite = 5, desde = 0 } = req.query;
    const query = { estado: '1' };

    const [ total, clientes ] = await Promise.all([
        Clientes.countDocuments(query),
        Clientes.find(query)
            .skip( Number( desde ) )
            .limit(Number( limite ))
    ])

    console.log(clientes);
    res.json({
        total,
        clientes
    });
}

const clientesPost = async (req = request, res = response) => {

    const { nombre, RFC, direccion, tipo, telefono} = req.body;
    const cliente = new Clientes({ nombre, RFC, direccion, tipo, telefono, estado : '1'})

    await cliente.save();

    res.json({
        cliente
    });
}

const clientesPut = async(req, res = response) => {

    const { id } = req.params;
    const clienteupdate = req.body;

    const cliente = await Clientes.findByIdAndUpdate( id, clienteupdate, {new: true});

    res.json(cliente);
}

const clientesDelete = async(req, res = response) => {

    const { id } = req.params;
    const cliente = await Clientes.findByIdAndUpdate( id, { estado: '0' } );

    res.json(cliente);
}

module.exports = {
    clientesPost,
    clientesGet,
    clientesPut,
    clientesDelete
}