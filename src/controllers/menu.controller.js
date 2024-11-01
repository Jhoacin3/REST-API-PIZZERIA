const { json } = require("express");
const menuService = require("../services/menu_service");

const getMenu = async (req, res) => {
  try {
    const getMenu = await menuService.getMenuService();
    res.status(200).json(getMenu);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getFilterCategoryMenu = async (req, res) => {
  const { id } = req.params;
  try {
    let getFilterMenu = await menuService.getFilterCategoryMenuService(id);
    res.status(200).json(getFilterMenu);
  } catch (error) {
    res.status(500).json({ error: error.message });
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
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = { getMenu, getFilterCategoryMenu, addMenu };
