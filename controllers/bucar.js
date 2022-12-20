const { response } = require("express");
const { ObjectId } = require("mongoose").Types;

const {Usuario, Categoria, Producto} = require('../models')

const esCollecion = [
    'categorias',
    'productos',
    'usuarios',
    'roles'
]

const buscarUsuarios = async (termino = '', res = response) => {

    const esIdMongo = ObjectId.isValid( termino );

    if ( esIdMongo ) {
        
        const usuario = await Usuario.findById(termino);
        return res.json({
            results: (usuario) ? [usuario] : []
        })

    }

    const regEx = new RegExp(termino, 'i');

    const existeUsuario = await Usuario.find({
        $or:[{nombre: regEx},{correo: regEx}],
        $and:[{estado:true}]
    });

    res.json({
        results: existeUsuario
    })

}
const buscarCategorias = async ( termino = '', res = response ) => {
    
    const esIdMongo = ObjectId.isValid( termino );

    if ( esIdMongo ) {
        
        const categoria = await Categoria.findById(termino);
        return res.json({
            results: (categoria) ? [categoria] : []
        })

    }
    const regEx = new RegExp( termino, 'i' );

    const existeCategoria = await Categoria.find({nombre: regEx, estado: true});

    res.json({
        results: existeCategoria
    })

}
const buscarProductos = async ( termino = '', res = response ) => {

    const esIdMongo = ObjectId.isValid( termino );

    if ( esIdMongo ) {
        
        const producto = await Producto.findById(termino)
                                .populate('categoria','nombre');
        return res.json({
            results: (producto) ? [producto] : []
        })

    }

    const regEx = new RegExp( termino, 'i' );

    const existeProducto = await Producto.find({nombre: regEx, estado: true})
                                .populate('categoria','nombre');

    res.json({
        results: existeProducto
    })

}

const buscarTermino = (req, res = response) => {

    const {coleccion, termino} = req.params;

    if ( !esCollecion.includes(coleccion) ) {
        
        res.status(400).json({
            msg: `no es una colección válida, intente con: ${esCollecion}`
        })

    }

    switch (coleccion) {
        case 'categorias':
            buscarCategorias(termino , res);
            break;
            
        case 'productos':
            buscarProductos(termino , res);
            break;
            
        case 'usuarios':
            buscarUsuarios(termino , res);
            break;
    
        default:
            res.status(500).json('Falta crear dinámica para la búsqueda');
    }

}

module.exports = {
    buscarTermino
}