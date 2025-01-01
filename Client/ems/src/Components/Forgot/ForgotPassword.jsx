
import React, { useState } from "react";
import axios from 'axios';
import { useNavigate } from "react-router-dom";
let params = new URLSearchParams(window.location.search);
console.log("params", params);
let token_key = params.get("login");
console.log("token_key", token_key);
let token = localStorage.getItem(token_key);
console.log("token", token);
let id = params.get("id");
console.log("id", id);

function EmailVerification() {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    }
  

    const sendEmail = async (event) => {
        event.preventDefault();

        let data = {
            email
        };

        console.log("data", data);

        try {
            const response = await axios.post('http://localhost:3000/forgot_password', data, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            console.log("response", response);

            if (response.status === 200) {
                alert("Email sent successfully...");
                
                // Assuming the server returns the token and id, store them or retrieve them for navigation
                const tokenKey = response.data.tokenKey;  // Replace with the actual response field if needed
                const id = response.data.id;  // Replace with the actual response field if needed
                
                // Navigate to the reset page with the tokenKey and id as query params
                navigate(`/Reset?login=${token_key}&id=${id}`);
            } else {
                alert("Email sending failed");
            }
        } catch (error) {
            console.log("error", error);
            alert("An error occurred while sending the email");
        }
    };

    return (
        <>
            {/* <div className="forgotmain">
                <div className="d-flex">
                    <div className="">
                        <div className=""><img src="https://testlify.com/wp-content/uploads/2024/02/How-to-simplify-candidate-screening-with-salesforce-test-1024x761.png" className="forgotimg" alt="" /></div>
                    </div>
                    <div className="pt-5">
                        <div className="bor">
                            <div className="pt-5"><img src="https://us.123rf.com/450wm/lunaraa/lunaraa2311/lunaraa231100982/217352979-key-icon-set-illustration-key-sign-and-symbol.jpg?ver=6" className="lockimage" alt="" /></div>
                            <div className=""><input type="text" placeholder="Email" className="emailinput" onChange={handleEmailChange} /></div>
                            <div className=""> <button className="submit-btnn" onClick={sendEmail}>SUBMIT</button></div>
                        </div>
                    </div>
                </div>
            </div> */}
    <div className="forgotimg">
        <div className="position-absolute top-50 start-50 translate-middle ">
            <div className="emailcontainer">
            <div className="illustration">
                <img
                alt="Illustration of a person sitting on a red couch with a laptop"
                height={300}
                src="https://storage.googleapis.com/a1aa/image/mKyz20QIdz6lKh8PHg8KZfo5ClJUSi5nbpyVkdXhhtyx53fTA.jpg"
                width={300}
                />
            </div>
            <div className="form-emailcontainer">
                <img
                alt="Key icon"
                height={50}
                src="https://storage.googleapis.com/a1aa/image/ZUcjXR10r27HJFycDGDzBE48rnOzeM6x0jZtLq6DSUBy53fTA.jpg"
                width={50}
                />
                <h2>Forgot password?</h2>
                <form>
                <input placeholder="Email" type="email" onChange={handleEmailChange} />
                <button type="submit" onClick={sendEmail}>Reset Password</button>
                </form>
            </div>
            </div>
        </div>
    </div>

        </>
        
    );
}

export default EmailVerification;
