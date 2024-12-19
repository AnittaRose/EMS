
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Admin() {
    const navigate = useNavigate();

    const params = new URLSearchParams(window.location.search);
    const token_key = params.get('login');
    const token = localStorage.getItem(token_key);
    const userId = params.get('id');

    const [employeeCount, setEmployeeCount] = useState(0);
    const [AdminCount, setAdminCount] = useState(0);


    // Fetch employee count from backend
    useEffect(() => {
        const fetchEmployeeCount = async () => {
            try {
                const response = await fetch(`http://localhost:3000/employeecount?login=${token_key}`);
                const data = await response.json();
                if (data.success) {
                    setEmployeeCount(data.count);
                } else {
                    console.error("Failed to fetch employee count:", data.message);
                }
            } catch (error) {
                console.error("Error fetching employee count:", error);
            }
        };

        fetchEmployeeCount();
    }, [token_key]);


    useEffect(() => {
        const fetchAdminCount = async () => {
            try {
                const response = await fetch(`http://localhost:3000/admincount?login=${token_key}`);
                const data = await response.json();
                if (data.success) {
                    setAdminCount(data.count);
                } else {
                    console.error("Failed to fetch employee count:", data.message);
                }
            } catch (error) {
                console.error("Error fetching employee count:", error);
            }
        };

        fetchAdminCount ();
    }, [token_key]);

    // Navigation handlers
    const Manage = () => {
        navigate(`/Manage?login=${token_key}&id=${userId}`);
    };

    const Categories = (id) => {
        navigate(`/Categories?login=${token_key}&id=${id}`);
    };

    const LeaveForm = (id) => {
        navigate(`/LeaveForm?login=${token_key}&id=${id}`);
    };


    const logout = async () => {
        console.log("Reached..... at log out");
    
        let params = new URLSearchParams(window.location.search);
        console.log('params', params);
    
        let token_key = params.get('login');
        console.log("token_key:", token_key);
    
        if (token_key) {
            let token = localStorage.getItem(token_key);
            console.log("token", token);
    
            if (token) {
                localStorage.removeItem(token_key);
                navigate("/Login"); // Use navigate to redirect to the login page
            } else {
                console.log("Token not found");
                // Optionally, you can redirect to login here if the token is missing
                navigate("/Login");
            }
        } else {
            console.log("No login parameter found in the URL");
            // Redirect to login if there's no login parameter
            navigate("/Login");
        }
    };
    

    return (
        <>
            <div className="d-flex">
                {/* Sidebar */}
                <div className="box">
                    <div className="px-5 pt-5">
                        <div className="d-flex">
                            <div><img src="https://img.icons8.com/?size=100&id=47735&format=png&color=FFFFFF" className="dashboardicon" alt="" /></div>
                            <span className="dashboard px-3 fw-bold">Dashboard</span>
                        </div>
                        <div className="d-flex pt-4">
                            <div><img src="https://img.icons8.com/?size=100&id=bjqhmlJOaXIK&format=png&color=FFFFFF" className="employeicon" alt="" /></div>
                            <span className="dashboard px-3 fw-bold" onClick={Manage}>Manage Employees</span>
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
                            <span className="dashboard px-3 fw-bold">Salary</span>
                        </div>
                        <div className="d-flex pt-4">
                            <div><img src="https://img.icons8.com/?size=100&id=61022&format=png&color=FFFFFF" className="logout" alt="" /></div>
                            <span className="dashboard px-3 fw-bold" onClick={logout}>Logout</span>
                        </div>
                    </div>
                </div>

                {/* Main Content */}
                <div>
                    <div className="box2 text-center">
                        <div className="d-flex justify-content-evenly">
                            <div className="pt-2 fw-bold fs-2">Employee Management System</div>
                            <div className="pt-4"><button onClick={logout} className="logbttn">Logout</button></div>
                        </div>
                    </div>

                    <div className="px-5 pt-3 mainbox12">
                        <div className="mainbox123">
                            {/* Admin Info */}
                            <div className="shadow-sm p-3 mb-5 bg-body rounded box-shadow">
                                <div className="text-center fw-bold fs-4">Admin</div>
                                <div className="border12 pt-3"></div>
                                <div className="d-flex justify-content-between pt-2">
                                    <div>Total:</div>
                                    <div>{AdminCount}</div>
                                </div>
                            </div>

                            {/* Total Employees */}
                            <div className="shadow-sm p-3 mb-5 bg-body rounded box-shadow">
                                <div className="text-center fw-bold fs-4">Total Employees</div>
                                <div className="border12 pt-3"></div>
                                <div className="d-flex justify-content-between pt-2">
                                    <div>Total:</div>
                                    <div>{employeeCount}</div>
                                </div>
                            </div>

                            <div className="shadow-sm p-3 mb-5 bg-body rounded box-shadow">
                                 <div className="text-center fw-bold fs-4">Leave Applied</div>
                               <div className="border12 pt-3"></div>
                                <div className="d-flex justify-content-between pt-2">
                                     <div className="">Total:</div>
                                    <div className="">$</div>
                                 </div>
                             </div>

                             <div className="shadow-sm p-3 mb-5 bg-body rounded box-shadow">
                                 <div className="text-center fw-bold fs-4">Leave Approved</div>
                                 <div className="border12 pt-3"></div>                                 
                                 <div className="d-flex justify-content-between pt-2">
                                     <div className="">Total:</div>
                                     <div className="">$</div>
                                 </div>
                             </div>

                             <div className="shadow-sm p-3 mb-5 bg-body rounded box-shadow">
                                 <div className="text-center fw-bold fs-4">Leave Pending</div>
                                 <div className="border12 pt-3"></div>
                                 <div className="d-flex justify-content-between pt-2">
                                     <div className="">Total:</div>
                                     <div className="">$</div>
                                 </div>
                             </div>

                             <div className="shadow-sm p-3 mb-5 bg-body rounded box-shadow">
                                 <div className="text-center fw-bold fs-4">Leave Rejected</div>
                                 <div className="border12 pt-3"></div>
                                 <div className="d-flex justify-content-between pt-2">
                                     <div className="">Total:</div>
                                     <div className="">$</div>
                                 </div>
                             </div>

                             <div className="pt-5 fs-2 fw-bold">List of Admins</div>
                    <div className="">
                         <div className="container pt-5">
                             <div className="d-flex justify-content-between">
                                 <div className="">
                                     <div className="fw-bold">Email</div>
                                 </div>
                                 <div className="">
                                     <div className="fw-bold">Action</div>
                                 </div>
                             </div>
                            
                             <div className="borderr pt-2"></div>

                             <div className="pt-4">
                                 <div className="">admin@gmail.com</div>
                             </div>

                             <div className ="d-flex justify-content-end">
                                 <div className="d-flex">
                                     <div className=""><button className="editbutton">Edit</button></div>
                                     <div className="px-3"><button className="deletebutton">Delete</button></div>
                                 </div>
                             </div>

                             <div className="borderr pt-5"></div>

                         </div>
                    </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Admin;



