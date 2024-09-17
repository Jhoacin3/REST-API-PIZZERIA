const express = require('express');
const rolController = require('../controllers/rol.controller.js')
const router = express.Router();//constructor que retorna un objeto


//endpoint que retorna todos los roles
router.get("/getRoles", rolController.getRoles);
//endpoint que retorna rol por id
router.get('/getRolId/:id', rolController.getRolId);
//endpoint para crear un rol
router.post('/createRol', rolController.createRol);
//endpoint para crear un rol
router.put('/updateRol/:id', rolController.updateRol);


module.exports = router;