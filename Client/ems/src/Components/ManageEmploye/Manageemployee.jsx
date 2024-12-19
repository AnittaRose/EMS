
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
    

    const handleViewEmployee = (id) => {
        navigate(`/Single?login=${tokenKey}&id=${id}`);
    };
    

    const Edit =(id) =>{
        navigate(`/Edit?login=${tokenKey}&id=${id}`)
    }
    return (
        <div className="d-flex">
            <div className="sidebar">
                <div className="main px-5 pt-5">
                    {/* Sidebar content */}
                </div>
            </div>

            <div className="content">
                <div className="sub">
                    <div className="text-center fs-2 pt-2 fw-bold">
                        Employee Management System
                    </div>
                </div>
                <div className="text-center pt-3 fw-bold fs-4">Employee List</div>
                <div className="p-4">
                <button className="Addbttn" onClick={handleAddEmployee}>
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
                                <th>JoinDate</th>
                                <th>salary</th>
                                {/* <th>Actions</th> */}
                            </tr>
                        </thead>
                        <tbody>
                        {employees.map((employee) => (
                        <tr key={employee._id} className="shadow-lg rounded">
                            <td>{employee.name}</td>
                            <td>{employee.email}</td>
                            <td>{employee.role}</td>
                            <td>{employee.joinDate}</td>
                            <td>{employee.salary}</td> {/* Verify if salary is available */}
                            <td>
                                <div className="d-flex justify-content-between">
                                    <button className="bttn p-2" onClick={() => handleViewEmployee(employee._id)}>
                                        View
                                    </button>
                                    <button onClick={() => Edit(employee._id)}>Edit</button>
                                    <button onClick={() => handleDelete(employee._id)}>Delete</button>
                                </div>
                            </td>
                        </tr>
                    ))}

                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

export default Manage;



