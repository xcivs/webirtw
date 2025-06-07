const express = require('express');
const router = express.Router();
const catalogController = require('../controllers/catalog.controller');

router.get('/', catalogController.getAllCatalogItems);
router.get('/:id', catalogController.getCatalogItemById);
router.post('/', catalogController.createCatalogItem);
router.put('/:id', catalogController.updateCatalogItem);
router.delete('/:id', catalogController.deleteCatalogItem);

module.exports = router;
