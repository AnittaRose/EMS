
// import React, { useState } from "react";
// import axios from "axios";

// function Reset() {
//     const [password, setPassword] = useState("");
//     const [newpassword, setNewPassword] = useState("");

//     const handleSubmit = async (event) => {
//         event.preventDefault();

//         let params = new URLSearchParams(window.location.search);
//         let token_key = params.get("login");
//         let id = params.get("id");

//         if (!token_key || !id) {
//             alert("Invalid reset link.");
//             return;
//         }

//         let token = localStorage.getItem(token_key);

//         let data = {
//             password,
//             newpassword,
//         };

//         try {
//             let response = await axios.put(
//                 `http://localhost:3000/resetPassword/${id}`,
//                 data,
//                 {
//                     headers: {
//                         Authorization: `Bearer ${token}`,
//                         "Content-Type": "application/json",
//                     },
//                 }
//             );

//             if (response.status === 200) {
//                 alert("Password reset successfully...");
//                 // window.location.href = "index.html";
//             } else {
//                 alert("Reset failed...");
//             }
//         } catch (error) {
//             console.error("Error:", error);
//             alert("An error occurred while resetting the password. Please try again.");
//         }
//     };

//     return (
//         <div className="resetbackground">
//             <div className="pt-5">
//                 <div className="foo container">
//                     <div className="text-center pt-4 fs-3 fw-bold resetfont">
//                         Reset Your Password
//                     </div>
//                     <div className="d-flex justify-content-evenly">
//                         <div>
//                             <img
//                                 src="https://img.freepik.com/premium-vector/purple-lock-icon-with-cloud-flat-style-security-padlock-protection-concept-isolated-white_668430-328.jpg?w=360"
//                                 alt=""
//                                 className="purple"
//                             />
//                         </div>
//                         <div className="top">
//                             <form onSubmit={handleSubmit}>
//                                 <div>
//                                     <input
//                                         type="text"
//                                         placeholder="Current Password"
//                                         className="inputtt"
//                                         value={password}
//                                         onChange={(e) => setPassword(e.target.value)}
//                                     />
//                                 </div>
//                                 <div className="pt-3">
//                                     <input
//                                         type="text"
//                                         placeholder="New Password"
//                                         className="inputtt"
//                                         value={newpassword}
//                                         onChange={(e) => setNewPassword(e.target.value)}
//                                     />
//                                 </div>
//                                 <div className="pt-3">
//                                     <button className="resetbtn" type="submit">
//                                         Reset Password
//                                     </button>
//                                 </div>
//                             </form>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// }

// export default Reset;
import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from 'react-router-dom';


function Reset() {
    const [password, setPassword] = useState("");
    const [newpassword, setNewPassword] = useState("");
    const navigate = useNavigate();


    const handleSubmit = async (event) => {
        event.preventDefault();

        let params = new URLSearchParams(window.location.search);
        let token_key = params.get("login");
        let id = params.get("id");

        if (!token_key || !id) {
            alert("Invalid reset link.");
            return;
        }

        let token = localStorage.getItem(token_key);

        let data = {
            password,
            newpassword,
        };

        try {
            let response = await axios.put(
                `http://localhost:3000/resetPassword/${id}`,
                data,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "application/json",
                    },
                }
            );

            if (response.status === 200) {
                alert("Password reset successfully...");
                navigate(`/SingleemployeAdmin?login=${token_key}&id=${id}`);
            } else {
                alert("Reset failed...");
            }
        } catch (error) {
            console.error("Error:", error);
            alert("An error occurred while resetting the password. Please try again.");
        }
    };

    return (

    <div className="resetbackground">
        <div className="position-absolute top-50 start-50 translate-middle">
            <form onSubmit={handleSubmit}>
                <div className="resetcontainer">
                <div className="image-container">
                <img
                    alt="Illustration of a man and woman holding a large key"
                    height={300}
                    src="https://storage.googleapis.com/a1aa/image/QxImzXKGS578HhZsm7CGk3EceWvxSa9FU4lhNpN3SPgcl2fTA.jpg"
                    width={300}
                />
                </div>
                <div className="form-container">
                <h2>Reset Your Password</h2>
                <input placeholder="Password" type="password" onChange={(e) => setPassword(e.target.value)} />
                <input placeholder="Confirm Password" type="password" onChange={(e) => setNewPassword(e.target.value)} />
                <button>Change</button>
                </div>
                </div>
            </form>
        </div>
    </div>

    );
}

export default Reset;
