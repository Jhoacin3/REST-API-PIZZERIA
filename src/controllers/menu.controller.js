const { json } = require('express');
const menuService = require('../services/menu_service');


const getMenu = async (req, res) =>{
    try {
        const getMenu = await menuService.getMenuService();
        res.status(200).json(getMenu);
 
    } catch (error) {
        res.status(500).json({ error: error.message });
    }

};
module.exports = { getMenu };