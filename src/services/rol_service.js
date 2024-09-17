const connection = require("../db.js");
const { validateParamsId,validatesMethodCreate, validatesMethodUpdate, validatesMethodDelete } = require("../utils/utils.js");

const getRolesService = async () => {
  const [result] = await connection.query("SELECT * FROM roles");
  return result;
};

const getRolIdService = async (id) => {
  await validateParamsId(id);
  const [result] = await connection.query(
    "SELECT * FROM roles WHERE id_roles = ?",
    [id]
  );
};

const createRolService = async (name_role) => {

  const [getRoles] = await connection.query("SELECT * FROM roles");
  await validatesMethodCreate(getRoles,name_role);
  const [row] = await connection.query(
    "INSERT INTO roles (name_role) VALUES (?)",
    [name_role]
  );

  return (rolcreated = {
    id: row.insertId,
    name_role,
  });
};
const updateRolService = async (id_role, name_role) => {
const [getRoles] = await connection.query("SELECT * FROM roles");
await validatesMethodUpdate(getRoles,id_role, name_role);

  const [row] = await connection.query(
    "UPDATE roles SET name_role = ? WHERE id_roles = ?",
    [name_role, id_role ]
  );

  return (rolcreated = {
    id: row.insertId,
    name_role,
  });
};
const deleteRolService = async (id_role) => {
  await validateParamsId(id_role);
  const [getRoles] = await connection.query("SELECT * FROM roles");
  const [getEmployees] = await connection.query("SELECT * FROM employees");
  await validatesMethodDelete(id_role, getRoles, getEmployees)

  const [result] = await connection.query(
    "DELETE FROM roles WHERE id_roles = ?",
    [id_role]
  );

  if (result.affectedRows <= 0) {
    throw new Error("El rol no existe"); 

  }else{
    return "Eliminado correctamente"
  };
};


module.exports = { getRolesService, getRolIdService, createRolService, updateRolService, deleteRolService };
