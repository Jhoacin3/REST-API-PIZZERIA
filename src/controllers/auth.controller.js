const { json } = require("express");
const authService = require("../services/auth.service.js");
const {messages} = require("../utils/messages.js")

exports.render= async(req,res) =>{
  res.render('example', {full_name: 'jhoacin'})
}

exports.loginController = async (req, res) => {
  try {
    const { email, password } = req.body;
    const access = await authService.loginService(email, password);
    res.json({
      success: true,
      data: access,
      message: messages.success.loginTrue,
    });
  } catch (error) {
    res.status(401).json({
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