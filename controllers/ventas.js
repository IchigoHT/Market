const { response, request } = require('express');

const Ventas = require('../models/ventas');
const Articulos = require('../models/articulos');

const ventasGet = async (req = request, res = response) => {

    const { limite = 5, desde = 0 } = req.query;
    const query = { estado: '1' };

    const [total, ventas] = await Promise.all([
        Ventas.countDocuments(query),
        Ventas.find(query)
            .skip(Number(desde))
            .limit(Number(limite))
            .populate("articulos")

    ])

    console.log(ventas);
    res.json({
        total,
        ventas
    });
}

const ventasPost = async (req = request, res = response) => {

    const { cantidad, articulos } = req.body;
    const venta = new Ventas({ cantidad, articulos, estado: '1' })

    const articuloid = articulos;

    const articuloB = await Articulos.findById(articuloid);

    if (!articuloB) {
        return res.status(404).send({ mensaje: "EL articulo no existe" })
    }

    if (articuloB.estado == '0') {
        return res.status(404).send({ mensaje: "EL articulo su estado es 0" })
    }

    if (parseInt(articuloB.cantidad) < parseInt(cantidad)) {
        return res.status(404).send({ mensaje: "La cantidad supera al stock del producto" })
    }

    const cantidadReq = parseInt(cantidad);

    const newcantidad = parseInt(articuloB.cantidad) - cantidadReq;

    await Articulos.findByIdAndUpdate(articuloid, { "cantidad": newcantidad });

    venta.pTotal = cantidadReq * parseFloat(articuloB.costoVenta);

    await venta.save();


    res.json({
        venta
    });
}

const ventasPut = async (req, res = response) => {

    const { id } = req.params;
    const ventasupdate = req.body;
    
    const venta = await Ventas.findByIdAndUpdate(id, ventasupdate, { new: true });

    res.json(venta);
}

const ventasDelete = async (req, res = response) => {

    const { id } = req.params;
    const venta = await Ventas.deleteOne({"_id":id});
    res.json(venta);
}


module.exports = {
    ventasPost,
    ventasGet,
    ventasPut,
    ventasDelete
}