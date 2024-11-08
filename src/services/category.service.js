const {getCategory, findCategoryById} = require("../utils/queries.js")
const {validateParamsId} = require("../utils/utils.js")

exports.getCategoriesService = async () => {
  let categories = await getCategory();
  if (categories.length == 0) {
    throw new Error("No hay registros de categorias");
  }

  return categories;
};

exports.getCategoyId = async (id) => {
  await validateParamsId(id);
  let category = await findCategoryById(id);
  if (category.length == 0) {
    throw new Error("No hay registros de categorias");
  }

  return category;
};