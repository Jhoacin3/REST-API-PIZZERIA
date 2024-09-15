const validateParamsId = (id) => {
  if (!id) {
    throw new Error("No has proporcionado un ID como parametro");
  }
  if (isNaN(id) || parseInt(id) <= 0) {
    throw new Error("El ID pasado como parámetro no es válido.");
  }
};
module.exports = {validateParamsId  };
