// import React, { useState } from "react";
// import axios from "axios";

// const EmployeeAttendance = () => {
//   const [employeeId, setEmployeeId] = useState("");
//   const [attendanceRecords, setAttendanceRecords] = useState([]);
//   const [error, setError] = useState("");

//   const fetchAttendance = async () => {
//     try {
//       const response = await axios.get(`/ http://localhost:3000/employee/${employeeId}`);
//       setAttendanceRecords(response.data);
//       setError("");
//     } catch (error) {
//       const errorMessage = error.response?.data?.error || "Failed to fetch attendance records.";
//       setError(errorMessage);
//       setAttendanceRecords([]);
//     }
//   };

//   return (
//     <div>
//       <h1>Get Attendance for Employee</h1>
//       <input
//         type="text"
//         placeholder="Employee ID"
//         value={employeeId}
//         onChange={(e) => setEmployeeId(e.target.value)}
//         className="input"
//       />
//       <button onClick={fetchAttendance} className="btn">
//         Get Attendance
//       </button>
//       {error && <p>{error}</p>}
//       {attendanceRecords.length > 0 && (
//         <ul>
//           {attendanceRecords.map((record) => (
//             <li key={record._id}>
//               {record.date}: {record.status}
//             </li>
//           ))}
//         </ul>
//       )}
//     </div>
//   );
// };

// export default EmployeeAttendance;
import React, { useState } from "react";
import axios from "axios";

const EmployeeAttendance = () => {
  const [employeeId, setEmployeeId] = useState("");
  const [attendanceRecords, setAttendanceRecords] = useState([]);
  const [error, setError] = useState("");

  const fetchAttendance = async () => {
    try {
      const response = await axios.get(`http://localhost:3000/employee/${employeeId}`);
      // Ensure the response data is an array
      if (Array.isArray(response.data)) {
        setAttendanceRecords(response.data);
        setError("");
      } else {
        setError("No attendance records found.");
        setAttendanceRecords([]);
      }
    } catch (error) {
      const errorMessage = error.response?.data?.error || "Failed to fetch attendance records.";
      setError(errorMessage);
      setAttendanceRecords([]);
    }
  };

  return (
    <div>
      <h1>Get Attendance for Employee</h1>
      <input
        type="text"
        placeholder="Employee ID"
        value={employeeId}
        onChange={(e) => setEmployeeId(e.target.value)}
        className="input"
      />
      <button onClick={fetchAttendance} className="btn">
        Get Attendance
      </button>
      {error && <p>{error}</p>}
      {Array.isArray(attendanceRecords) && attendanceRecords.length > 0 ? (
        <ul>
          {attendanceRecords.map((record) => (
            <li key={record._id}>
              {record.date}: {record.status}
            </li>
          ))}
        </ul>
      ) : (
        <p>No attendance records found.</p>
      )}
    </div>
  );
};

export default EmployeeAttendance;
