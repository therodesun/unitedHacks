import React from 'react';
import './App.css';
import MainPage from './Components/MainPage/MainPage';

function App() {
  // Dummy user data
  const dummyUser = {
    firstName: "Alice",
    lastName: "Johnson",
    education: "B.Sc. in Computer Science",
    skills: "React, Node.js, Python",
    experience: "3 years",
    location: "New York",
    salary: "$80,000/year",
    profileImage: "https://i.pravatar.cc/150?img=8" // Reliable online profile pic
  };

  return (
    <div>
      <MainPage user={dummyUser} />
    </div>
  );
}

export default App;
