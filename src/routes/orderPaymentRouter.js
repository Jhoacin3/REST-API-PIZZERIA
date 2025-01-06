const express = require('express');
const orderPaymentController = require('../controllers/orderPaymentController')
const router = express.Router();//constructor que retorna un objeto

//obtener los numeros de mesas
router.get("/getTableNumbers", orderPaymentController.getTableNumbers);
router.get("/getTableNumbers/:item", orderPaymentController.getItemsMenu);

module.exports = router;