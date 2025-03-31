const {
  validateParamsId,
  validateParamsAddMenu,
  verifiedIfExist,
  validateParamsOrder,
  validateParamsOrderDetail,
  calculateOrderTotal,
} = require("../utils/utils.js");
const {
  getTableNumbersUtils,
  findItemsMenu,
  getEmployeeId,
  getMenuId,
  getConfigId,
  getTableId,
  getActiveConfig,
  createOrder,
  tableStatusEdition,
  getOrderId,
  verifiedOrderAndTables,
  getOrderDetails,
  menuStateEdition,
  getTableAndStatus,
  createOrderDetails,
  statusTable,
  getOrders,
  getOrderDetailsAll
} = require("../utils/queries.js");

exports.getTableNumberSer = async () => {
  const checkActiveTable = await getTableNumbersUtils();
  if (!checkActiveTable.length)
    throw new Error("No hay una configuración activa en tu negocio");
  const { id_store_info } = checkActiveTable[0];
  const getTables = await statusTable(id_store_info);

  if (!getTables.length) throw new Error("Lo siento, no se encontró la mesa ");

  const result = getTables.map(({ id_tables, table_number, status }) => ({
    id_tables,
    table_number,
    status
  }));

  return result;
};

exports.getItemsMenuSer = async (item) => {
  if (!item || typeof item !== "string")
    throw new Error("Se necesita un parametro valido");
  const findMenu = await findItemsMenu(item);
  if (findMenu.length == 0) throw new Error("No se encontró el insumo");
  const itemsMenu = findMenu.map((menu) => ({
    id_menu: menu.id_menu,
    name: menu.name,
    price: menu.price,
  }));

  return itemsMenu;
};
exports.getOrderServ = async () => {
  result = [];

  const findOrderAll = await getOrders();
  if (findOrderAll.length == 0) throw new Error("No hay ordenes en este momento");
  for (item of findOrderAll) {
    const { employees_id, id_orders, id_tables, date, total, state } = item;
    const employee = await getEmployeeId(employees_id);
    const { full_name } = employee[0];
    const data = {
      id_order: id_orders,
      employee: full_name,
      id_tables: id_tables,
      date: date,
      total: total,
      state: state
    }
    result.push(data);
  }

  return result;
};
//mostrar los detalles de cada orden en la tabla de ordenes
exports.getOrderDetailsServ = async (id) => {
  const result = [];
  if (!id) throw new Error("Se necesita el identificador del menu para mostrar los detalles");
  let searchOrder = await getOrderId(id);
  if (searchOrder.length == 0) throw new Error("No se encontró la orden asociada");
  const { total } = searchOrder[0];
  let orderDetail = await getOrderDetailsAll(id);
  if (orderDetail.length == 0) throw new Error("No se encontraron detalles de la orden asociada");
  for (item of orderDetail) {
    const { id_menu, id_order_details, amount, unit_price, description } = item;
    let searchMenu = await getMenuId(id_menu);
    if (searchMenu.length == 0) throw new Error("No se encontró el menu asociado a la orden");
    const { name } = searchMenu[0];
    const data = {
      id_order_details: id_order_details,
      name: name,
      amount: amount,
      unit_price: unit_price,
      description: description
    }
    result.push(data);
  }
  return result;
}

exports.orderPaymentSer = async (employees_id, id_table, menuDetails) => {
  const newState = "En preparación";

  await validateParamsOrder(employees_id, id_table, newState);
  let currentDate = new Date();
  const newStatus = "Ocupado";
  //Buscando la existencia del usuario
  await getEmployeeId(employees_id);

  const configs = await getActiveConfig();
  if (!configs.length)
    throw new Error("No se encontró una configuración activa del negocio");

  const { id_store_info, number_of_tables } = configs[0];

  //buscando la existencia de la mesa segun el negocio si existe.
  let result = await getTableId(id_table, id_store_info);
  if (!result.length) throw new Error("No se encontró la mesa seleccionada");
  const { id_tables, status } = result[0];
  if (status == "Ocupado")
    throw new Error("La mesa esta ocupada en este momento");

  if (!Array.isArray(menuDetails) || menuDetails.length === 0)
    throw new Error("No se proporcionaron productos para la orden");
  //se valida todos las clave-valor de los productos en el array de objetos que viene del metodo getItemsMenuSer.
  await validateParamsOrderDetail(menuDetails);

  //se calcula el total de la orden
  const total = await calculateOrderTotal(menuDetails);
  if (total <= 0)
    throw new Error(
      "El total de la orden no se pudo calcular, verifica los productos"
    );

  const orderCreated = await createOrder(
    employees_id,
    id_tables,
    currentDate,
    total,
    newState
  );
  await tableStatusEdition(newStatus, id_tables);
  const { insertId } = orderCreated;

  return { insertId, total, menuDetails };
};

exports.orderDetailServ = async (id_order, menuDetails) => {
  if (!Array.isArray(menuDetails) || menuDetails.length === 0)
    throw new Error("No se proporcionaron productos para la orden");

  const ordersId = await getOrderId(id_order);
  if (ordersId.length == 0) throw new Error("No se encontró la orden asociada");

  const newOrderDetail = menuDetails.map((item) => {
    delete item.name;
    return item;
  });

  for (const element of newOrderDetail) {
    const { id_menu, amount, unit_price, description } = element;
    await createOrderDetails(
      id_order,
      id_menu,
      amount,
      unit_price,
      description
    );
  }
  return { id_order, menuDetails };
};

exports.calculateOrderTotal = async (menuDetails) => {
  let total = 0;
  if (!Array.isArray(menuDetails) || menuDetails.length === 0)
    throw new Error("No se proporcionaron productos para la orden");
  await validateParamsOrderDetail(menuDetails);

  for (let i = 0; i < menuDetails.length; i++) {
    total += menuDetails[i].amount * menuDetails[i].unit_price;
  }
  return total;
};

exports.deleteItemMenu = async (id_menu, menuDetails) => {
  if (!id_menu) throw new Error("Se necesita un parametro valido");

  await getMenuId(id_menu);
  if (!Array.isArray(menuDetails) || menuDetails.length === 0)
    throw new Error("No se proporcionaron productos para la orden");
  let filterItemId = await verifiedIfExist(menuDetails, id_menu);
  if (filterItemId !== true)
    throw new Error("No se encontró el producto en la orden");

  const resultnewItems = menuDetails.filter(
    (items) => items.id_menu !== id_menu
  );

  return { resultnewItems };
};

exports.changeStateOrder = async (id_order) => {
  if (!id_order)
    throw new Error("Se necesitan la orden asociada a la mesa actual");

  let resultOrderId = await getOrderDetails(id_order);
  if (!resultOrderId.length)
    throw new Error("No se encontró la orden asociada");
  const { state } = resultOrderId[0];
  if (state == "Servido") throw new Error("La orden ya ha sido servida");

  const resultEdition = await menuStateEdition(id_order);
  if (!resultEdition.length)
    throw new Error("No se pudo actualizar el estatus de la orden");
  return { id_order, state };
};

exports.changeStatusTable = async (id_table) => {
  if (!id_table) throw new Error("Falta el número de mesa");
  const result = await getTableAndStatus(id_table);
  if (!result.length) throw new Error("Lo siento, no se encontró la mesa ");
  const { status } = result[0];
  if (status == "Disponible") throw new Error("Ya esta disponible la mesa");
  const newState = "Disponible";
  const resultStatusEdit = await tableStatusEdition(newState, id_table);
  if (resultStatusEdit.length <= 0)
    throw new Error(
      "Lo sentimos, no se pudo actualizar el estatus de la tabla."
    );
  return result;
};
