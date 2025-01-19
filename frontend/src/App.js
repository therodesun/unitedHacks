import React from "react";
import "./App.css";
import MainPage from "./Components/MainPage/MainPage";
import { Route, Routes } from "react-router-dom";
import Login from "./Components/Login/Login";
import Signup from "./Components/Signup/Signup";
import Matched from "./Components/Matched/Matched";
import MatchedRecruiter from "./Components/Matched/MatchedRecruiter";
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
      profileImage: "https://i.pravatar.cc/150?img=8",
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
      profileImage: "https://i.pravatar.cc/150?img=8",
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
      profileImage: "https://i.pravatar.cc/150?img=8",
    },
    // Add more user objects here
  ];

  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<MainPage users={users} />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Signup />} />
        <Route path="/matched" element={<Matched/>} />
        <Route path="/matchedRecruiter" element={<MatchedRecruiter/>} />
      </Routes>
    </div>
  );
}

export default App;
