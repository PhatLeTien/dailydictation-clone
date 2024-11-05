import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes} from "react-router-dom";
import Header from "./Components/Header";
import Home from "./Pages/Home";
import Footer from "./Components/Footer";
import LearnTogether from "./Pages/LearnTogether";
import "./App.css";
import Login from "./Pages/Login";
import Register from "./Pages/Register";
import AllExercises from "./Pages/AllExercises";
import TopUsers from "./Pages/TopUsers";
import Help from "./Pages/Help";

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
    <Router>
      <div
        className={`${theme === "dark" ? "bg-gray-900 text-white" : "bg-white text-black"
          } min-h-screen`}
      >
        <Header theme={theme} toggleTheme={toggleTheme} />
        <Routes>
          <Route path="/" element={<Home theme={theme} />} />
          <Route path="/exercises" element={<AllExercises theme={theme} />} />
          <Route path="/top-users" element={<TopUsers theme={theme} />} />
          <Route
            path="/learntogether"
            element={<LearnTogether theme={theme} />}
          />
          <Route
            path="/support-dailydictation"
            element={<Help theme={theme} />}
          />
          <Route path="/login" element={<Login theme={theme} />} />
          <Route path="/register" element={<Register theme={theme} />} />
        </Routes>
        <Footer theme={theme} />
      </div>
    </Router>
  );
};

export default App;
