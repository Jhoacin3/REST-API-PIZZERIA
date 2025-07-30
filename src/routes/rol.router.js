const express = require('express');
const rolController = require('../controllers/rol.controller.js')
const router = express.Router();//constructor que retorna un objeto
const { verifyToken } = require('../middlewares/auth.middleware');


//endpoint que retorna todos los roles
router.get("/getRoles", verifyToken, rolController.getRoles);
//endpoint que retorna rol por id
router.get('/getRolId/:id', verifyToken, rolController.getRolId);
//endpoint para crear un rol
router.post('/createRol', verifyToken, rolController.createRol);
//endpoint para crear un rol
router.put('/updateRol/:id', verifyToken, rolController.updateRol);
//endpoint para eliminar un rol
router.delete('/deleteRol/:id', verifyToken, rolController.deleteRol);


module.exports = router;