const express = require('express');
const router = express.Router();

const authController = require('../controllers/auth.controller');
const itemController = require('../controllers/item.controller');
const adminController = require('../controllers/admin.controller');
const orderController = require('./../controllers/order.controller');

// home page
router.get('/', (req, res) => {
  res.render('index', { title: 'Express' });
});

// Customer
router.post('/user/login', authController.login);
router.post('/user/register', authController.register);
router.put('/user/change_password/:customerId', authController.update_password);

//Item
router.get('/item', itemController.getListItem);
router.get('/item/detail/:id', itemController.getItemById);

// Admin
router.post('/admin/item/add', adminController.addItem);
router.put('/admin/item/update/:id', adminController.updateItem);
router.delete('/admin/item/delete/:id', adminController.deleteItem);
router.get('/admin/order/', adminController.getListOrder);
router.patch('/admin/order/update/:id', adminController.updateStatusOrder);

// Order
router.get('/order/:id', orderController.getPendingOrderByUserId);
router.post('/order/create/:id', orderController.createOrder);
router.patch('/order/submit/:id', orderController.statusSubmitOrder);

module.exports = router;
