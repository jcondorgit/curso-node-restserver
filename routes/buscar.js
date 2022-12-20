const { Router } = require('express');
const { buscarTermino } = require('../controllers/bucar');

const router = new Router();

router.get('/:coleccion/:termino', buscarTermino);



module.exports = router;