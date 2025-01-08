const { json } = require("express");
const orderPaymentService = require("../services/orderPaymentService.js");
const {messages} = require("../utils/messages.js")

exports.getTableNumbers = async(req, res) =>{
    try {
        const data = await orderPaymentService.getTableNumberSer();
        res.json({
            success: true,
            data,
            messages: messages.success.get
        })
    } catch (error) {
        res.json({
            success: false,
            error: error.message,
            messages: messages.error.notGet
        })
        
    }
}
exports.getItemsMenu = async(req, res) =>{
    const {item} = req.params;
    try {
        const data = await orderPaymentService.getItemsMenuSer(item);
        res.json({
            success: true,
            data,
            messages: messages.success.get
        })
    } catch (error) {
        res.json({
            success: false,
            error: error.message,
            messages: messages.error.notGet
        })
        
    }
}

exports.orderPayment = async (req, res) => {
  const {employees_id, menu_id, id_table,date, total, state } =
    req.body;
  try {
    const data = await orderPaymentService.orderPaymentSer(
      employees_id, menu_id, id_table,date, total, state
    );
  } catch (error) {
    res.json({
      success: false,
      error: error.message,
    });
  }
};