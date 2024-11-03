const connection = require("../db.js");
const { validateParamsId, validateParamsAddMenu, verifiedIfExist } = require("../utils/utils.js");
const {messages} = require("../utils/messages.js")
const {getDataMenu, getDataMenuById, getFilterById, getNameByMenu, createMenu, getIdMenu, updateMenu, deleteMenuById} = require("../utils/queries.js")

/**
 * Esta función realiza una consulta a la base de datos para obtener todos los elementos de menú.
 */
const getMenuService = async () => {
  const data = [];
  const menuItem = await getDataMenu();
 
  for (let menus of menuItem) {
    const { id_category } = menus;
    const categoryResult = await getDataMenuById(id_category);
     // Si no se encuentra la categoría, se ignora y no se añade el campo 'type'
     const type = categoryResult.length
     ? categoryResult[0].type
     : "No disponible";
    const result = { ...menus, type };
    data.push(result);
  }
  return data;
};

/**
 * Este método obtiene un listado de menús filtrados por la categoría especificada.
 * @param {number} id - El ID de la categoría para filtrar los menús.
 */
const getFilterCategoryMenuService = async (id) => {
  await validateParamsId(id);
  const data = [];
  let getFilter = await getFilterById(id);
  for (let menus of getFilter) {
    const { id_category } = menus;
    const categoryResult = await getDataMenuById(id_category);
    // Si no se encuentra la categoría, se ignora y no se añade el campo 'type'
    const type = categoryResult.length
      ? categoryResult[0].type
      : "No disponible";
    const result = { ...menus, type };
    data.push(result);
  }
  return data;
};

const addMenuService = async (name, description, price, id_category) => {
  await validateParamsAddMenu(name, description, price, id_category);
  await getNameByMenu(name);
  const data = await createMenu(name, description, price, id_category);
  
  return {
    id: data.insertId,
    name,
    description,
    price,
    id_category,
  };

}

const updateMenuService = async (name, description, price, id_category, id) => {
  await validateParamsAddMenu(name, description, price, id_category);
  await validateParamsId(id);
  const idMenus = await getIdMenu();
  await verifiedIfExist(idMenus, id);

  const getMenu = await updateMenu(name, description, price, id_category, id);
  return {
    id: getMenu.insertId,
    name,
    description,
    price,
    id_category,
  };
};

//validar y mostrar mensaje diciendo que no se puede eliminar un menu si esta asociado a una orden ya realizada por usuario, actualmente se crashea.
const deleteMenuService = async (id) => {
  await validateParamsId(id);
  const idMenus = await getIdMenu();
  await verifiedIfExist(idMenus, id);

  await deleteMenuById(id);

  return {
    id: id,
    success: messages.success.delete
  };
}

module.exports = { getMenuService, getFilterCategoryMenuService,addMenuService,updateMenuService, deleteMenuService  };
