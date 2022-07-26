const express = require('express');
const itemsController = require('../controllers/item.controller');

const router = express.Router();

router.get('/', itemsController.get_all_item);

router.get('/:id', itemsController.get_item_by_id);

router.post('/', itemsController.add_item);

router.put('/:id', itemsController.update_item);

router.delete('/:id', itemsController.delete_item);

module.exports = router;
