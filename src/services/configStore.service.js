const {validateParamsId, validateParamConfig, photoPathUtil} = require("../utils/utils.js")
const {getConfig,getConfigId, createConfig, upateConfig} = require("../utils/queries.js");

exports.getConfigService = async () => {
  let categories = await getConfig();
  if (categories.length == 0) {
    throw new Error("No hay una configuración establecida");
  }

  return categories;
};

exports.createConfigService = async (name, photo_url, number_of_tables) => {
  await validateParamConfig(name, photo_url, number_of_tables);
 const photoPath = await photoPathUtil(photo_url);
  const configCreated = await createConfig(name, photoPath, number_of_tables);

  return {
    id: configCreated.insertId,
  };
};

exports.updateConfigService = async (id,name, photo_url, number_of_tables) => {
  await validateParamsId(id);
  console.log(id)
  await validateParamConfig(name, number_of_tables);
  const configDataId = await getConfigId(id);
  const photoPath = await photoPathUtil(photo_url);

  const upatedConfig = await upateConfig(id,name, photoPath, number_of_tables);
  

  return {
    id_update: upatedConfig.insertId,
  };
};