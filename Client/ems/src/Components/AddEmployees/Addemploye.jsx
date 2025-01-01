
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Addpage() {
    const navigate = useNavigate();

    useEffect(() => {
        const addpage = () => {
            let params = new URLSearchParams(window.location.search);
            let token_key = params.get("login");
            console.log(token_key);

            if (token_key) {
                navigate(`/Addpage?login=${token_key}`);
            }
        };

        addpage();
    }, [navigate]);

    const handleSubmit = async (event) => {
        event.preventDefault();
        console.log("Form submission started...");
    
        const params = new URLSearchParams(window.location.search);
        const token_key = params.get("login");
        const token = localStorage.getItem(token_key);
    
        // Retrieve input values
        const employeeName = document.getElementById("name").value.trim();
        const email = document.getElementById("email").value.trim();
        const department = document.getElementById("department").value;
        const role = document.getElementById("role").value.trim();
        const salary = document.getElementById("salary").value.trim();
        const joinDate = document.getElementById("joinDate").value.trim();
        const password = document.getElementById("password").value.trim();
        const user_types = document.getElementById("user_type").value;
        const addition = document.getElementById("addition").value.trim();
        const deductions = document.getElementById("deduction").value.trim();
        const month= document.getElementById("month").value.trim();
        const year = document.getElementById("year").value.trim();
        const salaryPaid = document.getElementById("paid").value.trim();
        const status = document.getElementById("status").value.trim();

    
        // Debugging: Log all input values
        console.log({
            employeeName, email, department, role, salary, joinDate, password, user_types, addition, deductions,month,year,salaryPaid,status
        });
    
        // Check for missing fields
        if (!employeeName || !email || !user_types || !department || !role || !joinDate || !password || !salary || !addition || !deductions || !month || !year || !salaryPaid || !status ) {
            alert("Please fill out all fields.");
            return;
        }
    
        // Ensure salary, addition, and deduction are valid numbers
        if (isNaN(salary) || isNaN(addition) || isNaN(deductions)) {
            alert("Salary, addition, and deduction must be valid numbers.");
            return;
        }
    
        const data = {
            employeeName,
            email,
            user_type: user_types, // Ensure proper format
            department,
            role,
            joinDate,
            password,
            salary,
            addition,
            deductions,
            month,
            year,
            salaryPaid,
            status
        };
    
        console.log("Payload being sent:", data);
    
        try {
            const response = await fetch("http://localhost:3000/Employee", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify(data),
            });
    
            const parsed_response = await response.json();
            console.log("Server Response:", parsed_response);
    
            if (response.ok) {
                alert(`${user_types} successfully added.`);
                navigate(`/Manage?login=${token_key}`);
            } else {
                alert(parsed_response.message || "Something went wrong.");
            }
        } catch (error) {
            console.error("Fetch error:", error);
            alert("Failed to submit. Please try again.");
        }
    };
    

    return (
        <>
            <div className="d-flex">
                <div className="">
                    <div className="">
                        <img
                            src="https://files.oaiusercontent.com/file-E39TN9xrA8Rz9EM6vckxa4?se=2024-12-26T16%3A07%3A36Z&sp=r&sv=2024-08-04&sr=b&rscc=max-age%3D604800%2C%20immutable%2C%20private&rscd=attachment%3B%20filename%3Db18f24ac-eb47-4045-9b7a-196e14fb8a20.webp&sig=iPs9ebuPP4XTXwYk3T4CznfebygRQElgWajt05o9Nrw%3D"
                            className="employeebanerr"
                            alt="Employee Banner"
                        />
                    </div>
                </div>

                <div className="addpageformbg px-4 pt-2">

                    <form className="formm" onSubmit={handleSubmit}>
                      
                        <label>
                            <input required=""  type="text" className="input" id="name"  />
                            <span>name</span>
                        </label>
                      
                        <label>
                            <input required=""  type="text" className="input" id="email" />
                            <span>email</span>
                        </label>
                        <label>
                        <select className="inputt" id="department">
                                <option value="">Select Department</option>
                                <option value="IT">IT</option>
                                <option value="Developer">Developer</option>
                                <option value="Designer">Designer</option>
                                <option value="Business">Business</option>
                                <option value="HR">HR</option>
                        </select>
                        </label>
                        <label>
                            <input required=""  type="text" className="input" id="role" />
                            <span>role</span>
                        </label>
                        <label>
                            <input required=""  type="text" className="input" id="joinDate" />
                            <span>Join Date</span>
                        </label>
                        <label>
                            <input required=""  type="text" className="input" id="salary" />
                            <span>salary</span>
                        </label>
                        <label>
                            <input required=""  type="text" className="input" id="addition" />
                            <span>Addition</span>
                        </label>
                        <label>
                            <input required=""  type="text" className="input" id="deduction" />
                            <span>Deductions</span>
                        </label>
                        <label>
                            <input required=""  type="text" className="input" id="password" />
                            <span>Password</span>
                        </label>
                        <label>
                        <select className="inputt" id="user_type">
                                <option value="">Select User Type</option>
                                <option value="admin">Admin</option>
                                <option value="Employee">Employee</option>
                            </select>
                        </label>
                        <label>
                            <input required=""  type="text" className="input" id="month" />
                            <span>Month</span>
                        </label>
                        <label>
                            <input required=""  type="text" className="input" id="year" />
                            <span>Year</span>
                        </label>
                        <label>
                            <input required=""  type="Number" className="input" id="paid" />
                            <span>salaryPaid</span>
                        </label>
                        <label>
                            <input required=""  type="text" className="input" id="status" />
                            <span>status</span>
                        </label>
                        <button className="submit">Add Employe</button>
                    </form>
                </div>
            </div>
        </>
    );
}

export default Addpage;
