// import React, { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom"; // Import useNavigate

// function ViewLeaves() {
//     const [Leaves, setLeaves] = useState([]); // State to store leave data
//     const navigate = useNavigate(); // Initialize the navigate function

//     const params = new URLSearchParams(window.location.search);
//     const tokenKey = params.get("login");
//     const token = localStorage.getItem(tokenKey);

//     const fetchLeaves = async () => {
//         try {
//             const response = await fetch(`http://localhost:3000/getleaves`, {
//                 method: "GET",
//                 headers: {
//                     Authorization: `Bearer ${token}`,
//                 },
//             });

//             const parsedResponse = await response.json();
//             setLeaves(parsedResponse.data); // Update state with fetched data
//         } catch (error) {
//             console.error("Error fetching leave data", error);
//         }
//     };

//     useEffect(() => {
//         fetchLeaves(); // Fetch leaves when the component mounts
//     }, []);

//     // const ViewLeavesinAdmin = (id) => {
//     //     if (token && id) {
//     //         navigate(`/ViewLeavesinAdmin?login=${tokenKey}&id=${id}`);
//     //     } else {
//     //         console.error("Invalid token or ID");
//     //     }
//     // };

//     return (
//         <div className="container mt-4">
//             <h2 className="text-center mb-4">Leave Information</h2>
//             <div className="row fw-bold border-bottom pb-2 mb-3">
//                 <div className="col">Employee ID</div>
//                 <div className="col">Leave Type</div>
//                 <div className="col">Start Date</div>
//                 <div className="col">End Date</div>
//                 <div className="col">Reason</div>
//                 <div className="col">Days</div>
//                 <div className="col">Status</div>
//             </div>
//             {Leaves.length > 0 ? (
//                 Leaves.map((leave, index) => (
//                     <div
//                         key={index}
//                         className="row mb-3 p-3 border rounded shadow-sm bg-light"
//                     >
//                         <div className="col">{leave.employeeId}</div>
//                         <div className="col">{leave.leaveType}</div>
//                         <div className="col">{leave.startDate}</div>
//                         <div className="col">{leave.endDate}</div>
//                         <div className="col">{leave.reason}</div>
//                         <div className="col">{leave.Days}</div>
//                         <div className="col">
//                            <div className="d-flex">
//                                 <div className=""><img src="https://img.icons8.com/?size=100&id=AC1xYM1aIxVb&format=png&color=000000" alt="" className="tickicon" /></div>
//                                 <div className="px-5"><img src="https://img.icons8.com/?size=100&id=bfcXeG52NnSF&format=png&color=000000" alt="" className="crossicon" /></div>
//                             </div>
//                         </div>
//                     </div>
//                 ))
//             ) : (
//                 <div className="text-center text-muted">No leave data available</div>
//             )}
//         </div>
//     );
// }

// export default ViewLeaves;
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function ViewLeaves() {
    const [Leaves, setLeaves] = useState([]);
    const navigate = useNavigate();

    const params = new URLSearchParams(window.location.search);
    const tokenKey = params.get("login");
    const token = localStorage.getItem(tokenKey);

    const fetchLeaves = async () => {
        try {
            const response = await fetch(`http://localhost:3000/getleaves`, {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            console.log(response);

            const parsedResponse = await response.json();
            setLeaves(parsedResponse.data);
        } catch (error) {
            console.error("Error fetching leave data", error);
        }
    };

    // Function to approve or reject leave
    const handleLeaveStatus = async (id, status) => {
        console.log("Leave ID:", id);  // Check if ID is being passed correctly
        if (!id) {
            console.error("Leave ID is missing");
            return;
        }
    
        try {
            const response = await fetch(`http://localhost:3000/updateLeaveStatus/${id}`, {
                method: "PUT", // Use PUT for updating the status
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({ status }),
            });
    
            if (response.ok) {
                alert(`Leave ${status} successfully.`);
                fetchLeaves(); // Refresh the leave data
            } else {
                console.error("Error updating leave status");
            }
        } catch (error) {
            console.error("Error", error);
        }
    };
    useEffect(() => {
        fetchLeaves();
    }, []);

    return (
        <div className="container mt-4">
            <h2 className="text-center mb-4">Leave Information</h2>
            <div className="row fw-bold border-bottom pb-2 mb-3">
                <div className="col">Employee ID</div>
                <div className="col">Leave Type</div>
                <div className="col">Start Date</div>
                <div className="col">End Date</div>
                <div className="col">Reason</div>
                <div className="col">Days</div>
                <div className="col">Status</div>
            </div>
            {Leaves.length > 0 ? (
                Leaves.map((leave, index) => (
                    <div
                        key={index}
                        className="row mb-3 p-3 border rounded shadow-sm bg-light"
                    >
                        <div className="col">{leave.employeeId}</div>
                        <div className="col">{leave.leaveType}</div>
                        <div className="col">{leave.startDate}</div>
                        <div className="col">{leave.endDate}</div>
                        <div className="col">{leave.reason}</div>
                        <div className="col">{leave.Days}</div>
                        <div className="col">
                            <div className="d-flex ">
                                <div className=""><button onClick={() => handleLeaveStatus(leave._id, "approved")} className="rebutton">Approve</button></div>
                                <div className="px-3"><button onClick={() => handleLeaveStatus(leave._id, "rejected")} className="rebutton">Reject</button></div>
                            </div>
                        </div>
                    </div>
                ))
            ) : (
                <div className="text-center text-muted">No leave data available</div>
            )}
        </div>
    );
}

export default ViewLeaves;
