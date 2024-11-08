const express = require('express');
const categoryController = require('../controllers/category.controller')
const router = express.Router();//constructor que retorna un objeto

router.get("/getCategory", categoryController.getCategories);

module.exports = router;
