import React from 'react';
import './Matched.css';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
const MatchedRecruiter = () => {
    const navigate = useNavigate();  
    const [email, setEmail] = React.useState('');
    const [schedule, setSchedule] = React.useState('');

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    };

    const handleScheduleChange = (e) => {
        setSchedule(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        toast.success('Email sent!');
        navigate('/');
        // need a post here to send email and schedule time
    };

    return (
        <div className="page-wrapper">
            <div className="container">
                <h1>You are matched with someone</h1>
                <p>You can send an email and set up a meeting.</p>
                <form onSubmit={handleSubmit}>
                    <div style={{ marginBottom: '1rem' }}>
                        <label htmlFor="email">Email:</label>
                        <textarea
                            id="email"
                            value={email}
                            onChange={handleEmailChange}
                            placeholder="Write your message here..."
                            rows="5"
                            style={{ width: '100%', padding: '10px', fontSize: '16px' }}
                            required
                        />
                    </div>
                    <div style={{ marginBottom: '1rem' }}>
                        <label htmlFor="schedule">Schedule:</label>
                        <input
                            type="datetime-local"
                            id="schedule"
                            value={schedule}
                            onChange={handleScheduleChange} 
                            required
                        />
                    </div>
                    <div className="submit-container">
                        <button type="submit" className="submit">
                            Send
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default MatchedRecruiter;