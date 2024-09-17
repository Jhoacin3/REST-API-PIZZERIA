const connection = require("../db.js");
const { validateParamsId, validateParamStings, validateRepeatParam,validateNameLength, validatenameRol, validatesMethodUpdate } = require("../utils/utils.js");

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
  return result;
};

const createRolService = async (name_role) => {
  await validateNameLength(name_role);
  await validateParamStings(name_role);
  await validatenameRol(name_role);

  const [getRoles] = await connection.query("SELECT * FROM roles");
  await validateRepeatParam(getRoles,name_role);
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


module.exports = { getRolesService, getRolIdService, createRolService, updateRolService };
