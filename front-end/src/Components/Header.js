import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaCaretDown } from "react-icons/fa";

const Header = ({ theme, toggleTheme }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isUserDropdownOpen, setIsUserDropdownOpen] = useState(false); // State for User Icon dropdown
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Track login status
  const navigate = useNavigate();

  const toggleDropdown = () => {
    setIsDropdownOpen((prev) => !prev);
  };

  const toggleUserDropdown = () => {
    setIsUserDropdownOpen((prev) => !prev);
  };

  // Mock login function that navigates to /login and sets the login state
  const handleMockLogin = () => {
    const mockUsername = "testuser";
    const mockPassword = "123456";

    // Simulate a successful login
    if (mockUsername === "testuser" && mockPassword === "123456") {
      setIsLoggedIn(true);
      navigate("/"); // Navigate to the home page or another page after login
      alert("Login successful!"); // Optional success message
    } else {
      alert("Invalid username or password"); // Optional error message
    }
  };

  // Logout function
  const handleLogout = () => {
    setIsLoggedIn(false);
    setIsUserDropdownOpen(false); // Close the dropdown after logout
    alert("Logged out successfully!");
  };

  return (
    <header
      className={`${theme === "dark" ? "bg-gray-900 text-white" : "bg-white text-black"
        } w-full shadow-md relative z-10`}
    >
      <div className="max-w-[96rem] mx-auto flex justify-between items-center p-4">
        <Link to="/">
          <div className="flex items-center">
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
                className={`${theme === "dark" ? "text-gray-300" : "text-gray-600"
                  } hover:text-blue-500`}
              >
                All exercises
              </Link>
            </li>
            <li>
              <Link
                to="/top-users"
                className={`${theme === "dark" ? "text-gray-300" : "text-gray-600"
                  } hover:text-blue-500`}
              >
                Top users
              </Link>
            </li>
            <li className="relative">
              <button
                onClick={toggleDropdown}
                className={`flex gap-2 items-center ${theme === "dark" ? "text-gray-300" : "text-gray-600"
                  } hover:text-blue-500`}
              >
                Video lessons
                <FaCaretDown />
              </button>
              {isDropdownOpen && (
                <div
                  className={`absolute w-max left-0 mt-2 py-1 border border-gray-500 shadow-lg rounded-md ${theme === "dark"
                    ? "bg-gray-900 text-gray-300"
                    : "bg-white text-black"
                    }`}
                >
                  <Link
                    to="/english-expressions"
                    className={`block px-4 py-2 ${theme === "dark"
                      ? "hover:bg-gray-700"
                      : "hover:bg-gray-100"
                      }`}
                    onClick={() => setIsDropdownOpen(false)}
                  >
                    English expressions
                  </Link>
                  <Link
                    to="/english-pronunciation"
                    className={`block px-4 py-2 ${theme === "dark"
                      ? "hover:bg-gray-700"
                      : "hover:bg-gray-100"
                      }`}
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
                className={`${theme === "dark" ? "text-gray-300" : "text-gray-600"
                  } hover:text-blue-500`}
              >
                Learn Together
              </Link>
            </li>
            <li>
              <Link
                to="/support-dailydictation"
                className={`${theme === "dark" ? "text-gray-300" : "text-gray-600"
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
            {isLoggedIn ? (
              // Show the logged-in interface
              <>
                <li>
                  <span
                    className={`${theme === "dark" ? "text-gray-300" : "text-gray-600"
                      }`}
                  >
                    0 minutes
                  </span>
                </li>
                <li>
                  <Link
                    to="/notes"
                    className={`${theme === "dark" ? "text-gray-300" : "text-gray-600"
                      }`}
                  >
                    In-progress
                  </Link>
                </li>
                <li>
                  <Link
                    to="/notes"
                    className={`${theme === "dark" ? "text-gray-300" : "text-gray-600"
                      }`}
                  >
                    Notes
                  </Link>
                </li>
                <li className="relative">
                  <button
                    onClick={toggleUserDropdown}
                    className={`${theme === "dark" ? "text-gray-300" : "text-gray-600"
                      } hover:text-blue-500`}
                  >
                    User Icon
                  </button>
                  {isUserDropdownOpen && (
                    <div
                      className={`absolute right-0 mt-2 py-1 w-48 border border-gray-500 shadow-lg rounded-md ${theme === "dark"
                        ? "bg-gray-900 text-gray-300"
                        : "bg-white text-black"
                        }`}
                    >
                      <Link
                        to="/profile"
                        className={`block px-4 py-2 ${theme === "dark"
                          ? "hover:bg-gray-700"
                          : "hover:bg-gray-100"
                          }`}
                        onClick={() => setIsUserDropdownOpen(false)}
                      >
                        Profile
                      </Link>
                      <Link
                        to="/settings"
                        className={`block px-4 py-2 ${theme === "dark"
                          ? "hover:bg-gray-700"
                          : "hover:bg-gray-100"
                          }`}
                        onClick={() => setIsUserDropdownOpen(false)}
                      >
                        Settings
                      </Link>
                      <button
                        onClick={handleLogout}
                        className={`block px-4 py-2 text-left w-full ${theme === "dark"
                          ? "hover:bg-gray-700"
                          : "hover:bg-gray-100"
                          }`}
                      >
                        Logout
                      </button>
                    </div>
                  )}
                </li>
              </>
            ) : (
              // Show Login/Register links when not logged in
              <>
                <li>
                  <Link
                    to="/login"
                    onClick={handleMockLogin}
                    className={`${theme === "dark" ? "text-gray-300" : "text-gray-600"
                      } hover:text-blue-500`}
                  >
                    Login
                  </Link>
                </li>
                <li>
                  <Link
                    to="/register"
                    className={`${theme === "dark" ? "text-gray-300" : "text-gray-600"
                      } hover:text-blue-500`}
                  >
                    Register
                  </Link>
                </li>
              </>
            )}
            <li>
              <button
                onClick={toggleTheme}
                className={`${theme === "dark" ? "text-gray-300" : "text-gray-600"
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
