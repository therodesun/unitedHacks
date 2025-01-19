import React from 'react';
import './App.css';
import MainPage from './Components/MainPage/MainPage';
import LoginSignup from './Components/LoginSignup/LoginSignup';

function App() {
  const users = [
    {
      id: 1,
      firstName: "Alice",
      lastName: "Johnson",
      education: "B.Sc. in Computer Science",
      skills: "React, Node.js, Python",
      experience: "3 years",
      location: "New York",
      salary: "$80,000/year",
      profileImage: "https://i.pravatar.cc/150?img=8"
    },
    {
      id: 3,
      firstName: "he",
      lastName: "Johnson",
      education: "B.Sc. in Computer Science",
      skills: "React, Node.js, Python",
      experience: "3 years",
      location: "New York",
      salary: "$80,000/year",
      profileImage: "https://i.pravatar.cc/150?img=8"
    },
    {
      id: 2,
      firstName: "Achen",
      lastName: "Johnson",
      education: "B.Sc. in Computer Science",
      skills: "React, Node.js, Python",
      experience: "3 years",
      location: "New York",
      salary: "$80,000/year",
      profileImage: "https://i.pravatar.cc/150?img=8"
    },
    // Add more user objects here
  ];

  return (
<<<<<<< HEAD
    <div className="App">
      <MainPage users={users} />
=======
    <div>
      <LoginSignup />
>>>>>>> 84a8237ed0a7fc92a3c03a20c3722549fbe8615f
    </div>
  );
}

export default App;
