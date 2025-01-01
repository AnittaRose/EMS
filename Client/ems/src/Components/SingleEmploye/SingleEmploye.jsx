// import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

function ViewLeavesinAdmin() {
    const [employee, setEmployee] = useState(null); // State to store single employee data
    const location = useLocation();
    const params = new URLSearchParams(location.search);
    const id = params.get("id");
    const tokenKey = params.get("login");
    const token = localStorage.getItem(tokenKey);

    const fetchEmployee = async () => {
        try {
            const response = await fetch(`http://localhost:3000/singleLeave/${id}`, {
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

    const updateLeaveStatus = async (newStatus) => {
        try {
            const response = await fetch(`http://localhost:3000/updateLeaveStatus/${id}`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({ status: newStatus }),
            });

            if (response.ok) {
                const updatedEmployee = { ...employee, status: newStatus }; // Update local employee state
                setEmployee(updatedEmployee);
                alert(`Leave status successfully updated to "${newStatus}"`);
            } else {
                const errorData = await response.json();
                alert(`Failed to update leave status: ${errorData.message}`);
            }
        } catch (error) {
            console.error("Error updating leave status", error);
            alert("An error occurred while updating the leave status.");
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
        <div>
            <h2>Employee Leave Details</h2>
            {/* Display employee details here */}
            <p><strong>Employee ID:</strong> {employee.employeeId}</p>
            <p><strong>Leave Type:</strong> {employee.leaveType}</p>
            <p><strong>Start Date:</strong> {employee.startDate}</p>
            <p><strong>End Date:</strong> {employee.endDate}</p>
            <p><strong>Reason:</strong> {employee.reason}</p>
            <p><strong>Status:</strong> {employee.status || "Not updated"}</p>
            <div className="d-flex">
                <div className="px-3">
                    <button onClick={() => updateLeaveStatus("Approved")}>Approve</button>
                </div>
                <div className="px-3">
                    <button onClick={() => updateLeaveStatus("Pending")}>Pending</button>
                </div>
                <div className="px-3">
                    <button onClick={() => updateLeaveStatus("Rejected")}>Reject</button>
                </div>
            </div>
        </div>
    );
}

export default ViewLeavesinAdmin;
