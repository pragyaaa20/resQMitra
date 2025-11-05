import React from 'react'
import { FaTachometerAlt, FaBriefcaseMedical, FaSignOutAlt, FaBell } from "react-icons/fa"
import { CgProfile } from "react-icons/cg"
import { MdOutlineEventNote } from "react-icons/md"
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useAuth } from '../../hooks/useAuth'

function VolunteerSidebar() {
  const location = useLocation()
  const navigate = useNavigate()
  const { logout } = useAuth()

  const handleLogout = async () => {
    await logout();
    // Redirect to home page after successful logout
    navigate('/home', { replace: true });
  };

  const menuItems = [
    {
      icon: <FaTachometerAlt />,
      text: "Dashboard",
      path: "/volunteer/home"
    },
    {
      icon: <CgProfile />,
      text: "Profile", 
      path: "/volunteer/profile"
    },
    {
      icon: <FaBell />,
      text: "Alerts",
      path: "/volunteer/incident/alert"
    },
    {
      icon: <MdOutlineEventNote />,
      text: "My Incidents",
      path: "/volunteer/incidents"
    }
  ]

  return (
    <aside className="w-64 bg-red-800 text-white flex flex-col justify-between">
      <div>
        <div className="px-6 py-4 text-3xl font-bold border-b border-gray-700 flex items-center gap-5">
          <FaBriefcaseMedical />
          <span>resQMitra</span>
        </div>
        <nav className="mt-6">
          <ul>
            {menuItems.map((item) => (
              <li key={item.path}>
                <Link 
                  to={item.path}
                  className={`flex items-center gap-3 px-6 py-3 hover:bg-red-900 cursor-pointer transition-colors ${
                    location.pathname === item.path ? 'bg-red-900' : ''
                  }`}
                >
                  {item.icon}
                  <span>{item.text}</span>
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>

      {/* Logout Button */}
      <div className="p-4">
        <button
          onClick={handleLogout}
          className="flex items-center gap-3 w-full px-6 py-3 text-white hover:bg-red-900 cursor-pointer transition-colors rounded-md"
        >
          <FaSignOutAlt />
          <span>Logout</span>
        </button>
      </div>
    </aside>
  )
}

export default VolunteerSidebar
