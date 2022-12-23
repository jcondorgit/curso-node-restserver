const validarArchivos =  require('../middlewares/validar-archivo');
const validarCampos =  require('../middlewares/validar-campos');
const validarJWT = require('../middlewares/validar-jwt');
const validarRol = require('../middlewares/validar-role');

module.exports = {
    
    ...validarArchivos,
    ...validarCampos,
    ...validarJWT,
    ...validarRol

}