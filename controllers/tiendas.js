const { response, request } = require('express');
const bcryptjs = require('bcryptjs');

const Tiendas = require('../models/tiendas');
const Usuario = require('../models/usuario');

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

const TiendasGetID = async (req = request, res = response) => {

    const { limite = 5, desde = 0 } = req.query;

    const query = req.params.id;

    const [total, tiendas] = await Promise.all([
        Tiendas.countDocuments(query),
        Tiendas.findById(query)
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
    console.log(req.body);
    const { ubicacion, nombre, articulos } = req.body;
    const tienda = new Tiendas({ ubicacion, articulos, nombre, estado: '1' });

    const tiendanew = await tienda.save();
    console.log(tiendanew._id);
    await Usuario.findOneAndUpdate({ rol: "ADMIN_ROLE" }, { $push: { "tienda": tiendanew._id } })

    console.log(tienda + "esta es la tienda");

    res.json({
        tienda: tiendanew
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
    TiendasDelete,
    TiendasGetID
}