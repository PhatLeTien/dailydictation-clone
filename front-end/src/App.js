import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Header from "./Components/Header";
import Body from "./Components/Body";
import Footer from "./Components/Footer";
import LearnTogether from "./Pages/LearnTogether";
import "./App.css";
import Login from "./Pages/Login";
import Register from "./Pages/Register";
import AllExercises from "./Pages/AllExercises";
import TopUsers from "./Pages/TopUsers";
import Help from "./Components/Helpme";
import PronunciationComponent from "./Pages/english-pronunciation";

import VideoList from "./Detail/VideoList";
import DetailView from "./Detail/Detail";

import { AuthProvider } from './ContextAPI/authContext';

const App = () => {
  const [theme, setTheme] = useState("light"); // default to 'light'

  // Lấy giá trị theme từ localStorage khi component được mount
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
      setTheme(savedTheme);
    }
  }, []);

  // Cập nhật theme và lưu vào localStorage
  const toggleTheme = () => {
    setTheme((prevTheme) => {
      const newTheme = prevTheme === 'light' ? 'dark' : 'light';
      localStorage.setItem('theme', newTheme);
      return newTheme;
    });
  };

  return (
    <AuthProvider>
      <Router>
        <div className={`${theme === "dark" ? "bg-gray-900 text-white" : "bg-white text-black"} app-container`}>
          <Header theme={theme} toggleTheme={toggleTheme} />
          <div className="content">
            <Routes>
              <Route path="/" element={<Body theme={theme} />} />
              <Route path="/exercises" element={<AllExercises theme={theme} />} />
              <Route path="/top-users" element={<TopUsers theme={theme} />} />
              <Route path="/learntogether" element={<LearnTogether theme={theme} />} />
              <Route path="/support-dailydictation" element={<Help theme={theme} />} />
              <Route path="/challenge/:slug" element={<VideoList />} />

              <Route path="/video/:videoId" element={<DetailView />} />
              <Route path="/login" element={<Login theme={theme} />} />
              <Route path="/register" element={<Register theme={theme} />} />
              <Route path="/english-pronunciation" element={<PronunciationComponent theme={theme} />} />
            </Routes>
          </div>
          <Footer theme={theme} />
        </div>
      </Router>
    </AuthProvider>
  );
};

export default App;
