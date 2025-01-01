const { validateParamsId, validParamsEmployee, validateEmailExists } = require("../utils/utils.js");
const {getEmployees} = require("../utils/queries.js");
const bcrypt = require('bcrypt');



exports.loginService = async (email, password) => {
  if (!email || !password)
    throw new Error("El correo y contraseña son obligatorios");
  let verifiedEmail = await email.includes("@gmail.com");
  if (verifiedEmail !== true) throw new Error("el email no es correcto");

  const employees = await getEmployees();

  let validateEmail = await validateEmailExists(email, employees);
  const isValid = await bcrypt.compare(password, validateEmail.password); // no desencripta, solo encripta el pass que ingreso y lo compara con el pass encriptado ya guardado.
  if (!isValid) throw new Error("La contraseña es erronea");

  return {
    id: validateEmail.id_employees,
    name: validateEmail.full_name,
  };
};