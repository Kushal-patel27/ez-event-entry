import { useNavigate } from "react-router-dom";

export default function EventCard({ event }) {
  const navigate = useNavigate();

  return (
    <div
      onClick={() => navigate(`/event/${event._id}`)}
      className="bg-white rounded-xl shadow-md overflow-hidden cursor-pointer hover:scale-105 transition"
    >
      <div className="p-4">
        <h3 className="text-lg font-semibold">{event.title}</h3>
        <p className="text-sm text-gray-600">{event.location}</p>
        <p className="text-sm mt-1">
          ₹{event.price} • {event.category}
        </p>
      </div>
    </div>
  );
}
