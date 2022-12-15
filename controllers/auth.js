const { response, request } = require('express');
const bcrypt = require('bcrypt');
const UsuarioModelo = require('../models/usuario');
const { generarJWT } = require('../helpers/jwt-generador');
const { googleVerify } = require('../helpers/google-verify');


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

const googleSignIn = async(req, res = response)=>{

    const { id_token } = req.body;

    try {
        
        const {nombre, img, correo} = await googleVerify( id_token );

        let usuario = await UsuarioModelo.findOne( {correo} );

        if ( !usuario ) {
            //se crea un nuevo usuario

            const data ={
                nombre, 
                correo,
                password: '123',
                img,
                google: true,
                estado: true,
                rol: 'USER_ROLE'
            }

            usuario = new UsuarioModelo(data);
            await usuario.save();

        }

        //Si el estado del usuario está en false
        if ( !usuario.estado ) {
                
            return res.status(401).json({
                msg:'El usuario está desactivado, contacte al administrador'
            })

        }
        //Generar el JWT
        const token = await generarJWT(usuario.id);

        res.json({
            usuario,
            token
        })

    } catch (error) {
        
        console.log(error);
        res.status(400).json({
            ok:'false',
            msg:'El token no se pudo validar'
        })

    }


}

module.exports = {
    login,
    googleSignIn
}