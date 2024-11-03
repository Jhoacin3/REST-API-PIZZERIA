const connection = require("../db.js");
const { validateParamsId, validateParamsAddMenu, verifiedIfExist } = require("../utils/utils.js");
const {messages} = require("../utils/messages.js")

/**
 * Esta función realiza una consulta a la base de datos para obtener todos los elementos de menú.
 */
const getMenuService = async () => {
  const data = [];
  const [getMenu] = await connection.query("SELECT * FROM menu");
  if (!getMenu.length) {
    throw new Error("No hay insumos en el menú");
  }
  for (let menus of getMenu) {
    const { id_category } = menus;
    // Buscar la categoría específica por id_category
    const [categoryResult] = await connection.query(
      "SELECT * FROM category WHERE id_category = ?",
      [id_category]
    );
    if (!categoryResult.length) {
      throw new Error("No hay insumos con esa categoria");
    }
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
  const [getFilter] = await connection.query(
    "SELECT * FROM menu WHERE id_category = ?",
    [id]
  );
  if (!getFilter.length) {
    throw new Error("No hay insumos con esa categoria");
  }
  for (let menus of getFilter) {
    const { id_category } = menus;
    // Buscar la categoría específica por id_category
    const [categoryResult] = await connection.query(
      "SELECT * FROM category WHERE id_category = ?",
      [id_category]
    );
    if (!categoryResult.length) {
      throw new Error("No hay insumos con esa categoria");
    }
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

  const [getMenu] = await connection.query("SELECT name FROM menu");
  const isRepeat = getMenu.some(
    (item) => item.name.toLowerCase() === name.toLowerCase()
  );
  if (isRepeat) {
    throw new Error("El nombre del menu ya existe");
  }
 
  const [data] = await connection.query("INSERT INTO menu (name, description, price, id_category) VALUES (?, ?, ?, ?)" , [name, description, price, id_category]);
  
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
  const [idMenus] = await connection.query("SELECT id_menu FROM menu");
  await verifiedIfExist(idMenus, id);

  const [getMenu] = await connection.query("UPDATE menu SET name = ?, description = ?, price = ?, id_category = ? WHERE id_menu = ?", [name, description, price, id_category, id]);
  return {
    id: getMenu.insertId,
    name,
    description,
    price,
    id_category,
  };
};
const deleteMenuService = async (id) => {
  await validateParamsId(id);
  const [idMenus] = await connection.query("SELECT id_menu FROM menu");
  await verifiedIfExist(idMenus, id);

  const [deleteMenu] = await connection.query("DELETE FROM menu WHERE id_menu = ?", [id]);

  return {
    id: id,
    success: messages.success.delete
  };
}

module.exports = { getMenuService, getFilterCategoryMenuService,addMenuService,updateMenuService, deleteMenuService  };