const { response } = require("express");
const { Categoria } = require("../models");

//obtener categorias - paginado - total - populate
const obtenerCategorias = async(req, res = response) => {

    const {limite = 5, desde = 0} = req.query;
    const query = { estado : true};


    const [totalCategorias, categorias] = await Promise.all([

        Categoria.countDocuments(query),
        Categoria.find(query)
            .populate('usuario', 'nombre')
            .skip( Number( desde ))
            .limit( Number( limite ))

    ])

    res.json({
        totalCategorias,
        categorias
    });

}

// obtener categoria - populate {}
const obtenerCategoria = async(req, res = response) => {
    
    const id = req.params.id;

    const categoriaExiste = await Categoria.findById(id).populate('usuario', 'nombre');

    return res.json(categoriaExiste);

}

const crearCategoria = async(req, res = response)=>{

    const nombre = req.body.nombre.toUpperCase();

    const categoriaDB = await Categoria.findOne({ nombre });

    if (categoriaDB) {
        
        res.status(400).json({
            msg:`La categoria ${categoriaDB.nombre} ya está registrada`
        })

    }

    //Generar la data
    const data = {
        nombre,
        usuario: req.usuario._id
    }
    //guardando en la db
    const categoria = new Categoria(data);

    await categoria.save();

    return res.status(201).json(categoria)


}

//actualizar categoria - nombre
const actualizarCategoria = async( req, res = response) => {

    const id = req.params.id;
    //
    const{estado, usuario, ...resto} = req.body;

    resto.nombre = resto.nombre.toUpperCase();
    resto.usuario = req.usuario._id;//usuario dueño del token

    //actualizar el registro
    const actCategoria = await Categoria.findByIdAndUpdate(id, resto)

    res.json({
        "msg":"categoría actualizada",
        actCategoria
    });

}

//borrar categoria - estado: false
const borrarCategoria = async(req, res = response)=>{

    const { id } = req.params;

    const eliminarCategoria = await Categoria.findByIdAndUpdate(id, { estado : false } , {new : true});

    res.status(200).json({
        eliminarCategoria
    });

}

module.exports = {
    actualizarCategoria,
    borrarCategoria,
    crearCategoria,
    obtenerCategoria,
    obtenerCategorias
}