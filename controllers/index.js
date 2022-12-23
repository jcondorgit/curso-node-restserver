const auth = require('./auth');
const buscar = require('./bucar');
const categorias = require('./categorias');
const productos = require('./productos');
const uploads= require('./uploads');
const usuarios= require('./uploads');



module.exports = {
    ...auth,
    ...buscar,
    ...categorias,
    ...productos, 
    ...uploads,
    ...usuarios, 
}