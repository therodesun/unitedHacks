import React, { useState } from 'react';
import './Login.css';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const Login = () => {
  const navigate = useNavigate();  
  const [action, setAction] = useState("Login");
  const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loginError, setLoginError] = useState('');
    const handleLogin = () => {
        if (!email || !password) {
            toast.error('Please enter both email and password');
        
            return;
        }

        fetch('http://localhost:4500/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, password }),
        })
        .then(response => response.json())
        .then(data => {
            if (data.accessToken) {
                // Handle successful login (store token, redirect, etc.)
                toast.success('Login successful!');
     
                localStorage.setItem('email', email);
                navigate('/');
            } else {
              toast.error("Invalid credentials");
                // Handle error from the server
                setLoginError(data.message || 'Login failed');
            }
        })
        .catch(error => {
            console.error('Error logging in:', error);
            setLoginError('An error occurred. Please try again later.');
        });
    };

    const navigateToSignUp = () => {

        navigate('/register');
    }; 

    
  return (
    <div className="page-wrapper">
      <div className="container">
        <div className="header">
          <div className="text">{action}</div>
          <div className="underline"></div>
        </div>
        <div className="inputs">
          {action === "Login" ? <div></div> : <div className="input">
            <input type="text" placeholder="Name" />
          </div>}
          
          <div className="input">
            <input type="email" placeholder="Email ID" onChange={(e) => setEmail(e.target.value)}/>
          </div>
          <div className="input">
            <input type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
          </div>
        </div>
        {action === "Sign Up" ? <div></div> : <div className="forgot-password" onClick={() => toast('It is demo!')}>Forgot Password? <span>Click Here!</span></div>}
        
        <div className="submit-container">
          <div className={action === "Login" ? "submit gray" : "submit"} onClick={() => {navigateToSignUp();}}>Sign Up</div>
          <div className={action === "Sign Up" ? "submit gray" : "submit"} onClick={() => {handleLogin();}}>Login</div>
        </div>
      </div>
    </div>
  );
}

export default Login;
