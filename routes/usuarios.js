const { Router } = require('express');
const {check} = require('express-validator');

const {validarCampos} =  require('../middlewares/validar-campos');
const {esRolValido,emailExiste, idUsuarioExiste} =  require('../helpers/db-validators');
const { usuariosGet, 
    usuariosPut, 
    usuariosPost, 
    usuariosDelete, 
    usuariosPatch } = require('../controllers/usuarios.controller')


const router = Router();

router.get('/', usuariosGet)
router.post('/', [
    check('nombre','El nombre es obligatorio').not().isEmpty(),
    check('password','El password debe tener más de 6 dígitos').isLength({ min:6}),
    check('correo','El correo no es válido').isEmail(),
    check('correo').custom(emailExiste),
    check('rol').custom(esRolValido),
    validarCampos
],usuariosPost)
router.put('/:id', [
    check('id','No es un id válido').isMongoId(),
    check('id').custom(idUsuarioExiste),
    check('rol').custom(esRolValido),
    validarCampos
],usuariosPut) 
router.patch('/', usuariosPatch)
router.delete('/:id',[
    check('id','No es un id válido').isMongoId(),
    check('id').custom(idUsuarioExiste),
    validarCampos
], usuariosDelete)

module.exports = router;