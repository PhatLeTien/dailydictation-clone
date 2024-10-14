import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Header from './Components/Header';
import Body from './Components/Body';
import Footer from './Components/Footer';
import LearnTogether from './Components/LearnTogether';
import './App.css';

const App = () => {
  const [theme, setTheme] = useState('light'); // default to 'light'

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'));
  };

  return (
    <Router>
      <div className={`${theme === 'dark' ? 'bg-gray-900 text-white' : 'bg-white text-black'} min-h-screen`}>
        <Header theme={theme} toggleTheme={toggleTheme} />
        <Routes>
          <Route path="/" element={<Body theme={theme} />} />
          <Route path="/learntogether" element={<LearnTogether theme={theme} />} />
        </Routes>
        <Footer theme={theme} />
      </div>
    </Router>
  );
};

export default App;
