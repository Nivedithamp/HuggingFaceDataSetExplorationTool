import React, { useState } from 'react';
import './loginSignup.css';
import axios from 'axios';

async function login(userEmail, password) {
  
  return await axios.post('http://localhost:4000/login', {
    email: userEmail,
    password: password
  }).then((response) => {
    return response.data;
  }).catch((error) => {
    return {"success": false}; 
  });
}

async function signup(userEmail, password) {
  console.log("signup function called"); 
  axios.post('http://localhost:4000/register', {
    email: userEmail,
    password: password
  }).then((response) => {
    
    return response.data;
  }).catch((error) => {
    // console.log(error);
  });
}




const LoginSignup = () => {

  const [action, setAction] = useState("Login");  
  const [userEmail, setUserEmail] = useState("");
  const [password, setPassword] = useState("");
  

  const handleSumbit = async (e) => {
    e.preventDefault();
    if(action === "Login") {
      let res = await login(userEmail, password);
      if(res.success === true){
        window.location.href = "/main";
      }
      console.log(res);
      // window.location.href = "/main";
    }
    else {
      let res = await signup(userEmail, password);
      setAction("Login");
      console.log(res);
    }


  }


  return (
    <form className='container' onSubmit={handleSumbit}>
      <div className='header'>
        <div className="text">{action}</div>
        <div className="underline"></div>
      </div>
      <div className="inputs">
        {action==="Login"?<div></div>: <div className="input">
          <input type="text" placeholder="Name"/>
        </div>}
        
        <div className="input">
          <input type="email" placeholder="Email Id" onChange={ e => setUserEmail(e.target.value)  }/>
        </div>
        <div className="input">
          <input type="password" placeholder="Password" onChange={ e => setPassword(e.target.value) } />
        </div>
      </div>
      {action === "Sign Up" ? <div></div> : <div className="forgot-password">Lost Password? <span>Click here</span></div>}
      <div className="submit-container">
        <button  className={action==="Login"?"submit grey":"submit"} onClick={() => {setAction("Sign Up")}}>Sign Up</button>
        <button  type="submit" className={action==="Sign Up"?"submit grey":"submit"} onClick={() => {setAction("Login"); }}>Login</button>
      </div>
      {/* <button type="submit" className="submit">Submit</button> */}
    </form>
  );
};

export default LoginSignup;
