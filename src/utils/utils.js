const multer = require('multer');
// Configurar multer para almacenar las imágenes en memoria
const storageStrategy = multer.memoryStorage();
const upload = multer({storage: storageStrategy});
const fs = require('fs');
const path = require('path');
//*****************Utilerias para roles*****************
exports.validateParamsId = async (id) => {
  if (!id) {
    throw new Error("No has proporcionado un ID como parametro");
  }
  if (isNaN(id) || parseInt(id) <= 0) {
    throw new Error("El ID pasado como parámetro no es válido.");
  }
};
exports.validatesMethodCreate = async (name_rol, getRoles) => {
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
  exports.isRepeat = getRoles.some(
    (role) => role.name_role.toLowerCase() === name_rol.toLowerCase()
  );
  if (isRepeat) {
    throw new Error("El nombre del rol ya existe");
  }
};

exports.validatesMethodUpdate = async (getRoles, id_role, name_role) => {
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
exports.validatesMethodDelete = async (id_role, getRoles, getEmployees) => {
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

exports.validateParamsAddMenu = async (name, description, price, id_category) => {
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

exports.verifiedIfExist = async (arrayObject, id) =>{
  const isRepeat = arrayObject.some(
    (item) => Number(item.id_menu) === Number(id) 
  );
  return isRepeat;

}

//**************************************************

exports.validateParamCategory = async (type, namesCategory) =>{
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

exports.validateParamConfig = async (name, photo_url, number_of_tables, enable) =>{
  
  //1 = ACTIVADO(true) // 2 = DESACTIVADO(false)
  if (!name && !number_of_tables ) {
    throw new Error("Es obligatorio el nombre y número de mesas del negocio");
  }
  if(!Number(enable)){
    throw new Error("El tipo de dato del switch no es adecuado");
  }
  // if (!Number.isInteger(number_of_tables) || number_of_tables <= 0) {
  //   throw new Error("Por lo menos deben de haber 1 mesa");
  // }
  if (typeof name !== 'string' || name.length <= 4 || name.length >= 12) {
    throw new Error("El nombre debe ser ser de tipo cadena y debe ser mayor a 5 y menor a 11 caracteres");
  }
  
}
//*****************Utilerias Generales*****************
//Creación y manipulación de imagenes
exports.photoPathUtil = async (photo_url) =>{
  const uploadDir = path.join(__dirname, "../uploads");
  // Crear directorio de almacenamiento
  if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir); // Crear el directorio si no existe
  }
  // Crear un nombre único para la imagen
  const uniqueFileName = `${Date.now()}-${photo_url.originalname}`;

  const photoPath = path.join(uploadDir, uniqueFileName);
  fs.writeFileSync(photoPath, photo_url.buffer);

  return uniqueFileName;
}


exports.validParamsEmployee = async (
  full_name,
  email,
  password
) => {
  if ( !full_name ||!email || !password ) throw new Error("Todos los campos son necesarios");
  if (typeof full_name !== "string" || !isNaN(Number(full_name)))
    throw new Error("Proporciona un nombre coherente para la busqueda");
};
