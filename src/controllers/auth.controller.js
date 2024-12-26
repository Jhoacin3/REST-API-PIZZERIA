const { json } = require("express");
const authService = require("../services/auth.service.js");
const {messages} = require("../utils/messages.js")

exports.loginController = async (req, res) => {
  try {
    const { email, password } = req.body;
    const access = await authService.loginService(email, password);
    res.json({
      success: true,
      data: access,
      message: messages.success.create,
    });
  } catch (error) {
    res.json({
      success: false,
      error: error.message,
    });
  }
};

exports.registerController = async (req, res) => {
  try {

  } catch (error) {
    res.json({
      success: false,
      error: error.message,
    });
  }
};

exports.logoutController = async (req, res) => {
  try {

  } catch (error) {
    res.json({
      success: false,
      error: error.message,
    });
  }
};