import React, { useState } from 'react';
import './Signup.css';

const Signup = () => {
    const [action, setAction] = useState("Sign Up");
    const [userType, setUserType] = useState("employee");
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
        <div className="page-wrapper">
            <div className="container">
                <div className="header">
                    <div className="text">{action}</div>
                    <div className="underline"></div>
                </div>
                <div className="inputs">
                    {action === "Sign Up" && (
                        <>
                            {/* Profile Photo */}
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

                            {/* General Fields */}
                            <div className="input">
                                <input type="text" placeholder="First Name" />
                            </div>
                            <div className="input">
                                <input type="text" placeholder="Last Name" />
                            </div>
                            <div className="input">
                                <select
                                    value={userType}
                                    onChange={(e) => setUserType(e.target.value)}
                                    className="dropdown"
                                >
                                    <option value="employee">Employee</option>
                                    <option value="recruiter">Recruiter</option>
                                </select>
                            </div>

                            {/* Employee-Specific Fields */}
                            {userType === "employee" && (
                                <>
                                    <div className="input">
                                        <input type="text" placeholder="Education (e.g., Bachelor's in CS)" />
                                    </div>
                                    <div className="input">
                                        <input type="text" placeholder="Skills (e.g., React, Node.js)" />
                                    </div>
                                    <div className="input">
                                        <input type="text" placeholder="Experience (e.g., 2 years)" />
                                    </div>
                                    <div className="input">
                                        <input type="text" placeholder="Location (e.g., New York, Remote)" />
                                    </div>
                                    <div className="input">
                                        <input type="text" placeholder="Expected Salary (e.g., $60,000/year)" />
                                    </div>
                                </>
                            )}

                            {/* Recruiter-Specific Fields */}
                            {userType === "recruiter" && (
                                <>
                                    <div className="input">
                                        <input type="text" placeholder="Company Name" />
                                    </div>
                                    <div className="input">
                                        <input type="text" placeholder="Roles You're Hiring For (e.g., Frontend Developer)" />
                                    </div>
                                    <div className="input">
                                        <input type="text" placeholder="Required Skills (e.g., JavaScript, AWS)" />
                                    </div>
                                    <div className="input">
                                        <input type="text" placeholder="Company Location (e.g., San Francisco, Remote)" />
                                    </div>
                                    <div className="input">
                                        <input type="text" placeholder="Salary Range (e.g., $50,000 - $80,000/year)" />
                                    </div>
                                </>
                            )}
                        </>
                    )}
                </div>

                {/* Buttons */}
                <div className="submit-container">
                    <button
                        className={`submit`}
                        onClick={() => setAction("Sign Up")}
                    >
                        Sign Up
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Signup;
