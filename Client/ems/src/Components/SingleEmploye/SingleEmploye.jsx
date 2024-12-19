import React, { useState, useEffect } from "react";
import { useParams, useLocation } from "react-router-dom";

function Single() {
    const [employee, setEmployee] = useState(null); // State to store single employee data
    const location = useLocation();
    const params = new URLSearchParams(location.search);
    const id = params.get("id");
    const tokenKey = params.get("login");
    const token = localStorage.getItem(tokenKey);

    const fetchEmployee = async () => {
        try {
            const response = await fetch(`http://localhost:3000/Employe/${id}`, {
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
        return <div>Loading...</div>;
    }

    return (
        <div className="single-employee">
            <h2>Employee Details</h2>
            <p><strong>Name:</strong> {employee.name}</p>
            <p><strong>Email:</strong> {employee.email}</p>
            {/* <p><strong>Department:</strong> {employee.department}</p> */}
            <p><strong>JoinDate:</strong> {employee.joinDate}</p>
            <p><strong>role:</strong> {employee.role}</p>
            <p><strong>salary:</strong> {employee.salary}</p>
            {/* Add more fields if needed */}
        </div>
    );
}

export default Single;
