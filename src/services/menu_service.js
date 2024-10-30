const connection = require("../db.js");

const getMenuService = async () => {
  const data = [];
  const [getMenu] = await connection.query("SELECT * FROM menu");
  for (let menus of getMenu) {
    const { id_category } = menus;
    // Buscar la categoría específica por id_category
    const [categoryResult] = await connection.query(
      "SELECT * FROM category WHERE id_category = ?",
      [id_category]
    );
    // Si no se encuentra la categoría, se ignora y no se añade el campo 'type'
    const type = categoryResult.length
      ? categoryResult[0].type
      : "No disponible";
    const result = { ...menus, type };
    data.push(result);
  }
  return data;
};

module.exports = { getMenuService };
