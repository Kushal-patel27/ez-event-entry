import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import API from "../services/api";
import Navbar from "../components/Navbar";

export default function EventDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [event, setEvent] = useState(null);
  const [qty, setQty] = useState(1);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    API.get(`/events/${id}`)
      .then((res) => setEvent(res.data))
      .catch(() => alert("Failed to load event"));
  }, [id]);

  const bookHandler = async () => {
    const token = localStorage.getItem("token");

    // 🔐 Auth check
    if (!token) {
      alert("Please login to book tickets");
      navigate("/login");
      return;
    }

    // 🧪 Safety checks
    if (!event || qty < 1) {
      alert("Invalid booking");
      return;
    }

    try {
      setLoading(true);

      const res = await API.post(
        "/bookings",
        {
          eventId: event._id,
          quantity: qty,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert("🎉 Booking successful!");
      console.log("BOOKING DATA:", res.data);

    } catch (error) {
      alert(error.response?.data?.message || "Booking failed");
    } finally {
      setLoading(false);
    }
  };

  if (!event)
    return <p className="text-center mt-10">Loading event...</p>;

  return (
    <>
      <Navbar />

      <div className="max-w-4xl mx-auto p-6">
        <h1 className="text-3xl font-bold">{event.title}</h1>

        <p className="text-gray-600 mt-2">
          📍 {event.location}
        </p>

        <p className="mt-4">{event.description}</p>

        <div className="mt-6 flex items-center gap-4">
          <input
            type="number"
            min="1"
            max={event.availableTickets}
            value={qty}
            onChange={(e) => setQty(Number(e.target.value))}
            className="border rounded p-2 w-24"
          />

          <span className="font-semibold text-lg">
            Total: ₹{qty * event.price}
          </span>
        </div>

        <button
          onClick={bookHandler}
          disabled={loading || event.availableTickets === 0}
          className="mt-6 bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-lg disabled:opacity-50"
        >
          {loading ? "Booking..." : "Confirm Booking"}
        </button>
      </div>
    </>
  );
}
