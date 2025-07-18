const { json } = require("express");
const orderPaymentService = require("../services/orderPaymentService.js");
const {orderPaymentSer} = require("../services/orderPaymentService.js");
const {messages} = require("../utils/messages.js")

exports.getTableNumbers = async(req, res) =>{
    try {
        const data = await orderPaymentService.getTableNumberSer();
        res.json({
            success: true,
            data:data,
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

exports.getOrdersContr = async(req, res) =>{
    try {
        const data = await orderPaymentService.getOrderServ();
        res.json({
            success: true,
            data:data,
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

exports.getOrderDetails = async(req, res) =>{
  const  {id} = req.params
    try {
        const data = await orderPaymentService.getOrderDetailsServ(id);
        res.json({
            success: true,
            data:data,
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
exports.getItemsByOrder = async(req, res) =>{
  const  {order_id, table_id} = req.params

    try {
        const data = await orderPaymentService.getItemsByOrderServ(order_id, table_id);
        res.json({
            success: true,
            data:data,
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
        const menuDetails = await orderPaymentService.getItemsMenuSer(item);
        res.json({
            success: true,
            menuDetails,
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
  const {employees_id, id_table, menuDetails } =
    req.body;
  try {
    const data = await orderPaymentService.orderPaymentSer(
      employees_id, id_table, menuDetails
    );
    const {insertId} = data;
    const resultOrderDetail = await orderPaymentService.orderDetailServ(insertId, menuDetails);

    res.json({
      success: true,
      data:data,
      messages: messages.success.orderCreated
    })
  } catch (error) {
    res.json({
      success: false,
      error: error.message,
    });
  }
};

exports.calculateOrderTotal = async(req, res) =>{
    const {menuDetails} = req.params;

    try {
        //const menuDetails = JSON.parse(req.query.menuDetails); // Deserializamos el JSON recibido

        const total = await orderPaymentService.calculateOrderTotal(menuDetails);
        res.json({
            success: true,
            total,
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


exports.deleteItemMenu = async (req, res) => {
  const { id_menu, menuDetails } = req.body;
  try {
    const data = await orderPaymentService.deleteItemMenu(id_menu, menuDetails);
    res.json({
      success: true,
      data,
      messages: messages.success.delete,
    });
  } catch (error) {
    res.json({
      success: false,
      error: error.message,
      messages: messages.error.notDelete,
    });
  }
};

exports.deleteInsumoOrder = async (req, res) => {
  const { id_order_details, order_id} = req.params;

  try {
    const data = await orderPaymentService.deleteInsumoOrderServ( id_order_details, order_id );
    res.json({
      success: true,
      data,
      messages: messages.success.delete,
    });
  } catch (error) {
    res.json({
      success: false,
      error: error.message,
      messages: messages.error.notDelete,
    });
  }
};
exports.updateItemsOrderContr = async (req, res) => {
  const { id_menu, menuDetails } = req.body;
  try {
    const data = await orderPaymentService.deleteItemMenu(id_menu, menuDetails);
    res.json({
      success: true,
      data,
      messages: messages.success.delete,
    });
  } catch (error) {
    res.json({
      success: false,
      error: error.message,
      messages: messages.error.notDelete,
    });
  }
};

exports.updateOrderContr = async (req, res) => {
  const  {id} = req.params
  const orderDetails = req.body;

  try {
    const data = await orderPaymentService.updateOrderSer(id, orderDetails);
    res.json({
      success: true,
      data: data,
      messages: messages.success.update
    });
  } catch (error) {
    res.json({
      success: false,
      error: error.message,
      messages: messages.error.notUpdate,
    });
  }
}

exports.changeStateOrder = async(req, res) =>{
    const {id_order} = req.params;
    try {
        const data = await orderPaymentService.changeStatusTable(id_order);
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

exports.changeStatusTable = async (req, res) => {
  const { id_table } = req.params;
  try {
    const data = await orderPaymentService.changeStatusTable(id_table);
    res.json({
      success: true,
      data,
      messages: messages.success.get,
    });
  } catch (error) {
    res.json({
      success: false,
      error: error.message,
      messages: messages.error.notGet,
    });
  }
};