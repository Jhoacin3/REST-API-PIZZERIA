const express = require('express');
const employeesController = require('../controllers/employees.controller');
const router = express.Router();


router.get("/getEmployees", employeesController.getEmployees);
router.get("/getEmployeeName/:name", employeesController.getEmployeeName);
router.post("/createEmployee/", employeesController.createEmployee);
router.put("/updateEmployee/:id", employeesController.updateEmployee);


module.exports = router;
