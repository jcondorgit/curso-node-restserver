const { response, request } = require('express');
const bcrypt = require('bcrypt');
const UsuarioModelo = require('../models/usuario');
const { generarJWT } = require('../helpers/jwt-generador');


const login = async(req = request, res = response) => {

    const {correo, password} = req.body;
    //verificar que el email  existe
    const usuario = await UsuarioModelo.findOne({ correo });
    
    if( !usuario ){

        return res.status(400).json({
            msg:'El usuario / password no son correctos - correo'
        })

    }

    //verificar que el usuario está activado
    if (!usuario.estado) {

        return res.status(400).json({
            msg:'El usuario / password no son correctos -estado'
        })
        
    }

    //verificar la contraseña
    const verificarPass = bcrypt.compareSync(password, usuario.password);

    if(!verificarPass){

        return res.status(400).json({
            msg:'El usuario / password no son correctos -password'
        })

    }


    //Generar el JWT
    const token = await generarJWT(usuario.id);

    try {
        
        res.json({
            usuario,
            token
        })

    } catch (error) {
        /** Nunca debería aparecer esto */
        console.log(error);
        res.status(500).json({
            msg:'Error al ingresar a la app'
        })

    }
    

}

module.exports = {
    login
}