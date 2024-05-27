const express = require('express');
const router = express.Router();
const checkoutController = require('../controllers/checkoutController');
const authMiddleware = require('../middleware/authMiddleware');

// Ruta de procesamiento de pagos
router.post('/payment', authMiddleware, checkoutController.processPayment);

module.exports = router;
