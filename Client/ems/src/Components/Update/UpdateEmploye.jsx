
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

  const params = new URLSearchParams(window.location.search);
  const id = params.get("id");
  const token_key = params.get("login");

  useEffect(() => {
    // Fetch user details to pre-fill the form
    const token = localStorage.getItem(token_key);
    console.log()
    fetch(`http://localhost:3000/Employe/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setUser({
          name: data.name,
          email: data.email,
          category: data.category,
          role: data.role,
          joinDate: data.joinDate,
          salary: data.salary,
          password: "", 
          userType: data.userType,
        });
      })
      .catch((err) => console.error("Error fetching user details:", err));
  }, [id, token_key]);

  const handleChange = (e) => {
    setUser({ ...user, [e.target.id]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const token = localStorage.getItem(token_key);

    fetch(` http://localhost:3000/Employee/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(user),
    })
      .then((res) => res.json())
      .then((data) => {
        alert("User updated successfully!");
        window.location = `/dashboard?login=${token_key}`;
      })
      .catch((err) => console.error("Error updating user:", err));
  };

  return (
    <>
      <div className="d-flex">
        <div className="">
          <img
            src="https://img.freepik.com/free-photo/businesswoman-leader-modern-office-with-businesspeople-workin_1139-954.jpg"
            className="employeebaner"
            alt="Employee Banner"
          />
        </div>
        <div className="px-5 pt-5">
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
                type="text"
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
                type="text"
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
    </>
  );
}

export default Edit;
