import React from "react";
import {
  FaFacebookF,
  FaDiscord,
  FaTwitter,
  FaGlobe,
} from "react-icons/fa"; 

const Footer = () => {
  return (
    <footer className="bg-red-600 text-white px-6 py-10">
      
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:justify-between md:items-start space-y-8 md:space-y-0">
        
        <div className="flex flex-col space-y-2 md:w-1/4 ml-6">
          <img
            src="/logo.png" 
            alt="resQMitra Logo"
            className="h-15 w-60"
          />
          <p className="text-white text-md">Connecting communities to save lives faster</p>
         </div>

       
        <div className="flex justify-center md:w-3/4 gap-4">
         
          <div>
            <h3 className="uppercase font-semibold tracking-wider mb-3">RESOURCES   </h3>
            <ul className="space-y-1 text-sm cursor-pointer">
              <li className="hover:underline">HOME</li>
              <li className="hover:underline">SOLUTIONS</li>
              <li className="hover:underline">HISTORY</li>
            </ul>
          </div>

          
          <div>
            <h3 className="uppercase font-semibold tracking-wider mb-3">LEGAL</h3>
            <ul className="space-y-1 text-sm cursor-pointer">
              <li className="hover:underline">Privacy Policy</li>
              <li className="hover:underline">Terms & Conditions</li>
            </ul>
          </div>
        </div>
      </div>

      
      <hr className="border-white/30 my-6" />

      
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:justify-between md:items-center text-xs text-white/70 space-y-4 md:space-y-0">
        <p>© 2025resQMitra. All Rights Reserved.</p>

        <div className="flex space-x-6 text-white cursor-pointer">
          <FaFacebookF className="hover:text-gray-200" />
          <FaDiscord className="hover:text-gray-200" />
          <FaTwitter className="hover:text-gray-200" />
          <FaGlobe className="hover:text-gray-200" />
        </div>
      </div>
    </footer>
  );
};

export default Footer;
                    
                                    
                    