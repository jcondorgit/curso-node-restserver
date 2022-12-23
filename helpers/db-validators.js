
const { Categoria, Producto , UsuarioModelo } = require('../models');
const Role = require('../models/role');


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

//CATEGORIAS
//
const idCategoriaExiste = async( id ) => {
    
    const existeCat = await Categoria.findById(id);
    if (!existeCat) {
        throw new Error(`La categoría: ${id} no está registrada en el sistema`);
    }

} 
//PRODUCTOS
//
const idProductoExiste = async( id ) => {
    
    const existeProd = await Producto.findById(id);
    if (!existeProd) {

        throw new Error(`El producto: ${id} no está registrada en el sistema`);

    }

} 
const productoEstaDisponible = async( id ) => {
    
    const existeProd = await Producto.findById(id);
    if (!existeProd.disponible) {

        throw new Error(`El producto: ${id} no está disponible en stock`);

    }

} 
const productoEstaHabilitado = async( id ) => {
    
    const existeProd = await Producto.findById(id);
    if (!existeProd.estado) {

        throw new Error(`El producto: ${id} no se encuentra en la db`);

    }

} 

//Validar collecciones permitidas
const colleccionesPermitidas = (coleccion ='', collecciones = []) => {
    
    const existeColeccion = collecciones.includes(coleccion);

    if (!existeColeccion) {
        
        throw new Error(`La coleccion ${coleccion} no es permitida, ${colecciones}`);

    }

    return true;//
}

module.exports = { 
    colleccionesPermitidas,
    esRolValido,
    emailExiste,
    idUsuarioExiste,
    idCategoriaExiste,
    idProductoExiste,
    productoEstaDisponible,
    productoEstaHabilitado
}