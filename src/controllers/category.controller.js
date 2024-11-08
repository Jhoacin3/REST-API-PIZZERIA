const { json } = require("express");
const categoryService = require("../services/category.service.js");

exports.getCategories = async (req, res) => {
  try {
    const getCategories = await categoryService.getCategoriesService();
    res.status(200).json(getCategories);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};