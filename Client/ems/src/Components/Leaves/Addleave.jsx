
    import React, { useState, useEffect } from "react";
    import { useNavigate } from "react-router-dom";

    function AddLeaves() {
        const navigate = useNavigate();
        const params = new URLSearchParams(window.location.search);
        const tokenKey = params.get("login");
        const employeeId = params.get("id");
        const token = localStorage.getItem(tokenKey);

        if (!token) {
            alert("Session expired. Please log in again.");
            navigate("/login");
            return null; // Prevent rendering if session is invalid
        }

        const [showPopup, setShowPopup] = useState(false);
        const [popupMessage, setPopupMessage] = useState("");

        const handleSubmit = async (event) => {
            event.preventDefault();

            // Retrieve form data
            const leaveType = document.getElementById("leavetype").value.trim();
            const startDate = document.getElementById("startdate").value;
            const endDate = document.getElementById("enddate").value.trim();
            const reason = document.getElementById("reason").value.trim();
            const Days = document.getElementById("days").value.trim();

            // Validation checks
            if (!employeeId) {
                alert("Employee ID is missing in the URL. Please contact support.");
                return;
            }
            if (!leaveType || !startDate || !endDate || !reason || !Days) {
                alert("Please fill out all fields.");
                return;
            }
            if (new Date(startDate) > new Date(endDate)) {
                alert("End Date must be later than Start Date.");
                return;
            }

            // Prepare data payload
            const data = {
                employeeId,
                leaveType,
                startDate,
                endDate,
                reason,
                Days
            };

            console.log("Payload being sent:", data);

            try {
                const response = await fetch(`http://localhost:3000/addleave/${employeeId}`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                    body: JSON.stringify(data),
                });

                const parsedResponse = await response.json();
                if (response.ok) {
                    setPopupMessage("Notification: The leave request has been sent successfully.");
                    setShowPopup(true);
                } else {
                    alert(parsedResponse.message || "Something went wrong.");
                }
            } catch (error) {
                console.error("Fetch error:", error);
                alert("Failed to submit. Please try again.");
            }
        };

        const closePopup = () => {
            setShowPopup(false);
            navigate(`/ViewLeaves?login=${tokenKey}`);
        };

        return (
            <div className="leaveforrm shadow p-3 mb-5 bg-body rounded position-absolute top-50 start-50 translate-middle">
                <h2 className="text-center fw-bold">Leave Form</h2>
                <div className="">Please fill in this form with all the required information.HR will contact you shortly after the leaves request has been approved by your supervisor</div>
                <form onSubmit={handleSubmit}>
                    <div className="pt-3">
                        <div className=""><label htmlFor="leavetype" className="lab">Leave Type</label></div>
                        <div className="pt-3"><select id="leavetype" className="leaveinput">
                            <option value="Sick Leave">Sick Leave</option>
                            <option value="Personal Leave">Personal Leave</option>
                            <option value="Maternity Leave">Maternity Leave</option>
                            <option value="Emergency Leave">Emergency Leave</option>
                            <option value="Casual Leave">Casual Leave</option>
                        </select></div>
                    </div>

                    <div className="pt-3">
                        <div className=""><label htmlFor="startdate" className="lab">Start Date</label></div>
                        <div className="pt-3"><input type="date" id="startdate" className="leaveinput" /></div>
                    </div>

                    <div className="pt-3">
                        <div className=""><label htmlFor="enddate" className="lab">End Date</label></div>
                        <div className="pt-3"><input type="date" id="enddate" className="leaveinput" /></div>
                    </div>

                    <div className="pt-3">
                        <div className=""><label htmlFor="enddate" className="lab">Days</label></div>
                        <div className="pt-3"><input type="text" id="days" className="leaveinput" /></div>
                    </div>

                    <div className="pt-3">
                        <div className=""><label htmlFor="reason" className="lab">Reason</label></div>
                        <div className="pt-3"><input type="text" id="reason"  className="leaveinput" /></div>
                    </div>

                    <div className="pt-4"><button type="submit" className="leavebutn">Send</button></div>
                </form>

                {showPopup && (
                    <div style={popupStyles}>
                        <div style={popupContentStyles}>
                            <p>{popupMessage}</p>
                            <button onClick={closePopup}>OK</button>
                        </div>
                    </div>
                )}
            </div>
        );
    }

    const popupStyles = {
        position: "fixed",
        top: "0",
        left: "0",
        width: "100%",
        height: "100%",
        backgroundColor: "rgba(0, 0, 0, 0.5)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 1000,
    };

    const popupContentStyles = {
        backgroundColor: "#fff",
        padding: "20px",
        borderRadius: "8px",
        boxShadow: "0 0 10px rgba(0, 0, 0, 0.2)",
        textAlign: "center",
        maxWidth: "400px",
        width: "100%",
    };

    export default AddLeaves;
