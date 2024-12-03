const { json } = require("express");
const configStoreService = require("../services/configStore.service.js");
const {messages} = require("../utils/messages.js")


exports.getConfig = async (req, res) => {
  try {
    const getConfig = await configStoreService.getConfigService();
    res.json({
      data: getConfig,
      success: messages.success.get,
    });
  } catch (error) {
    res.json({
      success: false,
      error: error.message,
    });
  }
};

exports.createConfig = async (req, res) => {
  const {name, number_of_tables} = req.body;
  const photo_url = req.file;//Ojo, obtenemos el img desde el middleware de Multer

  try {
    const {id} = await configStoreService.createConfigService(name, photo_url, number_of_tables);
    res.json({
      data:{
        id,
        name,
        number_of_tables,
        photo_url: {
          originalName: photo_url.originalname,
          mimeType: photo_url.mimetype,
          size: photo_url.size
      }
      } ,
      success: messages.success.create,
    });
  } catch (error) {
    res.json({
      success: false,
      error: error.message,
    });
  }
};

exports.updateConfig = async (req, res) => {
  const {name, number_of_tables} = req.body;
  const { id } = req.params;
  const photo_url = req.file;

  try {
    const {id_update} = await configStoreService.updateConfigService(id,name, photo_url, number_of_tables);
    res.json({
      data:{
        id_update,
        name,
        number_of_tables,
        photo_url: {
          originalName: photo_url.originalname,
          mimeType: photo_url.mimetype,
          size: photo_url.size
      }
      } ,
      success: messages.success.create,
    });
  } catch (error) {
    res.json({
      success: false,
      error: error.message,
    });
  }
};