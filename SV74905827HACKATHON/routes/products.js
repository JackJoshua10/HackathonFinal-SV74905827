const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');
const authMiddleware = require('../middleware/authMiddleware');

// Rutas de productos
router.get('/', productController.getProducts);
router.post('/', authMiddleware, productController.createProduct);

module.exports = router;
