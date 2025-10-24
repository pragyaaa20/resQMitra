import React from "react";
import { Link } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';

const Header = () => {
  const { isAuthenticated, user, logout } = useAuth();

  const handleLogout = async () => {
    await logout();
  };

  const commonLinkProps = {
    smooth: true,
    duration: 500,
    spy: true,
    className: "hover:underline cursor-pointer"
  };

  return (
    <header className="bg-red-600 text-white px-6 py-3 h-15">
      <div className="flex justify-between items-start">
        <div>
          <img
            src="/logo.png"
            alt="resQMitra Logo"
            className="h-13 w-60 mt-3"
          />
        </div>

        <div className="flex space-x-3">
          {isAuthenticated ? (
            <>
              <div className="flex items-center space-x-3">
                <span className="text-sm">
                  Welcome, {user?.name} ({user?.role})
                </span>
                {user?.role?.toLowerCase() === 'admin' && (
                  <Link 
                    to="/admin" 
                    className="bg-white text-red-600 font-semibold px-4 py-1 rounded hover:bg-gray-100 transition"
                  >
                    Admin Panel
                  </Link>
                )}
                {user?.role?.toLowerCase() === 'volunteer' && (
                  <Link 
                    to="/volunteer" 
                    className="bg-white text-red-600 font-semibold px-4 py-1 rounded hover:bg-gray-100 transition"
                  >
                    Volunteer Panel
                  </Link>
                )}
                <button 
                  onClick={handleLogout}
                  className="bg-white text-red-600 font-semibold px-4 py-1 rounded hover:bg-gray-100 transition"
                >
                  Logout
                </button>
              </div>
            </>
          ) : (
            <>
              <Link 
                to="/register" 
                className="bg-white text-red-600 font-semibold px-4 py-1 rounded hover:bg-gray-100 transition"
              >
                Register
              </Link>
              <Link 
                to="/login" 
                className="bg-white text-red-600 font-semibold px-4 py-1 rounded hover:bg-gray-100 transition"
              >
                Login
              </Link>
            </>
          )}
        </div>
      </div>

      <nav className="text-md uppercase font-semibold tracking-widest flex justify-end items-center space-x-6">
        <Link to="/home" {...commonLinkProps}>
          HOME
        </Link>
        <span>|</span>
        <Link to="/about" {...commonLinkProps}>
          ABOUT
        </Link>
        <span>|</span>
        <Link to="/solution" {...commonLinkProps}>
          SOLUTION
        </Link>
        {isAuthenticated && (
          <>
            <span>|</span>
            <Link to="/history" {...commonLinkProps}>
              HISTORY
            </Link>
          </>
        )}
      </nav>
    </header>
  );
};

export default Header;