const {validateParamsId, validateParamConfig, photoPathUtil} = require("../utils/utils.js")
const {getConfig,getConfigId, createConfig, upateConfig} = require("../utils/queries.js");
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
  const configActive = categories.filter(configs => configs.enable === Number(1))
  if (categories.length == 0) {
    throw new Error("No hay una configuración establecida");
  }
  if (configActive.length == 0 ) {
    throw new Error("No hay una configuración activa para este negocio");
  }
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
};

exports.createConfigService = async (name, photo_url, number_of_tables, enable) => {
  await validateParamConfig(name, photo_url, number_of_tables, enable);
  const photoPath = await photoPathUtil(photo_url);
  let categories = await getConfig();
  const verifieEnable = categories.some(e => e.enable === 1);
  if (verifieEnable && Number(enable) === 1) {
    throw new Error("Ya existe una configuración activa para el negocio");
  }
  const configCreated = await createConfig(name, photoPath, number_of_tables, enable);

  return {
    id: configCreated.insertId,
    photo_url: `${baseUrl}/uploads/${photoPath}`,

  };
};

exports.updateConfigService = async (id,name, photo_url, number_of_tables, enable) => {
  await validateParamsId(id);
  await validateParamConfig(name, photo_url, number_of_tables, enable);
  let categories = await getConfig();

  const checkEnable = categories.some(
    (e) => e.enable === 1 && e.id_store_info !== Number(id)
  );
  if (checkEnable && Number(enable) === 1) {
    throw new Error("Ya existe otra configuración activa para el negocio");
  }
  const configDataId = await getConfigId(id);
  const photoPath = await photoPathUtil(photo_url);

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