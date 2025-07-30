const express = require('express');
const orderPaymentController = require('../controllers/orderPaymentController')
const router = express.Router();//constructor que retorna un objeto
const { verifyToken } = require('../middlewares/auth.middleware');

//obtener los numeros de mesas
router.get("/getTableNumbers", verifyToken, orderPaymentController.getTableNumbers);
router.get("/getItemsMenu/:item", verifyToken, orderPaymentController.getItemsMenu);
router.get("/getOrders", verifyToken, orderPaymentController.getOrdersContr);
router.get("/getOrderDetails/:id", verifyToken, orderPaymentController.getOrderDetails);
router.get("/getItemsByOrder/:order_id/:table_id", verifyToken, orderPaymentController.getItemsByOrder);
router.post("/orderPayment", verifyToken, orderPaymentController.orderPayment);
//endpoint para pagar la orden
router.post("/payOrder", verifyToken, orderPaymentController.payOrder);
router.get("/calculateOrderTotal/:menuDetails", verifyToken, orderPaymentController.calculateOrderTotal);
router.post("/deleteItemMenu", verifyToken, orderPaymentController.deleteItemMenu);
router.delete("/deleteInsumoOrder/:id_order_details/:order_id", verifyToken, orderPaymentController.deleteInsumoOrder);
router.post("/updateItemsOrder", verifyToken, orderPaymentController.updateItemsOrderContr);
router.put("/updateOrder/:id", verifyToken, orderPaymentController.updateOrderContr);
router.get("/changeStateOrder/:id_order", verifyToken, orderPaymentController.changeStateOrder);
router.get("/changeStatusTable/:id_table", verifyToken, orderPaymentController.changeStatusTable);

module.exports = router;