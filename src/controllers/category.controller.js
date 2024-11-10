const { json } = require("express");
const categoryService = require("../services/category.service.js");
const {messages} = require("../utils/messages.js")


exports.getCategories = async (req, res) => {
  try {
    const getCategories = await categoryService.getCategoriesService();
    res.json({
      data: getCategories,
      success: messages.success.get,
    });
  } catch (error) {
    res.json({
      success: false,
      error: error.message,
    });
  }
};

exports.getCategoryId = async (req, res) => {
  const { id } = req.params;
  try {
    const getCategoyId = await categoryService.getCategoyId(id);
    res.json({
      data: getCategoyId,
      success: messages.success.get,
    });
  } catch (error) {
    res.json({
      success: false,
      error: error.message,
    });
  }
};

exports.createCategory = async (req, res) => {
  const { type } = req.body;
  try {
    const categoryCreate = await categoryService.createCategory(type);
    res.json({
      data: categoryCreate,
      success: messages.success.create,
    });
  } catch (error) {
    res.json({
      success: false,
      error: error.message,
    });
  }
};

exports.updateCategory = async (req, res) => {
  const { id } = req.params;
  const { type } = req.body;
  try {
    const categoryUpdated = await categoryService.updateCategory(id, type);
    res.json({
      data: categoryUpdated,
      success: messages.success.update,
    });
  } catch (error) {
    res.json({
      success: false,
      error: error.message,
    });
  }
};