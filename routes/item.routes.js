const express = require('express');
const router = express.Router();

const itemController = require('../controllers/item.controller');

router.get('/', itemController.getListItem);
router.get('/detail/:id', itemController.getItemById);

module.exports = router;
