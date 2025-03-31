const express = require('express');
const orderPaymentController = require('../controllers/orderPaymentController')
const router = express.Router();//constructor que retorna un objeto

//obtener los numeros de mesas
router.get("/getTableNumbers", orderPaymentController.getTableNumbers);
router.get("/getItemsMenu/:item", orderPaymentController.getItemsMenu);
router.get("/getOrders", orderPaymentController.getOrdersContr);
router.get("/getOrderDetails/:id", orderPaymentController.getOrderDetails);
router.post("/orderPayment", orderPaymentController.orderPayment);
router.get("/calculateOrderTotal/:menuDetails", orderPaymentController.calculateOrderTotal);
router.post("/deleteItemMenu", orderPaymentController.deleteItemMenu);
router.get("/changeStateOrder/:id_order", orderPaymentController.changeStateOrder);
router.get("/changeStatusTable/:id_table", orderPaymentController.changeStatusTable);

module.exports = router;