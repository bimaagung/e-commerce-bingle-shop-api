const express = require('express');
const itemController = require('../controllers/item.controller');

const router = express.Router();

router.get('/', itemController.get_all_item);
router.get('/:itemId', itemController.get_item_by_id);
router.post('/', itemController.add_item);
router.put('/:itemId', itemController.update_item);
router.delete('/:itemId', itemController.delete_item);

module.exports = router;
