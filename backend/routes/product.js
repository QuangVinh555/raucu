const express = require('express');
const router = express.Router();
const productControllers = require('../controllers/ProductControllers')

router.get('/', productControllers.getAllProducts);
router.post('/create', productControllers.createProduct);

module.exports = router;