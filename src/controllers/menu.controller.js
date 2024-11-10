const { json } = require("express");
const menuService = require("../services/menu.service.js");
const {messages} = require("../utils/messages.js")


const getMenu = async (req, res) => {
  try {
    const getMenu = await menuService.getMenuService();
    res.json({
     data: getMenu,
     success: messages.success.get
    });
  } catch (error) {
    res.json({
      success: false,
      error: error.message,
    });
  }
};

const getFilterCategoryMenu = async (req, res) => {
  const { id } = req.params;
  try {
    let getFilterMenu = await menuService.getFilterCategoryMenuService(id);
    res.json({
     data: getFilterMenu,
     success: messages.success.get
    });
  } catch (error) {
    res.json({
      success: false,
      error: error.message,
    });
  }
};

const addMenu = async (req, res) => {
  const { name, description, price, id_category } = req.body;
  try {
    let data = await menuService.addMenuService(
      name,
      description,
      price,
      id_category
    );
    res.json({
      data: data,
      success: messages.success.create
    });
  } catch (error) {
    res.json({
      success: false,
      error: error.message,
    });
  }
};
const updateMenu = async (req, res) => {
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
      data: data,
      success: messages.success.update
    });
  } catch (error) {
    res.json({
      success: false,
      error: error.message,
    });
  }
};
const deleteMenu = async (req, res) =>{
  const {id} = req.params;
  try {
    let data = await menuService.deleteMenuService(id);
    res.json({
      data: data,
      success: messages.success.delete
    });
  } catch (error) {
    res.json({
      success: false,
      error: error.message,
    });
  }
};

module.exports = { getMenu, getFilterCategoryMenu, addMenu, updateMenu, deleteMenu };
