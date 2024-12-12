const {validateParamsId} = require("../utils/utils.js")
const {validParamsEmployee, getEmployeeByName} = require("../utils/queries.js");


exports.getEmployeeService = async () => {
  let employees = await getEmployees();
  if (employees.length == 0) throw new Error("No hay usuarios creados");
  return employees
};


exports.getEmployeeByName = async (name) => {
  if (typeof name !== "string" || !isNaN(Number(name)))
    throw new Error("Proporciona un nombre coherente para la busqueda");

  let employeeByName = await getEmployeeByName(name);
  if (employeeByName.length == 0)
    throw new Error("No existe el trabajador solicitado");
  return employeeByName;
};