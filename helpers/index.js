const dbValidator = require('./db-validators');
const googleVerify = require('./db-validators');
const jwtGenerator = require('./db-validators');
const subirArchivos = require('./db-validators');


module.exports = {
    ...dbValidator,
    ...googleVerify, 
    ...jwtGenerator,
    ...subirArchivos    
}