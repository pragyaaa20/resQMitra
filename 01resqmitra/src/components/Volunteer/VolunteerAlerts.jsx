import React, { useState, useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import VolunteerSidebar from "./VolunteerSidebar";
import { VolunteerAPI } from "../../services/apiService";
import { useAuth } from "../../hooks/useAuth";

function VolunteerAlerts() {
  const [incidents, setIncidents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [actionLoading, setActionLoading] = useState({});
  const [urlIncidentId, setUrlIncidentId] = useState(null);
  const [emailMismatchError, setEmailMismatchError] = useState(null);

  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { user, isAuthenticated } = useAuth();


  useEffect(() => {
    const emailFromUrl = searchParams.get("email");
    const incidentIdFromUrl = searchParams.get("incidentId");

    if (emailFromUrl && incidentIdFromUrl) {
      setUrlIncidentId(incidentIdFromUrl);

      // If user is authenticated, verify email matches
      if (isAuthenticated && user) {
        const userEmail = user.email;
        if (userEmail !== emailFromUrl) {
          setEmailMismatchError(
            `You are logged in as ${userEmail}, but this alert was sent to ${emailFromUrl}. Please log out and log in with the correct email address.`
          );
          return;
        }
      } else {
        // If not authenticated, redirect to login with email pre-filled and return URL
        let returnUrl = `/volunteer/incident/alert?email=${emailFromUrl}&incidentId=${incidentIdFromUrl}`;
        if (searchParams.get("date")) {
          returnUrl += `&date=${searchParams.get("date")}`;
        }
        if (searchParams.get("lat")) {
          returnUrl += `&lat=${searchParams.get("lat")}`;
        }
        if (searchParams.get("long")) {
          returnUrl += `&long=${searchParams.get("long")}`;
        }

        navigate(
          `/login?email=${emailFromUrl}&returnTo=${encodeURIComponent(
            returnUrl
          )}`,
          { replace: true }
        );
        return;
      }
    }
  }, [searchParams, isAuthenticated, user, navigate]);

  useEffect(() => {
    const loadIncidentFromParams = () => {
      try {
        setLoading(true);

        // Only show incidents if there's an email parameter in the URL
        const emailFromUrl = searchParams.get("email");
        if (!emailFromUrl) {
          setIncidents([]);
          setLoading(false);
          return;
        }

        // Get incident data from URL parameters
        const incidentIdFromUrl = searchParams.get("incidentId");
        const dateFromUrl = searchParams.get("date");
        const latFromUrl = searchParams.get("lat");
        const longFromUrl = searchParams.get("long");

        if (incidentIdFromUrl && latFromUrl && longFromUrl) {
          // Create incident object from URL parameters
          const incidentFromUrl = {
            incidentId: parseInt(incidentIdFromUrl),
            status: "ACTIVE",
            latitude: parseFloat(latFromUrl),
            longitude: parseFloat(longFromUrl),
            createdAt: dateFromUrl
              ? new Date(dateFromUrl.replace(/-/g, "/")).toISOString()
              : new Date().toISOString(),
            description: "Emergency incident from email notification",
          };

          setIncidents([incidentFromUrl]);
        } else {
          setIncidents([]);
        }
      } catch (err) {
        console.error("Error loading incident from parameters:", err);
        setError("Invalid incident parameters");
      } finally {
        setLoading(false);
      }
    };

    loadIncidentFromParams();
  }, [urlIncidentId, searchParams]);

  const totalIncidents = incidents.length;

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    });
  };

  const generateGoogleMapsLink = (latitude, longitude) => {
    return `https://www.google.com/maps?q=${latitude},${longitude}`;
  };

  const handleAcceptIncident = async (incidentId) => {
    try {
      setActionLoading((prev) => ({ ...prev, [`accept_${incidentId}`]: true }));

      // Get volunteer ID from localStorage
      const storedUserData = localStorage.getItem("userData");
      if (!storedUserData) {
        setError("Please log in to accept incidents");
        return;
      }
      const userData = JSON.parse(storedUserData);
      const volunteerId = userData?.user?.email || userData?.user?.userId;

      // Use the existing API service
      const result = await VolunteerAPI.acceptIncident(incidentId, volunteerId);
      console.log("Incident accepted successfully:", result);

      // Remove the accepted incident from the list
      setIncidents((prevIncidents) =>
        prevIncidents.filter((incident) => incident.incidentId !== incidentId)
      );

      // Clear URL parameters after successful acceptance
      window.history.replaceState(
        {},
        document.title,
        "/volunteer/incident/alert"
      );
      setUrlIncidentId(null);

      // Show success message
      alert(`Incident #${incidentId} has been accepted successfully!`);
    } catch (err) {
      console.error("Error accepting incident:", err);
      setError(
        `Failed to accept incident: ${err.message || "Unknown error occurred"}`
      );
    } finally {
      setActionLoading((prev) => ({
        ...prev,
        [`accept_${incidentId}`]: false,
      }));
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-100 font-sans">
      {/* Sidebar */}
      <VolunteerSidebar />

      {/* Main Content */}
      <main className="flex-1 p-10 bg-white">
        {/* Check if email parameter exists */}
        {!searchParams.get("email") && !loading && (
          <div className="flex flex-col items-center justify-center min-h-[60vh] text-center">
            <div className="bg-gradient-to-br from-blue-50 to-indigo-100 rounded-2xl p-12 max-w-lg mx-auto shadow-lg">
              <div className="mb-6">
                <svg
                  className="w-24 h-24 text-indigo-300 mx-auto mb-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  />
                </svg>
              </div>
              <h2 className="text-2xl font-bold text-gray-800 mb-4">
                No Alert Notification
              </h2>
              <p className="text-gray-600 mb-6 leading-relaxed">
                This page is designed to handle emergency alert notifications
                sent via email. To view and respond to alerts, please access
                this page through the link provided in your email notification.
              </p>
              <div className="bg-white rounded-lg p-4 border border-indigo-200">
                <div className="flex items-center justify-center text-sm text-gray-500">
                  <svg
                    className="w-4 h-4 mr-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  Access via email notification required
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Loading State */}
        {loading && searchParams.get("email") && (
          <div className="flex justify-center items-center h-64">
            <div className="flex flex-col items-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-500 mb-4"></div>
              <div className="text-lg text-gray-600">Loading...</div>
            </div>
          </div>
        )}

        {/* Content only shown when email parameter exists */}
        {searchParams.get("email") && (
          <>
            {/* Error State */}
            {error && (
              <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6">
                {error}
              </div>
            )}

            {/* Email Mismatch Error */}
            {emailMismatchError && (
              <div className="bg-yellow-100 border border-yellow-400 text-yellow-800 px-4 py-3 rounded mb-6">
                <div className="flex items-center">
                  <svg
                    className="w-5 h-5 mr-2 flex-shrink-0"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <div>
                    <p className="font-semibold">Email Verification Required</p>
                    <p className="text-sm">{emailMismatchError}</p>
                  </div>
                </div>
              </div>
            )}

            {/* Summary Section */}
            {!loading && !error && (
              <div className="bg-gradient-to-r from-orange-50 to-red-50 shadow-lg rounded-lg p-6 mb-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-8">
                    <div className="text-center">
                      <h3 className="text-lg font-medium text-gray-700 mb-1">
                        Available Incidents
                      </h3>
                      <p className="text-3xl font-bold text-gray-800">
                        {totalIncidents}
                      </p>
                    </div>

                    <div className="h-12 w-px bg-gray-300"></div>

                    <div className="text-center">
                      <h4 className="text-sm font-medium text-orange-700 mb-1">
                        Awaiting Response
                      </h4>
                      <div className="flex items-center space-x-2">
                        <div className="w-3 h-3 bg-orange-500 rounded-full animate-pulse"></div>
                        <p className="text-2xl font-bold text-orange-600">
                          {totalIncidents}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="text-right">
                    <div className="text-xs text-gray-500 mb-1">
                      Action Required
                    </div>
                    <div className="flex space-x-1">
                      <div
                        className="h-2 bg-orange-500 rounded animate-pulse"
                        style={{
                          width: `${totalIncidents > 0 ? 60 : 0}px`,
                        }}
                      ></div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Incident Table */}
            {!loading && !error && (
              <div className="overflow-x-auto bg-white shadow-md rounded-lg mb-10">
                <table className="min-w-full table-auto border-collapse">
                  <thead className="bg-orange-400 text-white">
                    <tr>
                      <th className="px-6 py-3 text-left text-sm font-semibold uppercase">
                        Incident ID
                      </th>
                      <th className="px-6 py-3 text-left text-sm font-semibold uppercase">
                        Priority
                      </th>
                      <th className="px-6 py-3 text-left text-sm font-semibold uppercase">
                        Location
                      </th>
                      <th className="px-6 py-3 text-left text-sm font-semibold uppercase">
                        Date
                      </th>
                      <th className="px-6 py-3 text-left text-sm font-semibold uppercase">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {incidents.length > 0 ? (
                      incidents.map((incident) => {
                        const isHighlighted =
                          urlIncidentId &&
                          incident.incidentId.toString() === urlIncidentId;
                        return (
                          <tr
                            key={incident.incidentId}
                            className={`border-b ${
                              isHighlighted
                                ? "bg-blue-50 border-blue-200 ring-2 ring-blue-300"
                                : "hover:bg-gray-50"
                            }`}
                          >
                            <td className="px-6 py-4 text-gray-800">
                              <div className="flex items-center">
                                {incident.incidentId
                                  .toString()
                                  .padStart(3, "0")}
                              </div>
                            </td>
                            <td className="px-6 py-4">
                              <span className="px-3 py-1 rounded-full text-sm font-medium bg-red-100 text-red-800">
                                URGENT
                              </span>
                            </td>
                            <td className="px-6 py-4 text-gray-600">
                              <div className="flex flex-col">
                                <a
                                  href={generateGoogleMapsLink(
                                    incident.latitude,
                                    incident.longitude
                                  )}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="text-blue-600 hover:text-blue-800 hover:underline cursor-pointer text-sm inline-flex items-center"
                                  title="Open location in Google Maps"
                                >
                                  <svg
                                    className="w-4 h-4 mr-1"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                  >
                                    <path
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                      strokeWidth={2}
                                      d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                                    />
                                    <path
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                      strokeWidth={2}
                                      d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                                    />
                                  </svg>
                                  View on Map
                                </a>
                              </div>
                            </td>
                            <td className="px-6 py-4 text-gray-600">
                              {formatDate(incident.createdAt)}
                            </td>
                            <td className="px-6 py-4">
                              <div className="flex space-x-2">
                                <button
                                  onClick={() =>
                                    handleAcceptIncident(incident.incidentId)
                                  }
                                  disabled={
                                    actionLoading[
                                      `accept_${incident.incidentId}`
                                    ]
                                  }
                                  className="px-4 py-2 bg-blue-500 text-white text-sm rounded-md hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200 flex items-center space-x-1"
                                >
                                  {actionLoading[
                                    `accept_${incident.incidentId}`
                                  ] ? (
                                    <>
                                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                      <span>Accepting...</span>
                                    </>
                                  ) : (
                                    <>
                                      <svg
                                        className="w-4 h-4"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                      >
                                        <path
                                          strokeLinecap="round"
                                          strokeLinejoin="round"
                                          strokeWidth={2}
                                          d="M5 13l4 4L19 7"
                                        />
                                      </svg>
                                      <span>Accept</span>
                                    </>
                                  )}
                                </button>
                              </div>
                            </td>
                          </tr>
                        );
                      })
                    ) : (
                      <tr>
                        <td
                          colSpan="6"
                          className="px-6 py-8 text-center text-gray-500"
                        >
                          <div className="flex flex-col items-center space-y-2">
                            <svg
                              className="w-12 h-12 text-gray-300"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                              />
                            </svg>
                            <p>No available incidents at the moment.</p>
                            <p className="text-sm text-gray-400">
                              Check back later for new incidents.
                            </p>
                          </div>
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            )}
          </>
        )}
      </main>
    </div>
  );
}

export default VolunteerAlerts;
