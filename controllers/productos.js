const { response, request } = require('express');

const Usuario = require('../models/usuario');
//const Categoria = require('../models/categoria');
const Producto = require('../models/producto');

const productoGet = async (req = request, res = response) => {

    const { limite = 5, desde = 0 } = req.query;
    const query = { estado: true };


    const [total, producto] = await Promise.all([
        Producto.countDocuments(query),
        Producto.find(query)
            .skip(Number(desde))
            .limit(Number(limite))
            .populate('usuario')
            .populate('categoria')
    ])

    console.log(producto);
    res.json({
        total,
        producto
    });
}


const productoPost = async (req = request, res = response) => {

    var UsuarioLogeado = req.usuario;

    const { nombre, precio, descripcion, categoria } = req.body;
    console.log(UsuarioLogeado);

    const categoriab = await Categoria.findById(categoria);
    console.log(categoriab);

    const producto = new Producto({
        nombre,
        precio,
        descripcion,
        categoria: categoriab,
        usuario: UsuarioLogeado
    });

    await producto.save();

    res.json({
        producto
    });
}

//elimina productos
const productoDelete = async (req, res = response) => {

    const { id } = req.params;
    var UsuarioLogeado = req.usuario;
    console.log("id usaurio: " + req.usuario._id);

    const productoUsuario = await Producto.find({ usuario: UsuarioLogeado._id });

    console.log(productoUsuario);

    if (!productoUsuario) {
        console.log("Usuario no existe");
        res.json({
            msg: "Al usuario no le pertenece este producto que decea eliminar"
        });
    }

    const producto = await Producto.findByIdAndUpdate(id, { 'estado': false }, {new: true});
    console.log("producto elimnado" + producto);
    res.json(producto);


}

const productosPut = async(req, res = response) => {

    const { id } = req.params;
    var productoupdate  = req.body;

    const producto = await Producto.findByIdAndUpdate( id, productoupdate ,{new: true});

    res.json(producto);
}


module.exports = {
    productoPost,
    productoGet,
    productoDelete,
    productosPut
}