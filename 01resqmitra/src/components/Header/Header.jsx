import React from "react";
import { Link } from 'react-router-dom';


const Header = () => {

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
          <Link to="/register" className="bg-white text-red-600 font-semibold px-4 py-1 rounded hover:bg-gray-100 transition">
            Register
          </Link>
          <Link to="/login" className="bg-white text-red-600 font-semibold px-4 py-1 rounded hover:bg-gray-100 transition">
            Login
          </Link>
        </div>
        </div>

      
      <nav className="text-md uppercase font-semibold tracking-widest flex justify-end items-center space-x-6">
        <Link to="/Home" {...commonLinkProps}>
          HOME
        </Link>
        <span>|</span>
        <Link to="about" {...commonLinkProps}>
          ABOUT
        </Link>
        <span>|</span>
        <Link to="solution" {...commonLinkProps}>
          SOLUTION
        </Link>
        
      </nav>
    </header>
  );
};

export default Header;