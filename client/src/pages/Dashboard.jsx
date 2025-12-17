import { useEffect, useState } from "react";
import API from "../services/api";
import Navbar from "../components/Navbar";

export default function Dashboard() {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem("token");

    API.get("/bookings/my", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => setBookings(res.data))
      .catch(() => alert("Failed to load bookings"));
  }, []);

  return (
    <>
      <Navbar />

      <div className="max-w-5xl mx-auto p-6">
        <h1 className="text-3xl font-bold mb-6">My Tickets</h1>

        {bookings.length === 0 ? (
          <p>No bookings yet</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {bookings.map((b) => (
              <div key={b._id} className="bg-white shadow rounded p-4">
                <h3 className="text-xl font-semibold">{b.event.title}</h3>
                <p>📍 {b.event.location}</p>
                <p>🎟 Tickets: {b.quantity}</p>
                <p>💰 Total: ₹{b.totalAmount}</p>

                {b.qrCode && (
                  <img
                    src={b.qrCode}
                    alt="QR Code"
                    className="mt-4 w-40"
                  />
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
}
