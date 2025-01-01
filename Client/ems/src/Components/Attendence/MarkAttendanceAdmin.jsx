
import React, { useState } from "react";
import axios from "axios";

const MarkAttendanceAdmin = () => {
  const [employeeId, setEmployeeId] = useState("");
  const [status, setStatus] = useState("Present");
  const [message, setMessage] = useState("");
  const [attendanceMarked, setAttendanceMarked] = useState(false);

  const checkAttendanceStatus = async () => {
    try {
      const response = await axios.get(`http://localhost:3000/check-attendance/${employeeId}`);
      setAttendanceMarked(response.data.attendanceMarked);
    } catch (error) {
      console.error("Error fetching attendance status", error);
      setAttendanceMarked(false); // Default to false if error
    }
  };

  useEffect(() => {
    if (employeeId) {
      checkAttendanceStatus();
    }
  }, [employeeId]);

  const handleMarkAttendance = async () => {
    if (attendanceMarked) {
      setMessage("Attendance already marked for today.");
      return;
    }

    try {
      const response = await axios.post("http://localhost:3000/mark", { employeeId, status });
      setMessage(response.data.message || "Attendance marked successfully.");
      setAttendanceMarked(true); // Mark attendance as true after success
    } catch (error) {
      const errorMessage = error.response?.data?.error || "Failed to mark attendance.";
      setMessage(errorMessage);
    }
  };

  return (
    <div>
      <h1>Mark Employee Attendance</h1>
      <input
        type="text"
        placeholder="Employee ID"
        value={employeeId}
        onChange={(e) => setEmployeeId(e.target.value)}
        className="input"
      />
      <select value={status} onChange={(e) => setStatus(e.target.value)}>
        <option value="Present">Present</option>
        <option value="Absent">Absent</option>
      </select>
      <button onClick={handleMarkAttendance} className="btn">
        Mark Attendance
      </button>
      {message && <p>{message}</p>}
    </div>
  );
};

export default MarkAttendanceAdmin;
