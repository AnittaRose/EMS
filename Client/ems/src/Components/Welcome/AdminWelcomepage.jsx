// import React from "react";
// import { useNavigate } from "react-router-dom";
// import "./AdminWelcomepage.css"; // Add this CSS file

// function WelcomeAdmin() {
//     const navigate = useNavigate();

//     // Extract query parameters and token
//     const params = new URLSearchParams(window.location.search);
//     const tokenKey = params.get("login");
//     const id = params.get("id");
//     const token = localStorage.getItem(tokenKey);

//     // Function to navigate to the admin dashboard
//     const navigateToAdminDashboard = () => {
//         if (token && id) {
//             navigate(`/Admin?login=${tokenKey}&id=${id}`);
//         } else {
//             console.error("Invalid token or ID");
//         }
//     };
//     // const MarkAttendanceAdmin = () => {
//     //     navigate(`/MarkAttendanceAdmin?login=${tokenKey}&id=${id}`);
//     // };

//     return (
//         <div className="welcome-container">
//             <div className="button-container">
//                 <button className="dashboard-button" onClick={navigateToAdminDashboard}>
//                     Admin Dashboard
//                 </button>
//             </div>
//         </div>
//     );
// }

// export default WelcomeAdmin;


import React from "react";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css"; // Import Bootstrap CSS
import "./AdminWelcomepage.css"; // Custom CSS file for additional styling

function WelcomeAdmin() {
    const navigate = useNavigate();

    // Extract query parameters and token
    const params = new URLSearchParams(window.location.search);
    const tokenKey = params.get("login");
    const id = params.get("id");
    const token = localStorage.getItem(tokenKey);

    // Function to navigate to the admin dashboard
    const navigateToAdminDashboard = () => {
        if (token && id) {
            navigate(`/Admin?login=${tokenKey}&id=${id}`);
        } else {
            console.error("Invalid token or ID");
        }
    };

    return (
        <div className="welcome-container">
            {/* <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <div className="container-fluid">
                    <a className="navbar-brand" href="#">Employee Management</a>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNav">
                        <ul className="navbar-nav ms-auto">
                            <li className="nav-item">
                                <button className="btn btn-primary" onClick={navigateToAdminDashboard}>
                                    Admin Dashboard
                                </button>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav> */}

            <div className="hero-section d-flex justify-content-center align-items-center">
                <div className="text-center text-light">
                    <h1>Welcome, Admin</h1>
                    <p>Manage your team and employees efficiently from the dashboard</p>
                    <button className="btn btn-lg btn-primary" onClick={navigateToAdminDashboard}>Go to Dashboard</button>
                </div>
            </div>
        </div>
    );
}

export default WelcomeAdmin;
