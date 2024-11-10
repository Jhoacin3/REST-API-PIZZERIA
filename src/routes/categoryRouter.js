const express = require('express');
const categoryController = require('../controllers/category.controller')
const router = express.Router();//constructor que retorna un objeto

router.get("/getCategory", categoryController.getCategories);
router.get("/getCategory/:id", categoryController.getCategoryId);
router.post("/createCategory", categoryController.createCategory);
router.post("/createCategory", categoryController.createCategory);

module.exports = router;
