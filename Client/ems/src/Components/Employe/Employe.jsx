
import { useLocation } from "react-router-dom";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Employesingle() {
    const navigate = useNavigate();
    const [employee, setEmployee] = useState(null); // State to store single employee data
    const location = useLocation();
    const params = new URLSearchParams(location.search);
    const id = params.get("id");
    const token_key = params.get("login");
    const token = localStorage.getItem(token_key);

    const fetchEmployee = async () => {
        try {
            const response = await fetch(`http://localhost:3000/employesingle/${id}`, {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            const parsedResponse = await response.json();
            setEmployee(parsedResponse.data); // Update state with fetched employee data
        } catch (error) {
            console.error("Error fetching employee details", error);
        }
    };

    useEffect(() => {
        if (id) {
            fetchEmployee(); // Fetch the specific employee data on mount
        }
    }, [id]);

    if (!employee) {
        return <div className="d-flex justify-content-center align-items-center vh-100">
            <div className="spinner-border text-primary" role="status">
                <span className="visually-hidden">Loading...</span>
            </div>
        </div>;
    }

    const EmailVerification = () => {
        if (id && token_key) {
            navigate(`/EmailVerification?login=${token_key}&id=${id}`);
        } else {
            console.error("Invalid id or token_key");
        }
    };
    const Reset = () => {
        if (id && token_key) {
            navigate(`/Reset?login=${token_key}&id=${id}`);
        } else {
            console.error("Invalid id or token_key");
        }
    };
    const Edit = () => {
        if (id && token_key) {
            navigate(`/Edit?login=${token_key}&id=${id}`);
        } else {
            console.error("Invalid id or token_key");
        }
    };
    return (

        <>

    <div className="d-flex black">
        <div className="empback">
            <div className=""><img src="https://files.oaiusercontent.com/file-VHWsEH6sxMnk4b7t9NZzqH?se=2024-12-29T12%3A04%3A25Z&sp=r&sv=2024-08-04&sr=b&rscc=max-age%3D604800%2C%20immutable%2C%20private&rscd=attachment%3B%20filename%3D7fdda6e7-133f-4fb0-a29f-72929852d9e1.webp&sig=p%2BNlr5OEtEFYla5IloMN/AaS4bWpRJEQGTr5LyhioFc%3D" alt="" className="empback" /></div>
        </div>
            {/* <div className="profille-card position-absolute top-50 start-50 translate-middle pt-5">
            <img
                alt="A woman with a red shawl"
                height={200}
                src="https://img.freepik.com/free-vector/male-team-concept-illustration_114360-20149.jpg?t=st=1735474443~exp=1735478043~hmac=cfda81592fa5fd39e76b4a015821d1d9d0cb60bf17f2dccc6794b172eaad86b2&w=740"
                width={200}
            />
            <div className="profille-info">
                <h1 className="pt-3">{employee.name}</h1>
                <h2 className="pt-3">{employee.email}</h2>
                <p className="pt-3">{employee.department}</p>
                <p className="pt-3">{employee.joinDate}</p>
                <p className="pt-3">{employee.role}</p>
                <p className="pt-3">{employee.salary}</p>
                <div className="pt-3 d-flex flex-wrap">
                    <div className="mb-2">
                        <button className="ree w-full lg:w-auto btn btn-primary hover:bg-primary transition duration-300" onClick={Edit}>Update</button>
                    </div>
                    <div className="px-2 mb-2">
                        <button className="ree w-full lg:w-auto btn btn-secondary hover:bg-secondary transition duration-300" onClick={Reset}>Reset</button>
                    </div>
                    <div className="px-2 mb-2">
                        <button className="ree w-full lg:w-auto btn btn-warning hover:bg-warning transition duration-300" onClick={EmailVerification}>Forgot</button>
                    </div>
                </div>
            </div>
            </div> */}
            <div className="pt-5 px-4">
                <table className="table  table-hover table-bordered  mx-auto">
                    <thead>
                        <tr>
                            <th colSpan="2" className="text-center">
                                <img
                                    alt="Profile"
                                    height={100}
                                    src="https://img.freepik.com/free-vector/male-team-concept-illustration_114360-20149.jpg?t=st=1735474443~exp=1735478043~hmac=cfda81592fa5fd39e76b4a015821d1d9d0cb60bf17f2dccc6794b172eaad86b2&w=740"
                                    width={100}
                                    className="rounded-circle mb-3"
                                />
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>Name:</td>
                            <td>{employee.employeeName}</td>
                        </tr>
                        <tr>
                            <td>Email:</td>
                            <td>{employee.email}</td>
                        </tr>
                        <tr>
                            <td>Department:</td>
                            <td>{employee.department}</td>
                        </tr>
                        <tr>
                            <td>Join Date:</td>
                            <td>{employee.joinDate}</td>
                        </tr>
                        <tr>
                            <td>Role:</td>
                            <td>{employee.role}</td>
                        </tr>
                        <tr>
                            <td>Salary:</td>
                            <td>{employee.totalSalary}</td>
                        </tr>
                    </tbody>
                </table>
                <div className="pt-3 d-flex flex-wrap justify-content-center">
                    <div className="mb-2">
                        <button className="btn btn-primary w-full lg:w-auto hover-effect" onClick={Edit}>Update</button>
                    </div>
                    <div className="px-2 mb-2">
                        <button className="btn btn-secondary w-full lg:w-auto hover-effect" onClick={Reset}>Reset</button>
                    </div>
                    <div className="px-2 mb-2">
                        <button className="btn btn-warning w-full lg:w-auto hover-effect" onClick={EmailVerification}>Forgot</button>
                    </div>
                </div>
            </div>
        </div>


        
        
        </>
    )
}

export default Employesingle;
