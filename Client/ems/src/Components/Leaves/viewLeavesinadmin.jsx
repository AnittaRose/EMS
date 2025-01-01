
import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

function ViewLeavesinAdmin() {
  const [employee, setEmployee] = useState(null); // State to store single employee data
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const id = params.get("id");
  console.log(id);
  const tokenKey = params.get("login");
  console.log(tokenKey);
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
      if (parsedResponse.data) {
        setEmployee(parsedResponse.data); // Update state with fetched employee data
      }
    } catch (error) {
      console.error("Error fetching employee details", error);
    }
  };

  const updateLeaveStatus = async (newStatus) => {
    try {
      const response = await fetch(`http://localhost:3000/updateLeaveStatus/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ status: newStatus }),
      });
  
      if (!response.ok) {
        throw new Error(`Failed to update leave status: ${response.status}`);
      }
  
      const result = await response.json();
      setEmployee((prev) => ({
        ...prev,
        status: result.data.status,
      }));
  
      alert(`Leave status has been updated to ${newStatus} successfully!`);
    } catch (error) {
      console.error("Error updating leave status:", error);
      alert("Failed to update leave status. Please try again.");
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
  <div className="main123">
    <div className="container pt-3">
      <div className="card shadow-lg p-4 mx-auto" style={{ maxWidth: '550px' }}>
        <div className="text-center mb-4">
          <img
            src="https://img.icons8.com/?size=100&id=46641&format=png&color=000000"
            alt="Leave Icon"
            className="img-fluid"
            style={{ width: '80px', height: '80px' }}
          />
          <h4 className="mt-3">Employee Leave Details</h4>
        </div>

        <div className="list-group">
          <p className="list-group-item">
            <strong>Employee ID:</strong> {employee.employeeId}
          </p>
          <p className="list-group-item">
            <strong>Leave Type:</strong> {employee.leaveType}
          </p>
          <p className="list-group-item">
            <strong>Start Date:</strong> {employee.startDate}
          </p>
          <p className="list-group-item">
            <strong>End Date:</strong> {employee.endDate}
          </p>
          <p className="list-group-item">
            <strong>Reason:</strong> {employee.reason}
          </p>
          <p className="list-group-item">
            <strong>Status:</strong> {employee.status || "Not Updated"}
          </p>
        </div>

        <div className="d-flex justify-content-around mt-4">
          {/* Approve button */}
          <button
            onClick={() => updateLeaveStatus("approved")}
            className="btn"
          >
            Approve
          </button>

          <button
            onClick={() => updateLeaveStatus("pending")}
            className="btn"
          >
            Set as Pending
          </button>

          <button
            onClick={() => updateLeaveStatus("rejected")}
            className="btn"
          >
            Reject
          </button>
        </div>
      </div>
    </div>
  </div>
  );
}

export default ViewLeavesinAdmin;
// import React, { useState, useEffect } from "react";
// import { useLocation } from "react-router-dom";

// function ViewLeavesinAdmin() {
//   const [employee, setEmployee] = useState(null); // State to store employee data
//   const location = useLocation();
//   const params = new URLSearchParams(location.search);
//   const id = params.get("id");
//   console.log("Employee ID:", id);
//   const tokenKey = params.get("login");
//   console.log("Token Key:", tokenKey);
//   const token = localStorage.getItem(tokenKey);
//   console.log("Token:", token);

//   // Fetch employee details
//   const fetchEmployee = async () => {
//     try {
//       const response = await fetch(`http://localhost:3000/singleLeave/${id}`, {
//         method: "GET",
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       });

//       if (!response.ok) {
//         throw new Error(`Failed to fetch employee details: ${response.status}`);
//       }

//       const parsedResponse = await response.json();
//       if (parsedResponse.data) {
//         setEmployee(parsedResponse.data); // Set employee data in state
//       } else {
//         alert("No employee data found.");
//       }
//     } catch (error) {
//       console.error("Error fetching employee details:", error);
//       alert("Failed to load employee details.");
//     }
//   };

//   // Update leave status
//   const updateLeaveStatus = async (newStatus) => {
//     try {
//       console.log('Attempting to update leave status...');
//       const response = await fetch(`http://localhost:3000/updateLeaveStatus/${id}`, {
//         method: "PUT",
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${token}`, // Ensure token is valid
//         },
//         body: JSON.stringify({ status: newStatus }), // Send new status
//       });

//       if (!response.ok) {
//         throw new Error(`Failed to update leave status: ${response.status}`);
//       }

//       const result = await response.json();
//       console.log('Status updated:', result); // Log the response from the server

//       if (result.success) {
//         // Update employee state with the new status
//         setEmployee((prev) => ({
//           ...prev,
//           status: newStatus, // Update the status in the UI
//         }));

//         alert(`Leave status has been updated to ${newStatus} successfully!`);
//       } else {
//         alert("Failed to update leave status. Please try again.");
//       }
//     } catch (error) {
//       console.error("Error updating leave status:", error.message);
//       alert("Failed to update leave status. Please try again.");
//     }
//   };

//   // Fetch employee details when the component mounts or the `id` changes
//   useEffect(() => {
//     if (id) {
//       fetchEmployee();
//     }
//   }, [id]);

//   if (!employee) {
//     return <div>Loading...</div>;
//   }

//   return (
//     <div className="main123">
//       <div className="containerer pt-3">
//         <div className="card shadow-lg p-4 mx-auto" style={{ maxWidth: '550px' }}>
//           <div className="text-center mb-4">
//             <img
//               src="https://img.icons8.com/?size=100&id=46641&format=png&color=000000"
//               alt="Leave Icon"
//               className="img-fluid"
//               style={{ width: '80px', height: '80px' }}
//             />
//             <h4 className="mt-3">Employee Leave Details</h4>
//           </div>

//           <div className="list-group">
//             <p className="list-group-item">
//               <strong>Employee ID:</strong> {employee.employeeId}
//             </p>
//             <p className="list-group-item">
//               <strong>Leave Type:</strong> {employee.leaveType}
//             </p>
//             <p className="list-group-item">
//               <strong>Start Date:</strong> {employee.startDate}
//             </p>
//             <p className="list-group-item">
//               <strong>End Date:</strong> {employee.endDate}
//             </p>
//             <p className="list-group-item">
//               <strong>Reason:</strong> {employee.reason}
//             </p>
//             {/* <p className="list-group-item">
//               <strong>Status:</strong> {employee.status || "Not Updated"}
//             </p> */}
//           </div>

//           <div className="d-flex justify-content-around mt-4">
//             <button onClick={() => updateLeaveStatus("approved")} className="btn btn-success">
//               Approve
//             </button>
//             <button onClick={() => updateLeaveStatus("pending")} className="btn btn-warning">
//               Set as Pending
//             </button>
//             <button onClick={() => updateLeaveStatus("rejected")} className="btn btn-danger">
//               Reject
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default ViewLeavesinAdmin;
