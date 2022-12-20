const { Router } = require('express');
const {check} = require('express-validator');
const { crearProducto , 
        borrarProducto,
        actualizarProducto,
        obtenerProducto,
        obtenerProductos } = require('../controllers/productos');
const { idProductoExiste, idCategoriaExiste, productoEstaDisponible, productoEstaHabilitado } = require('../helpers/db-validators');
const { validarJWT, validarCampos, esAdminRole } = require('../middlewares');

const router = Router();

/**
 * {{url}}/api/productos
 */
//SERVICIOS - END POINTS 

//obtener todas los productos - público
router.get('/', obtenerProductos);

//obtener una producto por id - público
//midelware que revise si existe el id
router.get('/:id', [
    check('id','No es un id válido').isMongoId(),
    check('id').custom( idProductoExiste ),
    check('id').custom( productoEstaDisponible ),
    check('id').custom( productoEstaHabilitado ),
    validarCampos
] , obtenerProducto);

//Crear producto -privado- cualquier persona con un token válido
router.post('/', [ 
    validarJWT,
    check('categoria', 'No es un id de mongo válido').isMongoId(),
    check('categoria').custom( idCategoriaExiste ),
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    validarCampos
 ], crearProducto);

//Realizar actualizaciones por id - privado - con token válido  
router.put('/:id', [
    validarJWT,
    //check('categoria', 'No es un id de mongo válido').isMongoId(),
    check('id').custom( idProductoExiste ),
    validarCampos
] ,  actualizarProducto);

//Borrar un producto
router.delete('/:id',[
    validarJWT,
    esAdminRole,
    check('id','No es un id válido').isMongoId(),
    validarCampos,
    check('id').custom( idProductoExiste ),
    validarCampos
], borrarProducto);



module.exports = router;