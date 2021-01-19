const express = require('express');

const orderController = require('../controllers/orders');

const router = express.Router();

router.get('/orders', orderController.getOrders);

router.post('/order', orderController.postOrder);

router.put('/order/:orderId', orderController.updateOrder);

router.delete('/order/:orderId', orderController.deleteOrder);

module.exports = router;
