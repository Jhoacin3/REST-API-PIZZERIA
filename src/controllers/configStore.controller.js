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
exports.getConfigStoreActive = async (req, res) => {
  try {
    const getConfig = await configStoreService.getConfigActiveService();
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
  const {name, number_of_tables, enable} = req.body;
  const photo = req.file;//Ojo, obtenemos el img desde el middleware de Multer

  try {
    const {id, photo_url} = await configStoreService.createConfigService(name, photo, number_of_tables, enable);
    res.json({
      data:{
        id,
        name,
        number_of_tables,
        photo_url: photo_url,
        enable
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
  const {name, number_of_tables,enable} = req.body;
  const { id } = req.params;
  const photo = req.file;

  try {
    const {id_update, photo_url} = await configStoreService.updateConfigService(id,name, photo, number_of_tables, enable);
    res.json({
      data:{
        id_update,
        name,
        number_of_tables,
        photo_url: photo_url,
        enable
      } ,
      success: messages.success.update,
    });
  } catch (error) {
    res.json({
      success: false,
      error: error.message,
    });
  }
};