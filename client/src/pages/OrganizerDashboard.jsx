import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";
import Navbar from "../components/Navbar";

export default function OrganizerDashboard() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");

    // 🔐 Protect route
    if (!token) {
      navigate("/login");
      return;
    }

    API.get("/events/my", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        setEvents(res.data);
        setLoading(false);
      })
      .catch(() => {
        alert("Failed to load organizer events");
        setLoading(false);
      });
  }, [navigate]);

  return (
    <>
      <Navbar />

      <div className="max-w-6xl mx-auto p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">Organizer Dashboard</h1>

          {/* Create Event Button */}
          <button
            onClick={() => navigate("/organizer/create")}
            className="bg-indigo-600 text-white px-4 py-2 rounded"
          >
            + Create Event
          </button>
        </div>

        {loading ? (
          <p>Loading events...</p>
        ) : events.length === 0 ? (
          <p className="text-gray-600">
            You haven’t created any events yet.
          </p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {events.map((event) => (
              <div
                key={event._id}
                className="bg-white shadow rounded-lg p-4"
              >
                <h3 className="text-xl font-semibold">
                  {event.title}
                </h3>

                <p className="text-gray-600">
                  📍 {event.location}
                </p>

                <p>
                  📅 {new Date(event.date).toLocaleDateString()}
                </p>

                <p className="mt-2">
                  🎟 Total Tickets: {event.totalTickets}
                </p>

                <p>
                  🎫 Available: {event.availableTickets}
                </p>

                {/* View Analytics Button */}
                <button
                 onClick={() =>
  navigate(`/organizer/event/${event._id}/analytics`)
}

                  className="mt-4 bg-indigo-600 text-white px-3 py-1 rounded"
                >
                  View Analytics
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
}
