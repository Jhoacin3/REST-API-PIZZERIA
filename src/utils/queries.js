const connection = require("../db.js");
//******** Queries para menu ******** */
exports.getDataMenu = async () => {
  const [getMenu] = await connection.query("SELECT * FROM menu LIMIT 100");

  if (!getMenu.length) {
    throw new Error("No hay insumos en el menú");
  }

  return getMenu;
};

exports.findCategoryById = async (id) => {
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

exports.getFilterById = async (id) => {
  const [getFilter] = await connection.query(
    "SELECT * FROM menu WHERE id_category = ? LIMIT 100",
    [id]
  );
  if (!getFilter.length) {
    throw new Error("No hay insumos con esa categoria");
  }
  return getFilter;
};

exports.getNameByMenu = async (name) => {
  const [getMenu] = await connection.query("SELECT name FROM menu");
  const isRepeat = getMenu.some(
    (item) => item.name.toLowerCase() === name.toLowerCase()
  );
  if (isRepeat) {
    throw new Error("El nombre del menu ya existe");
  }
};
exports.createMenu = async (name, description, price, id_category) => {
  const [data] = await connection.query(
    "INSERT INTO menu (name, description, price, id_category) VALUES (?, ?, ?, ?)",
    [name, description, price, id_category]
  );

  return data;
};

exports.updateMenu = async (name, description, price, id_category, id) => {
  const [getMenu] = await connection.query(
    "UPDATE menu SET name = ?, description = ?, price = ?, id_category = ? WHERE id_menu = ?",
    [name, description, price, id_category, id]
  );

  return getMenu;
};
exports.deleteMenuById = async (id) => {
  const [deleteMenu] = await connection.query(
    "DELETE FROM menu WHERE id_menu = ?",
    [id]
  );
};

exports.getIdMenu = async () => {
  const [idMenus] = await connection.query("SELECT id_menu FROM menu");
  return idMenus;
};

exports.findExistOrderDetail = async (id)=>{
const [findMenuItem] = await connection.query("SELECT id_menu FROM order_details WHERE id_menu = ?", [id])
return findMenuItem;
}

//*************QUERIES PARA CATEGORIA*************
exports.getCategory = async () => {
  const [getCategories] = await connection.query("SELECT * FROM category LIMIT 100")
  return getCategories;
}
exports.getCategoryName = async () => {
  const [getCategoryName] = await connection.query("SELECT type FROM category");

  return getCategoryName;
};

exports.createCategory = async (type) => {
  const [data] = await connection.query(
    "INSERT INTO category (type) VALUES (?)",
    [type]
  );

  return data;
};


exports.updateCategoryById = async (id, type) => {
  const [data] = await connection.query(
    "UPDATE category SET type = ? WHERE id_category = ?",
    [type, id]
  );

  return data;
};


exports.findExistCategory = async (id) => {
  const [findCategoryItem] = await connection.query(
    "SELECT id_category FROM menu WHERE id_category = ?",
    [id]
  );
  return findCategoryItem;
};

exports.deleteCategoryById = async (id) => {
  const [deleteCategory] = await connection.query(
    "DELETE FROM category WHERE id_category = ?",
    [id]
  );
};


//*************QUERIES PARA CONFIG STORE*************
exports.getConfig = async () => {
  const [getConfig] = await connection.query("SELECT * FROM store_info LIMIT 100")
  return getConfig;
}
exports.getConfigId = async (id) => {
  const [getConfigId] = await connection.query(
    "SELECT * FROM store_info WHERE id_store_info = ?",
    [id]
  );
  if (!getConfigId.length) {
    throw new Error("No existe esa configuración");
  }
  return getConfigId;
};


exports.createConfig = async (name, photo_url, number_of_tables, enable) => {
  const [createConfig] = await connection.query(
    "INSERT INTO store_info (name, photo_url, number_of_tables, enable) VALUES (?,?,?,?)",
    [name, photo_url, number_of_tables, enable]
  );
  if (createConfig.length === 0) {
    throw new Error("No se pudo guardar la configuración");
  }
  return createConfig;
};

exports.upateConfig = async (id,name, photo_url, number_of_tables, enable) => {
  const [upateConfig] = await connection.query(
    "UPDATE store_info SET name = ?, photo_url = ?, number_of_tables = ?, enable = ? WHERE id_store_info = ?",
    [name, photo_url, number_of_tables,enable, id]
  );
  if (upateConfig.length === 0) {
    throw new Error("No se pudo guardar la configuración");
  }
  return upateConfig;
};


//*************QUERIES PARA EMPLOYEES*************

exports.getEmployeeById = async (id) =>{
  const [getEmployees] = await connection.query("SELECT * FROM employees LIMIT 100")
  return getEmployees;
}

exports.getEmployeeByName = async (name) => {
  //Nota: LIKE= busca cualquier registro que contenga el valor
  //LOWER: asegura que la búsqueda sea insensible ante MAYUS y MINUS
  const [getEmployee] = await connection.query(
    "SELECT * FROM employees WHERE LOWER(full_name) LIKE ?",
    [`%${name}%`]
  );
  return getEmployee;
};
