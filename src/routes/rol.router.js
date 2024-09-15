const express = require('express');
const rolController = require('../controllers/rol.controller.js')
const router = express.Router();//constructor que retorna un objeto


//endpoint que retorna todos los roles
router.get("/rolesGet", rolController.getRoles);
//endpoint que retorna rol por id
router.get('/rolGetId/:id', rolController.getRolId);


module.exports = router;