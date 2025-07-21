const multer = require('multer');
const { deleteOrderDetail } = require('../utils/queries.js');
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
    (role) => role.name_role.toLowerCase().trim() === name_rol.toLowerCase().trim()
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
  if (typeof name !== 'string' || typeof description !== 'string') {
    throw new Error("Todos los campos deben ser del tipo correcto");
  }
  if (name.length <= 2 || name.length >= 20) {
    throw new Error("El nombre del menu debe tener entre 3 y 11 caracteres ");
  }
  if(description.length <= 0 || description.length >= 50) throw new Error("La descripción debe ser corta y precisa.")
     
}

exports.verifiedIfExist = async (arrayObject, id) =>{
  const isRepeat = await arrayObject.some(
    (item) => Number(item.id_menu) === Number(id) 
  );
  return isRepeat;

}


exports.validateParamCategory = async (type, namesCategory) =>{
  if (!type) {
    throw new Error("Es obligatorio el nombre de la categoria");
  }
  if (typeof type !== 'string' || type.length <= 4 || type.length >= 12) {
    throw new Error("El nombre debe ser ser de tipo cadena y debe ser mayor a 5 caracteres");
  }
  // let typenew = type.toLowerCase();
  let result = namesCategory.some((names) => names.type.toLowerCase().trim() === type.toLowerCase().trim());
  if (result) {
    throw new Error("Ya existe una categoria con ese mismo nombre");
  }
  return result;
}

exports.validateParamCategoryById = async (type, namesCategory, id) =>{
  if (!type) {
    throw new Error("Es obligatorio el nombre de la categoria");
  }
  if (typeof type !== 'string' || type.length <= 4 || type.length >= 12) {
    throw new Error("El nombre debe ser ser de tipo cadena y debe ser mayor a 5 caracteres");
  }
  // let typenew = type.toLowerCase();
  let result = namesCategory.some((names) => names.type.toLowerCase().trim() === type.toLowerCase().trim() && Number(names.id_category) !== Number(id));
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
  if (typeof name !== 'string' || name.length <= 4 || name.length >= 15) {
    throw new Error("El nombre debe ser ser de tipo cadena y debe ser mayor a 5 y menor a 15 caracteres");
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


exports.validParamsEmployee = async (full_name, password) => {
  if (!full_name || !password)
    throw new Error("El nombre y contraseña son obligatorios");

  if (typeof full_name !== "string" || !isNaN(Number(full_name)))
    throw new Error("Proporciona un nombre coherente para la busqueda");

  if (full_name.length <= 5 || full_name.length >= 30)
    throw new Error(
      "El nombre debe de ser mayor a 5 y menos a 12 caracteres"
    );

  if (password.length <= 5 || password.length >= 13)
    throw new Error(
      "La contraseña debe de ser mayor a 5 y menos a 12 caracteres"
    );
};
exports.validParamsEmployeeUp = async (full_name, password) => {
  if (!full_name )
    throw new Error("Es requerido el nombre para poder actualizar");

  if (typeof full_name !== "string" || !isNaN(Number(full_name)))
    throw new Error("Proporciona un nombre coherente para la busqueda");

  if (full_name.length <= 5 || full_name.length >= 30)
    throw new Error(
      "El nombre debe de ser mayor a 5 y menos a 12 caracteres"
    );

 
};
exports.validateEmailExists = async (email, employees) => {
  let emailFind = await employees.filter((item) => item.email == email);
  if (emailFind.length == 0)
    throw new Error("No se encontró el correo proporcionado");
  
  return emailFind[0];//como retorna un array de objetos, en este caso retornará un objeto, pues retornamos en la primera pocisión (primero objeto) = [posición: 0]
};

//*****************Utilerias orderPayment*****************


exports.validateParamsOrder = async (
  employees_id, id_table, state
) => {
  if (!employees_id) throw new Error("Es necesario un empleado atendiendo");
  if (!id_table) throw new Error("Es necesario el número de mesa");
  if (!state)
    throw new Error("Es necesario el estatus para la orden.");
};


exports.validateParamsOrderDetail = async (menuDetails) => {
  for (let i = 0; i < menuDetails.length; i++) {
    if (menuDetails[i].amount == null) {
      throw new Error("Es necesario la cantidad de productos");
    }
    if (menuDetails[i].unit_price == null || menuDetails[i].unit_price <= 0) {
      throw new Error("Es necesario el precio unitario de los productos");
    }
    if (menuDetails[i].id_menu == null) {
      throw new Error("Es necesario el id del producto");
    }
  }
};

exports.existingDetail = async (existingOrderDetails, orderDetails) => { 
  const deletedDetails = [];

  for (const existingDetail of existingOrderDetails) {
    const shouldKeep = orderDetails.some(
      (detail) => detail.id_order_details === existingDetail.id_order_details
    );

    if (!shouldKeep) {
      const resultDelete = await deleteOrderDetail(existingDetail.id_order_details);
      if (!resultDelete) {
        throw new Error(`No se pudo eliminar el detalle con ID: ${existingDetail.id_order_details}`);
      }
      deletedDetails.push(existingDetail.id_order_details);
    }
  }

  return deletedDetails;
};
//como estaba antes
// exports.existingDetail = async (existingOrderDetails) => {
//   for (const existingDetail of existingOrderDetails) {
//     const shouldKeep = orderDetails.some(
//       (detail) => detail.id_order_details === existingDetail.id_order_details
//     );
//     if (!shouldKeep) {
//       const resultDelete = await deleteOrderDetail(existingDetail.id_order_details);
//       if (!resultDelete) {
//         throw new Error(`No se pudo eliminar el detalle de la orden con ID: ${existingDetail.id_order_details}`);
//       }
//     }
//   }
//   return resultDelete;

// }

exports.calculateOrderTotal = async (menuDetails) => {
  let total = 0;
  for (let i = 0; i < menuDetails.length; i++) {
    total += menuDetails[i].amount * menuDetails[i].unit_price;
  }
  return total;
}
