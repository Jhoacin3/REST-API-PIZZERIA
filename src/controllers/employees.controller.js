const { json } = require("express");
const employeesService = require("../services/employees.service.js");
const {messages} = require("../utils/messages.js")

exports.getEmployees = async (req, res) => {
  try {
    const getEmployeeAll = await employeesService.getEmployeeService();
    res.json({
      data: getEmployeeAll,
      success: messages.success.get,
    });
  } catch (error) {
    res.json({
      success: false,
      error: error.message,
    });
  }
};


exports.getEmployeeName = async (req, res) => {
  try {
    const {name} = req.params;
    const getEmployeName = await employeesService.getEmployeeByName(name);
    res.json({
      data: getEmployeName,
      success: messages.success.get,
    });
  } catch (error) {
    res.json({
      success: false,
      error: error.message,
    });
  }
};