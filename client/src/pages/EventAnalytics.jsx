import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import API from "../services/api";
import Navbar from "../components/Navbar";

export default function EventAnalytics() {
  const { eventId } = useParams();
  const navigate = useNavigate();

  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
      return;
    }

    API.get(`/bookings/event/${eventId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        setBookings(res.data);
        setLoading(false);
      })
      .catch(() => {
        alert("Failed to load event analytics");
        setLoading(false);
      });
  }, [eventId, navigate]);

  const totalTickets = bookings.reduce(
    (sum, b) => sum + b.quantity,
    0
  );

  const totalRevenue = bookings.reduce(
    (sum, b) => sum + b.totalAmount,
    0
  );

  return (
    <>
      <Navbar />

      <div className="max-w-6xl mx-auto p-6">
        <h1 className="text-3xl font-bold mb-6">
          Event Analytics
        </h1>

        {loading ? (
          <p>Loading analytics...</p>
        ) : (
          <>
            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
              <div className="bg-white shadow rounded p-4">
                <h3 className="text-lg font-semibold">
                  Total Tickets Sold
                </h3>
                <p className="text-2xl font-bold">
                  {totalTickets}
                </p>
              </div>

              <div className="bg-white shadow rounded p-4">
                <h3 className="text-lg font-semibold">
                  Total Revenue
                </h3>
                <p className="text-2xl font-bold">
                  ₹{totalRevenue}
                </p>
              </div>

              <div className="bg-white shadow rounded p-4">
                <h3 className="text-lg font-semibold">
                  Total Bookings
                </h3>
                <p className="text-2xl font-bold">
                  {bookings.length}
                </p>
              </div>
            </div>

            {/* Attendee Table */}
            {bookings.length === 0 ? (
              <p>No bookings yet</p>
            ) : (
              <div className="overflow-x-auto">
                <table className="min-w-full bg-white shadow rounded">
                  <thead>
                    <tr className="bg-gray-100">
                      <th className="p-3 text-left">Name</th>
                      <th className="p-3 text-left">Email</th>
                      <th className="p-3">Tickets</th>
                      <th className="p-3">Amount</th>
                      <th className="p-3">Date</th>
                      <th className="p-3">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {bookings.map((b) => (
                      <tr key={b._id} className="border-t">
                        <td className="p-3">{b.user.name}</td>
                        <td className="p-3">{b.user.email}</td>
                        <td className="p-3 text-center">{b.quantity}</td>
                        <td className="p-3 text-center">
                          ₹{b.totalAmount}
                        </td>
                        <td className="p-3 text-center">
                          {new Date(b.createdAt).toLocaleDateString()}
                        </td>
                        <td className="p-3 text-center">
                          <span className="px-3 py-1 text-sm bg-green-100 text-green-700 rounded">
                            {b.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </>
        )}
      </div>
    </>
  );
}
