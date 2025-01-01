// import React from "react";
// import { useNavigate } from "react-router-dom";

// function WelcomeEmployee() {
//   const navigate = useNavigate();

//   const params = new URLSearchParams(window.location.search);
//     const tokenKey = params.get("login");
//     const token = localStorage.getItem(tokenKey);
//     const userId = params.get("id");
//     const id = params.get("id");

//   const handleClick = () => {
//     navigate(`/Employe?login=${tokenKey}&id=${id}`);
// };

// const AddLeaves=()=>{
//     navigate(`/AddLeaves?login=${tokenKey}&id=${id}`)
// }




// const Logout = async () => {
//   console.log("Reached..... at log out");

//   let params = new URLSearchParams(window.location.search);
//   console.log('params', params);

//   let token_key = params.get('login');
//   console.log("token_key:", token_key);

//   if (token_key) {
//       let token = localStorage.getItem(token_key);
//       console.log("token", token);

//       if (token) {
//           localStorage.removeItem(token_key);
//           navigate("/Login"); // Use navigate to redirect to the login page
//       } else {
//           console.log("Token not found");
//           // Optionally, you can redirect to login here if the token is missing
//           navigate("/Login");
//       }
//   } else {
//       console.log("No login parameter found in the URL");
//       // Redirect to login if there's no login parameter
//       navigate("/Login");
//   }
// };


//   return (
//     <>
//       <div>
//         <button onClick={handleClick}>Go to Employee</button>
//         <button onClick={AddLeaves}>LeaveForm</button>
//         <button onClick={Logout}>Logout</button>
//       </div>
//       {/* <button className='upbttn' onClick={handleSalaryList}>
//         Employee List
//       </button> */}
//     </>
//   );
// }

// export default WelcomeEmployee;
import React from "react";
import { useNavigate } from "react-router-dom";

function WelcomeEmployee() {
  const navigate = useNavigate();

  const params = new URLSearchParams(window.location.search);
  const tokenKey = params.get("login");
  const token = localStorage.getItem(tokenKey);
  const userId = params.get("id");
  const id = params.get("id");

  const handleClick = () => {
    navigate(`/Employesingle?login=${tokenKey}&id=${id}`);
  };

  const AddLeaves = () => {
    navigate(`/AddLeaves?login=${tokenKey}&id=${id}`);
  };

  const Logout = async () => {
    let token_key = params.get("login");
    if (token_key) {
      let token = localStorage.getItem(token_key);
      if (token) {
        localStorage.removeItem(token_key);
        navigate("/Login");
      } else {
        navigate("/Login");
      }
    } else {
      navigate("/Login");
    }
  };

  return (
<div className="welcomeemployee">
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className=" shadow-md rounded-lg p-6 max-w-md w-full position-absolute top-50 start-50 translate-middle">
        <h1 className="text-2xl  mb-6 wel">Welcome</h1>

        <div className="space-y-4 d-flex">
          <div className=""><button
            onClick={handleClick}
            className="w-full  hover:bg-blue-600  font-semibold py-2 px-4 rounded go"
          >
            Go to Employee Dashboard
          </button></div>

          <div className="px-3"><button
            onClick={AddLeaves}
            className="w-full bg-green-500 hover:bg-green-600  font-semibold py-2 px-4 rounded go"
          >
            Leave Form
          </button></div>

          <div className=""><button
            onClick={Logout}
            className="w-full bg-red-500 hover:bg-red-600  font-semibold py-2 px-4 rounded go"
          >
            Logout
          </button></div>
        </div>
      </div>
    </div>
</div>
  );
}

export default WelcomeEmployee;
