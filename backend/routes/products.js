const express = require('express');
const router = express.Router();
const { getAll, getById, create, update, remove } = require('../controllers/productController');
const { verificarToken } = require('../middleware/auth');

// Todas las rutas de productos son protegidas
router.use(verificarToken);

router.get('/', getAll);
router.get('/:id', getById);
router.post('/', create);
router.put('/:id', update);
router.delete('/:id', remove);

module.exports = router;
