const express = require('express');
const router = express.Router();

const customerController = require('./../controllers/customer.controller');
const itemController = require('./../controllers/item.controller');
const orderController = require('./../controllers/order.controller');

// home page
router.get('/', (req, res) => {
  res.render('index', { title: 'Express' });
});

// Customer
router.post('/customer/login', customerController.login);
router.post('/customer/register', customerController.register);
router.put(
  '/customer/change_password/:customerId',
  customerController.update_password,
);

// Item
router.get('/item', itemController.get_all_item);
router.get('/item/:itemId', itemController.get_item_by_id);
router.post('/item', itemController.add_item);
router.put('/item/:itemId', itemController.update_item);
router.delete('/item/:itemId', itemController.delete_item);

// Order
router.get('/order', orderController.get_all_order);
router.post('/order', orderController.create_order);
router.put(
  '/order/update_status_order/:orderId',
  orderController.update_status_order,
);

module.exports = router;
