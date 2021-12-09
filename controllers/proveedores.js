const { response, request } = require('express');
const proveedores = require('../models/proveedores');

const Proveedores = require('../models/proveedores');

const proveedoresGet = async (req = request, res = response) => {

    const { limite = 5, desde = 0 } = req.query;
    const query = { estado: '1' };

    const [total, proveedores] = await Promise.all([
        Proveedores.countDocuments(query),
        Proveedores.find(query)
            .skip(Number(desde))
            .limit(Number(limite))
            .populate('articulos')
    ])

    console.log(proveedores);
    res.json({
        total,
        proveedores
    });
}

const proveedoresGetRFC = async (req = request, res = response) => {

    const rfc = req.params.rfc;
    const query = { RFC: rfc };

    const [proveedores] = await Promise.all([
        Proveedores.find(query)
            .populate('articulos')
    ])

    console.log(proveedores);
    res.json({
        proveedores
    });
}

const proveedoresPost = async (req = request, res = response) => {

    const { nombre, RFC, direccion, telefono, email } = req.body;




    const proveedor = new Proveedores({ nombre, RFC, direccion, telefono, email, estado: '1' })

    await proveedor.save();

    res.json({
        proveedor
    });
}

const proveedoresPut = async (req, res = response) => {

    const { id } = req.params;
    const proveedorupdate = req.body;

    const proveedor = await Proveedores.findByIdAndUpdate(id, proveedorupdate, { new: true });

    res.json(proveedor);
}

const proveedoresDelete = async (req, res = response) => {

    const { id } = req.params;
    const proveedor = await Proveedores.findByIdAndUpdate(id, { estado: '0' }, { new: true });


    res.json(proveedor);
}


module.exports = {
    proveedoresPost,
    proveedoresGet,
    proveedoresPut,
    proveedoresDelete,
    proveedoresGetRFC
}