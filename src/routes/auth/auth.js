const express = require('express');
const authController = require('../../controllers/auth.controller');
const router = express.Router();
const { verifyToken } = require('../../middlewares/auth.middleware');


//Nota: middleware verifyToken se ejecuta antes del controlador para Verificar si existe un token válido en las cookies
router.get("/",authController.render);
router.get("/validate-session",authController.validateSession);
router.post("/login", authController.loginController);
router.post("/register", authController.registerController);
router.post("/logout", verifyToken, authController.logoutController);
router.get("/protected", verifyToken, authController.protected);

module.exports = router;


