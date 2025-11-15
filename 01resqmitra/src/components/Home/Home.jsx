import React, { useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import { FaMapMarkerAlt, FaBullhorn, FaUsers, FaSyncAlt, FaShieldAlt } from 'react-icons/fa';
import { emergencyAPI } from '../../services/apiService';
import { useAuth } from '../../hooks/useAuth';



function Home() {
  const { isAuthenticated, user } = useAuth();
  
  const slides = [
    "/carousel01.png", 
    "/carousel02.png", 
    "/image.webp"
  ];
  const [current, setCurrent] = useState(0);
  const [isSOSLoading, setIsSOSLoading] = useState(false);
  const [notification, setNotification] = useState({ show: false, message: '', type: '' });
  const [sosDescription, setSosDescription] = useState('');

  // Check if user is a citizen (not admin or volunteer)
  const isCitizen = isAuthenticated && user?.role && user.role.toLowerCase() === 'citizen';
    
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 5000); // 5 sec
    return () => clearInterval(interval);
  }, [slides.length]);

  // Function to show notification
  const showNotification = (message, type = 'info') => {
    setNotification({ show: true, message, type });
    setTimeout(() => {
      setNotification({ show: false, message: '', type: '' });
    }, 5000);
  };

  // Function to get user's current location
  const getCurrentLocation = () => {
    return new Promise((resolve, reject) => {
      if (!navigator.geolocation) {
        reject(new Error('Geolocation is not supported by this browser.'));
        return;
      }

      navigator.geolocation.getCurrentPosition(
        (position) => {
          resolve({
            latitude: position.coords.latitude.toString(),
            longitude: position.coords.longitude.toString()
          });
        },
        (error) => {
          let errorMessage = 'Unable to retrieve location.';
          switch(error.code) {
            case error.PERMISSION_DENIED:
              errorMessage = 'Location access denied by user.';
              break;
            case error.POSITION_UNAVAILABLE:
              errorMessage = 'Location information is unavailable.';
              break;
            case error.TIMEOUT:
              errorMessage = 'Location request timed out.';
              break;
          }
          reject(new Error(errorMessage));
        },
        {
          enableHighAccuracy: true,
          timeout: 10000,
          maximumAge: 60000
        }
      );
    });
  };

  // Function to handle SOS button click
  const handleSOSClick = async () => {
    setIsSOSLoading(true);
    
    try {
      // Get current location
      showNotification('Getting your location...', 'info');
      const location = await getCurrentLocation();
      
      // Prepare incident data with location and description
      const incidentData = {
        ...location,
        description: sosDescription.trim() || 'Emergency assistance needed'
      };
      
      // Make API call to register incident
      showNotification('Sending SOS alert...', 'info');
      const response = await emergencyAPI.registerIncident(incidentData);
      
      // Show success message and clear description
      showNotification('SOS alert sent successfully! Help is on the way.', 'success');
      setSosDescription('');
      console.log('Incident registered:', response);
      
    } catch (error) {
      console.error('Error sending SOS:', error);
      
      // Show user-friendly error message
      if (error.message.includes('Location')) {
        showNotification(`Location Error: ${error.message}. Please enable location services and try again.`, 'error');
      } else {
        showNotification('Failed to send SOS alert. Please try again or contact emergency services directly.', 'error');
      }
    } finally {
      setIsSOSLoading(false);
    }
  };





  const features = [
    { text: 'Live Location Sharing', icon: <FaMapMarkerAlt /> },
    { text: 'One-Tap SOS Alerts', icon: <FaBullhorn /> },
    { text: 'Volunteer Support', icon: <FaUsers /> },
    { text: 'Real-Time Updates', icon: <FaSyncAlt /> },
    { text: 'Secure & Scalable', icon: <FaShieldAlt /> },
  ];


  return (
    <div className="flex flex-col items-center bg-gray-100 ">
      
      {/* Notification */}
      {notification.show && (
        <div className={`fixed top-4 right-4 z-50 p-4 rounded-lg shadow-lg transition-all duration-300 ${
          notification.type === 'success' ? 'bg-green-500 text-white' :
          notification.type === 'error' ? 'bg-red-500 text-white' :
          'bg-blue-500 text-white'
        }`}>
          <div className="flex items-center">
            <span className="mr-2">
              {notification.type === 'success' ? '✅' : 
               notification.type === 'error' ? '❌' : 
               'ℹ️'}
            </span>
            {notification.message}
          </div>
        </div>
      )}
      
      <div className="w-full h-screen  relative overflow-hidden">
        <div className="w-full h-full bg-center bg-cover transition-all duration-700"
        style={{ backgroundImage: `url(${slides[current]})` }}></div>
      </div>

      
      <div className="text-center mt-14">
        <h2 className="font-bold text-5xl">QUICK HELP WHEN</h2>
        <h2 className="font-bold text-4xl">YOU NEED IT MOST</h2>
        <p className="text-gray-600 text-xl">
          A Community-driven emergency response system
        </p>
        {isCitizen ? (
          <div className="flex flex-col items-center mt-6">
            {/* Description Input Field */}
            <div className="mb-4 w-full max-w-md">
              <label htmlFor="sosDescription" className="block text-sm font-medium text-gray-700 mb-2">
                Describe your emergency (optional)
              </label>
              <textarea
                id="sosDescription"
                value={sosDescription}
                onChange={(e) => setSosDescription(e.target.value)}
                placeholder="Briefly describe what kind of help you need..."
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 outline-none transition-all duration-200 resize-none"
                rows="3"
                maxLength="200"
                disabled={isSOSLoading}
              />
              <p className="text-xs text-gray-500 mt-1">
                {sosDescription.length}/200 characters
              </p>
            </div>
            
            {/* SOS Button */}
            <button 
              onClick={handleSOSClick}
              disabled={isSOSLoading}
              className={`bg-gradient-to-br from-red-600 to-red-800 text-white font-bold text-3xl py-5 px-14 rounded-full shadow-xl hover:from-red-700 hover:to-red-900 active:from-red-800 active:to-red-900 transition-all duration-300 transform hover:-translate-y-1 hover:scale-105 focus:outline-none focus:ring-4 focus:ring-red-400 focus:ring-opacity-75 ${isSOSLoading ? 'opacity-75 cursor-not-allowed' : ''}`}
            >
              {isSOSLoading ? 'Sending SOS...' : 'SOS'}
            </button>
          </div>
        ) : (
          <div className="mt-6">
            {!isAuthenticated ? (
              <div className="text-center">
                <p className="text-gray-600 text-lg font-medium mb-4">
                  Please <span className="text-red-600 font-semibold">log in as a citizen</span> to access emergency SOS feature
                </p>
                <Link 
                  to="/login"
                  className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-blue-300"
                >
                  Login Now
                </Link>
              </div>
            ) : (
              <p className="text-gray-600 text-lg font-medium">
                SOS feature is available only for <span className="text-red-600 font-semibold">citizens</span>
              </p>
            )}
          </div>
        )}
      </div>

      {isCitizen && (
        <section className="w-full bg-yellow-100 text-red-700 text-center py-4 font-bold text-lg mb-11 mt-14 border-red-400">
          ⚠️ THIS IS AN EMERGENCY FACILITY. <br></br>
          USERS ARE ADVISED TO USE THIS SERVICE CAREFULLY.
        </section>
      )}

      
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-14 mb-8">
        <div className="bg-white w-60 h-60 flex flex-col items-center justify-center rounded-lg shadow-lg hover:scale-105 transition">
          <span className="text-6xl">🤝</span>
          <p className="mt-2 font-semibold text-gray-700 text-xl">Volunteer Help</p>
        </div>
        <div className="bg-white w-60 h-60 flex flex-col items-center justify-center rounded-lg shadow-lg hover:scale-105 transition">
          <span className="text-6xl">👮</span>
          <p className="mt-2 font-semibold text-gray-700 text-xl">Police</p>
        </div>
        <div className="bg-white w-60 h-60 flex flex-col items-center justify-center rounded-lg shadow-lg hover:scale-105 transition">
          <span className="text-6xl">🔥</span>
          <p className="mt-2 font-semibold text-gray-700 text-xl">Fire Help</p>
        </div>
        <div className="bg-white w-60 h-60 flex flex-col items-center justify-center rounded-lg shadow-lg hover:scale-105 transition">
          <span className="text-6xl">💊</span>
          <p className="mt-2 font-semibold text-gray-700 text-xl">First Aid</p>
        </div>
      </div>



      
  
  
    <section className="bg-gray-100 py-16 px-6 md:px-12 font-sans mt-10 mb-16">
    <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-start md:items-stretch gap-12">

      {/* Left Sidebar */}
      <div className="w-full md:w-1/3 flex flex-col">
        {/* Features Card */}
        <div className="bg-red-600 text-white p-6 rounded-2xl shadow-lg flex-1">
          <ul className="space-y-4">
            {features.map((feature, index) => (
              <li key={index} className="flex items-center gap-3">
                <span className="text-2xl">{feature.icon}</span>
                <span className="font-semibold text-lg">{feature.text}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Sidebar Image */}
        <img
          src="/sidei.png"
          alt="Emergency Services"
          className="mt-6 rounded-2xl shadow-md w-full object-cover h-60 md:h-72"
        />
      </div>

      {/* Right Content */}
      <div className="w-full md:w-2/3 flex flex-col justify-center">
        <h2 className="text-3xl font-bold text-gray-800 mb-6">Emergency Response System</h2>
        <div className="text-gray-700 space-y-6 leading-relaxed text-lg">
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
  </section>



    








  
    </div>
  );
}

export default Home;

  