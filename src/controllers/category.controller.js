const { json } = require("express");
const categoryService = require("../services/category.service.js");
const {messages} = require("../utils/messages.js")


exports.getCategories = async (req, res) => {
  try {
    const getCategories = await categoryService.getCategoriesService();
    res.json({
      success: true,
      data: getCategories,
      message: messages.success.get,
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
      success: true,
      data: getCategoyId,
      message: messages.success.get,
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
      success: true,
      data: categoryCreate,
      message: messages.success.create,
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
      success: true,
      data: categoryUpdated,
      message: messages.success.update,
    });
  } catch (error) {
    res.json({
      success: false,
      error: error.message,
    });
  }
};

exports.deleteCategory = async (req, res) => {
  const { id } = req.params;
  try {
    const categoryDeleted = await categoryService.deleteCategory(id);
    res.json({
      success: true,
      data: categoryDeleted,
      message: messages.success.delete,
    });
  } catch (error) {
    res.json({
      success: false,
      error: error.message,
    });
  }
};