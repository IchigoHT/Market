/*const { response, request } = require('express');

const Usuario = require('../models/usuario');
const Categoria = require('../models/categoria');

const categoriaGet = async(req = request, res = response) => {

    const { limite = 5, desde = 0 } = req.query;
    const query = { estado: true };

    const [ total, categoria ] = await Promise.all([
        Categoria.countDocuments(query),
        Categoria.find(query)
            .skip( Number( desde ) )
            .limit(Number( limite ))
            .populate('usuario')
    ])

    console.log(categoria);
    res.json({
        total,
        categoria
    });
}


const categoriaPost = async (req = request, res = response) => {

    var UsuarioId = req.usuario;
    const { nombre } = req.body;
    console.log(UsuarioId);

    const usuario = await Usuario.findById(UsuarioId);

    console.log(usuario);
    const categoria = new Categoria({ nombre, usuario });

    await categoria.save();

    res.json({
        categoria
    });
}

module.exports = {
    categoriaPost,
    categoriaGet
}*/