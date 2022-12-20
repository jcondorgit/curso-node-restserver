const { response } = require("express");
const { Producto } = require("../models");

//obtener productos - paginado - total - populate
const obtenerProductos = async(req, res = response) => {

    const {limite = 5, desde = 0} = req.query;
    const query = { estado : true};


    const [totalProductos, productos] = await Promise.all([

        Producto.countDocuments(query),
        Producto.find(query)
            .populate('usuario', 'nombre')
            .populate('categoria', 'nombre')
            .skip( Number( desde ))
            .limit( Number( limite ))

    ])

    res.json({
        totalProductos,
        productos
    });

}

// obtener Producto - populate {}
const obtenerProducto = async(req, res = response) => {
    
    const id = req.params.id;

    const productoExiste = await Producto.findById(id)
                            .populate('usuario', 'nombre')
                            .populate('categoria', 'nombre');

    res.json(productoExiste);

}

const crearProducto = async(req, res = response) => {

    const {usuario, estado,...body} = req.body;

    const productoDB = await Producto.findOne({ nombre: body.nombre.toUpperCase() });

    if ( productoDB ) {
        
        return res.status(400).json({
            msg:`El Producto ${ productoDB.nombre } ya está registrado`
        })

    }

    //Generar la data
    const data = {
        ...body,
        nombre: req.body.nombre.toUpperCase(),
        usuario: req.usuario._id
    }

    //guardando en la db
    const producto = new Producto(data);

    await producto.save();

    return res.status(201).json(producto)


}

//actualizar Producto - nombre
const actualizarProducto = async( req, res = response) => {

    const id = req.params.id;
    //
    const{estado, usuario, ...resto} = req.body;

    if (resto.nombre) {
        
        resto.nombre = resto.nombre.toUpperCase();

    }

    resto.usuario = req.usuario._id;//usuario dueño del token

    //actualizar el registro
    const actProducto = await Producto.findByIdAndUpdate(id, resto)

    res.json({
        "msg":"producto actualizado",
        actProducto
    });

}

//borrar Producto - estado: false
const borrarProducto = async(req, res = response)=>{

    const { id } = req.params;

    const eliminarProducto = await Producto.findByIdAndUpdate(id, { estado : false } , {new : true});

    res.status(200).json({
        eliminarProducto
    });

}

module.exports = {
    actualizarProducto,
    borrarProducto,
    crearProducto,
    obtenerProducto,
    obtenerProductos
}