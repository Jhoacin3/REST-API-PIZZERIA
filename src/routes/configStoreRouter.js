const express = require('express');
const configStoreController = require('../controllers/configStore.controller');
const upload = require('../middlewares/multerConfig'); // Importar configuración de Multer

const router = express.Router();//constructor que retorna un objeto

router.get("/getConfigStore", configStoreController.getConfig);
router.get("/getConfigStoreActive", configStoreController.getConfigStoreActive);
router.delete("/deleteConfiguration/:id", configStoreController.deleteConfiguration);
router.post("/createConfigStore",upload.single('photo'), configStoreController.createConfig);
router.put("/updateConfigStore/:id_store_info",upload.single('photo'), configStoreController.updateConfig);

module.exports = router;
