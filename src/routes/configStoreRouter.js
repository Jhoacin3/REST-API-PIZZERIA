const express = require('express');
const configStoreController = require('../controllers/configStore.controller');
const upload = require('../middlewares/multerConfig'); // Importar configuración de Multer
const {verifyToken} = require('../middlewares/auth.middleware');
const router = express.Router();//constructor que retorna un objeto

router.get("/getConfigStore", verifyToken, configStoreController.getConfig);
router.get("/getConfigStoreActive", verifyToken, configStoreController.getConfigStoreActive);
router.delete("/deleteConfiguration/:id", verifyToken, configStoreController.deleteConfiguration);
router.post("/createConfigStore", verifyToken, upload.single('photo'), configStoreController.createConfig);
router.put("/updateConfigStore/:id_store_info", verifyToken, upload.single('photo'), configStoreController.updateConfig);

module.exports = router;
