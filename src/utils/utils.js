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
//funcion para validar si el id como parametro existe en el array de objetos, si no existe retornar error
const validatesMethodUpdate =async (getRoles, id_role, name_role) => {

  if (!id_role) {
    throw new Error("No has proporcionado un ID como parametro");
  }
  if (isNaN(id_role) || parseInt(id_role) <= 0) {
    throw new Error("El ID pasado como parámetro no es válido.");
  }
  const isExistId = getRoles.some(
    (role) => Number(role.id_roles) === Number(id_role)
  );
  if (!isExistId) {
    throw new Error("El id pasado como parametro no existe");
  }
  if (!name_role) {
    throw new Error("Escriba el nombre del rol");
  }
  
  //Nota: Asegura que el id_roles del rol que se está comparando sea diferente del id_role que se está validando.
  const isRepeat = getRoles.some(
    (role) => role.name_role.toLowerCase() === name_role.toLowerCase() && Number(role.id_roles)!== Number(id_role)
  );
  if (isRepeat) {
    throw new Error("El nombre del rol ya existe");
  }
  if (name_role.length <= 2 || name_role.length >= 12) {
    throw new Error("El nombre del rol debe tener entre 3 y 5 caracteres ");
  }
  for (let i = 0; i < name_role.length; i++) {
    if (!isNaN(name_role[i])) {
      throw new Error("El nombre debe contener solo letras");
    }
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
  validateNameLength,
  validatesMethodUpdate
};
