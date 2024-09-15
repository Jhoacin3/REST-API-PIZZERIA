const connection = require('../db.js');
const {validateParamsId} = require('../utils/utils.js');

const getRolesService = async (req, res) =>{
    try {
        const [result] = await connection.query('SELECT * FROM roles');
        return result;
    } catch (error) {
        throw new Error(error.message); 
    }

   
};
//Método que retorna un rol por ID como parametro.
const getRolIdService = async (id) =>{
    await validateParamsId(id)
    try {
        const [result] = await connection.query('SELECT * FROM roles WHERE id_roles = ?', [id]);
        return result;
    } catch (error) {
        throw new Error(error.message); 
    }
};

module.exports = { getRolesService, getRolIdService };