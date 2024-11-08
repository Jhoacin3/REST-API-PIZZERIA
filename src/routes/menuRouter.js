const express = require('express');
const menuController = require('../controllers/menu.controller')
const router = express.Router();//constructor que retorna un objeto

router.get("/getMenu", menuController.getMenu);
router.get("/filterCategoryMenu/:id", menuController.getFilterCategoryMenu);
router.post("/addMenu", menuController.addMenu);
router.put("/updateMenu/:id", menuController.updateMenu);
router.delete("/deleteMenu/:id", menuController.deleteMenu)
module.exports = router;