const { response, request } = require('express');
const jwt = require('jsonwebtoken');
const UsuarioModelo = require('../models/usuario');

const validarJWT = async(req = request, res = response, next) => {

    const token = req.header('x-token');

    if ( !token ) {
        
        return res.status(401).json({
            msg:'No hay token en la petición'
        })

    }

    try {

        const { uid } = jwt.verify(token, process.env.SECRETKEY)
        
        //leer el usuario que corresponde al uid
        const usuario = await UsuarioModelo.findById(uid);

        if (!usuario) {
            
            return res.status(401).json({
                msg:'Usuario no encontrado'
            })

        }

        //verificar si el usuario tiene estado en true
        if (!usuario.estado) {
            
            return res.status(401).json({
                msg:'Usuario no registrado en el sistema'
            })
        }
        
        req.usuario = usuario
        next();

    } catch (error) {
        
        console.log(error);
        return res.status(401).json({
            msg:'Token no válido'
        })

    }

}

module.exports = {
    validarJWT
}