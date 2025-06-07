// backend/routes/product.route.js
const express = require('express');
const router = express.Router();
const productController = require('../controllers/product.controller');

// Эндпоинт получения одного товара вместе с related
router.get('/:id', productController.getProductById);

// (опционально) Эндпоинт для всего списка
router.get('/', productController.getAllProducts);

module.exports = router;
