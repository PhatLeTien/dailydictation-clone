import React from 'react';

const Header = ({ theme, toggleTheme }) => {
  return (
    <header className={`${theme === 'dark' ? 'bg-gray-900 text-white' : 'bg-white text-black'} w-full shadow-md relative z-10`}>
      <div className="max-w-[96rem] mx-auto flex justify-between items-center p-4">
        <div className="flex items-center">
          {/* Logo */}
          <img src="/logo-dailydictation.png" alt="DailyDictation Logo" className="h-8 mr-2" />
          <div className="font-bold text-2xl">
            DailyDictation
          </div>
        </div>
        
        <nav className="flex items-center">
          <ul className="flex space-x-6">
            <li><a href="/all-excercises" className={`${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'} hover:text-blue-500`}>All exercises</a></li>
            <li><a href="/top-users" className={`${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'} hover:text-blue-500`}>Top users</a></li>
            <li><a href="/video-lessons" className={`${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'} hover:text-blue-500`}>Video lessons</a></li>
            <li><a href="/learntogether" className={`${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'} hover:text-blue-500`}>Learn Together</a></li>
            <li><a href="/help-me" className={`${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'} flex items-center`}>
              Help me<span role="img" aria-label="praying hands" className="ml-1">🙏</span>
            </a></li>
          </ul>
          <ul className="flex items-center space-x-4 ml-6">
            <li><a href="/login" className={`${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'} hover:text-blue-500`}>Login</a></li>
            <li><a href="/register" className={`${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'} hover:text-blue-500`}>Register</a></li>
            {/* Toggle Theme Button */}
            <li>
              <button onClick={toggleTheme} className={`${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'} hover:text-blue-500 text-2xl`}>
                {theme === 'dark' ? '🌚' : '🌞'}
              </button>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
