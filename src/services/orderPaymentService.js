const { validateParamsId, validateParamsAddMenu, verifiedIfExist, validateParamsOrder} = require("../utils/utils.js");
const {getTableNumbersUtils, findItemsMenu, getEmployeeId, getMenuId} = require("../utils/queries.js")

exports.getTableNumberSer = async () => {
  const checkActiveTable = await getTableNumbersUtils();
  if (!checkActiveTable.length)
    throw new Error("No hay una configuración activa en tu negocio");
  const { number_of_tables } = checkActiveTable[0];
  return {
    number_of_tables,
  };
};

exports.getItemsMenuSer = async (item) => {
  if (!item && typeof item !== "string")
    throw new Error("Se necesita un parametro valido");
  const findMenu = await findItemsMenu(item);
  if (!findMenu.length) throw new Error("No se encontró el insumo");
  let namesMenu = findMenu.map((names) => names.name);

  return {
    namesMenu,
  };
};

exports.orderPaymentSer = async (
  employees_id, menu_id, id_table,date, total, state
) => {
  await validateParamsOrder(employees_id, menu_id, id_table,date, total, state);
  //Buscando la existencia del usuario
  await getEmployeeId(employees_id);
  //Buscando la existencia del insumo seleccionado
  await getMenuId(menu_id)
  return employees_id


  
};