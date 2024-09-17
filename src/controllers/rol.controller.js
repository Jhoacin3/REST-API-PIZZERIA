const connection = require('../db.js');
const rolService = require('../services/rol_service.js');


const getRoles = async (req, res) => {
  try {
    const getRolesHistory = await rolService.getRolesService();
    if (getRolesHistory.length === 0) return res.status(200).json([]);
    res.status(200).json(getRolesHistory);
  } catch (error) {
    res.status(500).json({ error: error.message });
    //console.log("Error: ", err.message);
  }
};

const getRolId = async (req, res) => {
const {id} = req.params;
  try {
    const getRolIdHistory = await rolService.getRolIdService(id);
    if (getRolIdHistory.length === 0) return res.status(404).json({
      message: 'rol no encontrado'
    });
    res.status(200).json(getRolIdHistory);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
const createRol = async (req, res) => {
  const { name_role } = req.body;
  try {
    const rolCreated = await rolService.createRolService(name_role);
    res.status(200).json(rolCreated);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


module.exports = { getRoles, getRolId, createRol };