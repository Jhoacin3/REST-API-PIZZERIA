const express = require('express');
const authController = require('../../controllers/auth.controller');
const router = express.Router();
const { verifyToken } = require('../../middlewares/auth.middleware');


//Nota: middleware verifyToken se ejecuta antes del controlador para Verificar si existe un token válido en las cookies
router.get("/",verifyToken, authController.render);
router.post("/login", authController.loginController);
router.post("/register", authController.registerController);
router.post("/logout", authController.logoutController);
router.get("/protected",verifyToken, authController.protected);

module.exports = router;


