import React from "react";
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';

const Header = () => {
  const { isAuthenticated, user, logout, isAdmin, isVolunteer } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate('/home', { replace: true });
  };

  const handleDashboardClick = (e) => {
    e.preventDefault();
    if (isAdmin()) {
      navigate('/admin/home');
    } else if (isVolunteer()) {
      navigate('/volunteer/home');
    }
  };

  const commonLinkProps = {
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
            <button onClick={handleDashboardClick} className="hover:underline cursor-pointer">
              DASHBOARD
            </button>
          </>
        )}
      </nav>
    </header>
  );
};

export default Header;