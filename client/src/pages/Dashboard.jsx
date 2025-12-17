import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";
import Navbar from "../components/Navbar";

export default function Dashboard() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      navigate("/login");
      return;
    }

    API.get("/bookings/my", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        setBookings(res.data);
        setLoading(false);
      })
      .catch(() => {
        alert("Failed to load bookings");
        setLoading(false);
      });
  }, [navigate]);

  return (
    <>
      <Navbar />

      <div className="min-h-screen bg-gray-50">
        <div className="max-w-6xl mx-auto p-6">
          <h1 className="text-3xl font-bold mb-8 text-gray-800">
            🎫 My Tickets
          </h1>

          {loading ? (
            <p className="text-gray-600">Loading your bookings...</p>
          ) : bookings.length === 0 ? (
            <div className="bg-white p-8 rounded-xl shadow text-center">
              <p className="text-gray-600 text-lg">
                You haven’t booked any events yet.
              </p>
            </div>
          ) : (
            <div className="space-y-6">
              {bookings.map((b) => (
                <div
                  key={b._id}
                  className="bg-white rounded-2xl shadow hover:shadow-lg transition flex flex-col md:flex-row overflow-hidden"
                >
                  {/* LEFT SIDE — DETAILS */}
                  <div className="flex-1 p-6">
                    <h3 className="text-2xl font-semibold text-indigo-600">
                      {b.event.title}
                    </h3>

                    <div className="mt-2 text-gray-600 space-y-1">
                      <p>📍 {b.event.location}</p>
                      <p>
                        📅{" "}
                        {new Date(b.event.date).toLocaleDateString()}
                      </p>
                    </div>

                    <div className="mt-4 grid grid-cols-2 gap-4 max-w-sm">
                      <div>
                        <p className="text-sm text-gray-500">
                          Tickets
                        </p>
                        <p className="font-semibold">
                          {b.quantity}
                        </p>
                      </div>

                      <div>
                        <p className="text-sm text-gray-500">
                          Total Paid
                        </p>
                        <p className="font-semibold">
                          ₹{b.totalAmount}
                        </p>
                      </div>
                    </div>

                    <span
                      className={`inline-block mt-4 px-4 py-1 text-sm rounded-full ${
                        b.status === "confirmed"
                          ? "bg-green-100 text-green-700"
                          : "bg-yellow-100 text-yellow-700"
                      }`}
                    >
                      {b.status}
                    </span>
                  </div>

                  {/* RIGHT SIDE — QR CODE */}
                  {b.qrCode && (
                    <div className="bg-gray-100 flex items-center justify-center p-6 md:w-56 border-t md:border-t-0 md:border-l">
                      <div className="text-center">
                        <img
                          src={b.qrCode}
                          alt="QR Code"
                          className="w-32 h-32 mx-auto border rounded bg-white"
                        />
                        <p className="text-xs text-gray-500 mt-2">
                          Scan at entry
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
}
