const { json } = require("express");
const menuService = require("../services/menu.service.js");
const {messages} = require("../utils/messages.js")


exports.getMenu = async (req, res) => {
  try {
    const getMenu = await menuService.getMenuService();
    res.json({
      success: true,
      data: getMenu,
      message: messages.success.get,
    });
  } catch (error) {
    res.json({
      success: false,
      error: error.message,
    });
  }
};

exports.getFilterCategoryMenu = async (req, res) => {
  const { id } = req.params;
  try {
    let getFilterMenu = await menuService.getFilterCategoryMenuService(id);
    res.json({
      success: true,
      data: getFilterMenu,
      message: messages.success.get,
    });
  } catch (error) {
    res.json({
      success: false,
      error: error.message,
    });
  }
};

exports.addMenu = async (req, res) => {
  const { name, description, price, id_category } = req.body;
  try {
    let data = await menuService.addMenuService(
      name,
      description,
      price,
      id_category
    );
    res.json({
      success: true,
      data: data,
      message: messages.success.create,
    });
  } catch (error) {
    res.json({
      success: false,
      error: error.message,
    });
  }
};
exports.updateMenu = async (req, res) => {
  const {id} = req.params;
  const { name, description, price, id_category } = req.body;
  try {
   const data = await menuService.updateMenuService(
     name,
     description,
     price,
     id_category,
     id
   ); 
    res.json({
      success: true,
      data: data,
      message: messages.success.update,
    });
  } catch (error) {
    res.json({
      success: false,
      error: error.message,
    });
  }
};
exports.deleteMenu = async (req, res) =>{
  const {id} = req.params;
  try {
    let data = await menuService.deleteMenuService(id);
    res.json({
      success: true,
      data: data,
      message: messages.success.delete,
    });
  } catch (error) {
    res.json({
      success: false,
      error: error.message,
    });
  }
};