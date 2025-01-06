const { validateParamsId, validateParamsAddMenu, verifiedIfExist } = require("../utils/utils.js");
const {getTableNumbersUtils, findItemsMenu} = require("../utils/queries.js")

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