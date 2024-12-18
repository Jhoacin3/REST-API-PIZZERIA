const { validateParamsId, validParamsEmployee } = require("../utils/utils.js");
const { getEmployeeByName, getEmployees, createEmployee, updateEmployees } = require("../utils/queries.js");

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
  await validParamsEmployee(full_name, password);

  let verifiedEmail = await email.includes("@gmail.com");
  if (verifiedEmail !== true) throw new Error("el email no es correcto");

  if (!email)
    throw new Error("El correo electronico es obligatorio");

  let employees = await getEmployees();
  const isRepeat = employees.some(
    (emails) => emails.email.toLowerCase() === email.toLowerCase()
  );
  if (isRepeat) throw new Error("No se puede repetir el mismo correo");

  const createdEmployee = await createEmployee(full_name, email, password);
  if (createEmployee.affectedRows === 0)
    throw new Error("Lo siento, no se pudo crear el usuario");

  return {
    id: createdEmployee.insertId,
    full_name,
    email,
  };
};

exports.updateEmployeeServ = async (id, full_name, password, email) => {
  await validateParamsId(id);
  await validParamsEmployee(full_name, password);

  let employees = await getEmployees();
  let isExist = employees.some(
    (employee) => Number(employee.id_employees) === Number(id)
  );
  if (!isExist) throw new Error("No existe el empleado proporcionado");

  const isDuplicate = employees.some(
    (employee) =>
      employee.full_name.toLowerCase().trim() ===
        full_name.toLowerCase().trim() &&
      Number(employee.id_employees) !== Number(id)
  );

  if (isDuplicate) {
    throw new Error("No puede haber dos usuarios con el mismo nombre");
  }

  await updateEmployees(id, full_name, email, password);

  return {
    id,
    full_name,
    email,
  };
};
