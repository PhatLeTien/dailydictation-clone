import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import Header from './Components/Header';
import Body from './Components/Body';
import Footer from './Components/Footer';
import LearnTogether from './Components/LearnTogether';
import Login from './Components/Login';
import Register from './Components/Register';
import Helpme from './Components/Helpme';

const App = () => {
  const [theme, setTheme] = useState('light');

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
      <div className={`app-container ${theme === 'dark' ? 'bg-gray-900 text-white' : 'bg-white text-black'}`}>
        <Header theme={theme} toggleTheme={toggleTheme} />
        <div className="content">
          <Routes>
            <Route path="/" element={<Body theme={theme} />} />
            <Route path="/learntogether" element={<LearnTogether theme={theme} />} />
            <Route path="/login" element={<Login theme={theme} />} />
            <Route path="/register" element={<Register theme={theme} />} />
            <Route path="/help-me" element={<Helpme theme={theme} />} />
          </Routes>
        </div>
        <Footer theme={theme} />
      </div>
    </Router>
  );
};

export default App;