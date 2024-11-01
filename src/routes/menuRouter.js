const express = require('express');
const menuController = require('../controllers/menu.controller')
const router = express.Router();//constructor que retorna un objeto

router.get("/getMenu", menuController.getMenu);
module.exports = router;

router.get("/filterCategoryMenu/:id", menuController.getFilterCategoryMenu);

router.post("/addMenu", menuController.addMenu);
module.exports = router;