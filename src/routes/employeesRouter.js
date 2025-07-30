const express = require('express');
const employeesController = require('../controllers/employees.controller');
const router = express.Router();
const { verifyToken } = require('../middlewares/auth.middleware');

router.get("/getEmployees", verifyToken, employeesController.getEmployees);
router.get("/getEmployeeName/:name", verifyToken, employeesController.getEmployeeName);
router.post("/createEmployee/", verifyToken, employeesController.createEmployee);
router.put("/updateEmployee/:id", verifyToken, employeesController.updateEmployee);
router.delete("/deleteEmployee/:id", verifyToken, employeesController.deleteEmployee);


module.exports = router;
