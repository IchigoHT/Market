const { response, request } = require('express');
const articulos = require('../models/articulos');

const Proveedor = require('../models/proveedores');
const Articulos = require('../models/articulos');

const articulosGet = async (req = request, res = response) => {

    const { limite = 5, desde = 0 } = req.query;
    const query = { estado: '1' };

    const [total, articulos] = await Promise.all([
        Articulos.countDocuments(query),
        Articulos.find(query)
            .skip(Number(desde))
            .limit(Number(limite))
    ])

    console.log(articulos);
    res.json({
        total,
        articulos
    });
}

const articulosPost = async (req = request, res = response) => {

    const { clave, cantidad, costoVenta, costoCompra, proveedor, perecedero, descripcion } = req.body;

    const prove = await Proveedor.findById(proveedor);

    if (!prove) {
        return res.status(404).send({ mensaje: "EL Provedor no existe" })
    }

    if (prove.estado == '0') {
        return res.status(404).send({ mensaje: "EL Provedor su estado es 0" })
    }

    const articulo = new Articulos({ clave, cantidad, costoVenta, costoCompra, proveedor: prove, perecedero, descripcion, estado: '1' })

    await articulo.save();

    const idarticulo = articulo._id;

    console.log(prove._id);
    console.log(idarticulo);


    await Proveedor.updateOne({ _id: prove._id }, { $push: { articulos: idarticulo } }, { new: true });

    return res.json({
        articulo
    });
}

const articulosPut = async (req, res = response) => {

    const { id } = req.params;
    const articulosupdate = req.body;

    const articulo = await Articulos.findByIdAndUpdate(id, articulosupdate, { new: true });

    res.json(articulo);
}

const articulosDelete = async (req, res = response) => {

    const { id } = req.params;
    const articulo = await Articulos.findByIdAndUpdate(id, { estado: '0' });


    res.json(articulo);
}



module.exports = {
    articulosPost,
    articulosGet,
    articulosPut,
    articulosDelete
}