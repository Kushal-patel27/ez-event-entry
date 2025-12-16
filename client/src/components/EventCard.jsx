// src/components/EventCard.jsx
export default function EventCard({ event }) {
  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden">
      <div className="p-4">
        <h3 className="text-lg font-semibold">{event.title}</h3>
        <p className="text-sm text-gray-600">{event.location}</p>
        <p className="text-sm mt-1">
          ₹{event.price} • {event.category}
        </p>
        <button className="mt-4 w-full bg-indigo-600 text-white py-2 rounded">
          Book Now
        </button>
      </div>
    </div>
  );
}
