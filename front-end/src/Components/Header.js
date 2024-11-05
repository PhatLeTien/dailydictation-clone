import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaCaretDown } from "react-icons/fa";

const Header = ({ theme, toggleTheme }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setIsDropdownOpen((prev) => !prev);
  };

  return (
    <header
      className={`${
        theme === "dark" ? "bg-gray-900 text-white" : "bg-white text-black"
      } w-full shadow-md relative z-10`}
    >
      <div className="max-w-[96rem] mx-auto flex justify-between items-center p-4">
        <Link to="/">
          <div className="flex items-center">
            {/* Logo */}
            <img
              src="/logo-dailydictation.png"
              alt="DailyDictation Logo"
              className="h-8 mr-2"
            />
            <div className="font-bold text-2xl">DailyDictation</div>
          </div>
        </Link>

        <nav className="flex items-center">
          <ul className="flex space-x-6">
            <li>
              <Link
                to="/exercises"
                className={`${
                  theme === "dark" ? "text-gray-300" : "text-gray-600"
                } hover:text-blue-500`}
              >
                All exercises
              </Link>
            </li>
            <li>
              <Link
                to="/top-users"
                className={`${
                  theme === "dark" ? "text-gray-300" : "text-gray-600"
                } hover:text-blue-500`}
              >
                Top users
              </Link>
            </li>
            <li className="relative">
              <button
                onClick={toggleDropdown}
                className={`flex gap-2 items-center ${
                  theme === "dark" ? "text-gray-300" : "text-gray-600"
                } hover:text-blue-500`}
              >
                Video lessons
                <FaCaretDown />
              </button>
              {isDropdownOpen && (
                <div className={`absolute w-max left-0 mt-2 py-1 border border-gray-500 shadow-lg rounded-md ${theme === "dark" ? "bg-gray-900 text-gray-300" : "bg-white text-black"}`}>
                  <Link
                    to="/english-expressions"
                    className={`block px-4 py-2  ${theme === "dark" ? "hover:bg-gray-700" : "hover:bg-gray-100"}`}
                    onClick={() => setIsDropdownOpen(false)}
                  >
                    English expressions
                  </Link>
                  <Link
                    to="/english-pronunciation"
                    className={`block px-4 py-2  ${theme === "dark" ? "hover:bg-gray-700" : "hover:bg-gray-100"}`}
                    onClick={() => setIsDropdownOpen(false)}
                  >
                    English pronunciation
                  </Link>
                </div>
              )}
            </li>
            <li>
              <Link
                to="/learntogether"
                className={`${
                  theme === "dark" ? "text-gray-300" : "text-gray-600"
                } hover:text-blue-500`}
              >
                Learn Together
              </Link>
            </li>
            <li>
              <Link
                to="/support-dailydictation"
                className={`${
                  theme === "dark" ? "text-gray-300" : "text-gray-600"
                } flex items-center`}
              >
                Help{" "}
                <span role="img" aria-label="praying hands" className="ml-1">
                  🙏
                </span>
              </Link>
            </li>
          </ul>
          <ul className="flex items-center space-x-4 ml-6">
            <li>
              <Link
                to="/login"
                className={`${
                  theme === "dark" ? "text-gray-300" : "text-gray-600"
                } hover:text-blue-500`}
              >
                Login
              </Link>
            </li>
            <li>
              <Link
                to="/register"
                className={`${
                  theme === "dark" ? "text-gray-300" : "text-gray-600"
                } hover:text-blue-500`}
              >
                Register
              </Link>
            </li>
            {/* Toggle Theme Button */}
            <li>
              <button
                onClick={toggleTheme}
                className={`${
                  theme === "dark" ? "text-gray-300" : "text-gray-600"
                } hover:text-blue-500 text-2xl`}
              >
                {theme === "dark" ? "🌚" : "🌞"}
              </button>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
