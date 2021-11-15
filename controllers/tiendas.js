const { response, request } = require('express');

const Tiendas = require('../models/tiendas');

const TiendasGet = async (req = request, res = response) => {

    const { limite = 5, desde = 0 } = req.query;
    const query = { estado: '1' };

    const [total, tiendas] = await Promise.all([
        Tiendas.countDocuments(query),
        Tiendas.find(query)
            .skip(Number(desde))
            .limit(Number(limite))
            .populate("articulos")

    ])

    console.log(tiendas);
    res.json({
        total,
        tiendas
    });
}

const TiendasPost = async (req = request, res = response) => {

    const { ubicacion, nombre, articulos } = req.body;
    const tienda = new Tiendas({ ubicacion, articulos, nombre, estado: '1' })

    await tienda.save();

    res.json({
        tienda
    });
}

const TiendasPut = async (req, res = response) => {

    const { id } = req.params;
    const tiendasupdate = req.body;

    const tiendas = await Tiendas.findByIdAndUpdate(id, tiendasupdate, { new: true });

    res.json(tiendas);
}

const TiendasDelete = async (req, res = response) => {

    const { id } = req.params;
    const tiendas = await Tiendas.findByIdAndUpdate(id, { estado: '0' });


    res.json(tiendas);
}


module.exports = {
    TiendasPost,
    TiendasGet,
    TiendasPut,
    TiendasDelete
}