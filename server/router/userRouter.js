const express = require ('express');
const router = express.Router();
const userController = require ('../Controller/userController');

router.post('/Employee',userController.addEmployee);
router.get('/Employe',userController.EmployeList);
router.get('/Employe/:id',userController.SingleEmploye)
router.delete('/Employe/:id',userController.DeleteEmploye);
router.put('/Employee/:id',userController.EditEmploye)
router.post('/Leaves',userController.Leaves);
router.get('/employeecount',userController.count);
router.get('/admincount',userController.admincount)

module.exports = router;