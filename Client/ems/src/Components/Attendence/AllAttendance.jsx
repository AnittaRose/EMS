import { useNavigate } from "react-router-dom";
import React, { useState, useEffect } from "react";
import axios from "axios";


const AllAttendance = () => {
  const navigate = useNavigate();
  const [attendanceRecords, setAttendanceRecords] = useState([]);
  const [error, setError] = useState("");
  const params = new URLSearchParams(window.location.search);
  const tokenKey = params.get("login");
  const id = params.get("id");
  const token = localStorage.getItem(tokenKey);

  useEffect(() => {
    const fetchAttendance = async () => {
      try {
        const response = await axios.get("http://localhost:3000/attendance");
        // Check if the response data is an array
        if (Array.isArray(response.data)) {
          setAttendanceRecords(response.data);
        } else {
          setError("Invalid response format.");
        }
      } catch (error) {
        const errorMessage = error.response?.data?.error || "Failed to fetch attendance records.";
        setError(errorMessage);
      }
    };

    fetchAttendance();
  }, []);

  const EmployeeAttendance = () => {
        navigate(`/EmployeeAttendance?login=${tokenKey}&id=${id}`);
  };

  return (
    <div>
      <div className=""><button onClick={EmployeeAttendance}>ViewSingleAttendence</button></div>
      <h1>All Attendance Records</h1>
      {error && <p>{error}</p>}
      {Array.isArray(attendanceRecords) && attendanceRecords.length > 0 ? (
        <table>
          <thead>
            <tr>
              <th>Employee ID</th>
              <th>Date</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {attendanceRecords.map((record) => (
              <tr key={record._id}>
                <td>{record.employeeId}</td>
                <td>{record.date}</td>
                <td>{record.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No attendance records found.</p>
        
      )}
    </div>
    
  );
};

export default AllAttendance;
