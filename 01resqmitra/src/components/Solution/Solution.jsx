import React from 'react';
import {
  FaNotesMedical, FaMedkit, FaShieldAlt, FaUserMd, FaPhoneAlt,
  FaFemale, FaBaby, FaFireExtinguisher, FaAmbulance, FaUserShield, FaMapMarkerAlt
} from 'react-icons/fa';

function Solution() {
  return (
    <div id="solution" className="bg-gray-50 py-16 sm:py-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">

        
        <div className="text-center mb-16">
          <h2 className=" font-bold text-xl text-red-600 tracking-wide uppercase">
            Your Guide in an Emergency
          </h2>
          <p className="mt-2 text-3xl font-extrabold text-gray-900 tracking-tight sm:text-4xl">
            What To Do & Who To Call
          </p>
          <p className="mt-5 max-w-3xl mx-auto text-xl text-gray-700">
            Stay prepared with this guide for common emergencies and a quick list of important contacts.
          </p>
        </div>

       

        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">

          
          <div className="lg:col-span-2 space-y-12">
            
            
            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
                <FaMedkit className="text-red-600 mr-3" /> Accidents (Road or Home)
              </h3>
              <div className="space-y-4 text-lg text-gray-600 leading-relaxed">
                <p>When encountering an accident, remember the Three Cs: <strong>Check, Call, and Care.</strong></p>
                <p><strong>1. Check the Scene:</strong> Your safety is the first priority. Check for dangers like traffic or fire before approaching.</p>
                <p><strong>2. Call for Help:</strong> Call 112 immediately. Provide your exact location, the nature of the accident, and the number of people injured.</p>
                <p><strong>3. Care for the Injured:</strong> Do not move an injured person unless they are in immediate danger. Control severe bleeding by applying firm pressure with a clean cloth. Comfort and reassure them until help arrives.</p>
              </div>
            </div>

            
            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
                <FaShieldAlt className="text-red-600 mr-3" /> Natural Disasters
              </h3>
              <div className="space-y-4 text-lg text-gray-600 leading-relaxed">
                <p>Preparedness is key. Have an emergency kit with water, food, a first-aid kit, and medications. Create a family communication plan and stay informed through official channels.</p>
                <p><strong>During an Earthquake:</strong> Drop, Cover, and Hold On. <strong>During a Flood:</strong> Move to higher ground immediately.</p>
              </div>
            </div>

            
            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
                <FaUserMd className="text-red-600 mr-3" /> Health & Medication Safety
              </h3>
              <div className="space-y-4 text-lg text-gray-600 leading-relaxed">
                <p>Always take medication as prescribed and never share it. Keep a list of your medicines for emergencies. To recognize a stroke, remember <strong>F.A.S.T.</strong> (Face, Arms, Speech, Time to call help). For a heart attack, look for chest pain, shortness of breath, and pain in the arms/neck, and call 112 immediately.</p>
              </div>
            </div>
            
          </div>

          {/* Right Column (Emergency Contacts) */}
          <div className="lg:col-span-1">
            <div className="bg-white p-6 rounded-lg shadow-lg sticky top-24">
              <h3 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
                <FaPhoneAlt className="text-red-600 mr-3" /> Emergency Contacts
              </h3>
              <ul className="space-y-4">
                <li className="flex justify-between items-center border-b pb-3">
                  <span className="text-gray-600">National Emergency Number</span>
                  <span className="text-2xl font-bold text-red-600">112</span>
                </li>
                <li className="flex justify-between items-center border-b pb-3">
                  <span className="text-gray-600">Police Control Room</span>
                  <span className="text-2xl font-bold text-red-600">100</span>
                </li>
                <li className="flex justify-between items-center border-b pb-3">
                  <span className="text-gray-600">Fire Department</span>
                  <span className="text-2xl font-bold text-red-600">101</span>
                </li>
                <li className="flex justify-between items-center border-b pb-3">
                  <span className="text-gray-600">Ambulance (Pregnant Women & Children)</span>
                  <span className="text-2xl font-bold text-red-600">102</span>
                </li>
                <li className="flex justify-between items-center border-b pb-3">
                  <span className="text-gray-600">Ambulance (General)</span>
                  <span className="text-2xl font-bold text-red-600">108</span>
                </li>
                <li className="flex justify-between items-center border-b pb-3">
                  <span className="text-gray-600">Women's Helpline</span>
                  <span className="text-2xl font-bold text-red-600">1091</span>
                </li>
                <li className="flex justify-between items-center border-b pb-3">
                  <span className="text-gray-600">Child Helpline</span>
                  <span className="text-2xl font-bold text-red-600">1098</span>
                </li>
                <li className="flex justify-between items-center pb-3">
                  <span className="text-gray-600">Disaster Management</span>
                  <span className="text-2xl font-bold text-red-600">1077</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}

export default Solution;
