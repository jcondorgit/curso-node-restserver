
const Role = require('../models/role');
const UsuarioModelo = require('../models/usuario');

const esRolValido = async(rol = '') => {

    const existeRol = await Role.findOne({ rol });
    if (!existeRol) {
        throw new Error(`El rol ${ rol } no está registrado en la bd`);
    }

}


//revisar el correo
const emailExiste = async(correo = '') => {
    
    const existeCorreo = await UsuarioModelo.findOne({correo});
    if (existeCorreo) {
        throw new Error(`El correo: ${correo} ya está registrado en el sistema`);
    }

}

//revisar el usuario
const idUsuarioExiste = async( id ) => {
    
    const existeUsuario = await UsuarioModelo.findById(id);
    if (!existeUsuario) {
        throw new Error(`El usuario: ${id} no está registrado en el sistema`);
    }

}


module.exports = { 
    esRolValido,
    emailExiste,
    idUsuarioExiste
}