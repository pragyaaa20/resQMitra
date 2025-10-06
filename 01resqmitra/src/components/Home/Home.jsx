import React, { useState, useEffect } from "react";
import { FaMapMarkerAlt, FaBullhorn, FaUsers, FaSyncAlt, FaShieldAlt } from 'react-icons/fa';



function Home() {
  
  const slides = [
    "/carousel01.png", 
    "/carousel02.png", 
    "/image.webp"
  ];
  const [current, setCurrent] = useState(0);
    
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 5000); // 5 sec
    return () => clearInterval(interval);
  }, [slides.length]);





  const features = [
    { text: 'Live Location Sharing', icon: <FaMapMarkerAlt /> },
    { text: 'One-Tap SOS Alerts', icon: <FaBullhorn /> },
    { text: 'Volunteer Support', icon: <FaUsers /> },
    { text: 'Real-Time Updates', icon: <FaSyncAlt /> },
    { text: 'Secure & Scalable', icon: <FaShieldAlt /> },
  ];


  return (
    <div className="flex flex-col items-center bg-gray-100 ">
      
      <div className="w-full h-screen  relative overflow-hidden">
        <div className="w-full h-full bg-center bg-cover transition-all duration-700"
        style={{ backgroundImage: `url(${slides[current]})` }}></div>
      </div>

      
      <div className="text-center mt-14">
        <h2 className="font-bold text-5xl">QUICK HELP WHEN</h2>
        <h2 className="font-bold text-4xl">YOU NEED IT MOST</h2>
        <p className="text-gray-600 text-lg">
          A Community-driven emergency response system
        </p>
       <button className="bg-gradient-to-br from-red-600 to-red-800 text-white font-bold text-3xl py-5 px-14 mt-6 rounded-full shadow-xl hover:from-red-700 hover:to-red-900 active:from-red-800 active:to-red-900 transition-all duration-300 transform hover:-translate-y-1 hover:scale-105 focus:outline-none focus:ring-4 focus:ring-red-400 focus:ring-opacity-75">
  SOS
</button>
      </div>

      
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-14 mb-8">
        <div className="bg-white w-40 h-40 flex flex-col items-center justify-center rounded-lg shadow-lg hover:scale-105 transition">
          <span className="text-4xl">🤝</span>
          <p className="mt-2 font-semibold text-gray-700">Volunteer Help</p>
        </div>
        <div className="bg-white w-40 h-40 flex flex-col items-center justify-center rounded-lg shadow-lg hover:scale-105 transition">
          <span className="text-4xl">👮</span>
          <p className="mt-2 font-semibold text-gray-700">Police</p>
        </div>
        <div className="bg-white w-40 h-40 flex flex-col items-center justify-center rounded-lg shadow-lg hover:scale-105 transition">
          <span className="text-4xl">🔥</span>
          <p className="mt-2 font-semibold text-gray-700">Fire Help</p>
        </div>
        <div className="bg-white w-40 h-40 flex flex-col items-center justify-center rounded-lg shadow-lg hover:scale-105 transition">
          <span className="text-4xl">💊</span>
          <p className="mt-2 font-semibold text-gray-700">First Aid</p>
        </div>
      </div>



      
  
  
    <section className="bg-gray-100 p-6 md:p-10  mt-20  ml-2  py-10  mb-16 font-sans">
      <div className="container mx-auto max-w-5xl">
        <div className="flex flex-col md:flex-row items-start gap-8">
          
          {/* Left Side: Red Features Box and Image */}
          <div className="w-full md:w-1/3 flex-shrink-0">
            {/* Red Features Box */}
            <div className="bg-red-600 text-white p-6 rounded-lg shadow-lg">
              <ul className="space-y-4">
                {features.map((feature, index) => (
                  <li key={index} className="flex items-center gap-4">
                    <span className="text-2xl">{feature.icon}</span>
                    <span className="font-semibold text-lg">{feature.text}</span>
                  </li>
                ))}
              </ul>
            </div>
            
            {/* Image below the red box */}
            <img 
              src="/sidei.png"
              alt="Emergency Services" 
              className="mt-6 rounded-lg shadow-md w-full" 
            />
          </div>

          {/* Right Side: Main Text Content */}
          <div className="w-full md:w-2/3 pt-15">
            <div className="text-gray-700 space-y-5 leading-relaxed text-base">
              <p>
                The Emergency Response System is a community-driven platform designed to provide faster assistance during critical situations such as accidents, medical emergencies, natural disasters, or public safety threats. Traditional emergency services often face delays due to traffic, communication gaps, or limited resources, and our system bridges this gap by connecting people in need with nearby volunteers who can respond immediately.
              </p>
              <p>
                Through features like SOS alerts, live location sharing, volunteer coordination, and admin monitoring, the platform ensures timely help, transparency, and security. Built with Spring Boot (Java) for the backend and React (JavaScript) for the frontend, the system offers real-time updates, scalability, and a user-friendly experience.
              </p>
              <p>
                Our goal is to create a reliable, secure, and socially impactful solution that not only complements official emergency services but also strengthens community participation in saving lives.
              </p>
            </div>
          </div>

        </div>
      </div>
    </section>
  
    </div>
  );
}

export default Home;

  