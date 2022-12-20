const { Router } = require('express');
const {check} = require('express-validator');
const { crearCategoria , 
        borrarCategoria,
        actualizarCategoria,
        obtenerCategoria,
        obtenerCategorias } = require('../controllers/categorias');
const { idCategoriaExiste } = require('../helpers/db-validators');
const { validarJWT, validarCampos, esAdminRole } = require('../middlewares');

const router = Router();

/**
 * {{url}}/api/categorias
 */
//SERVICIOS - END POINTS 

//obtener todas las categorías - público
router.get('/', obtenerCategorias);

//obtener una categoria por id - público
//midelware que revise si existe el id
router.get('/:id', [
    check('id','No es un id válido').isMongoId(),
    check('id').custom( idCategoriaExiste ),
    validarCampos
] , obtenerCategoria);

//Crear categoría -privado- cualquier persona con un token válido
router.post('/', [ 
    validarJWT,
    check('id','No es un id válido').isMongoId(),
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    validarCampos
 ], crearCategoria);

//Realizar actualizaciones por id - privado - con token válido  
router.put('/:id', [
    validarJWT,
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('id','No es un id válido').isMongoId(),
    check('id').custom( idCategoriaExiste ),
    validarCampos
] ,  actualizarCategoria);

//Borrar una categoría - admin
router.delete('/:id',[
    validarJWT,
    esAdminRole,
    check('id','No es un id válido').isMongoId(),
    validarCampos,
    check('id').custom( idCategoriaExiste ),
    validarCampos
], borrarCategoria);



module.exports = router;