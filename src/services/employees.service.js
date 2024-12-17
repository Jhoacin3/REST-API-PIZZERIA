const { validateParamsId, validParamsEmployee } = require("../utils/utils.js");
const { getEmployeeByName, getEmployees, createEmployee } = require("../utils/queries.js");

exports.getEmployeeService = async () => {
  let employees = await getEmployees();
  if (employees.length == 0) throw new Error("No hay usuarios creados");
  return employees;
};

exports.getEmployeeByName = async (name) => {
  if (typeof name !== "string" || !isNaN(Number(name)))
    throw new Error("Proporciona un nombre coherente para la busqueda");

  let employeeByName = await getEmployeeByName(name);
  if (employeeByName.length == 0)
    throw new Error("No existe el trabajador solicitado");
  return employeeByName;
};

exports.createEmployeeServ = async (full_name, email, password) => {
  await validParamsEmployee(full_name, email, password);
  let employees = await getEmployees();
  const isRepeat = employees.some(
    (emails) => emails.email.toLowerCase() === email.toLowerCase()
  );
  if (isRepeat) throw new Error("No se puede repetir el mismo correo");
 
  const createdEmployee = await createEmployee(full_name, email, password);
  if (createEmployee.affectedRows === 0) throw new Error("Lo siento, no se pudo crear el usuario");

  return {
    id: createdEmployee.insertId,
    full_name,
    email
  };
};
