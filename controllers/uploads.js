const path = require('path');
const fs = require('fs');

const cloudinary = require('cloudinary').v2;
cloudinary.config(process.env.CLOUDINARY_URL);

const { response } = require('express');
const { subirArchivo } = require('../helpers/subir-archivos');
const { Usuario, Producto } = require('../models');
const { model } = require('mongoose');


const cargarArchivos = async(req, res = response) => {

    try {
        
        const nombre = await subirArchivo(req.files, undefined, 'imgs');
        /* const nombre = await subirArchivo(req.files, ['txt','pdf'], 'texto'); */
    
        res.json({
            nombre
        })

    } catch (error) {
        
        res.status(400).json({error})

    }


}

const actualizarImagen = async(req, res = response) => {
    
    const{coleccion, id} = req.params;
    
    let modelo;
    switch ( coleccion ) {

        case 'usuarios':
            modelo = await Usuario.findById(id);
            if (!modelo) {
                return res.status(400).json({
                    msg:'El usuario no existe en la base de datos'
                })
            }
        break;
        case 'productos':
            modelo = await Producto.findById(id);
            if (!modelo) {
                return res.status(400).json({
                    msg:'El producto no existe en la base de datos'
                })
            }
        break;
    
        default:
            res.status(500).json({
                msg:'Falta incluir este contenido'
            });

    }

    //Borrar img anterior

    if ( modelo.img ) {
        
        const pathImg = path.join( __dirname, '../uploads', coleccion , modelo.img );
        if ( fs.existsSync(pathImg) ) {
            
            fs.unlinkSync(pathImg);

        }

    }

    const nombre = await subirArchivo(req.files, undefined, coleccion );
    modelo.img = nombre;

    await modelo.save();

    res.json( modelo );

}
const actualizarImagenCloudinary = async(req, res = response) => {
    
    const{coleccion, id} = req.params;
    
    let modelo;
    switch ( coleccion ) {

        case 'usuarios':
            modelo = await Usuario.findById(id);
            if (!modelo) {
                return res.status(400).json({
                    msg:'El usuario no existe en la base de datos'
                })
            }
        break;
        case 'productos':
            modelo = await Producto.findById(id);
            if (!modelo) {
                return res.status(400).json({
                    msg:'El producto no existe en la base de datos'
                })
            }
        break;
    
        default:
            res.status(500).json({
                msg:'Falta incluir este contenido'
            });

    }

    //Borrar img anterior en cloudinary
    if ( modelo.img ) {
        
        const nombreAux = modelo.img.split('/');
        const nombre = nombreAux[ nombreAux.length -1 ];
        const [ public_id ] = nombre.split('.');

        cloudinary.uploader.destroy(public_id);
      
    }

    const { tempFilePath } = req.files.archivo;
    const { secure_url } = await cloudinary.uploader.upload( tempFilePath );
    
    modelo.img = secure_url;

    await modelo.save();

    res.json( modelo );

}

const obtenerImagen = async(req, res = response) => {
    
    const{coleccion, id} = req.params;
    
    let modelo;
    switch ( coleccion ) {

        case 'usuarios':
            modelo = await Usuario.findById(id);
            if (!modelo) {
                return res.status(400).json({
                    msg:'El usuario no existe en la base de datos'
                })
            }
        break;
        case 'productos':
            modelo = await Producto.findById(id);
            if (!modelo) {
                return res.status(400).json({
                    msg:'El producto no existe en la base de datos'
                })
            }
        break;
    
        default:
            res.status(500).json({
                msg:'Falta incluir este contenido'
            });

    }

    //Borrar img anterior

    if ( modelo.img ) {
        
        const pathImg = path.join( __dirname, '../uploads', coleccion , modelo.img );
        if ( fs.existsSync(pathImg) ) {
            
           return res.sendFile( pathImg );

        }

    }

    const ptImgNf = path.join( __dirname, '../assets/no-image.jpg' );
    if ( fs.existsSync(ptImgNf) ) {
            
        return res.sendFile( ptImgNf );

     }

}

module.exports = {
    cargarArchivos,
    actualizarImagen,
    actualizarImagenCloudinary,
    obtenerImagen
}