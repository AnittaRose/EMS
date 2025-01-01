
// import React, { useState, useEffect } from "react";

// function Edit() {
//   const [user, setUser] = useState({
//     name: "",
//     email: "",
//     category: "",
//     role: "",
//     joinDate: "",
//     salary: "",
//     password: "",
//     userType: "",
//   });
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   // Extract URL parameters
//   const params = new URLSearchParams(window.location.search);
//   const id = params.get("id");
//   const employeeId = params.get("employeeId");
//   const tokenKey = params.get("login");

//   useEffect(() => {
//     if (!employeeId|| !tokenKey) {
//       console.error("Employee ID or token is missing in URL parameters.");
//       setError("Invalid URL parameters. Please try again.");
//       setLoading(false);
//       return;
//     }

//     const token = localStorage.getItem(tokenKey);
//     if (!token) {
//       console.error("Token not found in localStorage.");
//       setError("Unauthorized. Please log in again.");
//       setLoading(false);
//       return;
//     }

//     // Fetch user details to pre-fill the form
//     fetch(`http://localhost:3000/Employe/${employeeId}`, {
//       headers: {
//         Authorization: `Bearer ${token}`,
//       },
//     })
//       .then((res) => {
//         if (!res.ok) {
//           throw new Error(`Failed to fetch data. Status: ${res.status}`);
//         }
//         return res.json();
//       })
//       .then((data) => {
//         setUser({
//           name: data.name || "",
//           email: data.email || "",
//           category: data.category || "",
//           role: data.role || "",
//           joinDate: data.joinDate || "",
//           salary: data.salary || "",
//           password: "", // Avoid pre-filling passwords for security
//           userType: data.userType || "",
//         });
//         setLoading(false);
//       })
//       .catch((err) => {
//         console.error("Error fetching user details:", err);
//         setError("Failed to load employee details. Please try again later.");
//         setLoading(false);
//       });
//   }, [employeeId, tokenKey]);

//   const handleChange = (e) => {
//     setUser({ ...user, [e.target.id]: e.target.value });
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     const token = localStorage.getItem(tokenKey);

//     fetch(`http://localhost:3000/Employee/${id}`, {
//       method: "PUT",
//       headers: {
//         "Content-Type": "application/json",
//         Authorization: `Bearer ${token}`,
//       },
//       body: JSON.stringify(user),
//     })
//       .then((res) => {
//         if (!res.ok) {
//           throw new Error(`Failed to update employee. Status: ${res.status}`);
//         }
//         return res.json();
//       })
//       .then(() => {
//         alert("Employee updated successfully!");
//         // window.location = `/dashboard?login=${token_key}`;/
//       })
//       .catch((err) => console.error("Error updating user:", err));
//   };

//   if (loading) {
//     return <div>Loading...</div>;
//   }

//   if (error) {
//     return <div className="error-message">{error}</div>;
//   }

//   return (
//     <div className="d-flex">
//       <div>
//         <img
//           src="https://files.oaiusercontent.com/file-2qnZ9GiGroL3QM1Zu3taM4?se=2024-12-28T05%3A51%3A05Z&sp=r&sv=2024-08-04&sr=b&rscc=max-age%3D604800%2C%20immutable%2C%20private&rscd=attachment%3B%20filename%3Dd43f01a5-b95d-408f-8bb4-7e9a3c18d634.webp&sig=pC33fMv4wC/QfafTzRBnB6vZIysjVJ6e4Dn4dc%2B26NQ%3D"
//           className="employeebaner"
//           alt="Employee Banner"
//         />
//       </div>
//       <div className="px-5 pt-3 forrm">
//         <form onSubmit={handleSubmit}>
//           <div className="mb-3">
//             <label htmlFor="name" className="form-label">
//               Enter Name
//             </label>
//             <input
//               type="text"
//               className="form-control"
//               id="name"
//               value={user.name}
//               onChange={handleChange}
//             />
//           </div>
//           <div className="mb-3">
//             <label htmlFor="email" className="form-label">
//               Enter Email
//             </label>
//             <input
//               type="email"
//               className="form-control"
//               id="email"
//               value={user.email}
//               onChange={handleChange}
//             />
//           </div>
//           <div className="mb-3">
//             <label htmlFor="category" className="form-label">
//               Category
//             </label>
//             <select
//               className="form-control"
//               id="category"
//               value={user.category}
//               onChange={handleChange}
//             >
//               <option value="">Select category</option>
//               <option value="IT">IT</option>
//               <option value="Developer">Developer</option>
//               <option value="Designer">Designer</option>
//               <option value="Business">Business</option>
//               <option value="HR">HR</option>
//             </select>
//           </div>
//           <div className="mb-3">
//             <label htmlFor="role" className="form-label">
//               Enter Role
//             </label>
//             <input
//               type="text"
//               className="form-control"
//               id="role"
//               value={user.role}
//               onChange={handleChange}
//             />
//           </div>
//           <div className="mb-3">
//             <label htmlFor="joinDate" className="form-label">
//               Join Date
//             </label>
//             <input
//               type="date"
//               className="form-control"
//               id="joinDate"
//               value={user.joinDate}
//               onChange={handleChange}
//             />
//           </div>
//           <div className="mb-3">
//             <label htmlFor="salary" className="form-label">
//               Salary
//             </label>
//             <input
//               type="number"
//               className="form-control"
//               id="salary"
//               value={user.salary}
//               onChange={handleChange}
//             />
//           </div>
//           <div className="mb-3">
//             <label htmlFor="password" className="form-label">
//               Password
//             </label>
//             <input
//               type="password"
//               className="form-control"
//               id="password"
//               value={user.password}
//               onChange={handleChange}
//             />
//           </div>
//           <div className="mb-3">
//             <label htmlFor="userType" className="form-label">
//               User Type
//             </label>
//             <select
//               className="form-control"
//               id="userType"
//               value={user.userType}
//               onChange={handleChange}
//             >
//               <option value="">Select User Type</option>
//               <option value="Admin">Admin</option>
//               <option value="Employee">Employee</option>
//             </select>
//           </div>
//           <div className=""><button type="submit" className="upbtn">
//             Update Employee
//           </button></div>
//         </form>
//       </div>
//     </div>
//   );
// }

// export default Edit;

import React, { useState, useEffect } from "react";

function Edit() {
  const [user, setUser] = useState({
    name: "",
    email: "",
    category: "",
    role: "",
    joinDate: "",
    salary: "",
    password: "",
    userType: "",
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Extract URL parameters
  const params = new URLSearchParams(window.location.search);
  const id = params.get("id");
  const tokenKey = params.get("login");

  useEffect(() => {
    if (!id || !tokenKey) {
      console.error("ID or token is missing in URL parameters.");
      setError("Invalid URL parameters. Please try again.");
      setLoading(false);
      return;
    }

    const token = localStorage.getItem(tokenKey);
    if (!token) {
      console.error("Token not found in localStorage.");
      setError("Unauthorized. Please log in again.");
      setLoading(false);
      return;
    }

    // Fetch user details to pre-fill the form
    fetch(`http://localhost:3000/Employee/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error(`Failed to fetch data. Status: ${res.status}`);
        }
        return res.json();
      })
      .then((data) => {
        console.log("data",data);
        setUser({
          name: data.name || "",
          email: data.email || "",
          category: data.category || "",
          role: data.role || "",
          joinDate: data.joinDate || "",
          salary: data.salary || "",
          password: "", // Avoid pre-filling passwords for security
          userType: data.userType || "",
        });
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching user details:", err);
        setError("Failed to load employee details. Please try again later.");
        setLoading(false);
      });
  }, []);
  console.log("user",user);

  const handleChange = (e) => {
    setUser({ ...user, [e.target.id]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const token = localStorage.getItem(tokenKey);

    if (!token) {
      alert('Unauthorized! Please log in again.');
      return;
    }

    const { name, email, category, role, joinDate, salary, password, userType } = user;

    if (!name || !email || !category || !role || !joinDate || !salary || !userType) {
      alert('Please fill all required fields.');
      return;
    }

    const updatedData = { name, email, category, role, joinDate, salary, password, userType };

    fetch(`http://localhost:3000/Employee/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(updatedData),
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error(`Failed to update employee. Status: ${res.status}`);
        }
        return res.json();
      })
      .then(() => {
        alert("Employee updated successfully!");
        window.location = `/dashboard?login=${tokenKey}`;
      })
      .catch((err) => {
        console.error("Error updating user:", err);
        alert("Error updating employee. Please try again.");
      });
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div className="error-message">{error}</div>;
  }

  return (
    <div className="d-flex">
      <div>
        <img
          src="https://files.oaiusercontent.com/file-2qnZ9GiGroL3QM1Zu3taM4?se=2024-12-28T05%3A51%3A05Z&sp=r&sv=2024-08-04&sr=b&rscc=max-age%3D604800%2C%20immutable%2C%20private&rscd=attachment%3B%20filename%3Dd43f01a5-b95d-408f-8bb4-7e9a3c18d634.webp&sig=pC33fMv4wC/QfafTzRBnB6vZIysjVJ6e4Dn4dc%2B26NQ%3D"
          className="employeebaner"
          alt="Employee Banner"
        />
      </div>
      <div className="px-5 pt-3 forrm">
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="name" className="form-label">
              Enter Name
            </label>
            <input
              type="text"
              className="form-control"
              id="name"
              value={user.name}
              onChange={handleChange}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">
              Enter Email
            </label>
            <input
              type="email"
              className="form-control"
              id="email"
              value={user.email}
              onChange={handleChange}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="category" className="form-label">
              Category
            </label>
            <select
              className="form-control"
              id="category"
              value={user.category}
              onChange={handleChange}
            >
              <option value="">Select category</option>
              <option value="IT">IT</option>
              <option value="Developer">Developer</option>
              <option value="Designer">Designer</option>
              <option value="Business">Business</option>
              <option value="HR">HR</option>
            </select>
          </div>
          <div className="mb-3">
            <label htmlFor="role" className="form-label">
              Enter Role
            </label>
            <input
              type="text"
              className="form-control"
              id="role"
              value={user.role}
              onChange={handleChange}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="joinDate" className="form-label">
              Join Date
            </label>
            <input
              type="date"
              className="form-control"
              id="joinDate"
              value={user.joinDate}
              onChange={handleChange}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="salary" className="form-label">
              Salary
            </label>
            <input
              type="number"
              className="form-control"
              id="salary"
              value={user.salary}
              onChange={handleChange}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label">
              Password
            </label>
            <input
              type="password"
              className="form-control"
              id="password"
              value={user.password}
              onChange={handleChange}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="userType" className="form-label">
              User Type
            </label>
            <select
              className="form-control"
              id="userType"
              value={user.userType}
              onChange={handleChange}
            >
              <option value="">Select User Type</option>
              <option value="Admin">Admin</option>
              <option value="Employee">Employee</option>
            </select>
          </div>
          <button type="submit" className="btn btn-primary">
            Update Employee
          </button>
        </form>
      </div>
    </div>
  );
}

export default Edit;






















