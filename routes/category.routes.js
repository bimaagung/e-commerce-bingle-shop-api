const express = require('express');
const router = express.Router();

const categoryController = require('../controllers/category.controller');

router.get('/', categoryController.getListCategory);
router.get('/detail/:id', categoryController.getCategoryById);

module.exports = router;
