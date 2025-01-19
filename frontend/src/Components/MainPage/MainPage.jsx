import React from 'react';
import './MainPage.css';

const MainPage = ({ user }) => {
    return (
        <div className="main-container">
            <div className="profile-card">
                {/* Circular Profile Picture */}
                <img 
                    src={user.profileImage || "https://i.pravatar.cc/150?img=8"} 
                    alt="Profile" 
                    className="profile-pic"
                />
                
                {/* User Details */}
                <h2>{user.firstName} {user.lastName}</h2>
                <p><strong>Education:</strong> {user.education}</p>
                <p><strong>Skills:</strong> {user.skills}</p>
                <p><strong>Experience:</strong> {user.experience}</p>
                <p><strong>Location:</strong> {user.location}</p>
                <p><strong>Salary:</strong> {user.salary}</p>

                {/* Swipe Action Buttons */}
                <div className="action-buttons">
                    <button className="reject">❌</button>
                    <button className="accept">✅</button>
                </div>
            </div>
        </div>
    );
};

export default MainPage;
