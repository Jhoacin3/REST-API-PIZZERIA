const express = require('express');
const categoryController = require('../controllers/category.controller')
const router = express.Router();//constructor que retorna un objeto
const {verifyToken} = require('../middlewares/auth.middleware');

router.get("/getCategory", verifyToken,categoryController.getCategories);
router.get("/getCategory/:id", verifyToken,categoryController.getCategoryId);
router.post("/createCategory", verifyToken, categoryController.createCategory);
router.put("/updateCategory/:id", verifyToken, categoryController.updateCategory);
router.delete("/deleteCategory/:id", verifyToken, categoryController.deleteCategory);

module.exports = router;
