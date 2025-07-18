const { validateParamsId, validateParamsAddMenu, verifiedIfExist } = require("../utils/utils.js");
const {getDataMenu, findCategoryById, getFilterById, getNameByMenu, createMenu, getIdMenu, updateMenu, deleteMenuById, findExistOrderDetail} = require("../utils/queries.js")

/**
 * Esta función realiza una consulta a la base de datos para obtener todos los elementos de menú.
 */
const getMenuService = async () => {
  const data = [];
  const menuItem = await getDataMenu();
  
  for (let menus of menuItem) {
    const { id_category } = menus;
    const categoryResult = await findCategoryById(id_category);
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
    const categoryResult = await findCategoryById(id_category);
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
 * Este método crea un nuevo menú.
 * 
 * @param {string} name - El nombre del menú a crear.
 * @param {string} description - Una descripción detallada del menú.
 * @param {number} price - El precio del menú.
 * @param {number} id_category - El ID de la categoría a la que pertenece el menú.
 * 
 * @returns {Object} Un objeto con los datos previos
 */
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

/**
 * Este método actualiza los detalles de un menú existente.
 * 
 * @param {string} name - El nuevo nombre del menú.
 * @param {string} description - La nueva descripción del menú.
 * @param {number} price - El nuevo precio del menú.
 * @param {number} id_category - El nuevo ID de la categoría a la que pertenece el menú.
 * @param {number} id - El ID del menú que se desea actualizar.
 * 
 * @returns {Object} Un objeto con los datos previos actualizados
 */
const updateMenuService = async (name, description, price, id_category, id) => {
  await validateParamsAddMenu(name, description, price, id_category);
  await validateParamsId(id);
  await getNameByMenu(name);
  const idMenus = await getIdMenu();
  let isRepeat=  await verifiedIfExist(idMenus, id);
  if (!isRepeat) {
    throw new Error("Lo sentimos, ya no existe");
  }

  const getMenu = await updateMenu(name, description, price, id_category, id);
  return {
    id: getMenu.insertId,
    name,
    description,
    price,
    id_category,
  };
};

/**
 * Este método elimina un menú existente, verificando que no haya órdenes asociadas a él.
 * 
 * @param {number} id - El ID del menú que se desea eliminar.
 * 
 * @returns {Object} Un objeto con la siguiente estructura:
 *   - {number} id - El ID del menú eliminado.
 *   - {string} success - Un mensaje de éxito indicando que el menú fue eliminado correctamente.
 */
const deleteMenuService = async (id) => {
  await validateParamsId(id);
  const idMenus = await getIdMenu();
  let isRepeat= await verifiedIfExist(idMenus, id);
  if (!isRepeat) {
    throw new Error("Lo sentimos, ya no existe");
  }
  let findExist = await findExistOrderDetail(id);
  if (findExist.length !== 0) {
    throw new Error("No se puede borrar un menu donde ya hay ordenes con este menu");
  }
  await deleteMenuById(id);

  return {
    id: id,
  };
}

module.exports = { getMenuService, getFilterCategoryMenuService,addMenuService,updateMenuService, deleteMenuService  };
