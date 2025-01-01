
// import React, { useState, useEffect } from 'react';
// import axios from 'axios';

// const PaySalaries = () => {
//   const [employees, setEmployees] = useState([]);
//   const [salaryDetails, setSalaryDetails] = useState({});
//   const [paymentStatus, setPaymentStatus] = useState(null);

//   useEffect(() => {
//     // Fetch all employees from the API
//     const fetchEmployees = async () => {
//       try {
//         const response = await axios.get('http://localhost:3000/Employe');
//         if (response.data && Array.isArray(response.data.data)) {
//           setEmployees(response.data.data);
//         } else {
//           console.error('Invalid data structure:', response.data);
//         }
//       } catch (error) {
//         console.error('Error fetching employees', error);
//       }
//     };

//     fetchEmployees();
//   }, []);

//   const handleInputChange = (e, employeeId) => {
//     const { name, value } = e.target;

//     setSalaryDetails((prevState) => {
//       const updatedEmployee = { ...prevState[employeeId] };
//       updatedEmployee[name] = parseFloat(value) || 0;

//       // Calculate the updated total salary dynamically
//       const baseSalary = employees.find(emp => emp._id === employeeId)?.salary || 0;
//       updatedEmployee.totalSalary =
//         parseFloat(baseSalary) +
//         (parseFloat(updatedEmployee.additions) || 0) -
//         (parseFloat(updatedEmployee.deductions) || 0);

//       return {
//         ...prevState,
//         [employeeId]: updatedEmployee,
//       };
//     });
//   };

//   const handlePayEmployee = async (employeeId) => {
//     const employeeSalaryData = salaryDetails[employeeId];

//     if (!employeeSalaryData) {
//       setPaymentStatus('Please enter salary details before paying.');
//       return;
//     }

//     try {
//       const response = await axios.post(
//         `http://localhost:3000/employee/${employeeId}/pay`,
//         {
//           additions: employeeSalaryData.additions || 0,
//           deductions: employeeSalaryData.deductions || 0,
//         }
//       );
//       setPaymentStatus(`Salary paid successfully! Total Salary: ₹${response.data.totalSalary}`);
//     } catch (error) {
//       console.error('Error paying employee:', error);
//       setPaymentStatus('Error paying salary. Please try again.');
//     }
//   };

//   return (
//     <div className="container mt-4">
//       <h2>Employee Salary Management</h2>

//       {/* Employee List Table */}
//       {employees.length === 0 ? (
//         <p>No employees found or data is still loading...</p>
//       ) : (
//         <table className="table table-striped">
//           <thead>
//             <tr>
//               <th>Name</th>
//               <th>Department</th>
//               <th>Role</th>
//               <th>Base Salary</th>
//               <th>Additions</th>
//               <th>Deductions</th>
//               <th>Total Salary</th>
//               <th>Actions</th>
//             </tr>
//           </thead>
//           <tbody>
//             {employees.map((employee) => (
//               <tr key={employee._id}>
//                 <td>{employee.employeeName}</td>
//                 <td>{employee.department}</td>
//                 <td>{employee.role}</td>
//                 <td>{employee.salary}</td>
//                 <td>
//                   <input
//                     type="number"
//                     name="additions"
//                     placeholder="Additions"
//                     value={salaryDetails[employee._id]?.additions || ''}
//                     onChange={(e) => handleInputChange(e, employee._id)}
//                   />
//                 </td>
//                 <td>
//                   <input
//                     type="number"
//                     name="deductions"
//                     placeholder="Deductions"
//                     value={salaryDetails[employee._id]?.deductions || ''}
//                     onChange={(e) => handleInputChange(e, employee._id)}
//                   />
//                 </td>
//                 <td>{salaryDetails[employee._id]?.totalSalary?.toFixed(2) || employee.salary}</td>
//                 <td>
//                   <button
//                     className="btn btn-primary"
//                     onClick={() => handlePayEmployee(employee._id)}
//                   >
//                     Pay Salary
//                   </button>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       )}

//       {/* Payment Status Alert */}
//       {paymentStatus && (
//         <div className={`alert ${paymentStatus.includes('Error') ? 'alert-danger' : 'alert-success'} mt-3`}>
//           {paymentStatus}
//         </div>
//       )}
//     </div>
//   );
// };

// export default PaySalaries;
// SalaryForm.js
import React, { useState } from 'react';
import axios from 'axios';
import { Table, Form, Button, Alert, Container } from 'react-bootstrap';

const PaySalaries = () => {
    const [employeeId, setEmployeeId] = useState('');
    const [additions, setAdditions] = useState('');
    const [deductions, setDeductions] = useState('');
    const [alertMessage, setAlertMessage] = useState('');
    const [alertType, setAlertType] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            // Make the API request to process salary
            const response = await axios.post('http://localhost:3000/process-salary', {
                employeeId: employeeId,
                additions: additions,
                deductions: deductions,
            });

            if (response.status === 200) {
                // Success: Display success message
                setAlertMessage(`Salary processed: ₹${response.data.totalSalary}`);
                setAlertType('success');
            }
        } catch (error) {
            // Error: Display error message
            if (error.response) {
                setAlertMessage(error.response.data.message);
            } else {
                setAlertMessage('Error processing salary');
            }
            setAlertType('danger');
        }
    };

    return (
        
<Container className="mt-5">
<div className='salarybackground'>
    <h2 className="mb-4 text-center text-primary">Employee Salary Management</h2>

    <div className="cards shadow">
        <div className="card-header bg-primary text-white">Salary Details</div>
        <div className="card-body">
            <Form onSubmit={handleSubmit}>
                <Table className="table table-hover">
                    <tbody>
                        <tr>
                            <td><strong>Employee ID</strong></td>
                            <td>
                                <Form.Control
                                    type="text"
                                    placeholder="Enter Employee ID"
                                    value={employeeId}
                                    onChange={(e) => setEmployeeId(e.target.value)}
                                    required
                                />
                            </td>
                        </tr>
                        <tr>
                            <td><strong>Additions</strong></td>
                            <td>
                                <Form.Control
                                    type="number"
                                    placeholder="Enter Additions"
                                    value={additions}
                                    onChange={(e) => setAdditions(e.target.value)}
                                    required
                                />
                            </td>
                        </tr>
                        <tr>
                            <td><strong>Deductions</strong></td>
                            <td>
                                <Form.Control
                                    type="number"
                                    placeholder="Enter Deductions"
                                    value={deductions}
                                    onChange={(e) => setDeductions(e.target.value)}
                                    required
                                />
                            </td>
                        </tr>
                    </tbody>
                </Table>

                <div className="text-center mt-3">
                    <Button variant="success" type="submit" className="px-4">
                        Pay Salary
                    </Button>
                </div>
            </Form>

            {alertMessage && (
                <Alert variant={alertType} className="mt-3 text-center">
                    {alertMessage}
                </Alert>
            )}
        </div>
    </div>
</div>
        </Container>

    );
};

export default PaySalaries;
