const { response, request } = require('express');
const bcrypt = require('bcrypt');
const UsuarioModelo = require('../models/usuario');


const usuariosGet = async(req = request, res=response) => {

    //const {nombre='No name',altura,key} = req.query;
    const {limite = 5, desde = 0} = req.query;
    const query = { estado : true};

    /* const usuarios = await UsuarioModelo.find(query)
        .skip(Number(desde))
        .limit(Number(limite));

    const totalUsuarios = await UsuarioModelo.countDocuments(query);
 */

    const [totalUsuarios, usuarios] = await Promise.all([

        UsuarioModelo.countDocuments(query),
        UsuarioModelo.find(query)
            .skip( Number( desde ))
            .limit( Number( limite ))

    ])

    res.json({
        totalUsuarios,
        usuarios
    });

}
const usuariosPost = async (req, res=response) => {

    const {nombre,correo,password,rol} = req.body;
    const usuario = new UsuarioModelo( {nombre,correo,password,rol} );//instancia del modelo

    //encriptar la contraseña
    const salt = bcrypt.genSaltSync();
    usuario.password = bcrypt.hashSync(password, salt);
    
    await usuario.save();//grabación del registro

    res.json(usuario);

}
const usuariosPut = async(req, res = response) => {
    
    const id = req.params.id;
    const{_id, password, google, correo, ...resto} = req.body;

    //TODO validar contra base de datos
    if (password) {
        
        //encriptar la contraseña
        const salt = bcrypt.genSaltSync();
        resto.password = bcrypt.hashSync(password, salt);

    }

    //actualizar el registro
    const actualiarUsuario = await UsuarioModelo.findByIdAndUpdate(id, resto)

    res.json({
        "msg":"put API - controller",
        actualiarUsuario
    });

}
const usuariosPatch = (req, res=response) => {

    res.json({
        "msg":"patch API - controller"
    });

}
const usuariosDelete = async(req, res=response) => {

    const {id} = req.params;

    //const eliminarUsuarioFisicamente = await UsuarioModelo.findByIdAndDelete(id);
    const eliminarUsuarioEstado = await UsuarioModelo.findByIdAndUpdate(id, {estado:false});
    //usuario autenticado
    //const usuarioAutenticado = req.usuario;

    res.json({
        eliminarUsuarioEstado
    });

}



module.exports = {
    usuariosGet,
    usuariosPost,
    usuariosPut,
    usuariosPatch,
    usuariosDelete
}