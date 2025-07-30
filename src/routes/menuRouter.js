const express = require('express');
const menuController = require('../controllers/menu.controller')
const router = express.Router();//constructor que retorna un objeto
const { verifyToken } = require('../middlewares/auth.middleware');

router.get("/getMenu", verifyToken, menuController.getMenu);
router.get("/filterCategoryMenu/:id", verifyToken, menuController.getFilterCategoryMenu);
router.post("/addMenu", verifyToken, menuController.addMenu);
router.put("/updateMenu/:id", verifyToken, menuController.updateMenu);
router.delete("/deleteMenu/:id", verifyToken, menuController.deleteMenu)
module.exports = router;