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
    (item) => item.name.toLowerCase().trim() === name.toLowerCase().trim()
  );
  if (isRepeat) {
    throw new Error("El nombre del menu ya existe");
  }
};

exports.getNameMenuById = async (name, id_menu) => {
  const [getMenu] = await connection.query("SELECT name, id_menu FROM menu");
  const isRepeat = getMenu.some(
    (item) => item.name.toLowerCase().trim() === name.toLowerCase().trim() &&
      Number(item.id_menu) !== Number(id_menu)
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
exports.getIdOrders = async (id) => {
  const [data] = await connection.query("SELECT id_order_details FROM order_details WHERE id_order = ?", [id]);
  return data;
};

exports.findExistOrderDetail = async (id)=>{
const [findMenuItem] = await connection.query("SELECT id_order_details, id_menu FROM order_details WHERE id_menu = ?", [id])
return findMenuItem;
}

//*************QUERIES PARA CATEGORIA*************
exports.getCategory = async () => {
  const [getCategories] = await connection.query("SELECT * FROM category LIMIT 100")
  return getCategories;
}
exports.getCategoryId = async (id) => {
  const [getCategoryId] = await connection.query("SELECT type FROM category WHERE id_category = ?",
    [id])
  return getCategoryId;
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
exports.getActiveConfig = async () => {
  let active = 1
  const [getConfigId] = await connection.query(
    "SELECT * FROM store_info WHERE enable = ?",
    [active]
  );
  if (!getConfigId.length) {
    throw new Error("No hay una configuración activa del negocio");
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

//Se crean una longitud automatica segpun la cantidad de mesas establecidas por el negocio
exports.createTablesLength = async(number_of_tables,store_id) =>{
  let status = "Disponible"
  const lengthTables = [];
  for (let i = 1; i <= number_of_tables; i++) {
    lengthTables.push([store_id, i, status])
  }
  const [data] = await connection.query(
    "INSERT INTO tables (store_id, table_number, status) VALUES ?",
    [lengthTables]
  );
  return data
}

exports.createOrderDetails = async (
  id_order,
  id_menu,
  amount,
  unit_price,
  description
) => {  
  let newDescription = description;
  if (!description || description.length === 0) {
    newDescription = "Sin descripción";
  }
 
  const [data] = await connection.query(
    "INSERT INTO order_details (id_order, id_menu, amount, unit_price, description) VALUES (?, ?, ?, ?, ?)",
    [id_order, id_menu, amount, unit_price, newDescription]
  );
  if (data.length === 0) {
    throw new Error("No se pudo guardar el detalle de la orden");
  }
  return data;
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

exports.getEmployees = async () =>{
  const [getEmployees] = await connection.query("SELECT * FROM employees LIMIT 100")
  return getEmployees;
}

exports.getEmployeeId = async (id) =>{

  const [getEmployee] = await connection.query("SELECT id_employees, full_name FROM employees WHERE id_employees =?", [id]);

  if (getEmployee.length == 0)throw new Error("No existe el empleado");
  return getEmployee;
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
exports.createEmployee = async (full_name, email, hasedPassword) => {
  const [data] = await connection.query(
    "INSERT INTO employees (full_name, email, password) VALUES (?, ?, ?)",
    [full_name, email, hasedPassword]
  );
  return data;
};

exports.updateEmployees = async (id, full_name, email, password) => {
  const [data] = await connection.query(
    "UPDATE employees SET full_name = ?, email = ?, password = ? WHERE id_employees = ?",
    [full_name, email, password, id]
  );
  if (data.length === 0) {
    throw new Error("No se pudo actualizar el empleado");
  }
  return data;
};

exports.deleteEmployee = async (id) =>{
  const [deletedEmployee] = await connection.query(
    "DELETE FROM employees WHERE id_employees = ?", [id]
  );

  return deletedEmployee
}


//*************QUERIES PARA orderPayment*************

exports.getTableNumbersUtils = async() =>{
  // const number = parseInt(numerTable)
  const [data] = await connection.query(
    "SELECT id_store_info , number_of_tables FROM store_info WHERE enable = ?",
    [1]
  )
  return data
}
exports.findItemsMenu = async (item) => {
  const [data] = await connection.query(
    "SELECT id_menu,name,price FROM menu WHERE LOWER(name) LIKE ?",
    [`%${item}%`]
  );
  return data
};
exports.getMenuId = async (id) => {
  const [data] = await connection.query("SELECT id_menu, name, id_category FROM menu WHERE id_menu = ?", [id]);
  if (data.length === 0)throw new Error("No se encontró el insumo seleccionado");
  return data;
};

exports.getTableAndStatus = async(id_table) =>{
  const [data] = await connection.query("SELECT id_tables, status FROM tables WHERE id_tables = ?", [id_table])
  return data;
}

exports.getTableId = async (id_tables, store_id) => {
  const [data] = await connection.query(
    "SELECT id_tables,table_number,status  FROM tables WHERE (table_number = ?) AND (store_id = ?)",
    [id_tables, store_id]
  );
  return data;
};
exports.statusTable = async (store_id) => {
  const [data] = await connection.query(
    "SELECT id_tables,table_number,status  FROM tables WHERE store_id = ?",
    [store_id]
  );
  return data;
};

exports.verifiedOrderAndTables = async (id_order, store_id,id_tables) => {
  const statusOld = "Ocupado";
  const [data] = await connection.query(
    "SELECT id_tables,table_number,status  FROM tables WHERE (table_number = ?) AND (store_id = ?) AND (status = ?)",
    [id_tables, store_id, statusOld]
  );
  return data;
};
exports.createOrder = async(
  employees_id,
  id_table,
  currentDate,
  total,
  state) =>{
    const [data] = await connection.query("INSERT INTO orders (employees_id, id_tables, date, total, state) VALUES (?,?,?,?,?)", 
      [
      employees_id,
      id_table,
      currentDate,
      total,
      state
    ]);
    return data

  }
  exports.tableStatusEdition = async (status, id_tables) => {
    let statusNew = status;
    const [data] = await connection.query(
      "UPDATE tables SET status =? WHERE id_tables =?",
      [statusNew, id_tables]
    );
    return data
  };
  exports.menuStateEdition = async (id_order) => {
    let stateNew = "Pagado";
    const [data] = await connection.query(
      "UPDATE orders SET state =? WHERE id_orders =?",
      [stateNew,id_order]
    );
    return data
  };
  

  exports.getOrderId = async(id) =>{
    const [data] = await connection.query("SELECT id_orders, total, employees_id, id_tables, state FROM orders WHERE id_orders = ?", [id])
    return data
  }
  exports.getEmployeeByOrderId = async(id) =>{
    const [data] = await connection.query("SELECT employees_id FROM orders WHERE employees_id = ?", [id])
    return data
  }
  exports.getOrderIdByTable = async(id) =>{
    const [data] = await connection.query("SELECT id_orders FROM orders WHERE (id_tables = ?) AND (state = ?)", [id, "En preparación"])
    return data
  }
  exports.getOrders = async(id) =>{
    const [data] = await connection.query("SELECT id_orders, employees_id, id_tables, date, total, state FROM orders LIMIT 100")
    return data
  }
  exports.getOrderDetails = async(id) =>{
    const [data] = await connection.query("SELECT id_orders, id_tables, state FROM orders WHERE (id_orders = ?) AND (state = ?)", [id, "En preparación"])
    return data
  }
  exports.getOrderAndStatus = async(id, table_id) =>{
    const [data] = await connection.query("SELECT id_orders, id_tables, state FROM orders WHERE (id_orders = ?) AND (state = ?) AND (id_tables = ?)", [id, "En preparación", table_id])
    return data
  }
  exports.getOrderDetailsAll = async(id) =>{
    const [data] = await connection.query("SELECT id_order_details, id_order, id_menu, amount, unit_price, description FROM order_details WHERE id_order = ?", [id])
    return data
  }
  // exports.updateOrder = async (id) => {
  //   const [data] = await connection.query("UPDATE orders SET state = ? WHERE id_orders = ?", ["En preparación", id])
  //   return data
  // }

exports.updateOrderDetail = async (id_order_details, name, type, amount, unit_price, description, id_menu) => {
  const [data] = await connection.query("UPDATE order_details SET amount = ?, unit_price = ?, description = ?, id_menu = ? WHERE id_order_details = ?", [ amount, unit_price, description, id_menu, id_order_details])

  if (data.length === 0) {
    throw new Error("No se pudo actualizar el detalle de la orden");
  }
  return data;
}

exports.deleteOrderDetail = async (id_order_details, order_id) =>{
  const [data] = await connection.query("DELETE FROM order_details WHERE id_order_details = ? AND id_order = ?", [id_order_details, order_id])
  if (data.length === 0) {
    throw new Error("No se pudo eliminar el detalle de la orden");
  }
  return data;
}

exports.setOrderTotal = async (order_id) => {
  const [data] = await connection.query("UPDATE orders SET total = (SELECT SUM(unit_price * amount) FROM order_details WHERE id_order = ?) WHERE id_orders = ?", [order_id, order_id]);
  if (data.length === 0) {
    throw new Error("No se pudo actualizar el total de la orden");
  }

}

exports.insertOrderDetail = async (orderId, name, id_menu, type, unit_price, amount, description) => {
   let newDescription = description;
  if (!description || description.length === 0) {
    newDescription = "Sin descripción";
  }
  const [data] = await connection.query("INSERT INTO order_details (id_order,  id_menu, amount, unit_price, description) VALUES (?, ?, ?, ?, ?)", [orderId, id_menu, amount, unit_price, newDescription]);
  return data

}