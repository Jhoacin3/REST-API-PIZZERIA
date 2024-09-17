//*****************Utilerias para roles*****************
const validateParamsId =async (id) => {
  if (!id) {
    throw new Error("No has proporcionado un ID como parametro");
  }
  if (isNaN(id) || parseInt(id) <= 0) {
    throw new Error("El ID pasado como parámetro no es válido.");
  }
};

const validateParamStings = async (name_rol) => {
  for (let i = 0; i < name_rol.length; i++) {
    if (!isNaN(name_rol[i])) {
      throw new Error("El nombre debe contener solo letras");
    }
  }
};

const validateRepeatParam =async (getRoles, name_rol) => {
  //Nota: El método some() comprueba si al menos un elemento del array cumple con la condición implementada por la función proporcionada.
  const isRepeat = getRoles.some(
    (role) => role.name_role.toLowerCase() === name_rol.toLowerCase()
  );
  if (isRepeat) {
    throw new Error("El nombre del rol ya existe");
  }
};
const validatenameRol = async (name_rol) => {
  if (!name_rol) {
    throw new Error("Escriba el nombre del rol");
  }
};
const validateNameLength = async (name_rol) => {
  if (name_rol.length <= 2 || name_rol.length >= 12) {
    throw new Error("El nombre del rol debe tener entre 3 y 5 caracteres ");
  }
};
//**************************************************


module.exports = {
  validateParamsId,
  validateParamStings,
  validateRepeatParam,
  validatenameRol,
  validateNameLength
};
