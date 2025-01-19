import React, { useState } from 'react';
import './Login.css';

const Login = () => {
    const [action, setAction] = useState("Login");

    return (
        <div className="container">
            <div className="header">
                <div className="text">{action}</div>
                <div className="underline"></div>
            </div>
            <div className="inputs">
                {/* Login Fields */}
                <div className="input">
                    <input type="email" placeholder="Email" />
                </div>
                <div className="input">
                    <input type="password" placeholder="Password" />
                </div>
            </div>

            {/* Buttons */}
            <div className="submit-container">
                <button
                    className={`submit`}
                    onClick={() => setAction("Login")}
                >
                    Login
                </button>
            </div>
        </div>
    );
};

export default Login;
