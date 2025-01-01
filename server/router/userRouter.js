const express = require ('express');
const router = express.Router();
const userController = require ('../Controller/userController');

router.post('/Employee',userController.addEmployee);
router.get('/Employe',userController.EmployeList);
router.get('/Employe/:id',userController.SingleEmploye)
router.delete('/Employe/:id',userController.DeleteEmploye);
router.put('/Employee/:id',userController.EditEmploye)
router.post('/addleave/:employeeId',userController.addleave);
router.get('/getleaves',userController.getleavesinAdmin);
router.get('/employeecount',userController.count);
router.get('/admincount',userController.admincount)
router.get('/employesingle/:id',userController.employesingle)
router.get('/singleLeave/:id',userController.singleLeaveView);
router.post('/forgot_password',userController.forgetPassword);
router.put('/updateLeaveStatus/:id',userController.leavestatus)
router.get('/Single',userController.getAllEmployees)
router.get('/laevecount',userController.counts)
router.put('/resetPassword/:id',userController.updatePassword)
router.get('/leave-counts',userController.leavecounts);
router.put('/leave-status/:employeeId',userController.leavestatus)


router.get('/salaries/:employeeId',userController.salaries)
router.get('/salaries',userController.allLeaves)
router.post('/salaries',userController.salaryy);
router.delete('/salary/:employeeId/:month/:year',userController.deletesalary)


///Attendence

router.post('/mark',userController.Markattendance);
router.get("/employee/:id", userController.getEmployeeAttendance);
router.get('/attendance-summary', userController.getAttendanceSummary);
router.get('/attendance',userController.allattendancerecords)
router.get('/attendance/:employeeId', userController.getAttendanceByEmployeeId);



router.get('/LeaveappliedCount',userController.totalLeaveApplied);


router.post('/employee/:id/add-addition',userController.updateaddition);
router.post('/employee/:id/add-deduction',userController.updatededuction)
router.post('/employee/:id/pay',userController.paysalary)



router.post('/process-salary',userController.processSalary);
module.exports = router;