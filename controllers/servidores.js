const { response, request } = require('express');
const servidores = require('../models/servidores');

const Servidores = require('../models/servidores');

const servidoresGet = async(req = request, res = response) => {

    const { limite = 5, desde = 0 } = req.query;
    const query = { estado: '1' };

    const [ total, servidores ] = await Promise.all([
        Servidores.countDocuments(query),
        Servidores.find(query)
            .skip( Number( desde ) )
            .limit(Number( limite ))
    ])

    console.log(servidores);
    res.json({
        total,
        servidores
    });
}

const servidoresPost = async (req = request, res = response) => {

    const { nombre,direccion, telefono,RFC, email} = req.body;
    const servidor = new Servidores({nombre,direccion, telefono, RFC, email, estado : '1'})

    await servidor.save();

    res.json({
        servidor
    });
}

const servidoresPut = async(req, res = response) => {

    const { id } = req.params;
    const servidorupdate = req.body;

    const servidor = await Servidores.findByIdAndUpdate( id, servidorupdate, {new: true});

    res.json(servidor);
}

const servidoresDelete = async(req, res = response) => {

    const { id } = req.params;
    const servidor = await Servidores.findByIdAndUpdate( id, { estado: '0' } );

    
    res.json(servidor);
}


module.exports = {
    servidoresPost,
    servidoresGet,
    servidoresPut,
    servidoresDelete
}