

// import React, { useState, useEffect } from "react";
// import { useNavigate } from 'react-router-dom';
// import { useLocation } from "react-router-dom";



// function SingleemployeAdmin() {
//   const navigate = useNavigate();
//   const [employee, setEmployee] = useState(null); // State to store single employee data
//   const location = useLocation();
//   const params = new URLSearchParams(location.search);
//   const id = params.get("id");
//   const token_key = params.get("login");
//   const token = localStorage.getItem(token_key);
  

//   const fetchEmployee = async () => {
//     try {
//       const response = await fetch(`http://localhost:3000/employesingle/${id}`, {
//         method: "GET",
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       });

//       const parsedResponse = await response.json();
//       setEmployee(parsedResponse.data); // Update state with fetched employee data
//     } catch (error) {
//       console.error("Error fetching employee details", error);
//     }
//   };

//   useEffect(() => {
//     if (id) {
//       fetchEmployee(); // Fetch the specific employee data on mount
//     }
//   }, [id]);

//   if (!employee) {
//     return <div>Loading...</div>;
//   }

//   // Ensure `id` is available before navigating
//   const EmailVerification = () => {
//     if (id && token_key) {
//       navigate(`/EmailVerification?login=${token_key}&id=${id}`);
//     } else {
//       console.error("Invalid id or token_key");
//     }
//   };

//   const Reset =() =>{
//     if (id && token_key) {
//       navigate(`/Reset?login=${token_key}&id=${id}`);
//     } else {
//       console.error("Invalid id or token_key");
//     }
//   }

//   return (
// <div className="bck">
// <div className="id-card position-absolute top-50 start-50 translate-middle">
//   <div className="empp p-2">
//     <h1 className="text-center">Employee</h1>
//   </div>
//   <div className="profilee">
//     <img
//       alt="Profilee Picture"
//       height={100}
//       src="https://img.icons8.com/?size=100&id=86871&format=png&color=000000"
//       width={100} className="userimgs"
//     />
//     <h2>{employee.name}</h2>
//     <div className="px-4 pt-2"><h3>{employee.role}</h3></div>
//   </div>
//   <div className="details">
//     <p>Salary: {employee.salary}</p>
//     <p>Email: {employee.email}</p>
//     <p>JoinDate: {employee.joinDate}</p>
//   </div>
//   <div className="barcode">
//     <div className="d-flex justify-content-center mt-4 pt-4">
//       <button className="button-custom me-3">Update</button>
//       <button className="button-custom" onClick={Reset}>Reset</button>
//       <div className="px-4"><button className="button-custom " onClick={EmailVerification}>Forgot?</button></div>
//   </div>
//   </div>
  
// </div>
// </div>
//   )
// }

// export default SingleemployeAdmin;
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";


function SingleemployeAdmin() {
  const navigate = useNavigate();
  const [employee, setEmployee] = useState(null);
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const id = params.get("id");
  const token_key = params.get("login");
  const token = localStorage.getItem(token_key);
  const userId = params.get('id');


  const fetchEmployee = async () => {
    try {
      const response = await fetch(`http://localhost:3000/employesingle/${id}`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const parsedResponse = await response.json();
      setEmployee(parsedResponse.data);
    } catch (error) {
      console.error("Error fetching employee details", error);
    }
  };

  useEffect(() => {
    if (id) {
      fetchEmployee();
    }
  }, [id]);

  if (!employee) {
    return <div className="text-center mt-5">Loading...</div>;
  }
  const Reset = () => {
    if (id && token_key) {
      navigate(`/Reset?login=${token_key}&id=${id}`);
    } else {
      console.error("Invalid id or token_key");
    }
  };
  const EmailVerification = () => {
    if (id && token_key) {
      navigate(`/EmailVerification?login=${token_key}&id=${id}`);
    } else {
      console.error("Invalid id or token_key");
    }
  };
  const Manage = () => {
    navigate(`/Manage?login=${token_key}&id=${userId}`);
  };
  
        const LeaveForm = (id) => {
          navigate(`/ViewLeaves?login=${token_key}&id=${id}`);
      };

      const PaySalaries = (id) => {
          navigate(`/PaySalaries?login=${token_key}&id=${id}`);
      };
      const Dashboard = (id) =>{
        navigate(`/Admin?login=${token_key}&id=${id}`)
      }
  // const EmailVerification = (id) => {
  //     navigate(`/EmailVerification?login=${token_key}&id=${id}`);
  // };


return(
  <>
    <div className="d-flex">
      <div className="">
            <div className="manback">
                <div className="px-4 pt-5">
                <div className="d-flex">
                            <div><img src="https://img.icons8.com/?size=100&id=47735&format=png&color=FFFFFF" className="dashboardicon" alt="" /></div>
                            <span className="dashboard px-3 fw-bold" onClick={() => Dashboard(userId)}>Dashboard</span>
                        </div>
                        <div className="d-flex pt-4">
                            <div><img src="https://img.icons8.com/?size=100&id=bjqhmlJOaXIK&format=png&color=FFFFFF" className="employeicon" alt="" /></div>
                            <span className="dashboard px-3 fw-bold" onClick={() => Manage(userId)}>Manage Employees</span>
                        </div>
                        <div className="d-flex pt-4">
                            <div><img src="https://img.icons8.com/?size=100&id=t4JOl7HIHU3e&format=png&color=FFFFFF" className="category" alt="" /></div>
                            <span className="dashboard px-3 fw-bold" onClick={() => Categories(userId)}>Department</span>
                        </div>
                        <div className="d-flex pt-4">
                            <div><img src="https://img.icons8.com/?size=100&id=82751&format=png&color=FFFFFF" alt="" className="profile" /></div>
                            <span className="dashboard px-3 fw-bold">Profile</span>
                        </div>
                        <div className="d-flex pt-4">
                            <div><img src="https://img.icons8.com/?size=100&id=364&format=png&color=FFFFFF" className="logout" alt="" /></div>
                            <span className="dashboard px-3 fw-bold">Settings</span>
                        </div>
                        <div className="d-flex pt-4">
                            <div><img src="https://img.icons8.com/?size=100&id=Rqol6NpJIw4s&format=png&color=FFFFFF" className="logout" alt="" /></div>
                            <span className="dashboard px-3 fw-bold" onClick={() => LeaveForm(userId)}>Leaves</span>
                        </div>
                        <div className="d-flex pt-4">
                            <div><img src="https://img.icons8.com/?size=100&id=22431&format=png&color=FFFFFF" className="logout" alt="" /></div>
                            <span className="dashboard px-3 fw-bold" onClick={() => PaySalaries(userId)}>Salary</span>
                        </div>
                        <div className="d-flex pt-4">
                            <div><img src="https://img.icons8.com/?size=100&id=22431&format=png&color=FFFFFF" className="logout" alt="" /></div>
                            <span className="dashboard px-3 fw-bold" onClick={() => MarkAttendanceAdmin()}>Employee Attendance</span>
                        </div>
                    
                </div>
            </div>
        </div>

      <div className="">
        {/* <div className="containerre">
        <div className="headerer">
          <img
            alt="Company Logo"
            height={50}
            src="https://storage.googleapis.com/a1aa/image/iegZIbguYA13QKsd0RhfB47luVSh3ebakqbXaoAMKI6GfIffE.jpg"
            width={100}
          />
        </div>
        <div className="contentent">
        <img alt="Employee Icon" height="150" src="https://storage.googleapis.com/a1aa/image/D236nSyqVhLTPdD1LekoCF3iYIW4fDOyVX8KrkvthueyzkfPB.jpg" width="150"/>
          <p>
          {employee.name}
          </p>
          <p>
          {employee.email}
          </p>
          <p>
            It is estimated that the problem will be resolved no later than (insert
            time). We will update you if the situation changes or if there are further
            instructions.
          </p>
          <p>{employee.role}</p>
          <p>{employee.salary}</p>
          <p>IT Team</p>
        </div>
              <div className="">
              <button className="btn btn-primary mx-2" onClick={() => console.log("Update Clicked")}>
                  Update
              </button>
              <button className="btn btn-warning mx-2" onClick={Reset}>
                      Reset             
              </button>
              <button className="btn btn-danger mx-2" onClick={EmailVerification}>
                      Forgot?
            </button>
              </div>
        </div> */}
        <div className="container  d-flex justify-content-center align-items-center">
  <div className="carddd shadow-lg p-4" >
    <div className="card-header text-center bg-primary text-white">
      <img
        alt="Company Logo"
        height={50}
        src="https://storage.googleapis.com/a1aa/image/iegZIbguYA13QKsd0RhfB47luVSh3ebakqbXaoAMKI6GfIffE.jpg"
        width={100}
        className="img-fluid rounded-circle"
      />
    </div>
    <div className="card-body text-center">
      <img
        alt="Employee Icon"
        height="150"
        src="https://storage.googleapis.com/a1aa/image/D236nSyqVhLTPdD1LekoCF3iYIW4fDOyVX8KrkvthueyzkfPB.jpg"
        width="150"
        className="img-thumbnail mb-3"
      />
      <h5 className="card-title">Name: {employee.name}</h5>
      <p className="card-text">email: {employee.email}</p>
      <p className="card-text text-muted">
        It is estimated that the problem will be resolved no later than (insert
        time). We will update you if the situation changes or if there are
        further instructions.
      </p>
      <p className="fw-bold">Role: {employee.role}</p>
      <p className="fw-bold text-success">Salary: {employee.totalSalary}</p>
      <p className="text-info">Department : IT Team</p>
    </div>
    <div className="card-footer d-flex justify-content-around bg-light">
      <button
        className="btn btn-primary btn-sm"
        onClick={() => console.log("Update Clicked")}
      >
        Update
      </button>
      <button className="btn btn-warning btn-sm" onClick={Reset}>
        Reset
      </button>
      <button className="btn btn-danger btn-sm" onClick={EmailVerification}>
        Forgot?
      </button>
    </div>
  </div>
</div>

      </div>
    </div>
</>

)

}

export default SingleemployeAdmin;
