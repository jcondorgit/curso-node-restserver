const { response, request } = require('express')

const usuariosGet = (req = request, res=response) => {

    const {nombre='No name',altura,key} = req.query;
    res.json({
        "msg":"patch API - controller",
        nombre,
        altura,
        key
    });

}
const usuariosPost = (req, res=response) => {

    const {nombre, texto} = req.body;

    res.json({
        "msg":"post API - controller",
        nombre,
        texto
    });

}
const usuariosPut = (req, res=response) => {
    
    const id = req.params.id;
    res.json({
        "msg":"put API - controller",
        id
    });

}
const usuariosPatch = (req, res=response) => {

    res.json({
        "msg":"patch API - controller"
    });

}
const usuariosDelete = (req, res=response) => {

    res.json({
        "msg":"delete API - controller"
    });

}



module.exports = {
    usuariosGet,
    usuariosPost,
    usuariosPut,
    usuariosPatch,
    usuariosDelete
}