const {validateParamsId, validateParamConfig, photoPathUtil} = require("../utils/utils.js")
const {getConfig,getConfigId, createConfig, upateConfig, createTablesLength, getActiveConfig, getTableByStoreId, deleteConfiguration} = require("../utils/queries.js");
const e = require("express");
const baseUrl = "http://localhost:3000";
const path = require('path');

exports.getConfigService = async () => {
  const data = [];
  let categories = await getConfig();
  if (categories.length == 0) {
    throw new Error("No hay una configuración establecida");
  }

  for (let configs of categories) {
    const {id_store_info, name, photo_url, number_of_tables, enable} = configs;
    const result = {
      id_store_info: id_store_info,
      name: name,
      photo_url: `${baseUrl}/uploads/${photo_url}`,
      number_of_tables: number_of_tables,
      enable: enable
     };
    data.push(result);
    
  }

  return data
};
exports.getConfigActiveService = async () => {
  let data = [];
  let categories = await getConfig();
   // 1 = CONFIGURACIÓN ACTIVA (true)
   // 2 = CONFIGURACIÓN DESACTIVADA (false)
  const configActive = categories.filter(configs => configs.enable === Number(3))
  
  if (configActive.length != 0 ) {
    for (let configs of configActive) {
      const {id_store_info, name, photo_url, number_of_tables, enable} = configs;
      const result = {
        id_store_info: id_store_info,
        name: name,
        photo_url: `${baseUrl}/uploads/${photo_url}`,
        number_of_tables: number_of_tables,
        enable: enable
       };
      data.push(result);
    }
  
    return data
    
  }else{
    return 0;
  }
};

exports.deleteConfigurationService = async (id_config) => {
  if (!id_config)
    throw new Error("No se proporcionó ela configuración para la eliminación");

  //validando que exista el ID de la config.
  let findConfig = await getConfigId(id_config);
  if (findConfig.length <= 0)
    throw new Error("No se encontró la configuración.");
  // Validar que la configuración no esté activa.
  if (findConfig[0].enable === 1)
    throw new Error("No se puede eliminar porque esta configuración está activa actualmente.");
  // Validar que no tenga una orden que esté con status en "Pendiente"
  let findConfigByStatus = await getTableByStoreId(findConfig[0].id_store_info);
  //iterando sobre el array de objetos buscando si las mesas tienen status "pendientes".
  if (findConfigByStatus.length <= 0)
    throw new Error("No se encontró mesas de la configuración.");
  const findStatus = "Pendiente";
  let findStatusFromTables = findConfigByStatus.some(
    (item) => item.status.toLowerCase().trim() === findStatus.toLowerCase().trim()
  );
  if (findStatusFromTables)
    throw new Error("No se puede borrar porque existen ordenes en procesos.");

  // Proceso de eliminación
  await deleteConfiguration(id_config);
  return { success: true, id: id_config };
};

exports.createConfigService = async (
  name,
  photo_url,
  number_of_tables,
  enable
) => {
  let newEnable = 0;
  let newPhoto = "Sin imagen.";
  let photoPath;
  let configCreated;

  await validateParamConfig(name, photo_url, number_of_tables, enable);

  let categories = await getConfig();
  if(categories.length >= 6) throw new Error("Solo se permite crear 5 configuraciones.")

  if (enable === "true") {
    newEnable = 1;
  }
  const verifieEnable = categories.some((e) => e.enable === 1);
  if (verifieEnable && Number(newEnable) === 1) {
    throw new Error("Ya existe una configuración activa para el negocio");
  }
  const verifiedName = categories.some(
    (e) => e.name.toLowerCase().trim() === name.toLowerCase().trim()
  );
  if (verifiedName) throw new Error("Ya existe una configuración con este nombre");

  if (photo_url) {
    photoPath = await photoPathUtil(photo_url);
  } else {
    photoPath = newPhoto;
  }

  configCreated = await createConfig(
    name,
    photoPath,
    number_of_tables,
    newEnable
  );

  const result = await createTablesLength(
    number_of_tables,
    configCreated.insertId
  );
  if (result.length == 0) throw new Error("No se creó las mesas del negocio.");

  return {
    id: configCreated.insertId,
    photo_url: `${baseUrl}/uploads/${photoPath}`,
  };
};

exports.updateConfigService = async (id,name, photo_url, number_of_tables, enable) => {
  await validateParamsId(id);
  let photoPath;
  await validateParamConfig(name, photo_url, number_of_tables, enable);
  let categories = await getConfig();

  const checkEnable = categories.some(
    (e) => e.enable === 1 && e.id_store_info !== Number(id)
  );
  if (checkEnable && Number(enable) === 1) {
    throw new Error("Ya existe otra configuración activa para el negocio");
  }
  const configDataId = await getConfigId(id);
    if (photo_url) {
    photoPath = await photoPathUtil(photo_url);
  } else {
    photoPath = "Sin imagen";
  }
  const upatedConfig = await upateConfig(
    id,
    name,
    photoPath,
    number_of_tables,
    enable
  );

  return {
    id_update: upatedConfig.insertId,
    photo_url: `${baseUrl}/uploads/${photoPath}`,
  };
};