// import React, { useState, useEffect } from 'react';
// import { useNavigate } from "react-router-dom";

// const Salaries = () => {
//      const navigate = useNavigate();
//   const [employeeId, setEmployeeId] = useState('');
//   const params = new URLSearchParams(window.location.search);
//     const token_key = params.get('login');
//     const token = localStorage.getItem(token_key);
//     const userId = params.get('id');


//   // Toggle form visibility
//   const handleAddSalary = () => {
//     navigate(`/SalaryForm?login=${token_key}&id=${userId}`)
//   };
//   const handleSalaryList=()=>{
//     navigate(`/SalaryList?login=${token_key}&id=${userId}`)
//   }

//   return (
//     <div>
//       <h1>Admin Dashboard</h1>
//       <button onClick={handleAddSalary}>
//         {showForm ? "Cancel" : "Add/Update Employee Salary"}
//       </button>
//       <button onClick={handleSalaryList}>
//         {showForm ? "Cancel" : "Employe List"}
//       </button>
      
//     </div>
//   );
// };

// export default Salaries;


import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";

const Salaries = () => {
  const navigate = useNavigate();
  const [employeeId, setEmployeeId] = useState('');
  
  const params = new URLSearchParams(window.location.search);
  const token_key = params.get('login');
  const token = localStorage.getItem(token_key);
  const userId = params.get('id');

  // Handle navigation to Salary Form
  const handleAddSalary = () => {
    navigate(`/SalaryForm?login=${token_key}&id=${userId}`);
  };

  // Handle navigation to Salary List
  const handleSalaryList = () => {
    navigate(`/SalaryList?login=${token_key}&id=${userId}`);
  };

  return (
    <div className='slariess'>
      
      <button className='upbttn position-absolute top-50 start-50 translate-middle' onClick={handleAddSalary}>
        Add/Update Employee Salary
      </button>
      {/* <button className='upbttn' onClick={handleSalaryList}>
        Employee List
      </button> */}
    </div>
  );
};

export default Salaries;
