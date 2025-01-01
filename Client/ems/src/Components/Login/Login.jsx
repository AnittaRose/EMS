import React from "react";
import { useNavigate } from 'react-router-dom';
import { useState } from "react";

function Login(){

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const add = async (event) => {
    event.preventDefault();

    let requestData = JSON.stringify({ email, password });
    console.log(requestData);

    try {
      let response = await fetch('http://localhost:3000/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: requestData
      });

      console.log(response);

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      let parsedResponse = await response.json();
      if (!parsedResponse.data) {
        throw new Error('Invalid response structure');
      }
      console.log(parsedResponse);

      let { user_type, token, id } = parsedResponse.data;
      console.log("usetype",user_type);

      let tokenKey = id;
      localStorage.setItem(tokenKey, token);
      console.log(tokenKey);

      let loginCountKey = `${id}_login_count`;
      let loginCount = parseInt(localStorage.getItem(loginCountKey) || 0);
      
      if (loginCount === 0) {
        localStorage.setItem(loginCountKey, 1);
        alert("This is your first login. Please reset your password.");
    
        return;
      } else {
        loginCount += 1;
        localStorage.setItem(loginCountKey, loginCount);
      }

      if (user_type.user_type === 'Admin') {
        navigate(`/WelcomeAdmin?login=${tokenKey}&id=${id}`);
      } else if (user_type.user_type === "Employee") {
        // navigate(`/Employe?login=${tokenKey}&id=${id}`);
        navigate(`/WelcomeEmployee?login=${tokenKey}&id=${id}`);
      }

    } catch (error) {
      console.error("Login failed:", error);
      alert('Failed to login. Please try again.');
    }
  }
  const forgoten = async() => {
    navigate(`/EmailVerification`);
  }

    return(<>
        <div className="login_container">
        <div className="login_form_container">
          <div className="login_form">
            <form className="form position-absolute top-50 start-50 translate-middle" onSubmit={add}>
              <p className="heading">LOGIN</p>
              <div className=""><input placeholder="Email" className="input" type="email"  id="email" value={email} onChange={(e) => setEmail(e.target.value)} /></div>
              <div className=""><input placeholder="Password" className="input" type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} /></div>
              <button className="btn" id="login_button">Submit</button>
            </form>


          </div>
        </div>
      </div>

    </>)
}

export default Login;

