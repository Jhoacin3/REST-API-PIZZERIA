const { validateParamsId, validParamsEmployee, validParamsEmployeeUp } = require("../utils/utils.js");
const { getEmployeeByName, getEmployees, getEmployeeId, createEmployee, updateEmployees, deleteEmployee, getEmployeeByOrderId } = require("../utils/queries.js");
const { SALT_ROUNDS } = require ("../../config/config.js");

const bcrypt = require('bcrypt');


exports.getEmployeeService = async () => {
  let employees = await getEmployees();
  if (employees.length == 0) employees = 0;

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

  if (!email)throw new Error("El correo electronico es obligatorio");

  let verifiedEmail = await email.includes("@gmail.com");
  if (verifiedEmail !== true) throw new Error("el email no es correcto");


  let employees = await getEmployees();
  const isRepeat = employees.some(
    (item) => item.email.toLowerCase() === email.toLowerCase() || item.full_name === full_name.toLowerCase()
  );
  if (isRepeat) throw new Error("No se puede repetir el mismo nombre y/o correo");

  const hasedPassword = await bcrypt.hash(password, SALT_ROUNDS)// --> Este proceso lleva tiempo, se debe usar el await.
  const createdEmployee = await createEmployee(full_name, email, hasedPassword);
  if (createEmployee.affectedRows === 0)
    throw new Error("Lo siento, no se pudo crear el usuario");
  return {
    id: createdEmployee.insertId,
    full_name,
    //email,
    //password: hasedPassword
  };
};

exports.updateEmployeeServ = async (id, full_name, password, email) => {
  await validateParamsId(id);
  await validParamsEmployeeUp(full_name);

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

exports.deleteEmployeeServ = async (id) => {
  await validateParamsId(id);
  await getEmployeeId(id);
  //Validar que el usuario no tenga relaciones en la tabla orders
   let findEmployee = await getEmployeeByOrderId(id);
   if(Array.isArray(findEmployee) && findEmployee.length > 0) throw new Error ("El usuario no puede ser eliminado porque ya existe una compra con dicho empleado.");
  let deletedSuccess = await deleteEmployee(id);

  if (deletedSuccess.affectedRows != 1)throw new Error("No se pudo eliminar el usuario");
  
  return {
    id: id,
  };
};
