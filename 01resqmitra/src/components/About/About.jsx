import React from 'react';
import { FaBullhorn, FaMapMarkedAlt, FaUsers } from 'react-icons/fa';


function About() {
  return (
    <div id="about" className="relative bg-white py-16 sm:py-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center">
          <h2 className=" font-bold text-2xl text-red-600 tracking-wide uppercase">
            Our Mission
          </h2>
          <p className="mt-2 text-3xl font-extrabold text-gray-900 tracking-tight sm:text-4xl">
            Your Support in Critical Times
          </p>
          <p className="mt-5 max-w-2xl mx-auto text-xl text-gray-500">
            resQMitra is a community-driven platform designed to dramatically reduce emergency response times, because we believe help should always be just a tap away.
          </p>
        </div>

        
        <div className="mt-20 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

          <div className="order-2 lg:order-1">
            <img 
              className="rounded-lg shadow-xl w-full h-auto" 
              src="/about-image.png" 
              alt="Emergency Response Team" 
            />
          </div>

          
          <div className="order-1 lg:order-2">
            <div className="space-y-6 text-lg text-gray-700 leading-relaxed">
              <p>
                In any emergency, the time between the incident and the arrival of professional help is the most critical. Traditional services often face delays due to traffic, communication gaps, or a lack of precise location information.
              </p>
              <p>
                <strong>resQMitra ("Rescue Friend")</strong> was created to bridge this vital gap. By connecting people in distress with a network of nearby, verified volunteers, we empower communities to provide immediate, life-saving assistance. Our platform ensures that the nearest help reaches you in minutes, providing crucial support until official responders arrive.
              </p>
            </div>
            
            {/* Feature */}
            <dl className="mt-12 space-y-10">
              
              <div className="relative">
                <dt>
                  <div className="absolute flex items-center justify-center h-12 w-12 rounded-md bg-red-600 text-white">
                    <FaBullhorn className="h-6 w-6" aria-hidden="true" />
                  </div>
                  <p className="ml-16 text-lg leading-6 font-medium text-gray-900">One-Tap SOS Alerts</p>
                </dt>
                <dd className="mt-2 ml-16 text-base text-gray-500">
                  Instantly notify nearby volunteers and authorities with your precise location in a single tap.
                </dd>
              </div>

              
              <div className="relative">
                <dt>
                  <div className="absolute flex items-center justify-center h-12 w-12 rounded-md bg-red-600 text-white">
                    <FaUsers className="h-6 w-6" aria-hidden="true" />
                  </div>
                  <p className="ml-16 text-lg leading-6 font-medium text-gray-900">Community-Powered</p>
                </dt>
                <dd className="mt-2 ml-16 text-base text-gray-500">
                  Leverage a network of trained and verified volunteers (Mitras) ready to provide immediate assistance.
                </dd>
              </div>

              
              <div className="relative">
                <dt>
                  <div className="absolute flex items-center justify-center h-12 w-12 rounded-md bg-red-600 text-white">
                    <FaMapMarkedAlt className="h-6 w-6" aria-hidden="true" />
                  </div>
                  <p className="ml-16 text-lg leading-6 font-medium text-gray-900">Live Location Sharing</p>
                </dt>
                <dd className="mt-2 ml-16 text-base text-gray-500">
                  Ensure help finds you fast by providing real-time location tracking to responders and trusted contacts.
                </dd>
              </div>
            </dl>
          </div>
        </div>
      </div>
    </div>
  );
}

export default About;