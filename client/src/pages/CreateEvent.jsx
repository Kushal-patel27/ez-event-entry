import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";
import Navbar from "../components/Navbar";

export default function CreateEvent() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    title: "",
    description: "",
    date: "",
    location: "",
    price: "",
    totalTickets: "",
    category: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
      return;
    }

    try {
      await API.post("/events", form, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      alert("🎉 Event created successfully");
      navigate("/organizer");
    } catch (error) {
      alert(error.response?.data?.message || "Failed to create event");
    }
  };

  return (
    <>
      <Navbar />

      <div className="max-w-xl mx-auto p-6">
        <h1 className="text-3xl font-bold mb-6">Create Event</h1>

        <form
          onSubmit={submitHandler}
          className="bg-white shadow rounded-lg p-6 space-y-4"
        >
          <input
            name="title"
            placeholder="Event Title"
            className="w-full border p-2"
            required
            onChange={handleChange}
          />

          <textarea
            name="description"
            placeholder="Event Description"
            className="w-full border p-2"
            required
            onChange={handleChange}
          />

          <input
            type="date"
            name="date"
            className="w-full border p-2"
            required
            onChange={handleChange}
          />

          <input
            name="location"
            placeholder="Location"
            className="w-full border p-2"
            required
            onChange={handleChange}
          />

          <input
            type="number"
            name="price"
            placeholder="Ticket Price"
            className="w-full border p-2"
            onChange={handleChange}
          />

          <input
            type="number"
            name="totalTickets"
            placeholder="Total Tickets"
            className="w-full border p-2"
            required
            onChange={handleChange}
          />

          <input
            name="category"
            placeholder="Category (Concert, Festival, Tech)"
            className="w-full border p-2"
            onChange={handleChange}
          />

          <button
            type="submit"
            className="bg-indigo-600 hover:bg-indigo-700 text-white w-full py-2 rounded"
          >
            Create Event
          </button>
        </form>
      </div>
    </>
  );
}
