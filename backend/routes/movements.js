const express = require('express');
const router = express.Router();
const { getAll, create } = require('../controllers/movementController');
const { verificarToken } = require('../middleware/auth');

// Todas las rutas de movimientos son protegidas
router.use(verificarToken);

router.get('/', getAll);
router.post('/', create);

module.exports = router;
