const express = require('express');
const router = express.Router();
const cartController = require('../controllers/cartController');
const authMiddleware = require('../middleware/authMiddleware');

// Rutas del carrito de compras
router.get('/', authMiddleware, cartController.getCart);
router.post('/', authMiddleware, cartController.addToCart);

module.exports = router;
