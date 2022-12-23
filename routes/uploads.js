const { Router } = require('express');
const {check} = require('express-validator');
const { cargarArchivos , actualizarImagen, obtenerImagen, actualizarImagenCloudinary } = require('../controllers');
const { colleccionesPermitidas } = require('../helpers/db-validators');
const { validarCampos, validarArchivo } = require('../middlewares');

const router = Router();

router.post('/', validarArchivo , cargarArchivos);

router.put('/:coleccion/:id', [
    validarArchivo,
    check('id', 'Debe ser un id de Mongo').isMongoId(),
    check('coleccion').custom( c => colleccionesPermitidas( c , ['usuarios', 'productos'] )),
    validarCampos
] , actualizarImagenCloudinary );
/* ] , actualizarImagen); */

router.get('/:coleccion/:id', [
    check('id', 'Debe ser un id de Mongo').isMongoId(),
    check('coleccion').custom( c => colleccionesPermitidas( c , ['usuarios', 'productos'] )),
    validarCampos
] , obtenerImagen);


module.exports = router;