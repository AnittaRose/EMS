
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Manage() {
    const [employees, setEmployees] = useState([]); // State to store employee data
    const navigate = useNavigate();

    const params = new URLSearchParams(window.location.search);
    const tokenKey = params.get("login");
    const token = localStorage.getItem(tokenKey);
    const userId = params.get("id");
    const id = params.get("id");

    const fetchEmployees = async () => {
        try {
            const response = await fetch(`http://localhost:3000/Employe`, {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
    
            const parsedResponse = await response.json();
            console.log(parsedResponse);  // Log the response to check the structure
    
            setEmployees(parsedResponse.data); // Update state with fetched data
        } catch (error) {
            console.error("Error fetching employee list", error);
        }
    };

    const handleDelete = async (id) => {
        try {
            const response = await fetch(`http://localhost:3000/Employe/${id}`, {
                method: "DELETE",
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            if (response.ok) {
                // Remove the deleted employee from the state
                setEmployees((prevEmployees) => prevEmployees.filter(emp => emp._id !== id));
                console.log("Employee deleted successfully");
            } else {
                console.error("Failed to delete employee");
            }
        } catch (error) {
            console.error("Error deleting employee:", error);
        }
    };

    useEffect(() => {
        fetchEmployees(); // Fetch employees when the component mounts
    }, []);

    const handleAddEmployee = () => {
        navigate(`/Addpage?login=${tokenKey}&id=${id}`);
    };

    
    const LeaveForm = (id) => {
        navigate(`/ViewLeaves?login=${tokenKey}&id=${id}`);
    };

    const PaySalaries = (id) => {
        navigate(`/PaySalaries?login=${tokenKey}&id=${id}`);
    };
    

    const handleViewEmployee = (id) => {
        navigate(`/SingleemployeAdmin?login=${tokenKey}&id=${id}`);
    };
    

    const Edit =(employeeId) =>{
        navigate(`/Edit?login=${tokenKey}&id=${id}&employeeId=${employeeId}`)
    }
    return (

        <>
    <div className="d-flex">
        <div className="">
            <div className="manback">
                <div className="px-4 pt-5">
                <div className="d-flex">
                            <div><img src="https://img.icons8.com/?size=100&id=47735&format=png&color=FFFFFF" className="dashboardicon" alt="" /></div>
                            <span className="dashboard px-3 fw-bold">Dashboard</span>
                        </div>
                        <div className="d-flex pt-4">
                            <div><img src="https://img.icons8.com/?size=100&id=bjqhmlJOaXIK&format=png&color=FFFFFF" className="employeicon" alt="" /></div>
                            <span className="dashboard px-3 fw-bold" onClick={() => Manage(userId)}>Manage Employees</span>
                        </div>
                        <div className="d-flex pt-4">
                            <div><img src="https://img.icons8.com/?size=100&id=t4JOl7HIHU3e&format=png&color=FFFFFF" className="category" alt="" /></div>
                            <span className="dashboard px-3 fw-bold" onClick={() => Categories(userId)}>Department</span>
                        </div>
                        <div className="d-flex pt-4">
                            <div><img src="https://img.icons8.com/?size=100&id=82751&format=png&color=FFFFFF" alt="" className="profile" /></div>
                            <span className="dashboard px-3 fw-bold">Profile</span>
                        </div>
                        <div className="d-flex pt-4">
                            <div><img src="https://img.icons8.com/?size=100&id=364&format=png&color=FFFFFF" className="logout" alt="" /></div>
                            <span className="dashboard px-3 fw-bold">Settings</span>
                        </div>
                        <div className="d-flex pt-4">
                            <div><img src="https://img.icons8.com/?size=100&id=Rqol6NpJIw4s&format=png&color=FFFFFF" className="logout" alt="" /></div>
                            <span className="dashboard px-3 fw-bold" onClick={() => LeaveForm(userId)}>Leaves</span>
                        </div>
                        <div className="d-flex pt-4">
                            <div><img src="https://img.icons8.com/?size=100&id=22431&format=png&color=FFFFFF" className="logout" alt="" /></div>
                            <span className="dashboard px-3 fw-bold" onClick={() => PaySalaries(userId)}>Salary</span>
                        </div>
                        <div className="d-flex pt-4">
                            <div><img src="https://img.icons8.com/?size=100&id=22431&format=png&color=FFFFFF" className="logout" alt="" /></div>
                            <span className="dashboard px-3 fw-bold" onClick={() => MarkAttendanceAdmin()}>Employee Attendance</span>
                        </div>
                    
                </div>
            </div>
        </div>

        <div className="">
            <div className="contenttt">
                <div className="sub">
                    <div className="text-center fs-1  fw-bold">
                        Employee List
                    </div>
                </div>
                {/* <div className="text-center pt-3 fw-bold fs-4">Employee List</div> */}
                <div className="p-4">
                <button className="Addbttnnn" onClick={handleAddEmployee}>
                    Add Employee
                </button>
                </div>
                <div className="employee-list">
                    <table className="table">
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Email</th>
                                {/* <th>Department</th> */}
                                <th>role</th>
                                {/* <th>JoinDate</th> */}
                                <th>salary</th>
                                {/* <th>Actions</th> */}
                                <th>Total Salary</th>
                            </tr>
                        </thead>
                        <tbody>
                        {employees.map((employee) => (
                        <tr key={employee._id} className="shadow-lg rounded">
                            <td>{employee.employeeName}</td>
                            <td>{employee.email}</td>
                            <td>{employee.role}</td>
                            {/* <td>{employee.joinDate}</td> */}
                            <td>{employee.salary}</td> {/* Verify if salary is available */}
                            <td>{employee.totalSalary}</td>
                            <td>
                                <div className="d-flex justify-content-between">
                                    <button className="viewbttn p-2" onClick={() => handleViewEmployee(employee._id)}>
                                        View
                                    </button>
                                    <button onClick={() => Edit(employee._id)} className="editbttn">Edit</button>
                                    <button onClick={() => handleDelete(employee._id)} className="deletebttn">Delete</button>
                                </div>
                            </td>
                        </tr>
                    ))}

                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </div>
        </>
    );
}

export default Manage;



