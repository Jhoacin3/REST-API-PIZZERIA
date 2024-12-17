const {getCategory, findCategoryById, getCategoryName, createCategory, updateCategoryById, findExistCategory, deleteCategoryById} = require("../utils/queries.js")
const {validateParamsId, validateParamCategory} = require("../utils/utils.js")

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

  return category;
};
exports.createCategory = async (type) => {
  const namesCategory = await getCategoryName();
  const typenew = await validateParamCategory(type, namesCategory);
  let typeCreated = await createCategory(type);
  return {
    id: typeCreated.insertId,
    type,
  };
};

exports.updateCategory = async (id, type) => {
  await validateParamsId(id);

  const namesCategory = await getCategoryName();
  const typenew = await validateParamCategory(type, namesCategory);
  let typeUpdated = await updateCategoryById(id, type);
  return {
    type,
  };
};

exports.deleteCategory = async (id) => {
  await validateParamsId(id);

  const findCategory = await findExistCategory(id);
  await findCategoryById(id);

  if (findCategory.length !== 0) {
    throw new Error(
      "No se puede borrar esta categoria por que ya hay insumos de este tipo"
    );
  }
  await deleteCategoryById(id);

  return {
    id: id,
  };
};