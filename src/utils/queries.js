const connection = require("../db.js");
//******** Queries para menu ******** */
const getDataMenu = async () => {
  const [getMenu] = await connection.query("SELECT * FROM menu LIMIT 100");

  if (!getMenu.length) {
    throw new Error("No hay insumos en el menú");
  }

  return getMenu;
};

const findCategoryById = async (id) => {
  // Buscar la categoría específica por id_category
  const [categoryResult] = await connection.query(
    "SELECT * FROM category WHERE id_category = ?",
    [id]
  );
  if (!categoryResult.length) {
    throw new Error("No hay insumos con esa categoria");
  }
  return categoryResult;
};

const getFilterById = async (id) => {
  const [getFilter] = await connection.query(
    "SELECT * FROM menu WHERE id_category = ? LIMIT 100",
    [id]
  );
  if (!getFilter.length) {
    throw new Error("No hay insumos con esa categoria");
  }
  return getFilter;
};

const getNameByMenu = async (name) => {
  const [getMenu] = await connection.query("SELECT name FROM menu");
  const isRepeat = getMenu.some(
    (item) => item.name.toLowerCase() === name.toLowerCase()
  );
  if (isRepeat) {
    throw new Error("El nombre del menu ya existe");
  }
};
const createMenu = async (name, description, price, id_category) => {
  const [data] = await connection.query(
    "INSERT INTO menu (name, description, price, id_category) VALUES (?, ?, ?, ?)",
    [name, description, price, id_category]
  );

  return data;
};

const updateMenu = async (name, description, price, id_category, id) => {
  const [getMenu] = await connection.query(
    "UPDATE menu SET name = ?, description = ?, price = ?, id_category = ? WHERE id_menu = ?",
    [name, description, price, id_category, id]
  );

  return getMenu;
};
const deleteMenuById = async (id) => {
  const [deleteMenu] = await connection.query(
    "DELETE FROM menu WHERE id_menu = ?",
    [id]
  );
};

const getIdMenu = async () => {
  const [idMenus] = await connection.query("SELECT id_menu FROM menu");
  return idMenus;
};

const findExistOrderDetail = async (id)=>{
const [findMenuItem] = await connection.query("SELECT id_menu FROM order_details WHERE id_menu = ?", [id])
return findMenuItem;
}

//*************QUERIES PARA CATEGORIA*************
const getCategory = async () => {
  const [getCategories] = await connection.query("SELECT * FROM category LIMIT 100")
  return getCategories;
}
const getCategoryName = async () => {
  const [getCategoryName] = await connection.query("SELECT type FROM category");

  return getCategoryName;
};

const createCategory = async (type) => {
  const [data] = await connection.query(
    "INSERT INTO category (type) VALUES (?)",
    [type]
  );

  return data;
};


const updateCategoryById = async (id, type) => {
  const [data] = await connection.query(
    "UPDATE category SET type = ? WHERE id_category = ?",
    [type, id]
  );

  return data;
};


module.exports = {
  getDataMenu,
  findCategoryById,
  getFilterById,
  getNameByMenu,
  createMenu,
  getIdMenu,
  updateMenu,
  deleteMenuById,
  findExistOrderDetail,
  getCategory,
  getCategoryName,
  createCategory,
  updateCategoryById
};
