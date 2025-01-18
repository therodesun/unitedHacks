import React, { useState } from 'react';
import './LoginSignup.css';
import { FaUser, FaGraduationCap, FaBriefcase, FaLock } from 'react-icons/fa';
import { MdEmail, MdWorkOutline } from 'react-icons/md';
import { GiRank3 } from 'react-icons/gi';

const LoginSignup = () => {
    const [action, setAction] = useState("Sign Up");
    const [profileImage, setProfileImage] = useState(null);

    const handleImageUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = () => {
                setProfileImage(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    return (
        <div className="container">
            <div className="header">
                <div className="text">{action}</div>
                <div className="underline"></div>
            </div>
            <div className="inputs">
                {action === "Sign Up" && (
                    <>
                        <div className="profile-picture-upload">
                            <label htmlFor="profile-upload" className="profile-upload-label">
                                {profileImage ? (
                                    <img src={profileImage} alt="Profile Preview" className="profile-preview" />
                                ) : (
                                    <div className="placeholder">Upload Photo</div>
                                )}
                            </label>
                            <input
                                type="file"
                                id="profile-upload"
                                accept="image/*"
                                onChange={handleImageUpload}
                                hidden
                            />
                        </div>
                        <div className="input">
                            <FaUser size={24} color="#797979" style={{ margin: '0 30px' }} />
                            <input type="text" placeholder="First Name" />
                        </div>
                        <div className="input">
                            <FaUser size={24} color="#797979" style={{ margin: '0 30px' }} />
                            <input type="text" placeholder="Last Name" />
                        </div>
                        <div className="input">
                            <GiRank3 size={24} color="#797979" style={{ margin: '0 30px' }} />
                            <select>
                                <option value="recruiter">Recruiter</option>
                                <option value="employee">Employee</option>
                            </select>
                        </div>
                        <div className="input">
                            <MdWorkOutline size={24} color="#797979" style={{ margin: '0 30px' }} />
                            <input type="text" placeholder="Field" />
                        </div>
                        <div className="input">
                            <FaGraduationCap size={24} color="#797979" style={{ margin: '0 30px' }} />
                            <input type="text" placeholder="Education" />
                        </div>
                        <div className="input">
                            <FaBriefcase size={24} color="#797979" style={{ margin: '0 30px' }} />
                            <input type="text" placeholder="Experience" />
                        </div>
                    </>
                )}
                <div className="input">
                    <MdEmail size={24} color="#797979" style={{ margin: '0 30px' }} />
                    <input type="email" placeholder="Email" />
                </div>
                <div className="input">
                    <FaLock size={24} color="#797979" style={{ margin: '0 30px' }} />
                    <input type="password" placeholder="Password" />
                </div>
            </div>
            {action === "Login" && (
                <div className="forgot-password">
                    Forgot Password? <span>Click Here!</span>
                </div>
            )}
            <div className="submit-container">
                <div
                    className={action === "Login" ? "submit gray" : "submit"}
                    onClick={() => {
                        setAction("Sign Up");
                    }}
                >
                    Sign Up
                </div>
                <div
                    className={action === "Sign Up" ? "submit gray" : "submit"}
                    onClick={() => {
                        setAction("Login");
                    }}
                >
                    Login
                </div>
            </div>
        </div>
    );
};

export default LoginSignup;
