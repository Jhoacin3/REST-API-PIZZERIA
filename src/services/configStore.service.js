const {validateParamsId, validateParamConfig, photoPathUtil} = require("../utils/utils.js")
const {getConfig,getConfigId, createConfig, upateConfig} = require("../utils/queries.js");
const e = require("express");

exports.getConfigService = async () => {
  let categories = await getConfig();
  if (categories.length == 0) {
    throw new Error("No hay una configuración establecida");
  }

  return categories;
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
  };
};