// import React from "react";
// import { useNavigate } from "react-router-dom";
// import { useEffect } from "react";


// function Addpage(){
//     const navigate = useNavigate();

//     useEffect(() => {
//       const addpage = () => {
//         let params = new URLSearchParams(window.location.search);
//         let token_key = params.get("login");
//         console.log(token_key);
  
//         if (token_key) {
//           navigate(`/Addpage?login=${token_key}`);
//         }
//       };
  
//       addpage();
//     }, [navigate]);
  
//     const handleSubmit = async (event) => {
//       event.preventDefault();
//       console.log("Form submission started...");
    
//       const params = new URLSearchParams(window.location.search);
//       const token_key = params.get("login");
//       const token = localStorage.getItem(token_key);
    
//       const name = document.getElementById("name").value;
//       const email = document.getElementById("Email").value;
//       const department = document.getElementById("department").value;
//       const role = document.getElementById("role").value;
//       const salary = document.getElementById("salary").value;
//       const JoinDate = document.getElementById("date").value;
//       const password = document.getElementById("password").value;
//       const user_types = document.getElementById("user_type").value;
    
//       // Check for missing fields
//       if (!name || !email || !user_types || !department || !role || !JoinDate || !password || !salary) {
//         alert("Please fill out all fields.");
//         return;
//       }
    
//       const data = { name, email, user_types, department, role, JoinDate, password, salary };
//       console.log("Payload being sent:", data);
    
//       try {
//         const response = await fetch("http://localhost:3000/Employee", {
//           method: "POST",
//           headers: {
//             "Content-Type": "application/json",
//             Authorization: `Bearer ${token}`,
//           },
//           body: JSON.stringify(data),
//         });
    
//         const parsed_response = await response.json();
//         console.log("Server Response:", parsed_response);
    
//         // if (response.status === 200) {
//         //   if (user_types === "Admin") {
//         //     alert("Admin added successfully");
//         //   } else if (user_types === "Employee") {
//         //     alert("Employee was successfully created");
//         //   }
//         //   navigate(`/Manage?login=${token_key}`);
//         // } else {
//         //   alert(parsed_response.message || "Something went wrong");
//         // }

//         if (user_types === 'Admin') {
//           navigate(`/Manage?login=${token_key}`);
//       } else if (user_types === "Employee") {
//         navigate(`/Manage?login=${token_key}`);
//       }

//       } catch (error) {
//         console.error("Fetch error:", error);
//         alert("Failed to submit. Please try again.");
//       }
//     };
    
//     return(
//         <>
//     <div className="d-flex">
//         <div className="">
//           <div className=""><img src="https://img.freepik.com/free-photo/businesswoman-leader-modern-office-with-businesspeople-workin_1139-954.jpg?t=st=1734491732~exp=1734495332~hmac=f33acf9222c1b8f9b9cef8f130532134f87b254ff0413f552de4e9697939c458&w=996" className="employeebaner" alt="" /></div>
//         </div>
//         <div className="px-5">
//             <form onSubmit={handleSubmit}>
//                 <div className="mb-3">
//                     <label htmlFor="exampleInputEmail1" className="form-label">Enter Name</label>
//                     <input type="text" className="form-control" id="name" />
//                 </div>
//                 <div className="mb-3">
//                     <label htmlFor="exampleInputPassword1" className="form-label">Enter Email</label>
//                     <input type="Email" className="form-control" id="Email"/>
//                 </div>
//                 <div className="mb-3">
//                     <label htmlFor="exampleInputPassword1" className="form-label">Department</label>
//                     <div className="">
//                         <select className="form-control" id="department">
//                             <option value="">Select Department</option>
//                             <option value="Admin">IT</option>
//                             <option value="Employee">Developer</option>
//                             <option value="Employee">Designer</option>
//                             <option value="Employee">Business</option>
//                             <option value="Employee">HR</option>
//                         </select>
//                     </div>
//                 </div>
//                 <div className="mb-3">
//                     <label htmlFor="exampleInputPassword1" className="form-label">Enter Role</label>
//                     <input type="text" className="form-control" id="role"/>
//                 </div>
//                 <div className="mb-3">
//                     <label htmlFor="exampleInputPassword1" className="form-label">JoinDate</label>
//                     <input type="text" className="form-control" id="date"/>
//                 </div>
//                 <div className="mb-3">
//                     <label htmlFor="exampleInputPassword1" className="form-label">Salary</label>
//                     <input type="text" className="form-control" id="salary"/>
//                 </div>
//                 <div className="mb-3">
//                     <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
//                     <input type="password" className="form-control" id="password"/>
//                 </div>
//                 <div className="mb-3">
//                     <label htmlFor="exampleInputPassword1" className="form-label">User Type</label>
//                     <div className="">
//                         <select className="form-control" id="user_type">
//                             <option value="">Select User Type</option>
//                             <option value="Admin">Admin</option>
//                             <option value="Employee">Employee</option>
//                         </select>
//                     </div>
//                 </div>
//                 <div className=""><button type="submit" className="btnn ">
//                     Add Employe
//                 </button></div>
//                 </form>
//             </div>
//           </div>
//         </>
//     )
// }
// export default Addpage;



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

        const name = document.getElementById("name").value.trim();
        const email = document.getElementById("Email").value.trim();
        const department = document.getElementById("department").value;
        const role = document.getElementById("role").value.trim();
        const salary = document.getElementById("salary").value.trim();
        const JoinDate = document.getElementById("date").value.trim();
        const password = document.getElementById("password").value.trim();
        const user_types = document.getElementById("user_type").value;

        // Check for missing fields
        if (!name || !email || !user_types || !department || !role || !JoinDate || !password || !salary) {
            alert("Please fill out all fields.");
            return;
        }

        const data = {
            name,
            email,
            user_type: user_types, // Ensure proper format
            department,
            role,
            JoinDate,
            password,
            salary
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
                            src="https://img.freepik.com/free-photo/businesswoman-leader-modern-office-with-businesspeople-workin_1139-954.jpg"
                            className="employeebaner"
                            alt="Employee Banner"
                        />
                    </div>
                </div>
                <div className="px-5">
                    <form onSubmit={handleSubmit}>
                        <div className="mb-3">
                            <label htmlFor="name" className="form-label">Enter Name</label>
                            <input type="text" className="form-control" id="name" />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="Email" className="form-label">Enter Email</label>
                            <input type="email" className="form-control" id="Email" />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="department" className="form-label">Department</label>
                            <select className="form-control" id="department">
                                <option value="">Select Department</option>
                                <option value="IT">IT</option>
                                <option value="Developer">Developer</option>
                                <option value="Designer">Designer</option>
                                <option value="Business">Business</option>
                                <option value="HR">HR</option>
                            </select>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="role" className="form-label">Enter Role</label>
                            <input type="text" className="form-control" id="role" />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="date" className="form-label">Join Date</label>
                            <input type="text" className="form-control" id="date" />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="salary" className="form-label">Salary</label>
                            <input type="text" className="form-control" id="salary" />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="password" className="form-label">Password</label>
                            <input type="password" className="form-control" id="password" />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="user_type" className="form-label">User Type</label>
                            <select className="form-control" id="user_type">
                                <option value="">Select User Type</option>
                                <option value="admin">Admin</option>
                                <option value="Employee">Employee</option>
                            </select>
                        </div>
                        <div className="">
                            <button type="submit" className="btn btn-primary">Add Employee</button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
}

export default Addpage;
