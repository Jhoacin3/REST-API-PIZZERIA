//*****************Utilerias para roles*****************
const validateParamsId = async (id) => {
  if (!id) {
    throw new Error("No has proporcionado un ID como parametro");
  }
  if (isNaN(id) || parseInt(id) <= 0) {
    throw new Error("El ID pasado como parámetro no es válido.");
  }
};
const validatesMethodCreate = async (name_rol, getRoles) => {
  if (name_rol.length <= 2 || name_rol.length >= 12) {
    throw new Error("El nombre del rol debe tener entre 3 y 5 caracteres ");
  }

  for (let i = 0; i < name_rol.length; i++) {
    if (!isNaN(name_rol[i])) {
      throw new Error("El nombre debe contener solo letras");
    }
  }

  if (!name_rol) {
    throw new Error("Escriba el nombre del rol");
  }

  //Nota: El método some() comprueba si al menos un elemento del array cumple con la condición implementada por la función proporcionada.
  const isRepeat = getRoles.some(
    (role) => role.name_role.toLowerCase() === name_rol.toLowerCase()
  );
  if (isRepeat) {
    throw new Error("El nombre del rol ya existe");
  }
};

const validatesMethodUpdate = async (getRoles, id_role, name_role) => {
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
    (role) =>
      role.name_role.toLowerCase() === name_role.toLowerCase() &&
      Number(role.id_roles) !== Number(id_role)
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
const validatesMethodDelete = async (id_role, getRoles, getEmployees) => {
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
    throw new Error("El rol ya no existe");
  }
  const isExistInEmployees = getEmployees.some(
    (roleExist) => Number(roleExist.id_rol) === Number(id_role)
  );
  if (isExistInEmployees) {
    throw new Error("Actualmente existe un trabajador con este rol");
  }
};

const validateParamsAddMenu = async (name, description, price, id_category) => {
  if (!name || !description || !price || !id_category || name === null || description === null || price === null || id_category === null) {
    throw new Error("Es necesario todos los campos");
  }
  if (typeof name !== 'string' || typeof description !== 'string' || typeof price !== 'number' || typeof id_category !== 'number') {
    throw new Error("Todos los campos deben ser del tipo correcto");
  }
  if (name.length <= 2 || name.length >= 12) {
    throw new Error("El nombre del menu debe tener entre 3 y 11 caracteres ");
  }
     
}

const verifiedIfExist = async (arrayObject, id) =>{
  const isRepeat = arrayObject.some(
    (item) => Number(item.id_menu) === Number(id) 
  );
  return isRepeat;

}

//**************************************************

const validateParamCategory = async (type, namesCategory) =>{
  if (!type) {
    throw new Error("Es obligatorio el nombre de la categoria");
  }
  if (typeof type !== 'string' || type.length <= 4 || type.length >= 12) {
    throw new Error("El nombre debe ser ser de tipo cadena y debe ser mayor a 5 caracteres");
  }
  // let typenew = type.toLowerCase();
  let result = namesCategory.some((names) => names.type === type);
  if (result) {
    throw new Error("Ya existe una categoria con ese mismo nombre");
  }
  return result;
}

module.exports = {
  validateParamsId,
  validatesMethodCreate,
  validatesMethodUpdate,
  validatesMethodDelete,
  validateParamsAddMenu,
  verifiedIfExist,
  validateParamCategory
};
